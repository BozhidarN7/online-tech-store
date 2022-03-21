import Card from '@mui/material/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/Button';

type Props = {
    addPaymentCardHandler: () => void;
};

const AddPaymentCard = ({ addPaymentCardHandler }: Props) => {
    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 136,
            }}
        >
            <IconButton onClick={addPaymentCardHandler}>
                <AddCircleIcon sx={{ fontSize: 40 }} />
            </IconButton>
        </Card>
    );
};

export default AddPaymentCard;
