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
    restaurants: IRestaurant[]
};

export interface IDish {
    title: string
    image: string
    price: number
    deleted: boolean
    iconMeaning: string
    description: string[]
    restaurant: IRestaurant
};