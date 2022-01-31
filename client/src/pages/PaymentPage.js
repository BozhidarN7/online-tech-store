import { PaymentElement } from '@stripe/react-stripe-js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PageWrapper from '../components/wrappers/pageWrapper/PageWrapper';

const PaymentPage = () => {
    return (
        <PageWrapper>
            <Box component="form">
                <PaymentElement />
                <Button>Button</Button>
            </Box>
        </PageWrapper>
    );
};

export default PaymentPage;
