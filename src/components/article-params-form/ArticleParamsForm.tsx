import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import { useClose } from 'src/hooks/useClose';

type Props = {
	currentState: ArticleStateType;
	onUpdate(state: ArticleStateType): void;
};

export const ArticleParamsForm = ({ currentState, onUpdate }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: containerRef,
	});

	const [selectArticleState, setSelectArticleState] = useState(currentState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState((state) => ({ ...state, [key]: value }));
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onUpdate(selectArticleState);
	};

	const handleClear = () => {
		setSelectArticleState(defaultArticleState);
		onUpdate(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title='Шрифт'
						selected={selectArticleState.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title={'Размер шрифта'}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectArticleState.fontColor}
						onChange={(option) => handleChange('fontColor', option)}
						options={fontColors}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectArticleState.backgroundColor}
						onChange={(option) => handleChange('backgroundColor', option)}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						selected={selectArticleState.contentWidth}
						onChange={(option) => handleChange('contentWidth', option)}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleClear}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
