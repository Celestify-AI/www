import type Metadata from "next";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Access your atomic tasks in the Celestify dashboard.",
};

export default function AppHome() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-4 items-center h-full w-5/6 max-w-lg"></div>
    </main>
  );
}
