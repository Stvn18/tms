export interface UserModel {
    id?: number;
    name?: number;
    email: string;
    password: string;
    enable?: boolean;
}

export interface OAuthUserInfoModel {
    name: string;
    email: string;
    accessToken: string;
    expiresIn: number;
}
