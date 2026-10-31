import React, { Suspense } from 'react';
import Users from '../component/Users';




const usersPromise=async ()=>
{
     const data=await fetch("http://localhost:5000/users");
    return await data.json();
}
const UsersPage = () => {
   
    return (
        <div>
            <h1>Users data:</h1>
            <Suspense fallback="data is loading">
              <Users usersPromise={usersPromise}></Users>
            </Suspense>
        </div>
    );
};

export default UsersPage;