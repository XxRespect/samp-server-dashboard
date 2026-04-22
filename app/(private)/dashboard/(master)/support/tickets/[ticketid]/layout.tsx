import react from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ticket",
    description: "Layout for user pages",
}


export default function UserLayout({children}: {children: react.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}

