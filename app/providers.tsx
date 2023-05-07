"use client";
import { Session } from "next-auth";
import { SessionProvider, signIn } from "next-auth/react";
import { ReactNode } from "react";

type ProviderProps = {
	session: Session | null;
	children: ReactNode;
};
export function Providers({ session, children }: ProviderProps) {
	if (!session) {
		return <button onClick={() => signIn()}>Sign In</button>;
	}

	return <SessionProvider session={session}>{children}</SessionProvider>;
}
