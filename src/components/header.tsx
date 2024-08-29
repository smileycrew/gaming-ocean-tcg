"use client";

import Image from "next/image";
import Link from "next/link";
import gamingOcean from "../../public/gamingOcean.png";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/data";
import { IoCartOutline } from "react-icons/io5";
import { useCartContext } from "@/lib/hooks";
import { Spinner } from "./ui/spinner";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { isGettingCartItems, numberOfCartItems } = useCartContext();
  const pathName = usePathname();
  const session = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (session.data?.user === null) {
      console.log("USER IS NULL");
      setIsLoggedIn(false);
    } else {
      console.log("USER IS NOT NULL");
      setIsLoggedIn(true);
    }
  }, [session]);

  const isAuthRoute =
    pathName === "/login" || pathName === "/register" || pathName !== "/";

  return (
    <header>
      {!isAuthRoute && (
        <Image
          alt=""
          className="h-[350px] w-full object-cover"
          height={1100}
          priority
          src={gamingOcean}
          width={1100}
        />
      )}
      <nav className="flex justify-center bg-[#3c096c]">
        <ul className="flex items-center gap-10 p-3 text-center text-white">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}

          {isLoggedIn && (
            <li>
              <Link href="/account">Account</Link>
            </li>
          )}

          {!isLoggedIn && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>

              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}

          <li className="relative flex gap-1">
            {isGettingCartItems ? (
              <Spinner />
            ) : (
              <>
                <Link href="/cart">
                  <IoCartOutline />
                </Link>
                <small className="absolute -top-2 left-5">
                  {numberOfCartItems}
                </small>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
