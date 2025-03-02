import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function LoginRouterAdmin({ children }) {

    const isLogin = useSelector(state => state.AuthReducer.isLogin);

    if(!isLogin) {
        return <Navigate to="/login" />
    }

    return children;
}
