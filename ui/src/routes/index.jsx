import Home from '../pages/Home';
import Product from '../pages/Product';
import Item from '../pages/Item';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import About from '../pages/About';
import History from '../pages/History';
import Ordering from '../pages/Ordering';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Product},
    { path: '/products/:slug', component: Item},
    { path: '/signup', component: Register},
    { path: '/login', component: Login},
    { path: '/about', component: About},

]

const privateRoutes = [
    { path: '/dashboard', component: Dashboard},
    { path: '/cart', component: Cart},
    { path: '/profile', component: Profile},
    { path: '/history', component: History},
    { path: '/ordering', component: Ordering},
]

const baseImageURL = "http://localhost:3000/Images/"

export {publicRoutes, privateRoutes, baseImageURL}