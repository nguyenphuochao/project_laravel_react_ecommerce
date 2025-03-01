import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function LoginRouterSide({ children }) {
    const isLogin = useSelector(state => state.AuthReducer.isLogin);

    if(!isLogin) {
        return <Navigate to="/" />
    }

    return children;
}
