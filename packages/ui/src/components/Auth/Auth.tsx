"use client";

import React from "react";
import { Button } from "../Button/Button";
import { useState, useEffect } from "react";

interface AuthProps {
  mode: "login" | "signup";
}

const Auth = ({ mode }: AuthProps) => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to get auth link");
        return res.json();
      })
      .then((data) => setAuthUrl(data.authorization_url))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center w-auto">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-lg font-semibold text-center">
          {mode === "login" ? "Sign into Google" : "Sign Up with Google"}
        </h1>
        <h2 className="font-mono text-sm text-(--muted) text-center">
          {mode === "login"
            ? "Sign in to Google to access Celestify"
            : "Sign up with Google to access Celestify"}
        </h2>
      </div>
      <Button
        disabled={!authUrl}
        onClick={() => {
          if (authUrl) {
            window.location.href = authUrl;
            console.log(authUrl);
          }
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 63 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M63 32.7273C63 30.4582 62.7955 28.2764 62.4156 26.1818H32.1429V38.5745H49.4416C48.6818 42.56 46.4026 45.9345 42.9838 48.2036V56.2618H53.4156C59.4935 50.6764 63 42.4727 63 32.7273Z"
            fill="#4285F4"
          />
          <path
            d="M32.1429 64C40.8214 64 48.0974 61.1491 53.4156 56.2618L42.9838 48.2036C40.1201 50.1236 36.4675 51.2873 32.1429 51.2873C23.7857 51.2873 16.6851 45.6727 14.1429 38.1091H3.44805V46.3709C8.73701 56.8145 19.5779 64 32.1429 64Z"
            fill="#34A853"
          />
          <path
            d="M14.1429 38.08C13.5 36.16 13.1201 34.1236 13.1201 32C13.1201 29.8764 13.5 27.84 14.1429 25.92V17.6582H3.44805C1.25649 21.9636 0 26.8218 0 32C0 37.1782 1.25649 42.0364 3.44805 46.3418L11.776 39.8836L14.1429 38.08Z"
            fill="#FBBC05"
          />
          <path
            d="M32.1429 12.7418C36.8766 12.7418 41.0844 14.3709 44.4448 17.5127L53.6494 8.34909C48.0682 3.17091 40.8214 0 32.1429 0C19.5779 0 8.73701 7.18546 3.44805 17.6582L14.1429 25.92C16.6851 18.3564 23.7857 12.7418 32.1429 12.7418Z"
            fill="#EA4335"
          />
        </svg>
        {mode === "login" ? "Sign In with Google" : "Sign Up with Google"}
      </Button>
    </div>
  );
};

export { Auth };
