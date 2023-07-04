import React from 'react'
import './Main.scss'
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/Home/Home";
import Service from "../../pages/Service/Service";
import Products from "../../pages/Products/Products";
import Faq from "../../pages/Faq/Faq";
import Register from "../../pages/Register/Register";
import Office from "../../pages/Office/Office";
import Contacts from "../../pages/Contacts/Contacts";
import Login from "../../pages/Login/Login";
import Product from "../../pages/Product/Product";

const Main = () => {
    return (
        <main >
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='service' element={<Service/>}/>
                    <Route path='products' element={<Products/>}/>
                    <Route path='product/:id' element={<Product/>}/>
                    <Route path='contacts' element={<Contacts/>}/>
                    <Route path='faq' element={<Faq/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='office/*' element={<Office/>}/>
                </Routes>
        </main>
    );
};

export default Main;