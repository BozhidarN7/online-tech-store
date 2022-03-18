import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Image from 'mui-image';

import mastercardLogo from '../../../assets/images/mastercard.png';
import visaLogo from '../../../assets/images/visa.png';
import discoverLogo from '../../../assets/images/discover.png';
import americanExpressLogo from '../../../assets/images/american_express.png';

const PaymentCard = () => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Grid container>
                        <Image src={mastercardLogo} width="32px" />
                        <Image src={visaLogo} width="32px" />
                        <Image src={discoverLogo} width="32px" />
                        <Image src={americanExpressLogo} width="32px" />
                    </Grid>
                    <Typography sx={{ mt: 2 }} variant="body2" color="primary">
                        Card Number: **** 3320
                    </Typography>
                    <Typography sx={{ mt: 2 }} variant="body2" color="primary">
                        Bozhidar Nemski
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default PaymentCard;
