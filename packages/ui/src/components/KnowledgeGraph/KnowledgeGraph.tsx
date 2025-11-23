"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Maximize, Minimize2 } from "lucide-react";

interface Node {
  id: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

const KnowledgeGraph: React.FC<{ maximized?: boolean }> = ({
  maximized: initialMaximized = false,
}) => {
  const d3Container = useRef<SVGSVGElement | null>(null);
  const [maximized, setMaximized] = useState(initialMaximized);

  useEffect(() => {
    if (!d3Container.current) return;
    const svg = d3.select(d3Container.current);

    // Get actual dimensions from the SVG element
    const rect = d3Container.current.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 200;

    // Set explicit width and height for the SVG
    svg.attr("width", width).attr("height", height);

    // Clear previous contents
    svg.selectAll("*").remove();

    // Sample data
    const nodes: Node[] = [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }];

    const links: Link[] = [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
      { source: "C", target: "D" },
    ];

    // Create a simulation
    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(80),
      )
      .force("charge", d3.forceManyBody<Node>().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links
    const link = svg
      .append("g")
      .attr("stroke", "#fefefe")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const nodeSelection = svg
      .append("g")
      .attr("stroke", "#5d6cdc")
      .attr("stroke-width", 1.5)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", "#5663c2");

    (
      nodeSelection as d3.Selection<
        SVGCircleElement,
        Node,
        SVGGElement,
        unknown
      >
    ).call(
      d3
        .drag<SVGCircleElement, Node, Node>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }),
    );

    // Update positions every tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      nodeSelection.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    });

    // Cleanup function
    return () => {
      simulation.stop();
    };
  }, [maximized]);

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };

  return (
    <div
      className={`flex flex-col ${maximized ? "bg-(--background) fixed top-0 left-0 w-screen h-screen z-50" : "border-2 border-(--border) rounded-lg w-full h-96"}`}
    >
      <button
        onClick={toggleMaximize}
        className="fixed text-(--muted) px-4 py-4 self-end"
      >
        {maximized ? <Minimize2 /> : <Maximize />}
      </button>

      <svg
        ref={d3Container}
        className="w-full h-full min-h-[200px]"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export { KnowledgeGraph };
