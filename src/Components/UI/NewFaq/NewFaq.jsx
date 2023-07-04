import React from 'react'
import {TextField, IconButton, TextareaAutosize} from '@mui/material'
import './NewFaq.scss'
import {Cached, DeleteForever, Upload} from '@mui/icons-material'
import {deleteFaq, fillFaq, loadFaq} from "../../../store/actionCreators/actionCreatorFaq";
import {useForm} from "../../../hooks/useForm";
import {changeFaqFS, createFaqFS, deleteFaqFS} from "../requests/faqs";

const NewFaq = (props) => {

    const {title, _id,  text, index} = props
    const {validObj, checkForm, onChange} = useForm({title, text}, {title:'', text:''})
    const fillField = (e) => {
        fillFaq(e.target.name, e.target.value, index)
        onChange(e)
    }

    //Создать
    const createFaq = async () => {
        const faq = await createFaqFS({title, text})
        loadFaq(faq, index)
    }
    //Удалит
    const removeFaq = async () => {
        if(_id){
            const isDeleted = await deleteFaqFS(_id)
            isDeleted && deleteFaq(index)
        }
        else deleteFaq(index)
    }
    //Изменить
    const changeFaq = async () => {
        const faq = await changeFaqFS({title, text}, _id)
        console.log(faq)
    }

  return (
    <div className='faq__box'>
        <div className='faq__top'>
            <TextField
                fullWidth
                error={validObj.title}
                name='title'
                value={title}
                label="Заголовок"
                variant="outlined"
                onChange={fillField}
            />
            <IconButton

                color='delete'
                size="large"
                onClick={removeFaq}
            >
                <DeleteForever fontSize="inherit" />
            </IconButton>
            {_id ?
                <IconButton
                    sx={{justifySelf: 'start'}}
                    color='primary'
                    size="large"
                    onClick={()=>checkForm(changeFaq)}
                >
                    <Cached fontSize="inherit" />
                </IconButton>
                :
                <IconButton
                    color='primary'
                    size="large"
                    onClick={()=>checkForm(createFaq)}
                >
                    <Upload fontSize="inherit" />
                </IconButton>}
        </div>

        <textarea
            style={{borderColor: validObj.text && 'red'}}
            name='text'
            value={text}
            onChange={fillField}
        ></textarea>

    </div>
  )
}

export default NewFaq