import React from 'react';
import './GetInTouchForm.scss'
import {Button, TextField} from "@mui/material";

const GetInTouchForm = () => {



    return (
        <div className='get-in'>
            <TextField
                label="Им'я"
                // value={field.name}
                // error = {validObj.name}
                name='name'
                // helperText="Some important text"
                placeholder="Введіть Ваше Ім'я"
                variant='outlined'
                // onChange={fillField}
            />
            <TextField
                label="Телефон"
                // value={field.name}
                // error = {validObj.name}
                name='tel'
                // helperText="Some important text"
                placeholder="Введіть Ваш телефон"
                variant='outlined'
                // onChange={fillField}
            />
            <textarea name='text' placeholder='Повідомлення'></textarea>
            <Button
                fullWidth
                sx={{gridColumn: '-1/1'}}
                variant='outlined'>Відправити</Button>
        </div>
    );
};

export default GetInTouchForm;