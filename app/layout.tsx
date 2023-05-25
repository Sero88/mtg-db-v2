import "./globals.css";
import { Saira } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Providers } from "./providers";

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
				<Providers session={session}>
					<main>
						<div className="wrapper">{children}</div>
					</main>
				</Providers>
			</body>
		</html>
	);
}
