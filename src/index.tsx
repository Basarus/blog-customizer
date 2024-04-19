import { createRoot } from 'react-dom/client';
import {
	StrictMode,
	CSSProperties,
	useState,
	useContext,
	createContext,
} from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import { defaultArticleState, OptionType } from 'src/constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export interface IAppContext {
	FontFamily: OptionType;
	FontSize: OptionType;
	FontColor: OptionType;
	BackgroundColor: OptionType;
	ContentWidth: OptionType;
}

export const AppContext = createContext({} as IAppContext);

const App = () => {
	const [seed, setSeed] = useState(1);

	const appContext = useContext(AppContext);

	function acceptState() {
		setSeed(Math.random());
	}

	appContext.FontFamily =
		appContext.FontFamily ?? defaultArticleState.fontFamilyOption;
	appContext.FontSize =
		appContext.FontSize ?? defaultArticleState.fontSizeOption;
	appContext.FontColor = appContext.FontColor ?? defaultArticleState.fontColor;
	appContext.ContentWidth =
		appContext.ContentWidth ?? defaultArticleState.contentWidth;
	appContext.BackgroundColor =
		appContext.BackgroundColor ?? defaultArticleState.backgroundColor;

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appContext.FontFamily.value,
					'--font-size': appContext.FontSize.value,
					'--font-color': appContext.FontColor.value,
					'--container-width': appContext.ContentWidth.value,
					'--bg-color': appContext.BackgroundColor.value,
				} as CSSProperties
			}>
			<AppContext.Provider value={appContext}>
				<ArticleParamsForm key={seed} acceptState={acceptState} />
			</AppContext.Provider>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
