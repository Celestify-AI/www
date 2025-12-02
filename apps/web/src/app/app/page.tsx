import type { Metadata } from "next";
import AppClient from "../../client/AppClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Your dashboard for Celestify.",
};

export default function AppHome() {
  return (
    <>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center font-mono">
            Loading...
          </div>
        }
      >
        <AppClient />
      </Suspense>
    </>
  );
}
