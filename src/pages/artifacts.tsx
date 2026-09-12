import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import layoutStyles from '@site/src/css/layout.module.scss';
import artifactsStyles from '@site/src/css/artifacts.module.scss';
import artifacts from '../../static/tiscali.json';

const PAGE_SIZE = 100;

type ArtifactEntry = {
	text: string;
	link: string;
};

type ArtifactsTree = Record<string, Record<string, Record<string, ArtifactEntry[]>>>;

type ArtifactItem = {
	year: string;
	month: string;
	day: string;
	date: string;
	text: string;
	link: string;
};

const comparer = (a: string, b: string) => parseInt(b, 10) - parseInt(a, 10);

const flattenArtifacts = (data: ArtifactsTree): ArtifactItem[] => {
	const items: ArtifactItem[] = [];

	Object.keys(data).sort(comparer).forEach((year) => {
		const yearData = data[year];
		Object.keys(yearData).sort(comparer).forEach((month) => {
			const monthData = yearData[month];
			Object.keys(monthData).sort(comparer).forEach((day) => {
				monthData[day].forEach((entry) => {
					items.push({
						year,
						month,
						day,
						date: `${day}.${month}. ${year}`,
						text: entry.text,
						link: entry.link.trim(),
					});
				});
			});
		});
	});

	return items;
};

const groupPageItemsByYear = (pageItems: ArtifactItem[]) => {
	const groups: { year: string; items: ArtifactItem[] }[] = [];

	pageItems.forEach((item) => {
		const last = groups[groups.length - 1];
		if (last?.year === item.year) {
			last.items.push(item);
		} else {
			groups.push({ year: item.year, items: [item] });
		}
	});

	return groups;
};

const ArtifactsList = ({ items }: { items: ArtifactItem[] }) => {
	const yearGroups = groupPageItemsByYear(items);

	return (
		<>
			{yearGroups.map(({ year, items: yearItems }) => (
				<section
					key={`year_${year}`}
					className={clsx(layoutStyles.section, artifactsStyles.yearSection)}
				>
					<div className={layoutStyles.sectionInner}>
						<h2 className={layoutStyles.sectionHeading}>{year}</h2>
						<div className={artifactsStyles.list}>
							{yearItems.map((item) => (
								<a
									key={`${item.link}_${item.date}`}
									className={artifactsStyles.item}
									href={item.link}
								>
									<div className={artifactsStyles.date}>{item.date}</div>
									<div className={artifactsStyles.text}>{item.text}</div>
								</a>
							))}
						</div>
					</div>
				</section>
			))}
		</>
	);
};

const ArtifactsPage = () => {
	const { siteConfig } = useDocusaurusContext();
	const allItems = useMemo(() => flattenArtifacts(artifacts as ArtifactsTree), []);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);

	const filteredItems = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (!query) {
			return allItems;
		}

		return allItems.filter(
			(item) => item.text.toLowerCase().includes(query) || item.date.includes(query),
		);
	}, [allItems, search]);

	const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);

	const pageItems = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filteredItems.slice(start, start + PAGE_SIZE);
	}, [filteredItems, currentPage]);

	useEffect(() => {
		setPage(1);
	}, [search]);

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	const pageStart = filteredItems.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
	const pageEnd = Math.min(currentPage * PAGE_SIZE, filteredItems.length);
	const isSearching = search.trim().length > 0;

	return (
		<Layout description={siteConfig.customFields?.description as string} title="Artefakty">
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>
			<div className={layoutStyles.page}>
				<section className={clsx(layoutStyles.section, artifactsStyles.introSection)}>
					<div className={layoutStyles.sectionInner}>
						<span className={layoutStyles.sectionLabel}>Archiv</span>
						<h1 className={layoutStyles.sectionHeading}>Artefakty</h1>
						<div className={layoutStyles.aboutGrid} data-stack="true">
							<div className={layoutStyles.aboutPanel}>
								<p className={artifactsStyles.introText}>
									Zde se nachází seznam článků z&nbsp;
									<a href="https://games.tiscali.cz">games.tiscali</a>
									. Je možno z nich vyčíst průřez celou herní historií od roku 2000 včetně české subkultury.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className={clsx(layoutStyles.section, artifactsStyles.toolbar)}>
					<div className={layoutStyles.sectionInner}>
						<div className={artifactsStyles.toolbarInner}>
							<input
								type="search"
								className={artifactsStyles.search}
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Hledat v názvech a datech…"
								aria-label="Hledat články"
							/>
							<p className={artifactsStyles.stats}>
								{isSearching
									? `Nalezeno ${filteredItems.length} z ${allItems.length} článků`
									: `${allItems.length} článků celkem`}
							</p>
						</div>
					</div>
				</section>

				{pageItems.length > 0 ? (
					<ArtifactsList items={pageItems} />
				) : (
					<section className={clsx(layoutStyles.section, artifactsStyles.empty)}>
						<div className={layoutStyles.sectionInner}>
							<p>Žádné články neodpovídají hledanému výrazu.</p>
						</div>
					</section>
				)}

				{filteredItems.length > PAGE_SIZE && (
					<section className={clsx(layoutStyles.section, artifactsStyles.pagination)}>
						<div className={layoutStyles.sectionInner}>
							<div className={artifactsStyles.paginationInner}>
								<button
									type="button"
									className={artifactsStyles.pageButton}
									onClick={() => setPage((value) => Math.max(1, value - 1))}
									disabled={currentPage === 1}
								>
									Předchozí
								</button>
								<span className={artifactsStyles.pageInfo}>
									{`Strana ${currentPage} z ${totalPages} (${pageStart}–${pageEnd})`}
								</span>
								<button
									type="button"
									className={artifactsStyles.pageButton}
									onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
									disabled={currentPage === totalPages}
								>
									Další
								</button>
							</div>
						</div>
					</section>
				)}
			</div>
		</Layout>
	);
};

export default ArtifactsPage;
