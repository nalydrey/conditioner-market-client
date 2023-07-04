import React, {useState} from 'react'
import './CreateProduct.scss'
import {useSelector} from "react-redux"
import {
    createNewField,
    fillMain,
    resetProduct
} from "../../../../store/actionCreators/actionCreatorProduct"
import {useLocation} from "react-router-dom"
import NewProperty from "../../../UI/NewProperty/NewProperty"
import {
    Box,
    Button,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Add} from "@mui/icons-material";
import FakeProductCard from "../../../UI/ProductCard/FakeProductCard";
import {createProduct, createProductImages, editProductById} from "../../../UI/requests/product";
import ModalWindow from "../../../UI/ModalWindow";
import {useForm} from "../../../../hooks/useForm";


const CreateProduct = () => {

    const product = useSelector(state => state.product)
    const {manufactures} = useSelector(state => state.common)
    const location = useLocation()

    const [isOpen, setOpen] = useState(false)
    const [file, setFile] = useState('')

    const {validObj, checkForm, onChange} = useForm(product,
        { manufacture: '',
                model:'',
                price:'',
                characteristics:[{
                    label:'',
                    value:''
                }
                ]} )

    const createPicture = async (id) => {
        await createProductImages(id, file)
        setFile('')
        resetProduct()
    }
    const sendProduct = async () => {
        const data = await createProduct(product)
        if (file) {
            console.log(data._id)
            await createPicture(data._id)
        }
    }
    const editProduct = async () => {
        await editProductById(location.state, product)
        if (file) {
            await createPicture(location.state)
        }
    }
    return (
        <div className='create'>
            <div className='create__previev'>
                <FakeProductCard product={product} foto={file} loadFoto={(foto) => setFile(foto)}/>
                <div className='create__fields'>
                    <div className='create__category'>
                        <FormControl fullWidth>
                            <InputLabel>Виробник</InputLabel>
                            <Select
                                name="manufacture"
                                label="Виробник"
                                error={validObj.manufacture}
                                value={product.manufacture || ''}
                                onChange={(e) => {
                                    fillMain(e.target.name, e.target.value)
                                    onChange(e)
                                }}
                            >
                                {manufactures.map((el) => <MenuItem key={el} value={el}>{el}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button
                            fullWidth
                            variant='outlined'
                            sx={{minWidth: 190}}
                            onClick={() => setOpen(true)}
                        >Додати виробника</Button>

                        <ModalWindow
                            isOpen={isOpen}
                            onClose={setOpen}
                        />

                    </div>
                    <div className='create__inputs'>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name='model'
                            label="Модель"
                            error={validObj.model}
                            value={product.model} name='model'
                            placeholder='модель'
                            onChange={(e) => {
                                fillMain(e.target.name, e.target.value)
                                onChange(e)
                            }}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            name='price'
                            label="Ціна"
                            error={validObj.price}
                            value={product.price}
                            type="number"
                            placeholder='ціна'
                            onChange={(e) => {
                                fillMain(e.target.name, e.target.value)
                                onChange(e)
                            }}
                        />
                    </div>

                    <textarea
                        placeholder='Опис'
                        value={product.description}
                        name="description" cols="50" rows="5"
                        onChange={(e) => {
                            fillMain(e.target.name, e.target.value)
                        }}
                    ></textarea>
                </div>

            </div>

            <div className='property-box'>
                <h2>Додай нову властивість</h2>
                {product.characteristics.map((field, index) =>
                    <NewProperty
                        error={validObj.characteristics ? validObj.characteristics[index] : false}
                        onChange={(e)=>onChange(e, 'characteristics', index)}
                        {...field}
                        index={index}
                        key={index}
                    />)}
                <Fab color="primary"
                     size='small'
                     onClick={createNewField}
                >
                    <Add/>
                </Fab>
            </div>
            <div className='create__action'>
                {!location.state &&
                    <Button
                        variant='outlined'
                        // sx={{minWidth: 200}}
                        onClick={() => checkForm(sendProduct)}
                    >Додати
                    </Button>}
                {location.state &&
                    <Button
                        variant='outlined'
                        // sx={{minWidth: 200}}
                        onClick={() => checkForm(editProduct)}
                    >Редагувати
                    </Button>}
            </div>
        </div>
    );
};

export default CreateProduct;