import React, {useState} from 'react';
import {IconButton, Menu, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const UserMenu = () => {

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const goPage = (adress) => {
        navigate(adress)
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                sx={{color:'white'}}
                onClick={handleMenu}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => goPage('register')}>Реєстрація</MenuItem>
                <MenuItem onClick={() => goPage('login')}>Вхід</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;