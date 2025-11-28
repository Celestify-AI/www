import type { Metadata } from "next";
import { Suspense } from "react";
import AppClient from "../../client/AppClient";

export const metadata: Metadata = {
  title: "Celestify • App",
  description: "Your dashboard for Celestify.",
};

export default function AppHome() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center font-mono w-screen h-screen">
            Loading...
          </div>
        }
      >
        <AppClient />
      </Suspense>
    </>
  );
}
