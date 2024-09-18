import { withAuth } from "next-auth/middleware";

//@ts-ignore this is correct according to documentation
export default withAuth({
	callbacks: {
		authorized: ({ token }) => {
			if (token) return true;
		},
	},
});

export const config = {
	matcher: ["/api/:path*"],
};
