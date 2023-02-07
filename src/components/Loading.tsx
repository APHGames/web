import React from 'react';
import clsx from 'clsx';
import spinnerStyles from '@site/src/css/spinner.module.scss';

export default function LoadingSpinner() {
	return (
		<div className={clsx(spinnerStyles.spinner)}>
			<div className={clsx(spinnerStyles.loading)} />
		</div>
	);
}
