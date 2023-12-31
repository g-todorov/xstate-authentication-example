"use client";

import { AppContext } from "@/contexts/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, send] = AppContext.useActor();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    if (state.matches("unauthenticated")) {
      router.push("/sign-in");
    } else if (state.matches("authenticated")) {
      setIsRedirecting(false);
    }
  }, [state.value]);

  if (isRedirecting) {
    return null;
  }

  return (
    <main>
      <h3>Dashboard:</h3>
      <button
        onClick={() => {
          send({ type: "SIGN_OUT" });
        }}
      >
        {state.matches("authenticated.signingOut") ? "...loading" : "sign out"}
      </button>
    </main>
  );
}
