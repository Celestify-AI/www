import type { Metadata } from "next";
import Flow from "../../../client/DecisionEngineClient";

export const metadata: Metadata = {
  title: "Celestify • Task",
  description: "Read a workflow briefing of a task in Celestify.",
};

export default function Task() {
  return (
    <div className="w-screen h-screen">
      <Flow />
    </div>
  );
}
