import React, { useState } from 'react';
import UserTable from './usersTable';

const Users = () => {
    const [data, setData] = useState([
        { id: 1, username: 'john_doe', email: 'john@example.com', password: 'password123', authorization: 'Admin' },
        { id: 2, username: 'jane_smith', email: 'jane@example.com', password: 'pass456', authorization: 'User' },
        { id: 3, username: 'mark_jones', email: 'mark@example.com', password: 'mypassword', authorization: 'User' },
        { id: 4, username: 'lucy_brown', email: 'lucy@example.com', password: 'lucy123', authorization: 'Admin' },
        { id: 5, username: 'dave_white', email: 'dave@example.com', password: 'davepass', authorization: 'User' },
    ]);

    return (
        <div>
            <UserTable data={data} setData={setData} />
        </div>
    );
};

export default Users;
