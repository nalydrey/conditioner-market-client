import React, {useEffect, useState} from 'react'

import UserCard from "../../../UI/UserCard/UserCard"
import './Users.scss'
import {getAllUsersFS} from "../../../UI/requests/users";
import {Pagination} from "@mui/material";
import LoadingUser from "../../../UI/LoadingUser";

const limit = 4
const Users = () => {

    const [users, setUsers] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getAllUsers()
    },[page])

    const getAllUsers = async () => {
        const [users, total] = await getAllUsersFS(limit, page-1)
        setUsers(users)
        setTotal(total)
        setLoading(false)

    }

    return (
        <div className='users'>
            <div className='users__box'>
                {isLoading ?
                    [1,2,3,4].map((skelet, ind) =>
                        <LoadingUser key={ind}/>
                    )
                :
                users.map(user =>
                    <UserCard key={user._id}
                              {...user}
                              onDeleted={getAllUsers}
                    />
                )}
            </div>
            <Pagination
                sx={{alignSelf:'center'}}
                variant="outlined"
                shape="rounded"
                count={Math.ceil(total/limit)}
                page={page}
                onChange={(e, val)=>setPage(val)}
            />

        </div>

    );
};

export default Users;