import './globals.css'
import type { Metadata } from 'next'
import {Nunito} from 'next/font/google';
import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/navbar/navbar";
import Modal from "@/app/components/modals/modal";

export const metadata: Metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clones',
}

const font = Nunito({
    subsets: ["latin"],
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={font.className}>
        <ClientOnly>
            <Modal isOpen/>
            <Navbar/>
        </ClientOnly>
        {children}
        </body>
        </html>
    )
}

