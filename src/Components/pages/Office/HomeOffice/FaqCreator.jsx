import React from 'react';
import NewFaq from "../../../UI/NewFaq/NewFaq";
import {Button, Fab} from "@mui/material";
import {addFaq} from "../../../../store/actionCreators/actionCreatorFaq";
import {Add} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {useForm} from "../../../../hooks/useForm";

const newFaq = {
    title: '',
    text: ''
}
const FaqCreator = () => {

    const faqs = useSelector(state => state.faq)


    return (
        <div className='faq'>
            {faqs.map((faq, ind)=><NewFaq {...faq} key={ind} index={ind}/>)}
            <div className='office-home__action'>
                <Fab color="primary"
                     size='small'
                     onClick={() => addFaq(newFaq)}
                >
                    <Add />
                </Fab>
            </div>
        </div>
    );
};

export default FaqCreator;