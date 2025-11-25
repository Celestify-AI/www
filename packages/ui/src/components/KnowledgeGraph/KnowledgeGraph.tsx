"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Maximize, Minimize2 } from "lucide-react";

interface Node {
  id: string;
  label: string;
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

    const rect = d3Container.current.getBoundingClientRect();
    const width = rect.width || 300;
    const height = rect.height || 200;

    svg.attr("width", width).attr("height", height);

    svg.selectAll("*").remove();

    const background = svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent")
      .style("cursor", "grab")
      .style("pointer-events", "all");

    const container = svg.append("g");

    const nodes: Node[] = [
      // Central node
      { id: "marketing-decision", label: "Marketing Decision" },
      // Main branches
      { id: "previous-campaigns", label: "Previous campaigns" },
      { id: "finance-report", label: "Finance Report" },
      { id: "allocated-budget", label: "Allocated Budget" },
      { id: "abg-creator-stats", label: "ABG Creator Stats" },
      // Sub-nodes for Previous campaigns
      { id: "campaign-performance", label: "Campaign Performance" },
      { id: "audience-insights", label: "Audience Insights" },
      // Sub-nodes for Finance Report
      { id: "revenue-analysis", label: "Revenue Analysis" },
      { id: "cost-breakdown", label: "Cost Breakdown" },
      // Sub-nodes for Allocated Budget
      { id: "channel-allocation", label: "Channel Allocation" },
      { id: "budget-timeline", label: "Budget Timeline" },
      // Sub-nodes for ABG Creator Stats
      { id: "creator-performance", label: "Creator Performance" },
      { id: "engagement-metrics", label: "Engagement Metrics" },
    ];

    const links: Link[] = [
      // Main branches from central node
      { source: "marketing-decision", target: "previous-campaigns" },
      { source: "marketing-decision", target: "finance-report" },
      { source: "marketing-decision", target: "allocated-budget" },
      { source: "marketing-decision", target: "abg-creator-stats" },
      // Sub-nodes for Previous campaigns
      { source: "previous-campaigns", target: "campaign-performance" },
      { source: "previous-campaigns", target: "audience-insights" },
      // Sub-nodes for Finance Report
      { source: "finance-report", target: "revenue-analysis" },
      { source: "finance-report", target: "cost-breakdown" },
      // Sub-nodes for Allocated Budget
      { source: "allocated-budget", target: "channel-allocation" },
      { source: "allocated-budget", target: "budget-timeline" },
      // Sub-nodes for ABG Creator Stats
      { source: "abg-creator-stats", target: "creator-performance" },
      { source: "abg-creator-stats", target: "engagement-metrics" },
    ];

    const simulation = d3
      .forceSimulation<Node>(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(80)
      )
      .force("charge", d3.forceManyBody<Node>().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide<Node>()
          .radius((d) => (d.id === "marketing-decision" ? 20 : 15))
      );

    const link = container
      .append("g")
      .attr("stroke", "#b3aeaa")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const nodeSelection = container
      .append("g")
      .attr("stroke", "#5d6cdc")
      .attr("stroke-width", 1.5)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d.id === "marketing-decision" ? 15 : 10))
      .attr("fill", (d) =>
        d.id === "marketing-decision" ? "#5d6cdc" : "#3C4BB9"
      )
      .style("cursor", "move");

    const labels = container
      .append("g")
      .selectAll<SVGTextElement, Node>("text")
      .data(nodes)
      .join("text")
      .text((d) => d.label)
      .attr("font-size", (d) =>
        d.id === "marketing-decision" ? "14px" : "12px"
      )
      .attr("font-weight", (d) =>
        d.id === "marketing-decision" ? "bold" : "normal"
      )
      .attr("fill", "#d1d1d1")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => (d.id === "marketing-decision" ? 25 : 20))
      .style("pointer-events", "none")
      .style("user-select", "none");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .wheelDelta((event) => -event.deltaY * 0.002) // reduce zoom per scroll
      .filter((event) => {
        const target = event.target as Element;
        if (event.type === "wheel") return true;
        return target.tagName === "rect" || target === svg.node();
      })
      .on("start", () => background.style("cursor", "grabbing"))
      .on("zoom", (event) => {
        container
          .transition()
          .duration(50)
          .attr("transform", event.transform.toString());
      })
      .on("end", () => background.style("cursor", "grab"));

    svg.call(zoom);

    const nodeDrag = d3
      .drag<SVGCircleElement, Node, Node>()
      .on("start", (event, d) => {
        event.sourceEvent.stopPropagation();
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        event.sourceEvent.stopPropagation();
        const transform = d3.zoomTransform(svg.node()!);
        d.fx = (event.x - transform.x) / transform.k;
        d.fy = (event.y - transform.y) / transform.k;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    (
      nodeSelection as d3.Selection<
        SVGCircleElement,
        Node,
        SVGGElement,
        unknown
      >
    ).call(nodeDrag);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      nodeSelection.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);

      labels.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    return () => {
      simulation.stop();
    };
  }, [maximized]);

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };

  return (
    <div
      className={`bg-(--card-background) flex flex-col ${maximized ? "fixed top-0 left-0 w-screen h-screen z-50" : "border-2 border-(--border) rounded-lg w-full h-96"}`}
    >
      <button
        onClick={toggleMaximize}
        className="absolute text-(--muted) px-4 py-4 self-end"
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
