import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner size={48} />
          </div>
        }
      >
        {children}
      </Suspense>
    </main>
  );
}
