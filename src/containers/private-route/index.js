import { memo } from "react";
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import { useLocation } from 'react-router-dom';


function PrivateRoute(props) {
  const location = useLocation();
  const store = useStore();

  useInit(() => {
    console.log(window.location.pathname);

    store.actions.user.checkAuth();
  }, []);

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    authStatus: state.user.authStatus,
  }));

  if (select.waiting) return <div>LOADING</div>;
  if (select.authStatus) return props.children;
  if (!select.authStatus) return <Navigate to='/login'  state={{ from: location }} />;
}

export default memo(PrivateRoute);