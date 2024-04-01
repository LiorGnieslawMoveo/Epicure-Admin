export interface IRestaurant {
    title: string
    image: string
    deleted: boolean
    chef: string //IChef
    rating: Number
    dishes: string[] //IDish[]
};

export interface IChef {
    name: string
    image: string
    description: string
    deleted: boolean
    chefOfTheWeek: Boolean,
    restaurants: string[] //IRestaurant[]
};

export interface IDish {
    title: string
    image: string
    price: string
    deleted: boolean
    iconMeaning: string
    description: string[]
    restaurant: string //IRestaurant
};