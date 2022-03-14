import { User } from './coreInterfaces';
import { Product } from './coreInterfaces';

export interface GetAllProductsData {
    products: Product[];
}

export interface GetAllProductsVars {
    limit: number;
}

export interface GetProductData {
    product: Product;
}

export interface GetProductVars {}

export interface GetUserData {
    user: User;
}

export interface GetUserVars {
    id: string | undefined | null;
}

export interface GetProductOpinionsData {
    product: Product;
}

export interface GetProductOpinionsVars {
    id: string;
}

export interface GetUserCartProductsData {
    user: User;
}

export interface GetUserCartProductsVars {
    id: string;
}

export interface GetUserFavoritesProductsData {
    user: User;
}

export interface GetUserFavoritesProductsVars {
    id: string;
}
