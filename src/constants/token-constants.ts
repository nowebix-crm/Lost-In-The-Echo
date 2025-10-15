export enum TokenStatus {
    VALID = 'valid',
    EXPIRED = 'expired',
    INVALID = 'invalid',
}

export interface TokenPayload {
    id: string;
    email: string;
}