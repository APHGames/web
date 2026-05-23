import clsx from 'clsx';
import DocusaurusHead from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import sectionStyles from '@site/src/css/section.module.scss';
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
					className={clsx(sectionStyles.section)}
				>
					<h3
						className={clsx(sectionStyles.section__title, artifactsStyles.artifacts__year, 'text--center')}
					>
						{year}
					</h3>
					<div className={artifactsStyles.artifacts__container}>
						{yearItems.map((item) => (
							<a key={`${item.link}_${item.date}`} href={item.link}>
								<div className={artifactsStyles.artifacts__item}>
									<div className={artifactsStyles.artifacts__date}>{item.date}</div>
									<div className={artifactsStyles.artifacts__link}>{item.text}</div>
								</div>
							</a>
						))}
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
		<Layout description={siteConfig.customFields.description as string} title="Artefakty">
			<DocusaurusHead>
				<link rel="canonical" href={siteConfig.url} />
			</DocusaurusHead>

			<section className={clsx(sectionStyles.section, artifactsStyles.artifacts__title)}>
				<h3>
					Zde se nachází seznam článků z&nbsp;
					<a href="https://games.tiscali.cz">games.tiscali</a>
					. Je možno z nich vyčíst průřez celou herní historií od roku 2000 včetně české subkultury.
				</h3>
			</section>

			<section className={clsx(sectionStyles.section, artifactsStyles.artifacts__toolbar)}>
				<div className={artifactsStyles.artifacts__toolbarInner}>
					<input
						type="search"
						className={artifactsStyles.artifacts__search}
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Hledat v názvech a datech…"
						aria-label="Hledat články"
					/>
					<p className={artifactsStyles.artifacts__stats}>
						{isSearching
							? `Nalezeno ${filteredItems.length} z ${allItems.length} článků`
							: `${allItems.length} článků celkem`}
					</p>
				</div>
			</section>

			{pageItems.length > 0 ? (
				<ArtifactsList items={pageItems} />
			) : (
				<section className={clsx(sectionStyles.section, artifactsStyles.artifacts__empty)}>
					<p>Žádné články neodpovídají hledanému výrazu.</p>
				</section>
			)}

			{filteredItems.length > PAGE_SIZE && (
				<section className={clsx(sectionStyles.section, artifactsStyles.artifacts__pagination)}>
					<div className={artifactsStyles.artifacts__paginationInner}>
						<button
							type="button"
							className={artifactsStyles.artifacts__pageButton}
							onClick={() => setPage((value) => Math.max(1, value - 1))}
							disabled={currentPage === 1}
						>
							Předchozí
						</button>
						<span className={artifactsStyles.artifacts__pageInfo}>
							Strana {currentPage} z {totalPages}
							{' '}
							({pageStart}–{pageEnd})
						</span>
						<button
							type="button"
							className={artifactsStyles.artifacts__pageButton}
							onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
							disabled={currentPage === totalPages}
						>
							Další
						</button>
					</div>
				</section>
			)}
		</Layout>
	);
};

export default ArtifactsPage;
