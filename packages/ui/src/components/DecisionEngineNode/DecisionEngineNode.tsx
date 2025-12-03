/* eslint-disable react/prop-types */

interface DecisionEngineNodeProps {
  data: {
    heading: string;
    body: string;
  };
}

const DecisionEngineNode: React.FC<DecisionEngineNodeProps> = ({ data }) => {
  return (
    <div className="bg-(--background) border-2 border-(--border) px-4 pt-3 pb-4 rounded-lg max-w-64 flex flex-col gap-1 shadow-md/50">
      <h1 className="font-headline text-xl">{data.heading}</h1>
      <p className="text-xs font-slab">{data.body}</p>
    </div>
  );
};

export { DecisionEngineNode };
