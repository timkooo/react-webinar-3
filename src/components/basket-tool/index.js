import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import Translator from '../translator';
import { Link } from 'react-router-dom';
import LangSwitcher from '../lang-switcher';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link className={cn('main')} to='/'>Главная</Link>
      <div className={cn('switcher')}>
        <LangSwitcher/>
      </div>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}><Translator token={'Перейти'}/></button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);