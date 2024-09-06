import facebookIcon from "@/../public/facebookIcon.png";
import youtubeIcon from "@/../public/youtubeIcon.png";
import instagramIcon from "@/../public/instagramIcon.png";
import xIcon from "@/../public/xIcon.png";

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
    {
        label: "Login",
        path: "/login"
    },
    {
        label: "Register",
        path: "/register"
    },
    {
        label: "Account",
        path: "/account",
    },
    {
        label: "Admin",
        path: "/admin"
    }
] as const;

export const socials = [
    {
        alt: "youtube",
        icon: youtubeIcon,
        path: "https://www.youtube.com/@gamingoceantcg",
    },
    {
        alt: "instagram",
        icon: instagramIcon,
        path: "https://www.instagram.com/gamingoceantcg/",
    },
    {
        alt: "x",
        icon: xIcon,
        path: "https://x.com/GamingOceanTCG",
    },
    {
        alt: "facebook",
        icon: facebookIcon,
        path: "https://www.facebook.com/people/Gaming-Ocean-TCG/61561138517717/",
    },
] as const;

export const gamingOceanInfo = {
    about:
        "Welcome aboard to your one stop location for TCG products! I hope we can be your place of choise when buying your favorite TCG products. At this time we will have Japanese Pokémon and One Piece TCG sets. More will be added as we continue to grow. We will also be looking into having English Pokémon sets and more. Thank you for stopping by! I also have a YouTube channel where I open TCG products.",
    email: "gamingoceantcg@gmail.com",
} as const;
