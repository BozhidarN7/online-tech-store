interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    favorites: Product[];
    ratings: Rating[];
    cart: Product[];
}

interface RatingScore {
    _id: string;
    user: string;
    rating: number;
}

interface Rating {
    _id: string;
    product: string;
    rating: number;
}

interface Opinion {
    _id: string;
    user: string;
    userInfo: User;
    opinion: String;
}

interface Product {
    _id: string;
    brand: string;
    model: string;
    category: string;
    description: string;
    specification: string[][];
    price: number;
    rating: number;
    votes: number;
    ratingScore: RatingScore[];
    quantity: number;
    image: string;
    favoriteTo: User[];
    inCartTo: User[];
    createdAt: string;
    opinions: Opinion[];
}

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
