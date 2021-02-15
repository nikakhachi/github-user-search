import './main-page.css';
import Header from './subcomponents/Header/header';
import UsersView from './subcomponents/Users View/users-view';
import { useState } from 'react';

function MainPage(){

    const [searchedUser, setSearchedUser] = useState('');
    const [submittedUser, setSubmittedUser] = useState('');

    function submit(e){
        e.preventDefault();
        setSubmittedUser(searchedUser)
    }

    return (
        <div id='main-container'>
            <Header search={submit} change={(e) => setSearchedUser(e.target.value)} />
            <UsersView name={submittedUser}/>
        </div>
    )
}

export default MainPage;