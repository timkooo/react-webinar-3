import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from '../../utils';
import './style.css';

function Item({item, onAddItemToCart}) {

  return (
    <div className='Item'>
      <div className='Item__Code'>{item.code}</div>
      <div className='Item__Title'>{item.title}</div>
      <div className='Item__Price'>{formatPrice(item.price)} &#8381;</div>
      <button className='Item__Button' onClick={onAddItemToCart}>
        Добавить
      </button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddItemToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddItemToCart: () => {}
}

export default React.memo(Item);
