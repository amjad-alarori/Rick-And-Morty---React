import Topic from "./../Topic/Topic";
import Item from "./../Item/Item";
import Home from "./../Home/Home";

export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/:topic(characters|locations|episodes)',
        component: Topic,
        routes: [
            {
                path: '/:topic(characters|locations|episodes)/:id',
                component: Item,
            },
        ],
    },
]