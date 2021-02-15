import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function UserPage(){

    const userLogin = useParams().username;
    
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        console.log('getting specific user data');
        fetch(`https://api.github.com/users/${userLogin}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => {});
    }, []);

    return (
        <div>
            User
        </div>
    )
}

export default UserPage;