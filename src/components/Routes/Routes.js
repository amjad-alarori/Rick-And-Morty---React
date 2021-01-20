import Topic from "./../Topic/Topic";
import Item from "./../Item/Item";


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
]