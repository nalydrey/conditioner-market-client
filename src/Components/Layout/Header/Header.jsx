import React, {useState} from 'react'
import './Header.scss'
import {NavLink, useNavigate} from "react-router-dom";
import logo from '../../../assets/img/conditioner.png'
import UserMenu from "../../UI/UserMenu/UserMenu";
import {useSelector} from "react-redux";
import Burger from "../../UI/Burger/Burger";
import {Menu, MenuItem} from "@mui/material";
import {home} from "../../App/App";

const menuItems = [
    {
        name: 'Послуги',
        link: 'service'
    },
    {
        name: 'Товари',
        link: 'products'
    },
    {
        name: 'Контакти',
        link: 'contacts'
    },
    {
        name: 'FAQ',
        link: 'faq'
    }
]
const Header = () => {

    const navigate = useNavigate()

    const user = useSelector(state => state.currentUser)
    const [anchorEl, setAnchorEl] = useState(null);

    const burgerMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const closeBurger = () => {
        setAnchorEl(null)
    }

    const goPage = (link) => {
        navigate(link)
        setAnchorEl(null)
    }


    return (
        <header>
            <div className='container header__container shadow'>
                <div
                    className='header__logo'
                    onClick={() => navigate('.')}
                >
                    <img src={logo} alt=""/>
                </div>

                <Burger
                    isOpen = {Boolean(anchorEl)}
                    onClick = {burgerMenu}
                />
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={closeBurger}
                >
                    {menuItems.map(item =>
                        <MenuItem
                            key = {item.name}
                            onClick={() => goPage(item.link)}>{item.name}</MenuItem>)}
                </Menu>

                <ul className='header__nav'>
                    {menuItems.map(item =>
                        <li key={item.name}><NavLink to={item.link}>{item.name}</NavLink></li>)}
                </ul>
                <div className='header__client'>
                    {user ?
                        user.imgUrl ?
                        <div className='client__foto'
                             onClick={()=>{navigate('/office')}}
                        >
                            <img src={home+user.imgUrl} alt="foto"/>
                        </div>
                        :
                        <div
                            className='client__logo'
                            onClick={()=>{navigate('/office')}}
                        >
                            {user.name}
                        </div>
                        :
                        <UserMenu/>
                    }
                </div>
            </div>
        </header>
)
    ;
};

export default Header;