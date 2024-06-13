import Home from '../pages/Home';
import Product from '../pages/Product';
import Item from '../pages/Item';
import Cart from '../pages/Cart';
import Login from '../pages/Login';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Product},
    { path: '/products/:slug', component: Item},
    { path: '/cart', component: Cart},
    { path: '/login', component: Login},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}