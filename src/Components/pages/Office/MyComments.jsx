import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {changeCommentOS, deleteCommentFS, getMyCommentsFS} from "../../UI/requests/comments";
import ReviewCard from "../../UI/ReviewCard/ReviewCard";
import LoadingReview from "../../UI/LoadingReview";

const MyComments = () => {

    const limArr = new Array(4).fill(0)

    const [comments, setComments] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getMyComments()
    },[])

    const getMyComments = async () => {
        const comments = await getMyCommentsFS()
        setComments(comments)
        setLoading(false)
    }

    const deleteMyComment = async (commentId) => {
        const isDeleted = await deleteCommentFS(commentId)
        isDeleted && setComments(comments.filter(comment => comment._id !== commentId))
    }

    const editMyComment = async (commentId, newText) => {
        const {text} = await changeCommentOS(commentId, newText)
        setComments(comments.map(comment => comment._id === commentId ?  {...comment, text } :  comment))
    }


    return (
        <div className='my-comment__box'>
            {isLoading
            ?
            limArr.map((skelet, ind) => <LoadingReview key={ind}/> )
            :
            comments.map(comment =>
                <ReviewCard
                    id={comment._id}
                    key={comment._id}
                    text={comment.text}
                    date={comment.createdAt}
                    rating={comment.rating?.value}
                    imgUrl={comment.product.imgUrl[0]}
                    title={`${comment.product.manufacture} ${comment.product.model}`}
                    editCard = {editMyComment}
                    deleteCard={deleteMyComment}
                />
            )}

        </div>
    );
};

export default MyComments;