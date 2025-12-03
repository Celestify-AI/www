"use client";

import React from "react";
import { ReactFlow, Background, useNodesState } from "@xyflow/react";
import { DecisionEngineNode } from "@repo/ui";
import "@xyflow/react/dist/style.css";

const proOptions = { hideAttribution: true };

const initialNodes = [
  {
    id: "1",
    type: "decisionNode",
    position: { x: 0, y: 0 },
    data: {
      heading: "Reels Performance Concern",
      body: "The team's last 5 reels haven't been performing well. Kyle suggests adding an outrageous, attention grabbing hook at the beginning.",
    },
    draggable: true,
  },
];

const nodeTypes = { decisionNode: DecisionEngineNode };

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      fitView
      nodesDraggable
      proOptions={proOptions}
    >
      <Background color="#3f3f3f" />
    </ReactFlow>
  );
};

export default Flow;
