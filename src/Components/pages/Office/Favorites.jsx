import React, {useEffect, useState} from 'react'
import '../../UI/ServiceCard/Office.scss'
import ProductCard from "../../UI/ProductCard/ProductCard";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {getAllFavoritesFS} from "../../UI/requests/favorites";
import {getAllProducts} from "../../../store/actionCreators/actionCreatorProductCards";
import LoadingCard from "../../UI/LoadingCard";
import {Pagination} from "@mui/material";

const Favorites = (props) => {

    const limit = 6
    const limArr = new Array(limit).fill(0)

    const products = useSelector(state => state.products)

    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        setLoading(true)
        allFavotites()
    },[page])

    const allFavotites = async () => {
        const [products, total] = await getAllFavoritesFS(limit, page-1)
        getAllProducts(products)
        setLoading(false)
        setTotal(total)
    }

    return (
        <div className="favorites">

            <div className='card-box'>
                {isLoading ?
                    limArr.map((skelet, ind) =><LoadingCard key={ind}/>)
                    :
                products.map(product =>
                    <ProductCard key={product._id}
                                 product = {product}
                    />)}
            </div>
            {Math.ceil(total/limit)>1 &&
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={Math.ceil(total/limit)}
                    page={page}
                    onChange={(e, val)=>setPage(val)}
                />}
        </div>

    );
};

export default Favorites;