import React from "react";
import PropTypes from 'prop-types';
import CartItem from "../cart-item";
import './style.css';

function CartModal({cartSummary, cartModalVisible, cartItems, onModalClose, onDeleteFromCart}) {

  return (
    <div className={`CartModal ${cartModalVisible ? 'CartModal--Visible' : ''}`}>
      <div className='CartModal__Wrapper'>
        <div className='CartModal__Head'>
          <h2 className='CartModal__Title'>Корзина</h2>
          <button className='CartModal__Button' onClick={onModalClose}>Закрыть</button>
        </div>
        {cartItems.length !== 0 ? (
          <div className='CartModal__List'>
            {cartItems.map((item) => (<CartItem key={item.code} item={item} onDeleteItem={() => onDeleteFromCart(item)}/>))}
          </div> ) : (<div className='CartModal__Empty'>Корзина пуста</div>)
        }
        <div className='CartModal__Summary Summary'>
          <p className='Summary__Label'>Итого</p>
          <p className='Summary__Price'>{cartSummary ? cartSummary.totalPrice : 0} &#8381;</p>
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {
  cartModalVisible: PropTypes.bool,
  onModalClose: PropTypes.func,
  onDeleteFromCart: PropTypes.func
};

CartModal.defaultProps = {
  onModalClose: () => {},
  onDeleteFromCart: () => {}
}

export default React.memo(CartModal);
