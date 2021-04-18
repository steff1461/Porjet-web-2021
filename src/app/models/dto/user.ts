
export interface User {

    '@context': string;
    '@id': string;
    '@type': string;
    email: string;
    id: number;
    roles: string[];
    password: string;
    firstname: string;
    lastname: string;
    addressId: number;
    username: string;
}
