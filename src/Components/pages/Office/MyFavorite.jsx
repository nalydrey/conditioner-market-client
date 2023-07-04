import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import ProductCard from "../../UI/ProductCard/ProductCard";
import {getMyFavoritesFS} from "../../UI/requests/favorites";
import {getAllProducts} from "../../../store/actionCreators/actionCreatorProductCards";
import LoadingCard from "../../UI/LoadingCard";

const MyFavorite = () => {

    const limArr = new Array(3).fill(0)

    const products = useSelector(state => state.products)
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        myFavotites()
    },[])

    const myFavotites = async () => {
        const favorites = await getMyFavoritesFS()
        getAllProducts(favorites)
        setLoading(false)
    }

    return (
        <div className='card-box'>
            {isLoading ?
            limArr.map((skelet, ind) =><LoadingCard key={ind}/>)
            :
            products.map(product =>
                <ProductCard key={product._id}
                             product = {product}
                />)}
        </div>
    );
};

export default MyFavorite;