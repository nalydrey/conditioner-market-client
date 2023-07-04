import React, {useEffect, useState} from 'react';
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {fillMain} from "../../store/actionCreators/actionCreatorProduct";
import {addNewManufacture} from "../../store/actionCreators/actionCreatorCommon";

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


const ModalWindow = (props) => {

    const product = useSelector(state => state.product)

    const {headerName, isOpen, onClose=()=>{}, onAdd=()=>{}} = props

    const [form, setForm] = useState({text:''})

    const {validObj, checkForm, onChange, resetValidation} = useForm(form, {text:''})

     const cancelForm = () => {
         setForm({text:''})
         onClose(false)
         resetValidation()
     }

     const sendForm = (e) => {
         addNewManufacture(form.text)
         fillMain('manufacture', form.text)
         cancelForm()
     }

     const fillField = (e) => {
         setForm({...form, text: e.target.value})
         onChange(e)
     }



    return (
        <Modal
            open={isOpen}
            onClose={cancelForm}
        >
            <Box
                sx={style}>
                <Typography variant="h6" component="h2">
                    {headerName}
                </Typography>
                <TextField
                    fullWidth
                    label="Новий виробник"
                    variant="outlined"
                    name='text'
                    value={form.text}
                    error={validObj.text}
                    placeholder='новий виробник'
                    onChange={fillField}
                />
                <Button
                    variant='outlined'
                    onClick={()=>{checkForm(sendForm)}}
                >Додати категорію</Button>
            </Box>
        </Modal>
    );
};

export default ModalWindow;