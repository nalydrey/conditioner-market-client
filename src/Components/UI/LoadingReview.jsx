import React from 'react';
import {Skeleton} from "@mui/material";

const LoadingReview = () => {
    return (
        <div className='review-card shadow'>
                <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px', width: '70px', minHeight: '70px'}}/>

            <div className='review-card__main'>
                <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px', minHeight: '10px'}}/>
                <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px', minHeight: '10px'}}/>
                <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px', minHeight: '70px'}}/>
            </div>
        </div>
    );
};

export default LoadingReview;