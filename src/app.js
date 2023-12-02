import React, {useCallback, useState, useMemo} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import CartModal from "./components/cart-modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [modalVisible, setModalVisible] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteFromCart: useCallback((item) => {
      store.deleteItemFromCart(item);
    }, [store]),

    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cartSummary={cart.cartSummary} onModalOpen={() => setModalVisible(true)}/>
      <List list={list} onAddItemToCart={callbacks.onAddItemToCart}/>
      <CartModal cartSummary={cart.cartSummary} cartModalVisible={modalVisible} cartItems={cart.cartItems} onModalClose={() => setModalVisible(false)} onDeleteFromCart={callbacks.onDeleteFromCart}/>
    </PageLayout>
  );
}

export default App;
