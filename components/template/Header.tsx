"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/header.module.scss";
import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function Header() {
	const pathName = usePathname();
	const isHome = pathName == "/";
	return (
		<header className={styles.mainHeader}>
			<div className={`${styles.headerWrapper}`}>
				<div className={styles.siteLogoWrapper}>
					<Link href="/">
						<Image
							src="/images/logo.png"
							alt="Lovers&#39; Standard"
							width={140}
							height={68}
							unoptimized={true}
						/>
					</Link>
				</div>

				{!isHome && <Navigation />}
			</div>
		</header>
	);
}
