export interface BaseResponse<T> {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': T[];
    'hydra:totalItems': number;
}
