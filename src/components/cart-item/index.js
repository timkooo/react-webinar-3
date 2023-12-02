import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function CartItem({item, onDeleteItem}) {

  return (
    <div className='CartItem'>
      <div className='CartItem__Code'>{item.code}</div>
      <div className='CartItem__Title'>{item.title}</div>
      <div className='CartItem__Price'>{formatPrice(item.price)} &#8381;</div>
      <div className='CartItem__Quantity'>{item.quantity} шт</div>
      <button className='CartItem__Button' onClick={onDeleteItem}>
        Удалить
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func
};

CartItem.defaultProps = {
  onDeleteItem: () => {}
}

export default React.memo(CartItem);
