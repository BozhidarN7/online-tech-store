import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ProductSpecification = ({ product }) => {
    console.log(product);
    return (
        <Box>
            <Typography sx={{ mb: 2 }} variant="h5" component="h2">
                Full description
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Specification</StyledTableCell>
                            <StyledTableCell align="left">
                                Description
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.specification.map((spec) => (
                            <StyledTableRow key={spec[0]}>
                                <StyledTableCell component="th" scope="row">
                                    {spec[0]}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {spec[1]}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ProductSpecification;
