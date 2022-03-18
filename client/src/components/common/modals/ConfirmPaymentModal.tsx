import { SetStateAction } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

type Props = {
    isOpenConfirmPaymentModal: boolean;
    setIsOpenConfirmPaymentModal: React.Dispatch<SetStateAction<boolean>>;
    setFinishPayment: React.Dispatch<SetStateAction<boolean>>;
};

const ConfirmPaymentModal = ({
    isOpenConfirmPaymentModal,
    setIsOpenConfirmPaymentModal,
    setFinishPayment,
}: Props) => {
    const handleCloseDisagree = () => {
        setIsOpenConfirmPaymentModal(false);
        setFinishPayment(false);
    };
    const handleCloseAgree = () => {
        setIsOpenConfirmPaymentModal(false);
        setFinishPayment(true);
    };

    return (
        <Dialog
            open={isOpenConfirmPaymentModal}
            onClose={handleCloseDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {'Are you sure you want to finish your finish the payment?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By clicking the agree button your payment will be fnished
                    and you will be charged by the amount of your order!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDisagree}>Disagree</Button>
                <Button onClick={handleCloseAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmPaymentModal;
