"use client";
import { Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

type ProviderProps = {
	session: Session | null;
	children: ReactNode;
};
export function Providers({ session, children }: ProviderProps) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	);
}
