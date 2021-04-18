export interface Comment {

    '@context': string;
    '@id': string;
    '@type': string;
    id: number;
    content: string;
    createdAt: Date;
    rate: number;
    productId: number;
    userId: number;
}
