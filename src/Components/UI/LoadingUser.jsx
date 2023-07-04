import React from 'react';
import {Skeleton} from "@mui/material";

const LoadingUser = () => {
    return (
        <div className='user-card shadow'>
            <div className='user-card__main'>
                <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px', width: '80px', minHeight: '80px'}}/>
                <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px', flexGrow: 1, minHeight: '80px'}}/>
            </div>

            <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px',marginTop: 1.5, flexGrow: 1, minHeight: '160px'}}/>
            <Skeleton className='shadow' variant="rounded"  height={30} sx={{ borderRadius: '10px',marginTop: 1.5, flexGrow: 1, minHeight: '10px'}}/>
        </div>
    );
};

export default LoadingUser;