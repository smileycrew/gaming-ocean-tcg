import { socials } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 p-5">
      <ul className="flex justify-center gap-3">
        {socials.map((social) => (
          <li key={social.path}>
            <Link href={social.path}>
              <Image
                alt={social.alt}
                className="h-[40px] w-[40px] transition hover:scale-110"
                src={social.icon}
              />
            </Link>
          </li>
        ))}
      </ul>

      <small className="opacity-50">&copy; GamingOceanTCG LLC</small>
    </footer>
  );
}
