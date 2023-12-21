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


function Comments({comments, article, authStatus}) {
  const [activeComment, setActiveComment] = useState(null);
  const location = useLocation();

  const cn = bem('Comments');

  const createComment = (comment, margin = 0) => {
    if (!comment.children) {
      return (<li key={comment._id} className={cn('item')}>
      <Comment key={comment._id} comment={comment}
                       active={comment._id === activeComment ? true : false}
                       onSetActive={setActiveComment}
                       authStatus={authStatus}
                       margin={margin}/></li>);
    } else {
      const newMargin = margin + 30;
      return (<Fragment key={comment._id}><li key={comment._id} className={cn('item')}>
        <Comment key={comment._id} comment={comment}
                  active={comment._id === activeComment ? true : false}
                  onSetActive={setActiveComment}
                  authStatus={authStatus}
                  margin={margin}/></li>
        {comment.children.map((childComment) => createComment(childComment, newMargin))}
      </Fragment>)
    }
  }

  const createCommentsList = () => comments.map((comment) => createComment(comment));

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии&nbsp;({countComments(comments) || 0})</h2>
      {comments && <ul className={cn('list')}>{createCommentsList()}</ul>}
      <ArticleCommentsForm article={article} authStatus={authStatus}/>
    </div>)
}

export default memo(Comments);
