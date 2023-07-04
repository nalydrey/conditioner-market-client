import React from 'react'
import './ContentBox.scss'

const ContentBox = ({children, className}) => {
    return (
        <div className={`content-box shadow ${className}`}>
            {children}
        </div>
    );
};

export default ContentBox;