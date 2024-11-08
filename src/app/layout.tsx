import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

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
			<body className={`${polySans.variable} bg-white`}>
				<main className="font-polySans">{children}</main>
			</body>
		</html>
	);
}
