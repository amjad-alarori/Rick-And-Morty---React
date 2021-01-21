import Topic from "./../Topic/Topic";
import Item from "./../Item/Item";
import NotFound from "./../NotFound/NotFound";


export const routes = [
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
    {
        path: "/test404",
        component: NotFound,
    },
]