import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article';
import { ArticleParamsForm } from 'src/components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from '../styles/index.module.scss';
export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState(defaultArticleState);
	const handleState = (newState: ArticleStateType) => {
		setCurrentArticleState(newState);
	};
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentState={currentArticleState}
				onUpdate={handleState}
			/>
			<Article />
		</main>
	);
};
