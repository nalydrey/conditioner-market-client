import React from 'react'
import './HomeOffice.scss'
import Contacts from "./Contacts/Contacts";
import Services from "./Services";
import FaqCreator from "./FaqCreator";
import {useSelector} from "react-redux";




const HomeOffice = () => {

    const contact = useSelector(state => state.contact)

  return (
    <div className='office-home'>

        <h2>Сайт відвідали {contact.counter} разів</h2>
        <h2>Мої контакти</h2>
        <Contacts/>

        <h2>Послуги та ціни</h2>
        <Services/>

        <h2>Часті питання</h2>
        <FaqCreator/>
    </div>
  )
}

export default HomeOffice