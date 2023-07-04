import React, {useState} from 'react';
import Form from "../../UI/Form/Form";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import axios from '../../../utils/axios';
import {enterUser} from "../../../store/actionCreators/actionCreatorCurrentUser";
import {controlMessage, showMessage} from "../../../store/actionCreators/actionCreatorSnack";
import {useForm} from "../../../hooks/useForm";
import {registerUserOS} from "../../UI/requests/auth";
import {sendToTelegram} from "../../UI/requests/telegram";

const initialState = {
    name: '',
    email: '',
    tel: '',
    password: ''
}

const Register = () => {


    const navigate = useNavigate()
//Обслуживание инпута палоль
    const [showPassword, setShowPassword] = useState(false)
    const [field, setField] = useState(initialState)
    const {isValid, validObj, checkForm, onChange, resetValidation} = useForm(field, initialState)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


//Работа с формой


    const fillField = (e) => {
        onChange(e)
        setField({...field, [e.target.name]: e.target.value})
    }

    const sendForm = () => {
        checkForm(async ()=>{
        const [user, token] = await registerUserOS(field)
            setField({...initialState})
            if(token) {
                localStorage.setItem('user', token)
                navigate('/office')
                enterUser(user)

                await sendToTelegram(
`На Вашому сайті зареєструвався:
- Iм'я: ${user.name}
- email: ${user.email}
- телефон: ${user.tel}`
                 )
            }
        })
    }

    return (
        <div className='login'>
            <h1>Зареєструватися</h1>
            <Form>
                <TextField
                    label="Им'я"
                    value={field.name}
                    error = {validObj.name}
                    name='name'
                    // helperText="Some important text"
                    placeholder='name@gmail.com'
                    variant="standard"
                    onChange={fillField}
                />
                <TextField
                    label="Email"
                    value={field.email}
                    error = {validObj.email}
                    name='email'
                    // helperText="Some important text"
                    placeholder='name@gmail.com'
                    type='email'
                    variant="standard"
                    onChange={fillField}
                />
                <TextField
                    label="Телефон"
                    value={field.tel}
                    error = {validObj.tel}
                    name='tel'
                    // helperText="Some important text"
                    placeholder='+380..........'
                    type='number'
                    variant="standard"
                    onChange={fillField}
                />

                <FormControl variant="standard" >
                    <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={field.password}
                        error = {validObj.password}
                        placeholder='ThwQfa_+-123'
                        onChange={fillField}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    sx={{mt:1}}
                    onClick={sendForm}
                >Зареєструватися</Button>
            </Form>
            <Link to='/login'>В мене вже є акаунт</Link>
        </div>
    );
};

export default Register;