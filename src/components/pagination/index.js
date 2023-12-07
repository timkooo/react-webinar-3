import {memo, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Pagination() {
  const { pageNumber } = useParams();
  const page = Number(pageNumber ?? 1);
  const store = useStore();
  const pageCount = useSelector(state => state.catalog.pageCount);

  useEffect(() => {
    store.actions.catalog.setCurrentPage(page);
    store.actions.catalog.loadItemsPack();
  }, [page])

  return (
    <div className='Pagination'>
      {page !== 1 && page !== 2 ? (<Link className='Pagination__Item' to={`/items/1`}>1</Link>) : ''}
      {page - 2 > 1 ? (<button className='Pagination__Item Pagination__Item--Dots'>...</button>) : ''}
      {page === pageCount ? (<Link className='Pagination__Item' to={`/items/${page - 2}`}>{page - 2}</Link>) : ''}
      {page >= 2 ? (<Link className='Pagination__Item' to={`/items/${page - 1}`}>{page - 1}</Link>) : ''}
      <button className='Pagination__Item Pagination__Item--Current'>{page}</button>
      {page !== pageCount && page !== pageCount - 1 ? (<Link className='Pagination__Item' to={`/items/${page + 1}`}>{page + 1}</Link>) : ''}
      {page === 1 ? (<Link className='Pagination__Item' to={`/items/${page + 2}`}>{page + 2}</Link>) : ''}
      {pageCount - page > 2 ? (<button className='Pagination__Item Pagination__Item--Dots'>...</button>) : ''}
      {page !== pageCount ? (<Link className='Pagination__Item' to={`/items/${pageCount}`}>{pageCount}</Link>) : ''}
    </div>
  )
}

export default memo(Pagination);
