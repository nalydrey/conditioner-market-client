import React from 'react'
import './Footer.scss'
import tel from '../../../assets/icon/telephone.png'
import viber from '../../../assets/icon/viber.png'
import telegram from '../../../assets/icon/telegram.png'
import watsapp from '../../../assets/icon/watsapp.png'
import {useSelector} from "react-redux";

const Footer = () => {

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
        <footer >
            <div className='container footer__container shadow'>
                {contacts.map((contact,ind) =>
                    contact.data &&
                    <div key={ind} className='cont__item'>
                        <div className='cont__img'>
                            <img src={contact.foto} alt=""/>
                        </div>
                        <div className='cont__data'>
                            {contact.data}
                        </div>
                    </div>
                )}

            </div>
        </footer>
    );
};

export default Footer;