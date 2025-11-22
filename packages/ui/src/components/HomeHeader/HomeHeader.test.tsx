import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react";
import { HomeHeader } from "./HomeHeader";
import "@testing-library/jest-dom/vitest";

describe("HomeHeader", () => {
  it("renders the main headings", async () => {
    vi.useFakeTimers();
    await act(async () => {
      render(<HomeHeader userName="Kyle" />);
    });
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Hey, Kyle");
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent("Let's get started.");
  });
});
