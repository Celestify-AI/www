"use client";

import React from "react";
import { ReactFlow, Background, useNodesState, Position } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 150 },
    data: { label: "default style 1" },
    ...nodeDefaults,
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: { label: "default style 2" },
    ...nodeDefaults,
  },
  {
    id: "3",
    position: { x: 250, y: 150 },
    data: { label: "default style 3" },
    ...nodeDefaults,
  },
  {
    id: "4",
    position: { x: 250, y: 300 },
    data: { label: "default style 4" },
    ...nodeDefaults,
  },
];

const Flow = () => {
  const [nodes] = useNodesState(initialNodes);

  return (
    <ReactFlow nodes={nodes} fitView>
      <Background />
    </ReactFlow>
  );
};

export default Flow;
