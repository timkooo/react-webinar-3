import {memo, useCallback, useMemo, useState, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import Comments from '../../components/comments';
import useSelector from '../../hooks/use-selector';

function Article() {
  const store = useStore();
  const { lang } = useTranslate();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    comments: state.article.comments,
    commentsCount: state.article.commentsCount,
    waiting: state.article.waiting
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const authStatus = useSelector(state => state.session.exists);
  const currentUser = useSelector(state => state.session.user);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.waiting}>
        <Comments comments={select.comments} commentsCount={select.commentsCount} article={select.article} authStatus={authStatus} currentUser={currentUser}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
