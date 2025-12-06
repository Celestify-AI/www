"use client";

import React, { useEffect, useRef, useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  Node,
  OnNodeDrag,
  applyNodeChanges, // Import this helper
  NodeChange,
} from "@xyflow/react";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
  SimulationNodeDatum,
  Simulation,
} from "d3";
import { DecisionEngineNode } from "@repo/ui"; // Ensure this path is correct
import "@xyflow/react/dist/style.css";

import nodeData from "./nodes.json";

const proOptions = { hideAttribution: true };
const nodeTypes = { decisionNode: DecisionEngineNode };

type D3Node = SimulationNodeDatum & {
  id: string;
  fx?: number | null;
  fy?: number | null;
  data: {
    heading: string;
    body: string;
    importance: number;
    scale: number;
    sources: string[];
  };
};

const Flow = () => {
  const [nodes, setNodes] = useNodesState<Node>([]); // Removed onNodesChange from hook

  const simulationRef = useRef<Simulation<D3Node, undefined> | null>(null);
  const d3NodesRef = useRef<D3Node[]>([]);

  // 1. INITIALIZE DATA ONCE
  useEffect(() => {
    // Map initial data to D3 format
    d3NodesRef.current = nodeData.map((item) => ({
      id: item.id,
      x: 0, // Start at center or random
      y: 0,
      fx: null,
      fy: null,
      data: {
        ...item,
        scale: 0.6 + (item.importance / 10) * 0.4,
      },
    }));

    // Initialize Simulation
    simulationRef.current = forceSimulation<D3Node>(d3NodesRef.current)
      .force("charge", forceManyBody().strength(-300)) // Increased strength for better spacing
      .force(
        "collide",
        forceCollide<D3Node>()
          .radius((n) => 180 * n.data.scale)
          .iterations(1),
      )
      .force("x", forceX(0).strength(0.08))
      .force("y", forceY(0).strength(0.08))
      .force("center", forceCenter(0, 0))
      .stop(); // Start stopped, we tick manually

    // Tick Logic
    let animationFrameId: number;

    const tick = () => {
      if (!simulationRef.current) return;

      simulationRef.current.tick();

      // OPTIMIZATION: Functional state update prevents closure staleness
      setNodes((currentNodes) => {
        // Map D3 positions to React Flow Nodes
        return d3NodesRef.current.map((n) => {
          // Try to keep existing node properties if they exist (selection state, etc)
          const existing = currentNodes.find((cn) => cn.id === n.id);

          return {
            id: n.id,
            type: "decisionNode",
            // If dragging, trust the fx/fy (mouse), otherwise trust x/y (sim)
            position: { x: n.fx ?? n.x ?? 0, y: n.fy ?? n.y ?? 0 },
            data: n.data,
            draggable: true,
            // Persist selection/dimensions if available
            selected: existing?.selected,
            measured: existing?.measured,
            width: existing?.width,
            height: existing?.height,
          };
        });
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      simulationRef.current?.stop();
    };
  }, [setNodes]);

  // 2. CUSTOM CHANGE HANDLER
  // We filter out 'position' changes because D3 is now the "Source of Truth" for X/Y.
  // We still want to handle selection or removal changes.
  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      const filteredChanges = changes.filter((c) => c.type !== "position");
      setNodes((nds) => applyNodeChanges(filteredChanges, nds));
    },
    [setNodes],
  );

  // 3. DRAG HANDLERS
  const onNodeDragStart = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const d3Node = d3NodesRef.current.find((n) => n.id === node.id);
      if (!d3Node || !simulationRef.current) return;

      // Pin the node to the mouse position
      d3Node.fx = node.position.x;
      d3Node.fy = node.position.y;

      // Re-heat the simulation so other nodes react to the drag
      simulationRef.current.alphaTarget(0.3).restart();
    },
    [],
  );

  const onNodeDrag: OnNodeDrag = useCallback((_event, node) => {
    const d3Node = d3NodesRef.current.find((n) => n.id === node.id);
    if (!d3Node) return;

    // Update the pin position as we move
    d3Node.fx = node.position.x;
    d3Node.fy = node.position.y;
  }, []);

  const onNodeDragStop = useCallback((_event: React.MouseEvent, node: Node) => {
    const d3Node = d3NodesRef.current.find((n) => n.id === node.id);
    if (!d3Node || !simulationRef.current) return;

    // Unpin the node so it floats back into the physics system
    d3Node.fx = null;
    d3Node.fy = null;

    // Cool down simulation
    simulationRef.current.alphaTarget(0);
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange} // Use our filtered handler
      onNodeDragStart={onNodeDragStart}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      nodesDraggable
      proOptions={proOptions}
      fitView
      fitViewOptions={{
        padding: 0.2,
        maxZoom: 1,
        minZoom: 0.4,
      }}
    >
      <Background color="#8f8f8f" gap={24} />
    </ReactFlow>
  );
};

export default Flow;
