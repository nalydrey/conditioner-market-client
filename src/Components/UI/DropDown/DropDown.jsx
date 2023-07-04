import React, {useState} from 'react'
import './DropDown.scss'
import {KeyboardDoubleArrowDown} from "@mui/icons-material";

const DropDown = (props) => {

    const {children} = props

    const [isOpen, setIsOpen] = useState(false)

    document.addEventListener('click',()=>setIsOpen(false))

    const open = (e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }
    return (
        <div className='dropdown'>
            <div
                className='dropdown__title'
                onClick={open}
            >
                <span className='dropdown__name'>Характеристики</span>
                <KeyboardDoubleArrowDown
                    sx={{transform: isOpen && 'rotate(180deg)', transition: '.3s'}}
                />
            </div>
            <div
                className={`dropdown__list ${isOpen ? 'dropdown__list--active' : ''}`}
            >
                <div className='dropdown__content'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DropDown;