import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { ADD_OPPINION } from '../../../../graphql/mutations';

const UserOpinionForm = ({ productId }) => {
    const [opinion, setOpinion] = useState('');
    const [addOpinion] = useMutation(ADD_OPPINION);
    const addOpinionHandler = (e) => {
        setOpinion(e.target.value);
    };

    const submitOpinionHandler = (e) => {
        e.preventDefault();

        addOpinion({
            variables: {
                userId: localStorage.getItem('userInfo'),
                productId,
                opinion,
            },
        });

        setOpinion('');
    };
    return (
        <Box sx={{ mt: 2 }} component="form" onSubmit={submitOpinionHandler}>
            <TextField
                id="filled-textarea"
                label="Write your opinion"
                placeholder="What do you think?"
                rows={10}
                multiline
                sx={{ width: '100%' }}
                value={opinion}
                name="opinion"
                onChange={addOpinionHandler}
            />
            <Button
                type="submit"
                sx={{ mt: 1 }}
                variant="contained"
                endIcon={<SendIcon />}
            >
                Send
            </Button>
        </Box>
    );
};

export default UserOpinionForm;
