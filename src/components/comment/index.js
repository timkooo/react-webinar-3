import {memo, useState, useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import CommentForm from '../comment-form';
import './style.css';
import humanizeDate from '../../utils/humanize-date';


function Comment({comment, active, onSetActive, authStatus, margin}) {

  const cn = bem('Comment');

  const callbacks = {
    cancelActive: useCallback(() => onSetActive(null), []),
    setActiveComment: useCallback(() => onSetActive(comment._id), []),
  }

  return (
    <div className={cn()} style={{marginLeft: margin + 'px'}}>
      <div className={cn('head')}>
        <p className={cn('author')}>{comment.author._id}</p>
        <p className={cn('date')}>{humanizeDate(comment.dateCreate)}</p>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      {active ? <CommentForm onCancelActive={callbacks.cancelActive} comment={comment} authStatus={authStatus}/> : <button className={cn('button')} onClick={callbacks.setActiveComment}>Ответить</button>}
    </div>
  );
}

export default memo(Comment);
