import React from 'react'
import './ProductCard.scss'
import {useNavigate} from "react-router-dom";
import {autoFillProduct} from "../../../store/actionCreators/actionCreatorProduct";
import {home} from "../../App/App";
import defaultFoto from '../../../assets/img/default.png'
import {IconButton, Rating} from "@mui/material";
import {Comment, DeleteForever, Edit, FavoriteBorder, PeopleAlt, Visibility} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {changeRatingOS} from "../requests/rating";
import {deleteProductById} from "../requests/product";
import {addPropToProduct, changeRating, toggleFavorite} from "../../../store/actionCreators/actionCreatorProductCards";
import {changeFavoriteOS} from "../requests/favorites";
import {openCommentForm} from "../../../store/actionCreators/actionCreatorComentModal";
import {addNewComment} from "../requests/comments";
import DropDown from "../DropDown/DropDown";
import {showMessage} from "../../../store/actionCreators/actionCreatorSnack";

const ProductCard = (props) => {

    const {product, onDeleted=()=>{}} = props

    const user = useSelector(state => state.currentUser)
    const navigate = useNavigate()

    const changeCardRating = async (value) => {
        if(user){
            if(value) {
                const {rating, averageRating} = await changeRatingOS({value}, product._id);
                rating && addPropToProduct('rating', rating.product, rating._id)
                changeRating(product._id, averageRating)
            }
        }
        else{showMessage('Тільки зареєстровані користувачі можуть cтавити рейтинг', 'info')}
    }

    const favoriteControl = async () => {
        if(user){
            const isAdd = await changeFavoriteOS(product._id)
            toggleFavorite(isAdd, product._id, user._id)
        }
        else{showMessage('Тільки зареєстровані користувачі можуть додавати товар до улюблених', 'info')}
    }

    const deleteCard = async () => {
        const isDeleted = await deleteProductById(product._id)
        isDeleted && onDeleted(product._id)
    }
console.log(home+product.imgUrl[0]);
    const editCard = () => {
        const data = {
            imgUrl: product.imgUrl,
            model: product.model,
            manufacture: product.manufacture,
            price: product.price,
            description: product.description,
            characteristics: product.characteristics
        }
        navigate('/office/create', {state: product._id})
        autoFillProduct(data)
    }

    const addCommentToProduct = () => {
        if(user){
            openCommentForm( async (text) => {
                const comment = await addNewComment(text, product._id)
                comment && addPropToProduct('comments', comment.product, comment._id )
            })
        }
        else{showMessage('Тільки зареєстровані користувачі можуть залишати відгуки', 'info')}

    }


    return (
        <div className='product-card shadow'>
            <div className='blick__wrap'>
                <div className='product-card__blick'></div>
            </div>
            <div className='product-card__top'>
                <div className='product__ratind'>
                    <Rating
                        name="rating"
                        value={product.averageRating}
                        precision={0.5}
                        onChange={(event, value) => changeCardRating(value)}
                    />
                    <span className='rating__count'>{product.averageRating}</span>
                </div>
                <div className='product-card__counter'>
                    <PeopleAlt/>
                    <span className='rating__count'>{product.rating?.length}</span>
                </div>
                <div className='count-box'>
                    <Visibility/>
                    <span>{product.views}</span>
                </div>
            </div>

            <div className='product-card__foto'
                 onClick={() => navigate(`/product/${product._id}`)}
            >
                <img src={product.foto ? URL.createObjectURL(product.foto[0]) : product.imgUrl?.length ? home+product.imgUrl[0] : defaultFoto } alt=""/>
            </div>

            <div className='product__activity'>
                <IconButton
                    sx={{paddingBottom: 0, paddingTop: 0}}
                    color={product.favorites?.some(el => el === user?._id) ? 'delete': 'primary'}
                    onClick={favoriteControl}
                >
                    <FavoriteBorder fontSize='inherit'/>
                </IconButton>

                <div className='product__comment'>
                    <IconButton
                        sx={{paddingBottom: 0, paddingTop: 0}}
                        onClick={addCommentToProduct}
                    >
                        <Comment fontSize='inherit'/>
                    </IconButton>
                    <span>{product.comments.length}</span>
                </div>
            </div>

            <h3>{product.model ? product.manufacture +' '+ product.model : 'Назва товару'}</h3>

            <DropDown>
                {!!product.characteristics.length &&
                    <ul className='list'>
                        {product.characteristics.map((property, ind) =>
                            <li key={ind}>
                                <p>{property.label}</p>
                                <p>{property.value} {property.unit}</p>
                            </li>
                        )}
                    </ul>
                }
            </DropDown>

            <div className='product__price'>
                <p>Ціна:</p>
                <p>{product.price} грн</p>
            </div>

            {/* {(user?.role === 'admin') && */}
                <div className='product-card__action'>
                    <IconButton
                        size="large"
                        onClick={editCard}
                    >
                        <Edit fontSize='inherit'/>
                    </IconButton>
                    <IconButton
                        size="large"
                        color='delete'
                        onClick={deleteCard}
                    >
                        <DeleteForever fontSize='inherit'/>
                    </IconButton>
                </div>
            {/* } */}
        </div>
    );
};

export default ProductCard;