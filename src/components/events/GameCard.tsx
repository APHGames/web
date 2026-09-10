import React from 'react';
import layoutStyles from '@site/src/css/layout.module.scss';
import eventStyles from '@site/src/css/events.module.scss';
import { ArchiveGame } from '@site/src/internals/events/types';

const GameCard = ({
	game,
	basePath,
}: {
	game: ArchiveGame;
	basePath: string;
}) => (
	<div className={layoutStyles.aboutPanel}>
		<div className={eventStyles.gameCard}>
			<img className={eventStyles.gameShot} src={`${basePath}/${game.image}`} alt={game.team} />
			<div>
				<div className={eventStyles.gameMeta}>
					<h3>{game.team}</h3>
					<span className={eventStyles.gamePlace}>{game.place}</span>
					<span className={eventStyles.gameAuthor}>{game.author}</span>
				</div>
				<p>{game.desc}</p>
			</div>
		</div>
	</div>
);

export default GameCard;
