import { Product } from './coreInterfaces';

interface Response {
    code: string;
    sucess: boolean;
    message: string;
}
interface PaymentResponse extends Response {
    clientSecret: string;
}

export interface BuyProducts {
    buyProducts: PaymentResponse;
}

export interface ReduceQauntitiesData extends Response {
    products: Product[];
}

export interface ReduceQauntitiesVars {
    productsIds: string[];
    quantities: number[];
}
