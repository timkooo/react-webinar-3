import {numberFormat} from "../../utils";
import Translator from '../../components/translator';
import { memo } from 'react';
import './style.css';

function ItemData({currentItem, onAddToBasket}) {

  return currentItem ? (
    <div className='ItemData'>
      <div className='ItemData__Item'>{currentItem.description}</div>
      <div className='ItemData__Item'>Страна производитель:&nbsp;<b>{currentItem.madeIn._id}</b></div>
      <div className='ItemData__Item'>Категория:&nbsp;<b>{currentItem.category._id}</b></div>
      <div className='ItemData__Item'>Год выпуска:&nbsp;<b>{currentItem.edition}</b></div>
      <div className='ItemData__Item ItemData__Item--Price'>Цена:&nbsp;{numberFormat(currentItem.price)}&nbsp;&#8381;</div>
      <button className='ItemData__Button' onClick={() => onAddToBasket(currentItem._id)}><Translator token={'Добавить'}/></button>
    </div>) : (<div>Товар отсутствует</div>)
};

export default memo(ItemData);
