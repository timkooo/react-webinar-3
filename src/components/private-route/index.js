import { memo } from "react";
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';


function PrivateRoute(props) {

  const store = useStore();

  useInit(() => {
    store.actions.user.checkAuth();
  }, []);

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    authStatus: state.user.authStatus,
  }));

  if (select.waiting) return <div>LOADING</div>;
  if (select.authStatus) return props.children;
  if (!select.authStatus) return <Navigate to='/login'/>;
}

export default memo(PrivateRoute);