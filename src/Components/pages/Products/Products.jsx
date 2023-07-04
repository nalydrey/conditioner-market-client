import React, {useEffect, useState} from 'react';
import './Products.scss'
import ControlPanel from "../../Layout/ControlPanel/ControlPanel";
import ContentBox from "../../Layout/ContentBox/ContentBox";
import ProductCard from "../../UI/ProductCard/ProductCard";
import axios from "../../../utils/axios";
import {useSelector} from "react-redux";
import { getAllProducts} from "../../../store/actionCreators/actionCreatorProductCards";
import {FormControl, IconButton, InputLabel, MenuItem, Pagination, Select} from "@mui/material";
import {KeyboardDoubleArrowDown} from "@mui/icons-material";
import FilterButton from "../../UI/FilterButton/FilterButton";
import LoadingCard from "../../UI/LoadingCard";

const menuItems = [
    {
        value: 'manufacture',
        name: 'виробник'
    },
    {
        value: 'price',
        name: 'ціна'
    },
    {
        value: 'createdAt',
        name: 'за новизною'
    },
    {
        value: 'averageRating',
        name: 'рейтинг'
    },
    {
        value: 'views',
        name: 'популярність'
    }
]

const Products = () => {

    const limit = 3
    const limArr = new Array(limit).fill(0)

    const products = useSelector(state => state.products)
    const {manufactures} = useSelector(state => state.common)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [sort, setSort] = useState('')
    const [dir, setDir] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [activeModels, setActiveModels] = useState([])

    const loadCards = async () => {
        setLoading(true)
        const sortString = sort ?  `&_sort=${sort}&_dir=${dir?-1:1}` : ''
        const {data} =await axios.get(`/products?_limit=${limit}&_page=${page-1}&${query}${sortString}`)
        setTotal(data.totalCount)
        setLoading(false)
        getAllProducts(data.products)
    }

    useEffect(()=>{
        loadCards()
    },[query, page, sort, dir])

    const getByManufacture = (manufacture) => {
        let arr = [...activeModels]
       if(activeModels.some(name => manufacture ===name)){
          arr = activeModels.filter(name => name !== manufacture)
        }
       else arr = [...activeModels, manufacture]
        setActiveModels(arr)
        setQuery(arr.map(el => 'manufacture='+el).join('&'))
    }

    const handlePagination = (e, val) => {
        setPage(val)
    }

    const handleChange = (e) =>{
        setSort(e.target.value)
    }

    const changeAll = () => {
        setActiveModels([])
        setQuery('')
    }

    return (
        <div className='products container'>
            <ControlPanel>
                <div className='manufactures'>
                    {manufactures.map(manufacture =>
                        <FilterButton
                            key={manufacture}
                            text = {manufacture}
                            isActive = {activeModels.some(name => manufacture === name)}
                            onClick={()=>getByManufacture(manufacture)}
                        />
                    )}
                    <FilterButton
                        text ='All'
                        onClick={changeAll}
                    />
                </div>
                <div className='products__price'></div>
            </ControlPanel>
            <ContentBox >
                <div className='sort__box shadow'>
                    <FormControl fullWidth>
                        <InputLabel >Sort</InputLabel>
                        <Select
                            value={sort || ''}
                            label="Sort"
                            onChange={handleChange}
                        >
                            {menuItems.map(menuItem =>
                            <MenuItem key={menuItem.value}
                                      value={menuItem.value}
                            >{menuItem.name}</MenuItem>)}

                        </Select>
                    </FormControl>
                    <IconButton sx={{width: 55, transition: '.5s',transform: dir && 'rotate(180deg)'}}
                                onClick={()=>setDir(!dir)}
                    >
                        <KeyboardDoubleArrowDown />
                    </IconButton>
                </div>

                <div className='card-box'>
                    {isLoading ?
                        limArr.map((skelet, ind) =><LoadingCard key={ind}/>)


                    :
                    products.map(product =>
                        <ProductCard key={product._id}
                                     product={product}
                                     onDeleted = {loadCards}
                    />)}
                </div>
                {Math.ceil(total/limit)>1 &&
                <Pagination
                            variant="outlined"
                            shape="rounded"
                            count={Math.ceil(total/limit)}
                            page={page}
                            onChange={handlePagination}
                />}
            </ContentBox>
        </div>
    );
};

export default Products;