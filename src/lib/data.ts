import { CiYoutube } from "react-icons/ci";
import { PiXLogo } from "react-icons/pi";
import { RxDiscordLogo, RxInstagramLogo } from "react-icons/rx";

export const routes = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Orders",
    path: "/orders",
  },
  {
    label: "Shop",
    path: "/products",
  },
];

export const socials = [
  {
    component: CiYoutube,
    path: "https://www.youtube.com/@gamingoceantcg",
  },
  {
    component: RxInstagramLogo,
    path: "https://www.instagram.com/gamingoceantcg/",
  },
  {
    component: PiXLogo,
    path: "https://x.com/GamingOceanTCG",
  },
  {
    component: RxDiscordLogo,
    path: "https://discord.gg/ZMJG4Hr2",
  },
];

export const gamingOceanInfo = {
  about:
    "Welcome aboard to your one stop location for TCG products! I hope we can be your place of choise when buying your favorite TCG products. At this time we will have Japanese Pokémon and One Piece TCG sets. More will be added as we continue to grow. We will also be looking into having English Pokémon sets and more. Thank you for stopping by! I also have a YouTube channel where I open TCG products.",
  email: "gamingoceantcg@gmail.com",
};
