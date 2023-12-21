import {memo, useState, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import {useDispatch, useSelector} from 'react-redux';
import articleActions from '../../store-redux/article/actions';
import { useLocation, Link } from 'react-router-dom';
import './style.css';


function CommentForm({onCancelActive, comment, authStatus}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const cn = bem('CommentForm');

  const callbacks = {
    handlePostComment: useCallback((evt) => {
      evt.preventDefault();
      const form = new FormData(evt.target);
      const { commentText } = Object.fromEntries(form);
      dispatch(articleActions.postComment({
        _id: "",
        text: commentText,
        parent: {
          _id: comment._id,
          _type: comment._type,
        }
      }));
      onCancelActive();
    })
  }

  return authStatus ? (
    <form className={cn()} onSubmit={(evt) => callbacks.handlePostComment(evt)}>
      <p className={cn('title')}>Новый ответ</p>
      <textarea className={cn('text')} name="commentText" defaultValue='Коммент'/>
      <div className={cn('controls')}>
        <button className={cn('submit')} type="submit">Отправить</button>
        <button className={cn('cancel')} type="button" onClick={onCancelActive}>Отмена</button>
      </div>
    </form>) : (
    <div className={cn('no-auth')}>
      <Link className={cn('link')} to='/login' state={{ back: location.pathname }}>Войдите</Link>, чтобы иметь возможность ответить.&nbsp;
      <button className={cn('close')} type="button" onClick={onCancelActive}>Отмена</button>
    </div>);
}

export default memo(CommentForm);
