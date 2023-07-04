import React from 'react'
import './NewProperty.scss'
import {deleteField, fillCharacteristics, fillNewField} from "../../../store/actionCreators/actionCreatorProduct";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as PropTypes from "prop-types";
import {DeleteForever} from "@mui/icons-material";



const NewProperty = (props) => {

    const {index, name, label, unit, value, onChange, error} = props

    const units = ['mm', 'kg', 'од', 'шт','год', 'л','$', 'грн']
    const fillField = (e) => {
        console.log(e.target.name,e.target.value, index )
        fillNewField(e.target.name, e.target.value, index)
    }

    return (
        <div className='new-field'>
            <TextField
                error={error?.label}
                label="Назва властивості"
                variant="outlined"
                placeholder='Назва властивості'
                type="text"
                name='label'
                value={label}
                onChange={(e)=>{
                    fillCharacteristics(e.target.name, e.target.value, index)
                    onChange(e)
                }}

            />
            <TextField
                error={error?.value}
                label="Розмір"
                variant="outlined"
                placeholder='Розмір'
                type="text"
                name='value'
                value={value}
                onChange={(e)=>{
                    fillCharacteristics(e.target.name, e.target.value, index)
                    onChange(e)
                }}
                // sx={{ m: 1, width: '25ch' }}
            />
            <div className='new-field__end'>
                <FormControl fullWidth>
                    <InputLabel >Одиниці вимірювання</InputLabel>
                    <Select
                        error={error?.unit}
                        name='unit'
                        value={unit}
                        label="Одиниці вимірювання"
                        onChange={(e)=>{
                            fillCharacteristics(e.target.name, e.target.value, index)
                        }}
                    >
                        {units.map((el)=><MenuItem key={el}  value={el}>{el}</MenuItem>)}
                    </Select>
                </FormControl>
                <IconButton
                            sx={{justifySelf: 'start'}}
                            color='delete'
                            size="large"
                            onClick={()=>deleteField(index)}
                >
                    <DeleteForever fontSize="inherit" />
                </IconButton>
            </div>
        </div>
    );
};

export default NewProperty;