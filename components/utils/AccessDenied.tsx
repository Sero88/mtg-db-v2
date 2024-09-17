"use client";
import { signIn } from "next-auth/react";
import styles from "@/styles/accessDenied.module.scss";
import Image from "next/image";

export function AccessDenied() {
	return (
		<div className={`${styles.deniedWrapper}`}>
			<div className={styles.accessDeniedComponent}>
				<div className={styles.deniedCard}>
					<Image
						src="/images/ltr-38-you-cannot-pass.jpg"
						width={300}
						height={418}
						alt=""
						unoptimized={true}
					/>
				</div>
				<p>You must be logged in to access this site.</p>
				<button onClick={() => signIn()}>Sign In</button>
			</div>
		</div>
	);
}
