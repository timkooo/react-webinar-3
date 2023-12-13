import { memo } from "react";
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginForm(props) {

  const callbacks = {
    handleLogin: (evt) => props.onLogin(evt),
    handleLogout: () => props.onLogout(),
  }

  const {t} = useTranslate();

  return (
    <div className="LoginForm">
      <h2 className="LoginForm__title">Вход</h2>
      {!props.authStatus ? (
        <form className="LoginForm__form" onSubmit={callbacks.handleLogin}>
          <div className="LoginForm__item">
            <label className="LoginForm__label" htmlFor="login">{t('userform.login')}</label>
            <input className="LoginForm__input" type="text" id="login" name="login" defaultValue={'test_2'} />
          </div>
          <div className="LoginForm__item">
            <label className="LoginForm__label" htmlFor="password">{t('userform.password')}</label>
            <input className="LoginForm__input" type="text" id="password" name="password" defaultValue={'123456'} />
          </div>
          {props.error && <p className="LoginForm__error">{props.error}</p>}
          <button className="LoginForm__button" type="submit">{t('usercard.login')}</button>
        </form>) : (
        <button className="LoginForm__button" onClick={callbacks.handleLogout}>{t('usercard.logout')}</button>
      )}
    </div>
  )
}

export default memo(LoginForm);
