import { Spinner } from "@/components/ui/spinner";
import { getCharges } from "@/lib/server-utils";
import { Suspense } from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
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
