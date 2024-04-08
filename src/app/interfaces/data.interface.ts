export interface IRestaurant {
    _id: string;
    title: string
    image: string
    deleted: boolean
    chef: IChef
    rating: Number
    dishes: IDish[]
    isEditing: boolean
};

export interface IChef {
    _id?: string;
    name: string
    image?: string
    description?: string
    deleted: boolean
    chefOfTheWeek?: Boolean,
    restaurants?: IRestaurant[]
    isEditing: boolean
};

export interface IDish {
    _id?: string;
    title: string
    image?: string
    price?: number
    deleted: boolean
    iconMeaning?: string
    description?: string[]
    restaurant?: IRestaurant
    isEditing: boolean
};