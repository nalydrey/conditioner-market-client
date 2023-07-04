import React from 'react'
import './Form.scss'

const Form = ( props ) => {

    const { children } = props

    return (
        <div className='form'>
            {children}
        </div>
    );
};

export default Form;