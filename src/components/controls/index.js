import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import './style.css';

function Controls({cartSummary, onModalOpen}) {

  const getLabel = () => {
    const lastDigit = cartSummary.amount % 10;
    const twoLastDigits = cartSummary.amount % 100;
    if (lastDigit === 1 && twoLastDigits !== 11) {
      return 'товар';
    }
    if (lastDigit <= 4 && lastDigit >= 2 && ![12, 13, 14].includes(twoLastDigits)) {
      return 'товара';
    }
    return 'товаров';
  }

  return (
    <div className='Controls'>
      {cartSummary.amount ? (<div>В корзине:&nbsp;&nbsp;&nbsp;<span className='Controls__Summary'>{cartSummary.amount} {getLabel()} / {formatPrice(cartSummary.totalPrice)} &#8381;</span></div>) :
      (<div>В корзине:&nbsp;&nbsp;&nbsp;<span className='Controls__Summary'>пусто</span></div>)}
      <button className='Controls__Button' onClick={() => onModalOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onModalOpen: PropTypes.func
};

Controls.defaultProps = {
  onModalOpen: () => {}
}

export default React.memo(Controls);
