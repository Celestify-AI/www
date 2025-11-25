"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Maximize, Minimize2 } from "lucide-react";

interface TextBox {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const DecisionTree: React.FC<{ maximized?: boolean }> = ({
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

    // Add a background rectangle to capture pan events on empty space
    const background = svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "transparent")
      .style("cursor", "grab")
      .style("pointer-events", "all");

    // Create a container group for zoom/pan transformations
    const container = svg.append("g");

    // Define padding and spacing constants
    const paddingX = 16;
    const paddingY = 12;
    const minBoxWidth = 100;
    const minBoxHeight = 50;
    const fontSize = 12;
    const lineHeight = fontSize * 1.4;
    const horizontalSpacing = 200;
    const verticalSpacing = 100;

    // Helper function to measure text width
    const measureTextWidth = (text: string): number => {
      const tempText = container
        .append("text")
        .attr("font-size", `${fontSize}px`)
        .attr("font-weight", "500")
        .text(text)
        .style("visibility", "hidden");

      const width = (tempText.node() as SVGTextElement).getBBox().width;
      tempText.remove();
      return width;
    };

    // Function to wrap text into lines
    const wrapTextIntoLines = (
      text: string,
      maxLineWidth: number
    ): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = measureTextWidth(testLine);

        if (testWidth > maxLineWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) {
        lines.push(currentLine);
      }

      return lines.length > 0 ? lines : [text];
    };

    // Function to measure text dimensions
    const measureText = (text: string): { width: number; height: number } => {
      // Split text into words to handle wrapping
      const maxLineWidth = 200; // Maximum width before wrapping
      const lines = wrapTextIntoLines(text, maxLineWidth);

      // Calculate dimensions based on wrapped text
      const wrappedWidth = Math.max(
        ...lines.map((line) => measureTextWidth(line)),
        minBoxWidth - paddingX * 2
      );
      const wrappedHeight = Math.max(
        lines.length * lineHeight,
        minBoxHeight - paddingY * 2
      );

      return {
        width: wrappedWidth + paddingX * 2,
        height: wrappedHeight + paddingY * 2,
      };
    };

    // Define text content for boxes
    const boxData = [
      { id: "main", text: "Marketing Decision" },
      { id: "left", text: "Mass Producing Micro Content" },
      { id: "right", text: "Instagram Reels Influencers" },
      { id: "next", text: "Majority Budget on Production Crew" },
    ];

    // Calculate box dimensions for each box
    const textBoxes: TextBox[] = boxData.map((data) => {
      const dimensions = measureText(data.text);
      return {
        id: data.id,
        text: data.text,
        x: 0, // Will be calculated after we know all dimensions
        y: 0, // Will be calculated after we know all dimensions
        width: dimensions.width,
        height: dimensions.height,
      };
    });

    // Calculate center positions and update box positions
    const centerX = width / 2;
    const topY = 50;
    const middleY = topY + verticalSpacing;
    const bottomY = middleY + verticalSpacing;

    // Update positions based on calculated dimensions
    const mainBox = textBoxes.find((b) => b.id === "main")!;
    const leftBox = textBoxes.find((b) => b.id === "left")!;
    const rightBox = textBoxes.find((b) => b.id === "right")!;
    const nextBox = textBoxes.find((b) => b.id === "next")!;

    mainBox.x = centerX - mainBox.width / 2;
    mainBox.y = topY;

    leftBox.x = centerX - horizontalSpacing - leftBox.width / 2;
    leftBox.y = middleY;

    rightBox.x = centerX + horizontalSpacing - rightBox.width / 2;
    rightBox.y = middleY;

    nextBox.x = centerX + horizontalSpacing - nextBox.width / 2;
    nextBox.y = bottomY;

    // Draw flowchart lines (connections)
    const drawFlowchartLine = (
      from: TextBox,
      to: TextBox,
      isVertical: boolean = false
    ) => {
      const fromX = from.x + from.width / 2;
      const fromY = from.y + from.height;
      const toX = to.x + to.width / 2;
      const toY = to.y;

      if (isVertical) {
        // Vertical line (straight down)
        container
          .append("line")
          .attr("x1", fromX)
          .attr("y1", fromY)
          .attr("x2", toX)
          .attr("y2", toY)
          .attr("stroke", "#b3aeaa")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrowhead)");
      } else {
        // L-shaped line (down then horizontal)
        const midY = fromY + (toY - fromY) / 2;
        container
          .append("path")
          .attr(
            "d",
            `M ${fromX} ${fromY} L ${fromX} ${midY} L ${toX} ${midY} L ${toX} ${toY}`
          )
          .attr("fill", "none")
          .attr("stroke", "#b3aeaa")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrowhead)");
      }
    };

    // Add arrowhead marker definition
    container
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 5)
      .attr("refY", 3)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0 0, 10 3, 0 6")
      .attr("fill", "#b3aeaa");

    // Draw connections
    // Main to Left (L-shaped)
    drawFlowchartLine(mainBox, leftBox, false);
    // Main to Right (L-shaped)
    drawFlowchartLine(mainBox, rightBox, false);
    // Right to Next (vertical)
    drawFlowchartLine(rightBox, nextBox, true);

    // Draw text boxes
    textBoxes.forEach((box) => {
      const group = container.append("g");

      // Draw rectangle
      group
        .append("rect")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .attr("rx", 8)
        .attr("fill", "#3C4BB9")
        .attr("stroke", "#5d6cdc")
        .attr("stroke-width", 1.5)
        .style("cursor", "move");

      // Wrap text and draw multiple lines if needed
      const maxTextWidth = box.width - paddingX * 2;
      const textLines = wrapTextIntoLines(box.text, maxTextWidth);
      const startY =
        box.y + box.height / 2 - ((textLines.length - 1) * lineHeight) / 2;

      textLines.forEach((line, index) => {
        group
          .append("text")
          .attr("x", box.x + box.width / 2)
          .attr("y", startY + index * lineHeight)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("fill", "white")
          .attr("font-size", `${fontSize}px`)
          .attr("font-weight", "500")
          .text(line);
      });
    });

    // Create zoom behavior with filter to only allow panning on empty space
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .filter((event) => {
        // Only allow panning/zooming if clicking on the background rect or SVG
        const target = event.target as Element;
        // Allow wheel events (zooming) always
        if (event.type === "wheel") return true;
        // For mouse events, only allow if target is the background rect or SVG
        return target.tagName === "rect" || target === svg.node();
      })
      .on("start", () => {
        background.style("cursor", "grabbing");
      })
      .on("zoom", (event) => {
        container.attr("transform", event.transform.toString());
      })
      .on("end", () => {
        background.style("cursor", "grab");
      });

    // Apply zoom to the SVG
    svg.call(zoom);
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

export { DecisionTree };
