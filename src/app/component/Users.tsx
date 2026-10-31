import React, { use } from 'react';
import UserCard from './UserCard';



interface User{
    id?:number,
    _id?:string,
    name:string,
    email:string
}
const Users = ({usersPromise}:{usersPromise:()=> Promise<User[]>}) => {
    const users=use(usersPromise());
    return (
        <div>
            <p className="mb-4 text-muted-foreground">Total users: {users.length}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.map(user=><UserCard key={user.id ?? user._id ?? user.email} user={user}></UserCard>)}
            </div>
        </div>
    );
};

export default Users;
