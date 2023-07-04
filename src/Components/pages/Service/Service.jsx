import React, {useEffect, useState} from 'react'
import './Service.scss'
import ServiceCard from "../../UI/ServiceCard/ServiceCard";
import {useSelector} from "react-redux";
import {IconButton, Rating} from "@mui/material";
import {Comment, PeopleAlt} from "@mui/icons-material";
import {fillCommentForm, openCommentForm} from "../../../store/actionCreators/actionCreatorComentModal";
import {createEvalFS, getEvalFS} from "../../UI/requests/evaluate";
import {changeReviewOS, createReviewOS, deleteReviewFS, getAllReviewsFS} from "../../UI/requests/review";
import ReviewCard from "../../UI/ReviewCard/ReviewCard";
import loadingReview from "../../UI/LoadingReview";
import LoadingReview from "../../UI/LoadingReview";

const Service = () => {

    const limArr = new Array(3).fill(0)

    const service = useSelector(state => state.service)
    const [rating, setRating] = useState(0)
    const [totalEval, setTotalEval] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [reviews, setReviews] = useState([])
    const [isloadingReviews, setLoadingRev] = useState(false)

    useEffect(()=>{
        setLoadingRev(true)
        getAllReviews()
        getEval()
    },[])


    const getEval = async () => {
        const {totalEval, averageEval} = await getEvalFS()
        setTotalEval(totalEval)
        setRating(averageEval)
    }
    const getAllReviews = async () => {
        const {reviews, totalReviews} = await getAllReviewsFS()
        setTotalReviews(totalReviews)
        setReviews(reviews)
        setLoadingRev(false)
    }

    const changeRating = async (val) => {
       const data = await createEvalFS(val)
        setRating(data.averageEval)
        setTotalEval(data.totalEval)
        setReviews(reviews.map(rev => {
            if(rev.user._id===data.evaluate.user) return {...rev, eval: {...rev.eval, value: data.evaluate.value}}
            return rev
        }))
    }

    const sendForm = async (text) => {
        const {review, totalReviews} = await createReviewOS(text)
        if(review){
            if(!reviews.some(rev => rev._id === review._id)) {
                setTotalReviews(totalReviews)
                setReviews([review, ...reviews])
            }
        }
    }

    const deleteReview = async (reviewId) => {
        const {totalReviews} = await deleteReviewFS(reviewId)
        const newArr = reviews.filter(review => review._id!==reviewId)
        setReviews(newArr)
        setTotalReviews(totalReviews)
    }

    const changeReview = async (reviewId, oldText) => {
        const {text} = await changeReviewOS(oldText, reviewId)
        setReviews(reviews.map(rev => rev._id===reviewId ? {...rev, text} : rev))
    }
    return (
        <div className='container service'>
            <div className='service__list'>
                {service.map(serv =>
                        <ServiceCard key={serv._id}
                                     {...serv}/>)}
            </div>
            <div className="service__action">
                <div className='service__rating'>
                    <div className='rating'>
                        <Rating
                            name="rating"
                            value={rating}
                            precision={0.5}
                            onChange={(event, value) => changeRating(value)}
                        />
                        <span className='counter'>{rating}</span>
                    </div>
                    <div className='rating-people'>
                        <PeopleAlt/>
                        <span className='counter'>{totalEval}</span>
                    </div>
                    <div className='service__reviews'>
                        <IconButton
                            onClick={()=>openCommentForm(sendForm)}
                        >
                            <Comment fontSize='inherit'/>
                        </IconButton>
                        <span>{totalReviews}</span>
                    </div>
                </div>

            </div>
            <div className="service__comments">
                {
                    isloadingReviews
                        ?
                        limArr.map((_,ind) => <LoadingReview key={ind}/>)
                        :
                    reviews.map(review =>
                <ReviewCard
                    key={review._id}
                    id={review._id}
                    imgUrl={review.user?.imgUrl}
                    title={review.user?.name || 'Користувач видалений'}
                    date={review.createdAt}
                    rating={review.eval?.value}
                    text={review.text}
                    editCard={changeReview}
                    deleteCard={deleteReview}
                />)}
            </div>
        </div>
    );
};

export default Service;