import { SetStateAction, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Image from 'mui-image';

import { Product, UserPaymentCards } from '../../../interfaces/coreInterfaces';
import { BUY_PRODUCTS } from '../../../graphql/mutations';
import { BuyProducts } from '../../../interfaces/gqlMutationsInterfaces';

import mastercardLogo from '../../../assets/images/mastercard.png';
import visaLogo from '../../../assets/images/visa.png';
import discoverLogo from '../../../assets/images/discover.png';
import americanExpressLogo from '../../../assets/images/american_express.png';

type Props = {
    card: UserPaymentCards;
    cart: Product[];
    finishPayment: boolean;
    paymentMethodId: string;
    setIsOpenConfirmPaymentModal: React.Dispatch<SetStateAction<boolean>>;
    setPaymentMethodId: React.Dispatch<SetStateAction<string>>;
};

const PaymentCard = ({
    card,
    cart,
    finishPayment,
    paymentMethodId,
    setIsOpenConfirmPaymentModal,
    setPaymentMethodId,
}: Props) => {
    const userId = localStorage.getItem('userInfo');

    const [buyProducts] = useMutation<BuyProducts>(BUY_PRODUCTS);

    useEffect(() => {
        if (finishPayment && paymentMethodId === card._id) {
            buyProducts({
                variables: {
                    products: cart.map((product: Product) => {
                        return { _id: product._id, price: product.price };
                    }),
                    userId,
                    paymentMethodId: card._id,
                },
            });
        }
    }, [finishPayment, buyProducts, cart, userId, card._id, paymentMethodId]);

    const finishPaymentHandler = () => {
        setIsOpenConfirmPaymentModal(true);
        setPaymentMethodId(card._id);
    };

    return (
        <Card>
            <CardActionArea onClick={finishPaymentHandler}>
                <CardContent>
                    <Grid container>
                        <Image src={mastercardLogo} width="32px" />
                        <Image src={visaLogo} width="32px" />
                        <Image src={discoverLogo} width="32px" />
                        <Image src={americanExpressLogo} width="32px" />
                    </Grid>
                    <Typography sx={{ mt: 2 }} variant="body2" color="primary">
                        Card Number: **** {card.lastFourDigits}
                    </Typography>
                    <Typography sx={{ mt: 2 }} variant="body2" color="primary">
                        Expiration date: {card.expMonth}/{card.expYear}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PaymentCard;
