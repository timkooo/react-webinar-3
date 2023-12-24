import {memo, useState, useCallback, Fragment} from 'react';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import {useDispatch, useSelector} from 'react-redux';
import articleActions from '../../store-redux/article/actions';
import Comment from '../comment';
import ArticleCommentsForm from '../article-comments-form';
import { useLocation, Link } from 'react-router-dom';
import countComments from '../../utils/count-comments';
import './style.css';


function Comments({comments, commentsCount, article, authStatus, currentUser}) {
  const [activeComment, setActiveComment] = useState(null);
  const location = useLocation();

  const cn = bem('Comments');

  const isCurrentUser = (authorId) => {
    if (!currentUser) {
      return false;
    }
    return authorId === currentUser._id;
  }

  const createComment = (comment, margin = 0) => {
    if (!comment.children) {
      return (<Fragment key={comment._id}>
      <Comment key={comment._id} comment={comment}
                       active={comment._id === activeComment ? true : false}
                       onSetActive={setActiveComment}
                       authStatus={authStatus}
                       margin={margin}
                       isCurrentUser={isCurrentUser(comment.author._id)}/></Fragment>);
    } else {
      const newMargin = margin < 210 ? margin + 30 : margin;
      return (<Fragment key={comment._id}>
        <Comment key={comment._id} comment={comment}
                  active={comment._id === activeComment ? true : false}
                  onSetActive={setActiveComment}
                  authStatus={authStatus}
                  margin={margin}
                  isCurrentUser={isCurrentUser(comment.author._id)}>
          {comment.children.map((childComment) => createComment(childComment, newMargin))}
        </Comment>
      </Fragment>)
    }
  }

  const createCommentsList = () => comments.map((comment) => createComment(comment));

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии&nbsp;({commentsCount || 0})</h2>
      {comments && <div className={cn('list')}>{createCommentsList()}</div>}
      {!activeComment && <ArticleCommentsForm article={article} authStatus={authStatus}/>}
    </div>)
}

export default memo(Comments);
