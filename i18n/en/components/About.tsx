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
					<h3>The main goal</h3>
					<ul>
						<li>To provide materials about game development, with a strong focus on art and low-code approach - no engines, no cumbersome installation, just download NodeJS and the examples and look through the code to figure out how things are done.</li>
						<li>To educate people across all backgrounds in the scope of game development.</li>
						<li>To share student projects from courses held by APHGames.</li>
					</ul>
				</div>
				<div>
					<h3>The story of APHGames</h3>
					<p>Originally, APHGames was a course at FIT CTU in Prague. It was a solely technical course, focusing on the architecture of game engines with practical examples in the C++ language. Over time, its scope has expanded into design, art, storytelling, and many others. C++ was replaced by TypeScript for the sake of simpler showcasing directly on the web.</p>
					<p>Today, APHGames is a separate brand with its own platform. Its goal is to share interesting insights from all fields of the game industry.</p>
				</div>
			</div>
		</div>
	</section>
);
