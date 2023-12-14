import { memo, useCallback, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginHead() {

  const store = useStore();
  const navigate = useNavigate();

  useInit(() => {
    store.actions.user.checkAuth();
  }, [], true);

  const select = useSelector(state => ({
    user: state.user.user,
    authStatus: state.user.authStatus
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.user.logout(), [store])
  }

  const {t} = useTranslate();

  return (
    <div className='LoginHead'>
      {select.authStatus ? (<>
        <Link to='/profile' className="LoginHead__user">{select.user.username}</Link>
        <button className="LoginHead__button" onClick={callbacks.logout}>{t('user.logout')}</button>
      </>) : (
      <button className="LoginHead__button" onClick={() => navigate('/login')}>{t('user.login')}</button>)}
    </div>
  )
}

export default memo(LoginHead);
