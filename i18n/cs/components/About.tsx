import clsx from 'clsx';
import React from 'react';
import sectionStyles from '@site/src/css/section.module.scss';
import contentStyles from '@site/src/css/content.module.scss';

export default () => (
	<section
		className={clsx(sectionStyles.section, sectionStyles.section)}
	>
		<div className={sectionStyles['section--inner']}>
			<div className={clsx(contentStyles.content__col2m, contentStyles.content__text)}>
				<div>
					<h3>Hlavní cíl</h3>
					<ul>
						<li>Poskytnout ucelené materiály týkající se vývoje her se zaměřením na uměleckou a low-code technickou stránku - žádné enginy, žádná zdlouhavá instalace - stačí jen nainstalovat NodeJS, stáhnout příkládky a prohlédnout si kód, jak se co dělá.</li>
						<li>Vzdělávat lidi napříč všemi věkovými kategorii i technickým backgroundem v oblasti herního vývoje.</li>
						<li>Sdílet studentské práce z kurzů spojených s APHGames.</li>
					</ul>
				</div>
				<div>
					<h3>Jak vznikl APHGames?</h3>
					<p>APHGames původně vznikl jako samostatný předmět na Fakultě informačních technologií ČVUT pod kódem APH (Architektura Počítačových Her). Původně se jednalo o čistě technický předmět, který se zaměřoval na architekturu herních enginů s praktickými ukázkami v C++. Postupem času se jeho záběr rozšířil do oblasti designu, umění, storytellingu, a mnohých dalších. Místo C++ se začal využívat TypeScript pro snadnou demonstraci ukázkových příkladů přímo na webu.</p>
					<p>Dnes je APHGames separátní brand s vlastní platformou a Youtube kanálem, jehož cílem je sdílet zajímavé poznatky ze všech různých koutů herního průmyslu.</p>
				</div>
			</div>
		</div>
	</section>
);
