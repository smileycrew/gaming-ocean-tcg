import Image from "next/image"
import Link from "next/link"
import gamingOcean from "../../public/gamingOcean.png"

const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Shop",
    path: "/shop",
  },
  {
    label: "Youtube",
    path: "/www.youtube.com/@gamingoceantcg",
  },
]

export default function Header() {
  return (
    <header>
      <Image
        alt=""
        className="object-cover h-[350px] w-full"
        height={350}
        src={gamingOcean}
      />
      <nav className="bg-[#3c096c] border-b flex items-center h-[50px] justify-center text-white">
        <ul className="flex items-center justify-center gap-10">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

// 023E8A
// FFC300
//
