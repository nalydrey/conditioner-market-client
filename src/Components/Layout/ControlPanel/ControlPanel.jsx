import React, {useState} from 'react'
import './ControlPanel.scss'
import {ArrowForwardIos} from "@mui/icons-material";

const ControlPanel = ({children}) => {

    const [isOpen, setOpen] = useState(false)


    return (
        <div className={`control ${isOpen ? 'control--open': '' } shadow`}>
            <div className='strap'
                onClick={()=>setOpen(!isOpen)}
            >
                <ArrowForwardIos
                    sx = {{transform: isOpen && 'rotate(180deg)', transition: '.5s'}}
                />
            </div>
            {children}
        </div>
    );
};

export default ControlPanel;