import React, {useState} from 'react';
import {IconButton, Rating} from "@mui/material";
import {Comment, DeleteForever, Edit, FavoriteBorder, PeopleAlt, PhotoCamera, Visibility} from "@mui/icons-material";
import {home} from "../../App/App";
import defaultFoto from "../../../assets/img/default.png";
import {controlCommentModal} from "../../../store/actionCreators/actionCreatorComentModal";
import DropDown from "../DropDown/DropDown";

const FakeProductCard = (props) => {

    const {product, loadFoto, foto} = props

    const [favorite, setFavorite] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComents] = useState(0)
    const [views, setViews] = useState(0)
    const [ratingQty, setRatingQty] = useState(1)
    const [acum, setAcum] = useState(0)

    console.log()
    const setupRating = (e,value) => {
        if(value){
            setRating(value)
            setRatingQty(ratingQty+1)
            setAcum(acum+value)
        }
    }
    return (
        <div className='product-card shadow'>
            <div className='product-card__top'>
                <div className='product__ratind'>
                    <Rating
                        name="rating"
                        value={rating}
                        precision={0.5}
                        onChange={setupRating}
                    />
                    <span className='rating__count'>{Math.ceil(acum/ratingQty)}</span>
                </div>
                <div className='product-card__counter'>
                    <PeopleAlt/>
                    <span className='rating__count'>{ratingQty}</span>
                </div>
                <div className='count-box'>
                    <Visibility/>
                    <span>{views}</span>
                </div>
            </div>

            <div className='product-card__foto' onClick={()=>setViews(views+1)}>
                <img src={foto ? URL.createObjectURL(foto[0]) : product.imgUrl?.length ? home+product.imgUrl[0] : defaultFoto } alt=""/>
                <IconButton color="primary"
                            component="label"
                            sx={{position:'absolute', right: 10, bottom: 10}}
                            onClick={(e)=>e.stopPropagation()}
                >
                    <input hidden
                           accept="image/*"
                           type="file"
                           multiple
                           onChange={(e)=>loadFoto(e.target.files)}
                    />
                    <PhotoCamera />
                </IconButton>
            </div>

            <div className='product__activity'>
                <IconButton
                    sx={{paddingBottom: 0, paddingTop: 0}}
                    color={favorite ? 'delete': 'primary'}
                    onClick={()=>setFavorite(!favorite)}
                >
                    <FavoriteBorder fontSize='inherit'/>
                </IconButton>

                <div className='product__comment'>
                    <IconButton
                        sx={{paddingBottom: 0, paddingTop: 0}}
                        onClick={()=>setComents(comment+1)}
                    >
                        <Comment fontSize='inherit'/>
                    </IconButton>
                    <span>{comment}</span>
                </div>
            </div>

            <h3>{product.model ? product.manufacture +' '+ product.model : 'Назва товару'}</h3>
            <ul>
            <DropDown>
                {
                    !!product.characteristics.length &&
                    <ul>
                        {product.characteristics.map((property, ind) =>
                            <li key={ind}>
                                <p>{property.label}</p>
                                <p>{property.value} {property.unit}</p>
                            </li>
                        )}
                    </ul>
                }
            </DropDown>
            </ul>
            <div className='product__price'>
                <p>Ціна:</p>
                <p>{product.price} грн</p>
            </div>
        </div>
    );
};

export default FakeProductCard;