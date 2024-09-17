import "./globals.css";
import { Saira } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { Providers } from "./providers";
import { Header } from "@/components/template/Header";
import { AccessDenied } from "@/components/utils/AccessDenied";

const saira = Saira({ weight: ["200", "400"], subsets: ["latin"] });

export const metadata = {
	title: "Lovers' Standard",
	description: "MTG DB",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className={saira.className}>
				<main className="wrapper">
					{!session ? (
						<AccessDenied />
					) : (
						<Providers session={session}>
							<Header />
							<div>{children}</div>
						</Providers>
					)}
				</main>
			</body>
		</html>
	);
}
