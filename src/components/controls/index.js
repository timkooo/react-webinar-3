import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({cartSummary, onModalOpen}) {

  return (
    <div className='Controls'>
      {cartSummary ? (<div>В корзине:&nbsp;&nbsp;&nbsp;<span className='Controls__Summary'>{cartSummary.amount} / {cartSummary.totalPrice} &#8381;</span></div>) :
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
