import {Product} from './product';

export interface Purchasing {
    createdAt: string;
    id: number;
    productsId: number[];
    userId: number;
}
