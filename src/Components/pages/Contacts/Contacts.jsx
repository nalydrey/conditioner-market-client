import React from 'react'
import './Contacts.scss'
import {useSelector} from "react-redux"
import tel from '../../../assets/icon/telephone.png'
import viber from '../../../assets/icon/viber.png'
import telegram from '../../../assets/icon/telegram.png'
import watsapp from '../../../assets/icon/watsapp.png'
import GetInTouchForm from "../../UI/GetInTouchForm/GetInTouchForm";

const Contacts = () => {

   const main = useSelector(state => state.contact)

    const contacts = [
        {
           data: main.tel,
           foto: tel
        },
        {
            data: main.telegram,
            foto: telegram
        },
        {
            data: main.viber,
            foto: viber
        },
        {
            data: main.watsapp,
            foto: watsapp
        }
    ]

    return (
        <div className='contacts container'>
            <h1>Наші контакти</h1>
            <div className='contacts__box'>
                {contacts.map((contact, ind) =>
                    contact.data &&
                    <div key={ind} className='contacts__item shadow'>
                        <div className='contact__sign'>
                            <img src={contact.foto} alt="tel"/>
                        </div>
                        <div className='contact'>
                            {contact.data}
                        </div>
                    </div>
                )}
            </div>
            <h2>Надіслати повідомлення, ми Вам перетелефонуємо</h2>
            <GetInTouchForm/>
        </div>
    );
};

export default Contacts;