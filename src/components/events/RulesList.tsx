import React from 'react';
import layoutStyles from '@site/src/css/layout.module.scss';
import { RuleSection } from '@site/src/internals/events/types';

const RulesList = ({ sections }: { sections: RuleSection[] }) => (
	<div className={layoutStyles.aboutGrid} data-stack="true">
		<div className={layoutStyles.aboutPanel}>
			{sections.map((section) => (
				<React.Fragment key={section.title}>
					<h3>{section.title}</h3>
					<ul>
						{section.items.map((item) => (
							<li key={item.html}>
								<span dangerouslySetInnerHTML={{ __html: item.html }} />
								{item.children && (
									<ul>
										{item.children.map((child) => (
											<li key={child}>{child}</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</React.Fragment>
			))}
		</div>
	</div>
);

export default RulesList;
