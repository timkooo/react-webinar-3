export default function countComments(comments, count = comments.length) {
  comments.forEach(comment => {
    if (comment.children) {
      countComments(comment.children, count += comment.children.length)
    }
  });
  return count;
}
