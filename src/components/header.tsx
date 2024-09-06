import Link from "next/link";
import { routes } from "@/lib/data";
import Backdrop from "./backdrop";
import CartLink from "./cart-link";

export default function Header() {
    return (
        <header>
            <Backdrop />

            <nav className="flex justify-center bg-[#3c096c]">
                <ul className="flex items-center gap-10 p-3 text-center text-white">
                    {routes.map((route) => (
                        <li key={route.path}>
                            <Link href={route.path}>{route.label}</Link>
                        </li>
                    ))}

                    <CartLink />
                </ul>
            </nav>
        </header>
    );
}
