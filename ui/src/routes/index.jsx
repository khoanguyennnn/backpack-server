import Home from '../pages/Home';
import Product from '../pages/Product';
import Item from '../pages/Item';

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/products', component: Product},
    { path: '/products/:slug', component: Item},
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes}