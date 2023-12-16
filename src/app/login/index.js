import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Login() {
  const store = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectLocation = location?.state?.from || '/';
  // console.log(window.history);

  const select = useSelector(state => ({
    authStatus: state.user.authStatus,
    error: state.user.error,
  }));

  const {t} = useTranslate();

  const callbacks = {
    handleLogout: useCallback(() => store.actions.user.logout(), [store]),
    handleLogin: useCallback(async (evt) => {
      evt.preventDefault();
      const form = new FormData(evt.target);
      const { login, password } = Object.fromEntries(form);
      await store.actions.user.login({login: login, password: password});
      navigate(redirectLocation);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm onLogin={callbacks.handleLogin} onLogout={callbacks.handleLogout} authStatus={select.authStatus} error={select.error}/>
    </PageLayout>
  );
}

export default memo(Login);
