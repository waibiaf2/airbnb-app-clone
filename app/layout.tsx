import './globals.css'
import type {Metadata} from 'next'
import {Nunito} from 'next/font/google';

import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/navbar/navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LogInModal from "@/app/components/modals/LogInModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata: Metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clones',
}

const font = Nunito({
    subsets: ["latin"],
});

export default async function RootLayout({ children }: {
    children: React.ReactNode
}) {
	const currentUser = await getCurrentUser();
	// console.log(currentUser);
    return (
        <html lang="en">
        <body className={font.className}>
			<ToasterProvider/>
			<LogInModal/>
            <RegisterModal/>
            <Navbar currentUser={currentUser}/>
       		{children}
        </body>
        </html>
    );
}

