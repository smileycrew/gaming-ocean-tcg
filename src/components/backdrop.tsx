"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import gamingOcean from "../../public/gamingOcean.png";

export default function Backdrop() {
  const pathName = usePathname();

  const isAuthRoute =
    pathName === "/login" || pathName === "/register" || pathName !== "/";
  return (
    <>
      {!isAuthRoute && (
        <Image
          alt="gaming-ocean-tcg-backdrop"
          className="h-[350px] w-full object-cover"
          height={1100}
          priority
          src={gamingOcean}
          width={1100}
        />
      )}
    </>
  );
}
