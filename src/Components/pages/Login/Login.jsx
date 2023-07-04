import React, {useState} from 'react'
import './Login.scss'
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import Form from "../../UI/Form/Form";
import axios from "../../../utils/axios";
import {enterUser} from "../../../store/actionCreators/actionCreatorCurrentUser";
import {controlMessage, showMessage} from "../../../store/actionCreators/actionCreatorSnack";
import {loginUserOS} from "../../UI/requests/auth";
import {useForm} from "../../../hooks/useForm";

const initialState = {
    email: '',
    password:''
}
const Login = () => {

    const navigate = useNavigate()
//Обслуживание инпута палоль
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

//Работа с формой
    const [field, setField] = useState(initialState)

    const {validObj, checkForm, onChange} = useForm(field, initialState)
    const fillField = (e) => {
        console.log(e.target.name, e.target.value)
        onChange(e)
        setField({...field, [e.target.name]: e.target.value})
    }

    const sendForm = async () => {
        setField({...initialState})
        const [user, token] = await loginUserOS( field)
            if(token){
                localStorage.setItem('user', token)
                navigate('/office')
                enterUser(user)
            }
    }

    return (
        <div className='login'>
            <h1>Вхід</h1>
            <Form>
                <TextField
                    label="Email"
                    value={field.email}
                    name='email'
                    error = {validObj.email}
                    // helperText="Some important text"
                    placeholder='name@gmail.com'
                    type='email'
                    variant="standard"
                    onChange={fillField}
                />

                <FormControl variant="standard" >
                    <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        value={field.password}
                        name='password'
                        error = {validObj.password}
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
                    onClick={()=>checkForm(sendForm)}
                >Увійти</Button>
            </Form>
            <Link to='/register'>В мене ще немає акаунту</Link>
        </div>
    );
};

export default Login;