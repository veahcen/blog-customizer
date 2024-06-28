import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import clsx from 'clsx';
import { Text } from 'components/text';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClick } from './hook/outsideClick';

import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	resetStyles: () => void;
	applyStyles: (e: FormEvent) => void;
};

export const ArticleParamsForm = ({
	state,
	setState,
	resetStyles,
	applyStyles,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const handlerFontFamilyOption = (value: OptionType) => {
		setState({ ...state, fontFamilyOption: value });
	};

	const handlerFontColor = (value: OptionType) => {
		setState({ ...state, fontColor: value });
	};

	const handlerBackgroundColor = (value: OptionType) => {
		setState({ ...state, backgroundColor: value });
	};

	const handlerContentWidth = (value: OptionType) => {
		setState({ ...state, contentWidth: value });
	};

	const handlerFontSizeOption = (value: OptionType) => {
		setState({ ...state, fontSizeOption: value });
	};

	const handleArrowButtonClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const formRef = useRef<HTMLDivElement | null>(null);

	useOutsideClick({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onClose: handleArrowButtonClick,
	});

	return (
		<div ref={formRef}>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={applyStyles}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						onChange={handlerFontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='размер шрифта'
						onChange={handlerFontSizeOption}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='цвет шрифта'
						onChange={handlerFontColor}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='цвет фона'
						onChange={handlerBackgroundColor}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='ширина контента'
						onChange={handlerContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetStyles} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
