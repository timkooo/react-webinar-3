export default function updateComments(comments, newComment) {
  const newComments = comments.map((comment) => {
    if (comment._id === newComment.parent._id) {
      if (!comment.children) {
        comment.children = [];
      }
      comment.children.push(newComment);
      return comment;
    };
    if (comment.children) {
      comment.children = updateComments([...comment.children], newComment);
      return comment;
    }
    return comment;
  });
  return newComments;
}
