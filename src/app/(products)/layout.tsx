import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex  flex-col items-center justify-center gap-10">
      {children}
    </main>
  );
}
