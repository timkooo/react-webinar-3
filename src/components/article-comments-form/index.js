import {memo, useState, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import {useDispatch, useSelector} from 'react-redux';
import articleActions from '../../store-redux/article/actions';
import './style.css';
import { useLocation, Link } from 'react-router-dom';


function ArticleCommentsForm({article, authStatus}) {
  const location = useLocation();
  const dispatch = useDispatch();

  const cn = bem('CommentsForm');

  const callbacks = {
    handlePostComment: useCallback((evt) => {
      evt.preventDefault();
      const form = new FormData(evt.target);
      const { commentText } = Object.fromEntries(form);
      dispatch(articleActions.postComment({
        _id: "",
        text: commentText,
        parent: {
          _id: article._id,
          _type: article._type,
        }
      }));
    })
  }

  return authStatus ? (
    <form className={cn()} onSubmit={callbacks.handlePostComment}>
      <p className={cn('title')}>Новый комментарий</p>
      <textarea className={cn('text')} name="commentText" defaultValue='Коммент'/>
      <button className={cn('button')} type="submit">Отправить</button>
    </form>
  ) : (
    <p className={cn('no-auth')}><Link className={cn('link')} to='/login' state={{ back: location.pathname }}>Войдите</Link>, чтобы иметь возможность комментировать</p>
  );
}

export default memo(ArticleCommentsForm);
