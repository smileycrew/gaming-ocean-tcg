import { gamingOceanInfo } from "@/lib/data";

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5">
      <h1 className="text-4xl">About Gaming Ocean TCG</h1>

      <p className="w-2/3 self-center text-center">{gamingOceanInfo.about}</p>
      <p>
        Contact us at: <strong>{gamingOceanInfo.email}</strong>
      </p>
    </main>
  );
}
