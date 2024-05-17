import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useContext } from 'react';
import { FormOpenContext } from '../article-params-form/ArticleParamsForm';
import clsx from 'clsx';
/** Функция для обработки открытия/закрытия формы */

export const ArrowButton = () => {
	const { openForm, toggleOpenForm } = useContext(FormOpenContext);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				openForm
					? clsx([styles.container, styles.container_arrow_open])
					: styles.container
			}
			onClick={() => toggleOpenForm()}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					openForm ? clsx([styles.arrow, styles.arrow_open]) : styles.arrow
				}
			/>
		</div>
	);
};
