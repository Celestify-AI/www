import type { Metadata } from "next";
import { KnowledgeGraph } from "@repo/ui/knowledge-graph";
import { DecisionTree } from "@repo/ui/decision-tree";

export const metadata: Metadata = {
  title: "Celestify • Task",
  description: "Read a workflow briefing of a task in Celestify.",
};

export default function Task() {
  return (
    <main className="min-h-screen w-full flex justify-center px-8">
      <div className="flex flex-col gap-16 items-center h-full w-full max-w-lg pt-16 pb-16">
        <h1 className="font-headline text-5xl">{`Celestify Marketing Strategies`}</h1>
        <div className="flex flex-col gap-8 w-full">
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-mono text-(--muted)">Knowledge Graph</h2>
            <KnowledgeGraph />
          </div>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-mono text-(--muted)">Decision Tree</h2>
            <DecisionTree />
          </div>
        </div>
      </div>
    </main>
  );
}
