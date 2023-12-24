import buildComments from '../../utils/build-comments';
import updateComments from '../../utils/update-comments';

export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'article/load-start'});

      try {
        const resData = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
        });
        const resComments = await services.api.request({
          url: `api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });
        const commentsCount = resComments.data.result.count;
        const articleComments = resComments.data.result.items.filter((item) => item.parent?._id === id);
        const userComments = resComments.data.result.items.filter((item) => item.parent?._id !== id);
        const comments = buildComments(articleComments, userComments);
        // Товар загружен успешно
        dispatch({type: 'article/load-success', payload: {data: resData.data.result, comments: comments, commentsCount: commentsCount}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'article/load-error'});
      }
    }
  },

  postComment: (comment) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'article/comment-post-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: 'POST',
          body: JSON.stringify(comment)
        });
        const oldComments = [...getState().article.comments];
        const newCommentsCount = getState().article.commentsCount + 1;
        let newComments;
        if (res.data.result.parent._type === 'article') {
          newComments = [...oldComments, res.data.result];
        };
        if (res.data.result.parent._type === 'comment') {
          newComments = updateComments(oldComments, res.data.result);
        }
        dispatch({type: 'article/comment-post-success', payload: { comments: newComments, commentsCount: newCommentsCount }});
      } catch (e) {
        dispatch({type: 'article/comment-post-error'});
      }
    }
  },
}
