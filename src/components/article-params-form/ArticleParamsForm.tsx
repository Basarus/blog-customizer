import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { createContext, useState, useContext, useRef, useEffect } from 'react';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { AppContext, IAppContext } from 'src/index';
interface IOpenFormContext {
	openForm?: boolean;
	toggleOpenForm: (bool?: boolean) => void;
}

interface IArticleParamsProps {
	key?: number;
	acceptState: () => void;
}

export const FormOpenContext = createContext({} as IOpenFormContext);

export const ArticleParamsForm = ({ acceptState }: IArticleParamsProps) => {
	const [openForm, setOpenForm] = useState(false);
	const appContext = useContext(AppContext);
	const menuRef = useRef(null);

	function toggleOpenForm(bool?: boolean): void {
		if (bool !== undefined) setOpenForm(bool);
		else setOpenForm(!openForm);
	}

	const [fontFamily, setFontFamily] = useState(appContext.FontFamily);
	const [fontSize, setFontSize] = useState(appContext.FontSize);
	const [fontColor, setFontColor] = useState(appContext.FontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		appContext.BackgroundColor
	);
	const [contentWidth, setContentWidth] = useState(appContext.ContentWidth);

	function reloadState() {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		appContext.FontFamily = defaultArticleState.fontFamilyOption;
		appContext.FontSize = defaultArticleState.fontSizeOption;
		appContext.FontColor = defaultArticleState.fontColor;
		appContext.BackgroundColor = defaultArticleState.backgroundColor;
		appContext.ContentWidth = defaultArticleState.contentWidth;
		acceptState();
	}

	function toggleFontFamily(appContext: IAppContext, value: OptionType) {
		setFontFamily(value);
		appContext.FontFamily = value;
	}

	function toggleFontSize(appContext: IAppContext, value: OptionType) {
		setFontSize(value);
		appContext.FontSize = value;
	}

	function toggleFontColor(appContext: IAppContext, value: OptionType) {
		setFontColor(value);
		appContext.FontColor = value;
	}

	function toggleBackgroundColor(appContext: IAppContext, value: OptionType) {
		setBackgroundColor(value);
		appContext.BackgroundColor = value;
	}

	function toggleContentWidth(appContext: IAppContext, value: OptionType) {
		setContentWidth(value);
		appContext.ContentWidth = value;
	}

	function hasSomeParentTheElement(
		element: HTMLElement,
		targetElement: HTMLElement | null
	): boolean {
		if (!targetElement) return false;
		else {
			if (element === targetElement) return true;
			return (
				(element.parentElement &&
					hasSomeParentTheElement(element.parentElement, targetElement)) ??
				false
			);
		}
	}

	const handleOutsideClick = (event: MouseEvent) => {
		const element = event.target as HTMLElement;
		if (!hasSomeParentTheElement(element, menuRef.current))
			toggleOpenForm(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<div className={styles.form_container}>
			<FormOpenContext.Provider value={{ openForm, toggleOpenForm }}>
				<ArrowButton />
			</FormOpenContext.Provider>
			<aside className={openForm ? styles.container_open : styles.container}>
				<AppContext.Consumer>
					{(context) => (
						<form className={styles.form} ref={menuRef}>
							<Select
								selected={fontFamily}
								options={fontFamilyOptions}
								title='Шрифты'
								onChange={(selected) => toggleFontFamily(context, selected)}
							/>
							<RadioGroup
								name={'Размер шрифта'}
								title={'Размер шрифта'}
								options={fontSizeOptions}
								selected={fontSize}
								onChange={(selected) => toggleFontSize(context, selected)}
							/>
							<Select
								selected={fontColor}
								options={fontColors}
								title='Цвет шрифта'
								onChange={(selected) => toggleFontColor(context, selected)}
							/>
							<Separator />
							<Select
								selected={backgroundColor}
								options={backgroundColors}
								title='Цвет фона'
								onChange={(selected) =>
									toggleBackgroundColor(context, selected)
								}
							/>
							<Select
								selected={contentWidth}
								options={contentWidthArr}
								title='Ширина контента'
								onChange={(selected) => toggleContentWidth(context, selected)}
							/>
							<div className={styles.bottomContainer}>
								<Button title='Сбросить' type='reset' onClick={reloadState} />
								<Button title='Применить' type='submit' onClick={acceptState} />
							</div>
						</form>
					)}
				</AppContext.Consumer>
			</aside>
		</div>
	);
};
