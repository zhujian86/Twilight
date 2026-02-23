import type { Favicon } from "@/types/config.ts";


export const defaultFavicons: Favicon[] = [
    {
        src: "/favicon/icon-light.ico",
        theme: "light",
        sizes: "128x128",
    },
    {
        src: "/favicon/icon-dark.ico",
        theme: "dark",
        sizes: "128x128",
    },
];
