import React, {useState} from 'react';
import {closeCommentForm, fillCommentForm} from "../../store/actionCreators/actionCreatorComentModal";
import {Box, Button, Modal, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import axios from "../../utils/axios";
import {controlMessage, showMessage} from "../../store/actionCreators/actionCreatorSnack";
import {addPropToProduct} from "../../store/actionCreators/actionCreatorProductCards";
import {useForm} from "../../hooks/useForm";
import {createReviewOS} from "./requests/review";

const style = {
    gap: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white'
};
const CommentModal = (props) => {

    const {isOpen, func, text} = useSelector(state => state.commentModal)

    const {validObj, checkForm, onChange, resetValidation} = useForm({text}, {text:''})

    const changeText = (e) => {
        fillCommentForm(e.target.value)
        onChange(e)
    }

    const closeModal = () => {
        closeCommentForm()
        resetValidation()
    }

    const addNewComment = () => {
        checkForm(()=>{
            closeModal()
            func(text)
        })
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
        >
            <Box
                sx={style}>
                <Typography variant="h6" component="h2">
                    Додайте новий коментар
                </Typography>
                <textarea  cols="30" rows="10"
                           name = 'text'
                           style={{borderColor: validObj.text ? 'red' : ''}}
                           value={text}
                           onChange={changeText}
                >

                        </textarea>
                <Button
                    variant='outlined'
                    onClick={addNewComment}
                >Додати</Button>
            </Box>
        </Modal>
    );
};

export default CommentModal;