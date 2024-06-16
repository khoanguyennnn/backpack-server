import Home from '../pages/Home';
import Product from '../pages/Product';
import Item from '../pages/Item';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Product},
    { path: '/products/:slug', component: Item},
    { path: '/cart', component: Cart},
    { path: '/login', component: Login},
    { path: '/signup', component: Register},
    { path: '/profile', component: Profile},
    { path: '/dashboard', component: Dashboard},
]

const privateRoutes = [

]

const baseImageURL = "http://localhost:3000/Images/"

export {publicRoutes, privateRoutes, baseImageURL}