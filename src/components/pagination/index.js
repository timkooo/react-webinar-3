import {memo} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function Pagination() {
  const store = useStore();
  const currentPage = useSelector(state => state.catalog.currentPage);
  const pageCount = useSelector(state => state.catalog.pageCount);

  const setCurrentPage = (page) => {
    store.actions.catalog.setCurrentPage(page);
    store.actions.catalog.loadItemsPack();
  }

  return (
    <div className='Pagination'>
      {currentPage !== 1 && currentPage !== 2 ? (<button onClick={() => setCurrentPage(1)}>1</button>) : ''}
      {currentPage - 2 > 1 ? (<button>...</button>) : ''}
      {currentPage >= 2 ? (<button onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>) : ''}
      <button>{currentPage}</button>
      {currentPage !== pageCount && currentPage !== pageCount - 1 ? (<button onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>) : ''}
      {pageCount - currentPage > 2 ? (<button>...</button>) : ''}
      {currentPage !== pageCount ? (<button onClick={() => setCurrentPage(pageCount)}>{pageCount}</button>) : ''}
    </div>
  )
}

export default memo(Pagination);
