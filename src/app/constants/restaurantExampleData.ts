import { IRestaurant } from '../interfaces/data.interface'

export const RESTAURANT_EXAMPLE_DATA: IRestaurant[] = [
    {
        title: 'Italian Bistro',
        image: 'italian_bistro.jpg',
        deleted: false,
        chef: 'Mario Rossi',
        rating: 4.5,
        dishes: ['Spaghetti Carbonara', 'Margherita Pizza', 'Tiramisu']
    },
    {
        title: 'Sushi Haven',
        image: 'sushi_haven.jpg',
        deleted: false,
        chef: 'Yuki Tanaka',
        rating: 4.2,
        dishes: ['California Roll', 'Salmon Sashimi', 'Dragon Roll']
    },
    {
        title: 'Steakhouse Grill',
        image: 'steakhouse_grill.jpg',
        deleted: false,
        chef: 'John Smith',
        rating: 4.8,
        dishes: ['Ribeye Steak', 'Grilled Salmon', 'Caesar Salad']
    },
];

