import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/Button';

const AddPaymentCard = () => {
    const addCardHandler = () => {};

    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 136,
            }}
        >
            <IconButton onClick={addCardHandler}>
                <AddCircleIcon sx={{ fontSize: 40 }} />
            </IconButton>
        </Card>
    );
};

export default AddPaymentCard;
