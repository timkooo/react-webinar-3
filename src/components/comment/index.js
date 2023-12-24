import {memo, useEffect, useCallback, useRef, Fragment} from 'react';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import CommentForm from '../comment-form';
import './style.css';
import humanizeDate from '../../utils/humanize-date';

function Comment({comment, active, onSetActive, authStatus, margin, isCurrentUser, children}) {
  const myRef = useRef(null);
  const cn = bem('Comment');

  const executeScroll = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior:'smooth', block:'center'});
    }}

  const callbacks = {
    cancelActive: useCallback(() => onSetActive(null), []),
    setActiveComment: useCallback(() => onSetActive(comment._id), []),
  }

  useEffect(() => {
    executeScroll();
  }, [active])

  return (<>
    <div className={cn()} style={{marginLeft: margin + 'px'}}>
      <div className={cn('head')}>
        <p className={cn('author')} style={{color: isCurrentUser ? '#666666' : 'inherit'}}>{comment.author.profile.name}</p>
        <p className={cn('date')}>{humanizeDate(comment.dateCreate)}</p>
      </div>
      <p className={cn('text')}>{comment.text}</p>
      <button className={cn('button')} onClick={callbacks.setActiveComment}>Ответить</button>
    </div>
    { children || ''}
    {active && <div ref={myRef}><CommentForm onCancelActive={callbacks.cancelActive} comment={comment} authStatus={authStatus} margin={margin} active={active}/></div>}
  </>);
}

export default memo(Comment);
