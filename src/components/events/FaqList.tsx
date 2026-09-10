import React from 'react';
import layoutStyles from '@site/src/css/layout.module.scss';
import { FaqItem } from '@site/src/internals/events/types';

const FaqList = ({ items }: { items: FaqItem[] }) => (
	<div className={layoutStyles.aboutGrid} data-stack="true">
		{items.map((item) => (
			<div className={layoutStyles.aboutPanel} key={item.question}>
				<h4>{item.question}</h4>
				<p>{item.answer}</p>
			</div>
		))}
	</div>
);

export default FaqList;
