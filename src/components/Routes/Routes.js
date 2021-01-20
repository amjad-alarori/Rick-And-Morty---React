import Topic from "./../Topic/Topic";
import Item from "./../Item/Item";


export const routes = [
    {
        path: '/:topic(character|location|episode)',
        component: Topic,
        routes: [
            {
                path: '/:topic(character|location|episode)/:id',
                component: Item,
            },
        ],
    },
]