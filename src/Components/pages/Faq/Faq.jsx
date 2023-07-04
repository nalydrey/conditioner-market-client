import React, {useEffect} from 'react'
import './Faq.scss'
import {useSelector} from "react-redux"
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";


const Faq = () => {

    const faqs = useSelector(state => state.faq)



    return (
        <div className='faq__container'>
            {faqs.map(faq =>
                <Accordion key={faq.title}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{faq.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq.text}
                        </Typography>
                    </AccordionDetails>
                </Accordion>)}
        </div>
    );
};

export default Faq;