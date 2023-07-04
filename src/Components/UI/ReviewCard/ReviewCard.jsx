import React from 'react'
import './ReviewCard.scss'
import defaultFoto from "../../../assets/img/default.png"
import Moment from "react-moment"
import {IconButton, Rating} from "@mui/material"
import {DeleteForever, Edit} from "@mui/icons-material"
import {home} from "../../App/App";
import {fillCommentForm, openCommentForm} from "../../../store/actionCreators/actionCreatorComentModal";

const ReviewCard = (props) => {

    const {
        id='',
        imgUrl='',
        rating=0,
        defaultTitle='',
        title='',
        date='',
        text='',
        deleteCard=()=>{},
        editCard=()=>{},
        goToProduct=()=>{}
    } = props

    const onEdit = (id, oldText) => {
        fillCommentForm(oldText)
        openCommentForm((newText)=>editCard(id, newText))
    }

    return (
        <div className='review-card shadow'>
            <div className='review-card__foto'
                 onClick={goToProduct}
            >
                <img src={imgUrl ? home+imgUrl : defaultFoto} alt="Foto"/>
            </div>
            <div className='review-card__main'>
                <div className="review-card__top">
                    {title ? <h4>{title}</h4> : <h4>{defaultTitle}</h4>}

                    <p>{<Moment date={date} format={'D MMM YYYY'}/>}</p>
                </div>
                {!!rating &&
                <div className='review-card__rating'>
                    <Rating
                            value={rating}
                    />
                </div>}
                <p className="review-card__content">
                    {text}
                </p>
                <div className="review-card__action">
                    <IconButton
                        color='primary'
                        sx={{padding:1}}
                        size="large"
                        onClick={()=>onEdit(id, text)}
                    >
                        <Edit fontSize='inherit'/>
                    </IconButton>
                    <IconButton
                        sx={{padding:1}}
                        size="large"
                        color='delete'
                        onClick={()=>deleteCard(id)}
                    >
                        <DeleteForever fontSize='inherit'/>
                    </IconButton>
                </div>

            </div>
        </div>
    );
};

export default ReviewCard;