import {memo, useEffect, useCallback} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import Basket from '../basket';

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
            <div className='Item__Description'>{currentItem.description}</div>
            <div className='Item__Country'>{currentItem.madeIn._type}</div>
            <div className='Item__Category'>{currentItem.category._type}</div>
            <div className='Item__Year'>{currentItem.edition}</div>
            <div className='Item__Price'>{currentItem.price}</div>
            <button onClick={() => callbacks.addToBasket(id)}>Добавить</button>
          </div>) : (<div>Товар отсутствует</div>)
        }
      </PageLayout>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(ItemPage);
