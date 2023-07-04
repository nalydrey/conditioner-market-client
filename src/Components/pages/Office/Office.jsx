import React, {useState} from 'react';
import ControlPanel from "../../Layout/ControlPanel/ControlPanel";
import '../../UI/ServiceCard/Office.scss'
import ContentBox from "../../Layout/ContentBox/ContentBox";
import {Button, IconButton} from "@mui/material";
import {enterUser, exitUser} from "../../../store/actionCreators/actionCreatorCurrentUser";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import CreateProduct from "./CreateProduct/CreateProduct";
import Users from "./Users/Users";
import HomeOffice from './HomeOffice/HomeOffice';
import {PhotoCamera, Upload} from "@mui/icons-material";
import {home} from "../../App/App";
import defaultFoto from "../../../assets/img/default-foto.jpg";
import Favorites from "./Favorites";
import MyComments from "./MyComments";
import MyFavorite from "./MyFavorite";
import {changeAvatarOS} from "../../UI/requests/users";

const buttons = [
    {
        name: 'Основне',
        link: '/office'
    },
    {
        name: 'Створити',
        link: 'create'
    },
    {
        name: 'Користувачі',
        link: 'users'
    },
    {
        name: 'Обрані товари',
        link: 'favorites'
    },
    {
        name: 'Мої обрані',
        link: 'my-favorites'
    },
    {
        name: 'Мої коментарі',
        link: 'my-comments'
    },
]

const Office = () => {

    const user = useSelector(state => state.currentUser)
    const navigate = useNavigate()
    const [image, setImage] = useState('')
    const [activeButton, setActiveButton] = useState(buttons[0].name)


    const exit = () => {
        exitUser()
        navigate('/')
    }

    const sendPhoto = async () => {
        if(image){
            const img = new FormData()
            img.append('image', image)
            const user = await changeAvatarOS(img)
            enterUser(user)
            setImage('')
        }
    }




    // console.log(user)
    return (
        <div className='office container'>
            <ControlPanel>
                <div className='office__wrap'>
                    <div className='office__avatar'>
                        <img src={image ? URL.createObjectURL(image)
                            : user && user.imgUrl ? home+user.imgUrl : defaultFoto
                        } alt=""/>

                    </div>
                    <IconButton color="primary"
                                component="label"
                                sx={{position:'absolute', right: -10, bottom: -10}}
                    >
                        <input hidden accept="image/*" type="file" onChange={(e)=>setImage(e.target.files[0])} />
                        <PhotoCamera />
                    </IconButton>
                    {image &&
                    <IconButton color="primary"
                                component="label"
                                sx={{position:'absolute', right: -40, bottom: -10}}
                                onClick={sendPhoto}
                    >
                        <Upload />
                    </IconButton>}
                </div>
                <div className='office__buttons'>
                    {buttons.map(button =>
                        <Button
                            key={button.name}
                            variant={activeButton===button.name ? 'contained' : 'outlined'}
                            onClick={()=> {setActiveButton(button.name); navigate(`${button.link}`) }}
                        >
                            {button.name}
                        </Button>
                    )}

                    <Button
                        variant='outlined'
                        onClick={exit}
                    >
                        Вихід
                    </Button>
                </div>


            </ControlPanel>
            <ContentBox>
                <Routes>
                    <Route index
                           element={<HomeOffice/>}
                    />
                    <Route path='users'
                           element={<Users/>}
                    />
                    <Route path='create'
                           element={<CreateProduct/>}
                    />
                    <Route path='favorites'
                           element={<Favorites />}
                    />
                    <Route path='my-favorites'
                           element={<MyFavorite />}
                    />
                    <Route path='my-comments'
                           element={<MyComments />}
                    />
                </Routes>
            </ContentBox>

        </div>
    );
};

export default Office;