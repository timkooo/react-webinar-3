export default function buildComments(parentArray, childArray) {
  if (childArray.length === 0) {
    return parentArray;
  } else {
    const remainArray = childArray.filter((childItem) => !parentArray.find((parentItem) => parentItem._id === childItem.parent._tree[0]._id));
    return parentArray.map((parentItem) => ({...parentItem, children: buildComments(childArray.filter((childItem) => childItem.parent._tree[0]._id === parentItem._id), remainArray)}));
  }
}
