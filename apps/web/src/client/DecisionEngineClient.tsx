"use client";

import React, { useMemo } from "react";
import { ReactFlow, Background, useNodesState } from "@xyflow/react";
import { DecisionEngineNode } from "@repo/ui";
import "@xyflow/react/dist/style.css";

import nodeData from "./nodes.json";

const proOptions = { hideAttribution: true };

const nodeTypes = { decisionNode: DecisionEngineNode };

// Configuration for the layout
const SPACING_FACTOR = 250; // How far apart nodes are spread
const GOLDEN_ANGLE = 137.5 * (Math.PI / 180); // 2.399 radians

const Flow = () => {
  const initialNodes = useMemo(() => {
    // Sort by importance DESC so highest importance is at index 0 (center)
    const sortedData = [...nodeData].sort(
      (a, b) => b.importance - a.importance
    );

    return sortedData.map((item, index) => {
      const radius = SPACING_FACTOR * Math.sqrt(index);
      const angle = index * GOLDEN_ANGLE;

      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      // Calculate Scale based on importance (1-10)
      // Importance 10 = Scale 1.0
      // Importance 1 = Scale 0.6
      const scale = 0.6 + (item.importance / 10) * 0.4;

      return {
        id: item.id,
        type: "decisionNode",
        position: { x, y },
        data: {
          ...item,
          // Pass the computed scale to data just in case the component uses it internally
          scale: scale,
        },
        draggable: true,
      };
    });
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      nodesDraggable
      proOptions={proOptions}
      fitView
      fitViewOptions={{
        padding: 0.2,
        maxZoom: 1,
      }}
    >
      <Background color="#d1d1d1" gap={24} />
    </ReactFlow>
  );
};

export default Flow;
