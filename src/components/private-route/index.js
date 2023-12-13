import {memo, useLayoutEffect} from "react";
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import Login from '../../app/login';

function PrivateRoute(props) {

  const select = useSelector(state => ({
    authStatus: state.user.authStatus,
  }));

  return select.authStatus ? props.children : <Navigate to='/login'/>;
}

export default memo(PrivateRoute);