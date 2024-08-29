import { socials } from "@/lib/data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 p-5">
      <ul className="flex justify-center gap-3">
        {socials.map((social) => (
          <li key={social.path}>
            <Link href={social.path}>
              <social.component />
            </Link>
          </li>
        ))}
      </ul>

      <small className="opacity-50">&copy; GamingOceanTCG LLC</small>
    </footer>
  );
}
