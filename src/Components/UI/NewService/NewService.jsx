import React from 'react'
import './NewService.scss'
import { TextField, IconButton } from '@mui/material'
import {Cached, DeleteForever, Upload} from '@mui/icons-material'
import {deleteService, fillService, loadService} from '../../../store/actionCreators/actionCreatorService'
import {useForm} from "../../../hooks/useForm";
import {createService, deleteServiceFS, refreshService} from "../requests/service";

const NewService = (props) => {

    const {label, price, index, _id} = props


    const {validObj, checkForm, onChange} = useForm({label, price}, {label:'', price:''})
    const fillField = (e) => {
        fillService(e.target.name, e.target.value, index)
        onChange(e)
    }

    const saveService = async () => {
        const service =await createService({label, price})
        service && loadService(service, index)
    }

    const reloadService = async () => {
        const service = await refreshService({label, price}, _id)
        service && loadService(service, index)
    }

    const delService = async () => {
        if(_id){
            const isDeleted = await deleteServiceFS(_id)
            isDeleted && deleteService(index)
        }
        else deleteService(index)
    }



  return (
    <div className='new-service'>
        <TextField
            sx={{flexGrow: 1}}
            error ={validObj.label}
            label="Послуга"
            name='label'
            variant="outlined"
            value={label}
            onChange={fillField}
        />
        <div className='new-service__wrap'>
            <TextField
                type='number'
                sx={{flexGrow: 1}}
                error ={validObj.price}
                label="Ціна"
                name='price'
                variant="outlined"
                value={price}
                onChange={fillField}
            />
            <IconButton
                sx={{justifySelf: 'start'}}
                color='delete'
                size="large"
                onClick={()=>delService(index)}
            >
                <DeleteForever fontSize="inherit" />
            </IconButton>
            {!_id &&
                <IconButton
                    sx={{justifySelf: 'start'}}
                    color='primary'
                    size="large"
                    onClick={()=>checkForm(saveService)}
                >
                    <Upload fontSize="inherit" />
                </IconButton>}
            {_id &&
                <IconButton
                    sx={{justifySelf: 'start'}}
                    color='primary'
                    size="large"
                    onClick={()=>checkForm(reloadService)}
                >
                    <Cached fontSize="inherit" />
                </IconButton>}
        </div>


    </div>
  )
}

export default NewService