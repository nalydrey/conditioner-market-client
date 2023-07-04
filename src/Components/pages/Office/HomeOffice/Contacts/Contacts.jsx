import React from 'react';
import {Button, TextField} from "@mui/material";
import {changeContactOS} from "../../../../UI/requests/contact";
import {changeContact} from "../../../../../store/actionCreators/actionCreatorContact";
import {useForm} from "../../../../../hooks/useForm";
import {useSelector} from "react-redux";


const fields =[
    {
        name:'name',
        label:'Ім\'я',
    },
    {
        name:'tel',
        label:'Телефон',
    },
    {
        name:'viber',
        label:'Viber',
    },
    {
        name:'telegram',
        label:'Telegram',
    },
    {
        name:'watsapp',
        label:'WatsApp',
    },
]
const Contacts = () => {


    const contact = useSelector(state => state.contact)

    const {validObj, checkForm, onChange} = useForm(contact, {name:'', tel:''})
    const sendContact = async () => {
        await changeContactOS(contact)
    }

    const changeField = (e) => {
        changeContact(e.target.name, e.target.value)
        onChange(e)
    }

    return (
        <div className="office-home__contacts">
            {fields.map(field =>
                <TextField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    variant="outlined"
                    value={contact[field.name]}
                    error={validObj[field.name]}
                    onChange={changeField}
                />
            )}
            <Button
                onClick={()=>{checkForm(sendContact)}}
                variant="outlined"
            >Змінити</Button>
        </div>
    );
};

export default Contacts;