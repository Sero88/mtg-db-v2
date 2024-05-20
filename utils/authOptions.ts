import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
	//@ts-ignore
	database: process.env.DATABASE_URL,
	secret: process.env.SECRET,
	callbacks: {
		async signIn({ user }) {
			const allowedEmails = JSON.parse(process.env.ALLOWED_EMAILS as string);

			const canView = allowedEmails.includes(user.email) ? true : false;

			return canView;
		},
	},
};
