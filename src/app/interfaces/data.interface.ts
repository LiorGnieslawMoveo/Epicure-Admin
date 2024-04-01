export interface IRestaurant {
    title: string
    image: string
    deleted: boolean
    chef: IChef
    rating: Number
    dishes: IDish[]
    isEditing: boolean
};

export interface IChef {
    name: string
    image: string
    description: string
    deleted: boolean
    chefOfTheWeek: Boolean,
    restaurants: IRestaurant[]
    isEditing: boolean
};

export interface IDish {
    title: string
    image: string
    price: number
    deleted: boolean
    iconMeaning: string
    description: string[]
    restaurant: IRestaurant
    isEditing: boolean
};