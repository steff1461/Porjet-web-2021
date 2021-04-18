export interface TokenPayload {

    iat: number;
    exp: number;
    roles: Array<string>;
    username: string;
}
