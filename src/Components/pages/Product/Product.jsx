import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import './Product.scss'
import Slider from "../../Slider/Slider"
import {home} from "../../App/App";
import {IconButton, Rating} from "@mui/material";
import {Comment, FavoriteBorder, PeopleAlt, Visibility} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {getProductById} from "../../UI/requests/product";
import {addNewComment, changeCommentOS, deleteCommentFS, getProductComments} from "../../UI/requests/comments";
import {changeRatingOS} from "../../UI/requests/rating";
import {changeFavoriteOS} from "../../UI/requests/favorites";
import ReviewCard from "../../UI/ReviewCard/ReviewCard";
import {fillCommentForm, openCommentForm} from "../../../store/actionCreators/actionCreatorComentModal";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const Product = () => {

    const {id} = useParams()
    const user = useSelector(state => state.currentUser)

    const [comments, setComments] = useState([])
    const [product, setProduct] = useState(null)
    console.log(product)
    useEffect(()=>{
        getComments()
        getProduct()
    },[])

    const getComments = async () => {
        const comments =await getProductComments(id)
        setComments([...comments])
    }

    const getProduct = async () => {
        const product = await getProductById(id)
        setProduct(product)
    }
    const favoriteControl = async () => {
        const isAdd = await changeFavoriteOS( product._id)
        console.log(isAdd)
        const newArr = isAdd ? [...product.favorites, user._id]
            : product.favorites.filter(user => user === user._id)

            setProduct({...product, favorites: newArr})
    }

    const changeRating = async (value) => {
        if (user){
            const {rating, averageRating} = await changeRatingOS({value, user: user._id}, product._id )
            rating && setProduct({...product, rating:[...product.rating, rating]})
            setProduct({...product, averageRating})
        }
    }

    const addComment = async () => {

        openCommentForm(async (text)=>{
           const comment = await addNewComment(text, id, user._id)
            if(comment) {
                setComments([comment, ...comments])
                setProduct({...product, comments: [...product.comments, comment]})
            }

        })
    }

    const deleteComment = async (commentId) => {
        const isDeleted = await deleteCommentFS(commentId)
        if(isDeleted){
            setComments(comments.filter(comment => comment._id !== commentId))
            setProduct({...product, comments: product.comments.filter(comment => comment._id !== commentId)})
        }
    }


    const editComment = async (commentId, oldText) => {
           const {text} = await changeCommentOS(commentId, oldText)
           setComments(comments.map(comment => comment._id === commentId ?  {...comment, text} : comment))
    }

    console.log(comments[0])
    return(
        product ?
        <div className='product container'>
            <h1>{product.manufacture} {product.model}</h1>
            <div className='statistics'>
                <div className='count-box'>
                    <div className='product__ratind'>
                        <Rating
                            name="rating"
                            value={product.averageRating}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                changeRating(newValue);
                            }}
                        />
                        <span className='rating__count'>{product.averageRating}</span>
                    </div>
                    <div className='product-card__counter'>
                        <PeopleAlt/>
                        <span className='rating__count'>{product.rating?.length}</span>
                    </div>
                </div>
                <div className='count-box'>
                    <IconButton
                        onClick={addComment}
                    >
                        <Comment fontSize='inherit'/>
                    </IconButton>
                    <span>{product.comments.length}</span>
                </div>
                <div className='count-box'>
                    <IconButton
                        color={product.favorites.some(el => el === user._id) ? 'delete': 'primary'}
                        onClick={favoriteControl}
                    >
                        <FavoriteBorder fontSize='inherit'/>
                    </IconButton>
                </div>
                <div className='count-box'>
                    <Visibility/>
                    <span>{product.views}</span>
                </div>
            </div>
            <div className='product__fotos'>
                {!!product.imgUrl.length &&
                <Slider preview>
                    {product.imgUrl.map(elem=>
                            <div className='bar__item' key={elem} style={{backgroundImage: `url(${home+elem})`}}/>)}
                </Slider>}
            </div>
            {product.description &&
            <h2>Опис товару:</h2>}
            <p className='product__discription'>
                {product.description}
            </p>
            {!!product.characteristics.length &&
            <h2>Характеристики:</h2>}
            <ul>
                {
                    product.characteristics.map(prop => <li>
                        <p>{prop.label}</p>
                        <p>{prop.value} {prop.unit}</p>
                    </li>)
                }
            </ul>
            <h2>Відгуки</h2>
            <div className='comment__box'>
                {comments.length ?
                comments.map(comment =>
                    <ReviewCard
                            id={comment._id}
                            imgUrl={comment.user?.imgUrl}
                            title={comment.user?.name}
                            rating={comment.rating?.value}
                            defaultTitle='Користувач видалений'
                            date={comment.createdAt}
                            text={comment.text}
                            deleteCard={deleteComment}
                            editCard={editComment}
                    />
                )
                :
                <div>Коментарів поки що немає, станьте першим!</div>}

            </div>
        </div>
            :
        <div>Loading</div>

    )
}

export default Product;