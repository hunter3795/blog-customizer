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
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type props = {
	currentState: ArticleStateType;
	onUpdate(state: ArticleStateType): void;
};

export const ArticleParamsForm = ({ currentState, onUpdate }: props) => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: open,
		rootRef: containerRef,
		onChange: setOpen,
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

	if (!open) {
		return (
			<>
				<ArrowButton isOpen={false} onClick={() => setOpen(true)} />
				<aside ref={containerRef} className={styles.container}>
					<form className={styles.form}>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</>
		);
	}
	return (
		<>
			<ArrowButton isOpen={true} onClick={() => setOpen(false)} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, open && styles.container_open)}>
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
