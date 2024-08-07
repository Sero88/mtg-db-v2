"use client";
import { useContext, useMemo } from "react";

import { CollectionVersionsContext } from "@/contexts/CollectionVersionsContext";
import { ReportData } from "@/types/reports";
import { getReportData } from "@/utils/reportsUtil";
import styles from "@/styles/reports.module.scss";
import { QuantityRarityTable } from "@/components/reports/QuantityRarityTable";
import { UpdatePrices } from "@/components/reports/UpdatePrices";

export default function SearchPage() {
	const versions = useContext(CollectionVersionsContext);

	const reportData: ReportData = useMemo(() => getReportData(versions), [versions]);

	return (
		<>
			<div className={styles.reports}>
				<h1>Collection Data Overview:</h1>

				<div className={styles.reportSection}>
					<h2>Quantity Data:</h2>
					<ul>
						<li>
							<span>Regular Cards:</span> {reportData.quantity.regular}
						</li>
						<li>
							<span>Foil Cards:</span> {reportData.quantity.foil}
						</li>
						<li>
							<span>Unique Cards:</span> {reportData.quantity.unique}
						</li>
						<li>
							<span>By Rarities:</span>{" "}
							<QuantityRarityTable reportData={reportData} />
						</li>

						<li>
							<span>Total Cards:</span> {reportData.quantity.total}
						</li>
						<li>
							<span>Sets:</span> {reportData.quantity.sets}
						</li>
					</ul>
				</div>

				<div className={styles.reportSection}>
					<h2>Price Data:</h2>
					<ul>
						<li>
							<span>Regular Cards:</span> ${reportData.prices.regular.toFixed(2)}
						</li>
						<li>
							<span>Foil Cards:</span> ${reportData.prices.foil.toFixed(2)}
						</li>
						<li>
							<span>Rares and Mythics only:</span> $
							{reportData.prices.rares.toFixed(2)}
						</li>
						<li>
							<span>Total Cards:</span> ${reportData.prices.total.toFixed(2)}
						</li>
					</ul>
				</div>
			</div>

			<div className={styles.reportSection}>
				<UpdatePrices updateCompleteCallback={() => console.log("updating time")} />
			</div>
		</>
	);
}
