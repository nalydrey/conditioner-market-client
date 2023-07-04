import React from 'react'
import './ServiceCard.scss'

const ServiceCard = (props) => {

    const {label, price} = props

    return (
        <div className='service-card shadow'>
            <div className='service-card__cont'>
                <span>{label}</span>
            </div>

            <div className='service-card__cont'>
                <span>від {price} грн.</span>
            </div>
        </div>
    );
};

export default ServiceCard;