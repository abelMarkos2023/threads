import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
import { Inter } from "next/font/google"
import "../globals.css"

// Define metadata for the application
export const metadata = {
    title: "Threads",
    description: "A Next.js 14 meta Thread Application"
}

const inter = Inter({subsets:["latin"]})
export default function RootLayout({children} : {children: React.ReactNode}){

    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}