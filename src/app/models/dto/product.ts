import {Category} from './category';

export interface Product {

    id: number;
    price: number;
    description: string;
    category: Category;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    rating: number;
}
