/* eslint-disable react/prop-types */

import { PlatformLogo } from "@repo/ui";

interface DecisionEngineNodeProps {
  data: {
    heading: string;
    body: string;
    sources: string[];
    scale?: number;
  };
}

const DecisionEngineNode: React.FC<DecisionEngineNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        transform: `scale(${data.scale ?? 1})`,
        transformOrigin: "center",
      }}
      className="bg-(--background) border-2 border-(--border) px-4 pt-3 pb-4 rounded-lg max-w-64 flex flex-col gap-4 shadow-md/50"
    >
      <h2 className="font-headline text-2xl leading-tight">{data.heading}</h2>
      <p className="text-sm font-slab">{data.body}</p>
      <div className="flex flex-col gap-2">
        <h3 className="font-mono text-(--muted) text-xs">Sources</h3>
        <div className="flex flex-wrap gap-2">
          {data.sources.map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-12 h-12 bg-(--background) border-2 border-(--border) rounded-md shrink-0"
            >
              <PlatformLogo platform={source} className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DecisionEngineNode };
