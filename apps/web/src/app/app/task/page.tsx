import type { Metadata } from "next";
import Flow from "../../../client/DecisionEngineClient";
import { FloatingAction } from "@repo/ui";

export const metadata: Metadata = {
  title: "Celestify • Task",
  description: "Access the Celestify decision engine.",
};

export default function Task() {
  return (
    <div className="w-screen h-screen">
      <div className="fixed flex w-full bottom-10 items-center justify-center z-50">
        <FloatingAction
          primaryLabel="Dispatch Celestia"
          secondaryLabel="Manual Briefing"
          className="shadow-md/50"
        />
      </div>
      <Flow />
    </div>
  );
}
