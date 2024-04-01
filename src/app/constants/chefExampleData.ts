import { IChef } from "../interfaces/data.interface";

export const CHEF_EXAMPLE_DATA: IChef[] = [
    {
        name: 'Mario Rossi',
        image: 'mario_rossi.jpg',
        description: 'Award-winning chef with expertise in Italian cuisine.',
        deleted: false,
        chefOfTheWeek: true,
        restaurants: ['Italian Bistro', 'Pizza Palace']
    },
    {
        name: 'Yuki Tanaka',
        image: 'yuki_tanaka.jpg',
        description: 'Renowned sushi chef known for creating exquisite sushi dishes.',
        deleted: false,
        chefOfTheWeek: false,
        restaurants: ['Sushi Haven', 'Tokyo Sushi Bar']
    },
    {
        name: 'John Smith',
        image: 'john_smith.jpg',
        description: 'Master of grilled steaks and seafood, delivering exceptional dining experiences.',
        deleted: false,
        chefOfTheWeek: false,
        restaurants: ['Steakhouse Grill', 'Seafood Shack']
    },
];

