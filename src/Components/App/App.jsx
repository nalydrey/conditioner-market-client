import React, {useEffect} from 'react'
import './App.scss'
import Header from "../Layout/Header/Header";
import Main from "../Layout/Main/Main";
import Footer from "../Layout/Footer/Footer";
import axios from "../../utils/axios";
import {enterUser, exitUser} from "../../store/actionCreators/actionCreatorCurrentUser";
import {useNavigate} from "react-router-dom";
import {Alert, createTheme, Snackbar, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {controlMessage} from "../../store/actionCreators/actionCreatorSnack";
import { red } from '@mui/material/colors';
import {loadAllServices} from "../../store/actionCreators/actionCreatorService";
import CommentModal from "../UI/CommentModal";
import {getAllModels} from "../../store/actionCreators/actionCreatorCommon";
import { getContactFS} from "../UI/requests/contact";
import {loadContact} from "../../store/actionCreators/actionCreatorContact";
import {getServiceFS} from "../UI/requests/service";
import {getFaqsFS} from "../UI/requests/faqs";
import {loadAllFaqs} from "../../store/actionCreators/actionCreatorFaq";
import {authMeFS} from "../UI/requests/auth";
import {sendToTelegram} from "../UI/requests/telegram";


//"homepage": "https://nalydrey.github.io/test-server/",
export const home = `http://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/`



const App = () => {

    //Sneck

    const theme = createTheme({
        palette: {
            mode: 'dark',
            delete:{
                main: red[400]
            }
        },
    });

    const {type, message, isOpen} = useSelector(state => state.snack)
    const user = useSelector(state => state.currentUser)

    const navigate = useNavigate()

    useEffect(()=>{
        firstData()
        // const id = localStorage.getItem('user')
        // if(id){
        //     axios.get(`/auth/me`)
        //         .then(resp => {
        //             if (resp.data.user){
        //                 enterUser(resp.data.user)
        //             }
        //             else{
        //                 exitUser()
        //                 navigate('/')
        //             }
        //         })
        //         }
    },[])

    const firstData = async () => {
       const service = await getServiceFS()
       const {data} = await axios.get('/manufactures')
       const contacts = await getContactFS()
       await sendToTelegram(`${contacts && contacts.counter} відвідуваннь сайту`)
       const faqs = await getFaqsFS()
       const [user, token] = await authMeFS()
        if (token){
            enterUser(user)
        }
        else{
            exitUser()
            navigate('/')
        }
        loadAllServices(service)
        getAllModels(data.manufactures)
        loadContact(contacts)
        loadAllFaqs(faqs)
    }


    return (
        <ThemeProvider theme={theme}>
            <div className='app'>
                <Header/>
                <Main/>
                <Footer/>
                <Snackbar open={isOpen} autoHideDuration={3000} onClose={()=>controlMessage(false)}>
                    <Alert onClose={()=>controlMessage(false)} severity={type} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <CommentModal userId={user?._id}
                              userAva = {user?.imgUrl}
                              userName={user?.name}
                />
            </div>
        </ThemeProvider>

    );
};

export default App;