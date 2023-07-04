import React from 'react';
import {Skeleton} from "@mui/material";

const LoadingCard = () => {
    return (
        <div className='loading-card product-card shadow' style={{gap: '3px'}}>
            <Skeleton className='shadow' variant="text" sx={{ fontSize: '30px' }} />
            <Skeleton className='shadow' variant="rounded"  height={180} />
            <Skeleton className='shadow' variant="text" width={80} sx={{ fontSize: '30px', alignSelf: 'end' }} />
            <Skeleton className='shadow' variant="text" width={150} sx={{ fontSize: '28px', alignSelf: 'center' }} />
            <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '50px' }}/>
            <div className='product__price'>
                <Skeleton className='shadow' variant="text" width={80} sx={{ fontSize: '30px' }} />
                <Skeleton className='shadow' variant="text" width={80} sx={{ fontSize: '30px' }} />
            </div>
        </div>
    );
};

export default LoadingCard;