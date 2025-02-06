import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function LoginRouter({ children }) {
    const isLogin = useSelector(state => state.isLogin);
    if(isLogin) {
        return <Navigate to="/admin" />
    }

    return children;
}
