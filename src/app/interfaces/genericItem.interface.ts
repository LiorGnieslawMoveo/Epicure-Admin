import { IChef, IDish, IRestaurant } from "./data.interface"

export interface IGenericItem {
    _id: string;
    title: string;
    name: string;
    image: string;
    deleted: boolean;
    chef: IChef;
    rating: Number;
    dishes: IDish[];
    description: string | string[];
    chefOfTheWeek: Boolean;
    restaurants: IRestaurant[];
    price: number;
    iconMeaning: string;
    restaurant: IRestaurant;
};