import { IDish } from "../interfaces/data.interface";

export const DISH_EXAMPLE_DATA: IDish[] = [
    {
        title: 'Spaghetti Carbonara',
        image: 'spaghetti_carbonara.jpg',
        price: 12.99,
        description: ['Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.'],
        deleted: false,
        iconMeaning: "Spicy",
        restaurant: 'Italian Delight'
    },
    {
        title: 'Margherita Pizza',
        image: 'margherita_pizza.jpg',
        description: ['Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil.'],
        deleted: false,
        iconMeaning: "Vegan",
        price: 9.99,
        restaurant: 'Pizza Palace'
    },
    {
        title: 'Grilled Salmon',
        image: 'grilled_salmon.jpg',
        description: ['Fresh salmon fillet grilled to perfection and served with lemon butter sauce.'],
        deleted: false,
        iconMeaning: "Vegi",
        price: 15.99,
        restaurant: 'Seafood Paradise'
    }];