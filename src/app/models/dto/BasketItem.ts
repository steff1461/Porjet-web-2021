import {Product} from './product';

export interface BasketItem{

    productId: number;
    product: Product;
    productCount: number;
}
