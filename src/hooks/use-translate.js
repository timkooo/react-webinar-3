import {useCallback, useContext} from 'react';
import {I18nContext} from '../i18n/context';
import useServices from './use-services';
import { useState, useMemo, useEffect } from 'react';
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18n = useServices().i18n;
  const api = useServices().api;

  const [state, setState] = useState(i18n.getLang());

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe(() => {
      const newState = i18n.getLang();
      api.setHeader('X-Lang', newState);
      console.log(api.defaultHeaders);
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useEffect(() => unsubscribe, [unsubscribe]);

  return {
    lang : state,
    // Функция для смены локали
    setLang : i18n.setLang(),
    // Функция для локализации текстов с замыканием на код языка
    t: i18n.t()
  }
}
