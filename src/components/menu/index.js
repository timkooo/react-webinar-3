import { memo } from 'react';
import LangSwitcher from '../lang-switcher';
import {cn as bem} from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

function Menu() {
  const cn = bem('Menu');

  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/'>Главная</Link>
      <div className={cn('switcher')}>
        <LangSwitcher/>
      </div>
    </div>
    )
}

export default memo(Menu);