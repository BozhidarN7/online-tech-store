export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    favorites: Product[];
    ratings: Rating[];
    cart: Product[];
}

export interface Product {
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

export interface RatingScore {
    _id: string;
    user: string;
    rating: number;
}

export interface Rating {
    _id: string;
    product: string;
    rating: number;
}

export interface Opinion {
    _id: string;
    user: string;
    userInfo: User;
    opinion: String;
}

export interface UserPaymentCards {
    _id: string;
    lastFourDigits: string;
    expMonth: string;
    expYear: string;
}
