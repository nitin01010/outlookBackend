import {Outlet,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie';

const PublicRoute = () => {
    const user = Cookies.get('user');
    return user ?  <Navigate to='/dashboard' /> : <Outlet />
}

export default PublicRoute