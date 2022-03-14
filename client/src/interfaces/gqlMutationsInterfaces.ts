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
