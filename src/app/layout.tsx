import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import StateProvider from "@/state/StateProvider";

export const metadata: Metadata = {
	title: "Checkout Xperience",
	description: "Checkout Xperience with multiple payment options",
};

const polySans = localFont({
	src: "./font/PolySans-Slim.ttf",
	variable: "--poly-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${polySans.variable} bg-slate-50`}>
				<StateProvider>
					<main className="font-polySans">{children}</main>
				</StateProvider>
				<Script
					src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_SITE_KEY}`}
				/>
			</body>
		</html>
	);
}
