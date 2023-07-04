import React from 'react'
import './UserCard.scss'
import defaultFoto from '../../../assets/img/default.png'
import {home} from "../../App/App";
import Moment from "react-moment";
import {IconButton} from "@mui/material";
import {DeleteForever, Edit} from "@mui/icons-material";
import {deleteUserFS} from "../requests/users";

const UserCard = (props) => {
    // console.log(props)

    const {_id, imgUrl, name, tel, email, comments, evals, favorites, rating, reviews, createdAt, onDeleted=()=>{}} = props

    const deleteCard = async () => {
        const isDeleted = await deleteUserFS(_id)
        isDeleted && onDeleted(_id)
    }


    return (
        <div className='user-card shadow'>
            <div className='user-card__main'>
                <div className='user-card__ava'>
                    <img src={imgUrl ? home+imgUrl : defaultFoto} alt="foto"/>
                </div>
                <div className='user_card__contacts'>
                    <h3>{name}</h3>
                    <ul>
                        <li>
                            <p>Email</p>
                            <p>{email}</p>
                        </li>
                        <li>
                            <p>Телефон</p>
                            <p>{tel}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='user-card__activity'>
                <h4>Активність</h4>
                <ul>
                    <li>
                        <p>Оцінено товарів</p>
                        <p>{rating.length}</p>
                    </li>
                    <li>
                        <p>Додано коментарів</p>
                        <p>{comments.length}</p>
                    </li>
                    <li>
                        <p>Додано до улюблених</p>
                        <p>{favorites.length}</p>
                    </li>
                    <li>
                        <p>Оцінено сервіс</p>
                        <p>{evals[0] ? 'Так':'Hi'}</p>
                    </li>
                    <li>
                        <p>Відгук про сервіс</p>
                        <p>{reviews[0] ? 'Так':'Hi'}</p>
                    </li>
                </ul>
            </div>
            <div className='user-card__date'>
                <p>Створено</p>
                <Moment date={createdAt} format={'D MMM YYYY'}/>
            </div>
            <IconButton
                sx={{position:'absolute', top: 0, right: 0}}
                size="large"
                color='delete'
                onClick={deleteCard}
            >
                <DeleteForever fontSize='inherit'/>
            </IconButton>
        </div>
    );
};

export default UserCard;