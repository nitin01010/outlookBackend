import {Outlet,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie';

const ProtuctedRoute = () => {
    const user = Cookies.get('user');
    return user ? <Outlet /> : <Navigate to='/' />
}

export default ProtuctedRoute