import react from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Support",
    description: "Layout for user pages",
}


export default function SupportLayout({children}: {children: react.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}

