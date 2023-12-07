import {memo, useEffect, useCallback} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import Basket from '../basket';
import {numberFormat} from "../../utils";
import './style.css';
import Translator from '../../components/translator';

function ItemPage() {
  const { id } = useParams();
  const store = useStore();
  const currentItem = useSelector(state => state.catalog.currentItem);
  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  useEffect(() => {
    store.actions.catalog.loadItemById(id);
    return () => store.actions.catalog.resetCurrentItem();
  }, [id]);

  return (
    <>
      <PageLayout>
        <Head title={currentItem? currentItem.title : 'Товар отсутствует'}/>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
        {currentItem ? (
          <div className='ItemPage'>
            <div className='ItemPage__Item'>{currentItem.description}</div>
            <div className='ItemPage__Item'>Страна производитель:&nbsp;<b>{currentItem.madeIn._id}</b></div>
            <div className='ItemPage__Item'>Категория:&nbsp;<b>{currentItem.category._id}</b></div>
            <div className='ItemPage__Item'>Год выпуска:&nbsp;<b>{currentItem.edition}</b></div>
            <div className='ItemPage__Item ItemPage__Item--Price'>Цена:&nbsp;{numberFormat(currentItem.price)}&nbsp;&#8381;</div>
            <button className='ItemPage__Button' onClick={() => callbacks.addToBasket(id)}><Translator token={'Добавить'}/></button>
          </div>) : (<div>Товар отсутствует</div>)
        }
      </PageLayout>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(ItemPage);
