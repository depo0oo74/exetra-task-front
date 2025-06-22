// ** import views
import Login from '../../../views/auth/Login'
import SignUp from '../../../views/auth/SignUp'
import ForgotPassword from '../../../views/auth/ForgotPassword'
import ResetPassword from '../../../views/auth/ResetPassword'

interface Iroute {
    path: string
    component: React.ComponentType;
    layout: string
}

const authRoutes: Iroute[] = [
    {
        path: '/login',
        component: Login,
        layout: 'auth'
    },
    {
        path: '/signup',
        component: SignUp,
        layout: 'auth'
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        layout: 'auth'
    },
    {
        path: '/reset-password/:token',
        component: ResetPassword,
        layout: 'auth'
    }
]

export default authRoutes