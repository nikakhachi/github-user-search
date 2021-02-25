import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './user-page.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificUser, usersReset } from '../../redux/redux';
import { Link } from 'react-router-dom';


function UserPage(){

    const userLogin = useParams().username;

    document.title = `${userLogin} | Github User Search Engine`;

    const userData = useSelector(state => state.users);
    const userOrgs = useSelector(state => state.orgs)
    const userRepos = useSelector(state => state.repos);
    const loading = useSelector(state => state.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpecificUser(userLogin));
    }, [])
    

    return (
        <>
            {!loading ?
            <div id='user-body'>
                <div className='user-box' id='user-info-box'>
                    <img id='user-avatar' src={userData['avatar_url']} alt='profile picture'/>
                    <div id='user-main-info'>
                        <p id='user-fullname'>{userData.name || 'Not Specified'}</p>
                        <p id='user-login'><a href={userData['html_url']} target='_blank'>@{userData.login}</a><span> ({userData.type})</span></p>
                        <p id='user-joindate'>Joined in {userData['created_at'].slice(0, 10)}</p>
                        <p id='user-location'><i className="fa fa-map-marker" aria-hidden="true"/> {userData.location || 'Not Specified'}</p>
                        <p id='user-follow'>Following : {userData.following} | Followers : {userData.followers}</p>
                    </div>
                </div>
                <div className='user-box' id='user-orgs-box'>
                    <p id='user-org-title'>Organization(s)</p>
                    {userOrgs.length > 0 
                    ? <>
                    <a id='user-org-url' href={`https://github.com/${userOrgs[0].login}`} ><p id='user-org-name'>{userOrgs[0].login}</p></a>
                    <img id='user-org-img' alt='user organization logo' src={userOrgs[0]['avatar_url']}/>
                    <p id='user-org-description'>{userOrgs[0].description}</p>
                    <p id='user-orgs'><strong>Other Organizations</strong> : {userOrgs.slice(1).map(item => <a id='other-orgs-link' href={`https://github.com/${item.login}`}>{item.login}</a>)}</p> 
                      </> : <p id='user-org-none'>-None-</p>}
                </div>
                <div className='user-box' id='user-repos-box'>
                    <p id='user-repos-title'>Repositories</p>
                    {userRepos.filter((item, index) => index < 3).map((item, index) => (<a key={index} href={`https://github.com/${item.owner.login}/${item.name}`}><p id='user-repo'>{item.name}</p></a>))}
                </div>
                <Link to='/' onClick={() => dispatch(usersReset())}><button id='back-link'>Main Page</button></Link>
            </div>
            : <></>}
        </>
    )
}

export default UserPage;