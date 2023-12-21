// Начальное состояние
export const initialState = {
  data: {},
  waiting: false,
  comments: []
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return {...state, data: {}, comments: [], waiting: true};

    case "article/load-success":
      return {...state, data: action.payload.data, comments: action.payload.comments, waiting: false};

    case "article/load-error":
      return {...state, data: {}, comments: [], waiting: false}; //@todo текст ошибки сохранять?

    case "article/comment-post-start":
      return {...state, waiting: true};

    case "article/comment-post-success":
      return {...state, comments: action.payload.comments, waiting: false};

    case "article/comment-post-error":
      return {...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
