import React from 'react';
import homeStyles from '@site/src/css/home.module.scss';

export default () => (
	<section className={homeStyles.section}>
		<div className={homeStyles.sectionInner}>
			<span className={homeStyles.sectionLabel}>O projektu</span>
			<div className={homeStyles.aboutGrid}>
				<div className={homeStyles.aboutPanel}>
					<h3>Původní záměr projektu</h3>
					<ul>
						<li>Poskytnout ucelené materiály týkající se vývoje her se zaměřením na uměleckou a low-code technickou stránku - žádné enginy, žádná zdlouhavá instalace - stačí jen nainstalovat NodeJS, stáhnout příkládky a prohlédnout si kód, jak se co dělá.</li>
						<li>Vzdělávat lidi napříč všemi věkovými kategorii i technickým backgroundem v oblasti herního vývoje.</li>
						<li>Sdílet studentské práce z kurzů spojených s APHGames.</li>
					</ul>
				</div>
				<div className={homeStyles.aboutPanel}>
					<h3>Jak vznikl APHGames?</h3>
					<p>APHGames původně vznikl jako samostatný předmět na Fakultě informačních technologií ČVUT pod kódem APH (Architektura Počítačových Her). Původně se jednalo o čistě technický předmět, který se zaměřoval na architekturu herních enginů s praktickými ukázkami v C++. Postupem času se jeho záběr rozšířil do oblasti designu, umění, storytellingu, a mnohých dalších. Místo C++ se začal využívat TypeScript pro snadnou demonstraci ukázkových příkladů přímo na webu.</p>
				</div>
			</div>
		</div>
	</section>
);
