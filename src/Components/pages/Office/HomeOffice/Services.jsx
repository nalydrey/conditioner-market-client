import React from 'react';
import NewService from "../../../UI/NewService/NewService";
import {Fab} from "@mui/material";
import {addService} from "../../../../store/actionCreators/actionCreatorService";
import {Add} from "@mui/icons-material";
import {useSelector} from "react-redux";

const newService = {
    label: '',
    price: ''
}

const Services = () => {

    const services = useSelector(state => state.service)



    return (
        <div className='office-home__price'>
            {services.map((service, ind) =>
                <NewService key={ind} {...service} index={ind}/>
            )}
            <div className='office-home__action'>
                <Fab color="primary"
                     size='small'
                     onClick={() => addService(newService)}
                >
                    <Add />
                </Fab>
            </div>
        </div>
    );
};

export default Services;