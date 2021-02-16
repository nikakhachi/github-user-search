import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './user-page.css';


function UserPage({repos}){

    const userLogin = useParams().username;
    
    const [userRepos, setUserRepos] = useState(repos);
    const [userData, setUserData] = useState(
        {
            "login": "nick",
            "id": 939,
            "node_id": "MDQ6VXNlcjkzOQ==",
            "avatar_url": "https://avatars.githubusercontent.com/u/939?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/nick",
            "html_url": "https://github.com/nick",
            "followers_url": "https://api.github.com/users/nick/followers",
            "following_url": "https://api.github.com/users/nick/following{/other_user}",
            "gists_url": "https://api.github.com/users/nick/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/nick/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/nick/subscriptions",
            "organizations_url": "https://api.github.com/users/nick/orgs",
            "repos_url": "https://api.github.com/users/nick/repos",
            "events_url": "https://api.github.com/users/nick/events{/privacy}",
            "received_events_url": "https://api.github.com/users/nick/received_events",
            "type": "User",
            "site_admin": false,
            "name": "Nick Poulden",
            "company": "@OriginProtocol ",
            "blog": "https://poulden.com",
            "location": "Boulder, CO",
            "email": null,
            "hireable": null,
            "bio": null,
            "twitter_username": "nick_p",
            "public_repos": 65,
            "public_gists": 11,
            "followers": 93,
            "following": 28,
            "created_at": "2008-02-26T17:14:30Z",
            "updated_at": "2021-01-21T18:33:53Z"
        }
    );

    // useEffect(() => {
    //     console.log('getting specific user data');
    //     fetch(`https://api.github.com/users/${userLogin}`)
    //     .then(response => response.json())
    //     .then(data => setUserData(data))
    //     .catch(error => {});
    // }, []);

    return (
        <>
            {userData !== [] ? 
            <div id='user-body'>
                <div id='user-info-box'>
                    <img id='user-avatar' src={userData['avatar_url']} alt='profile picture'/>
                    <div id='user-main-info'>
                        <p id='user-fullname'>{userData.name}</p>
                        <p id='user-login'><a href={userData['html_url']} target='_blank'>@{userData.login}</a><span>({userData.type})</span></p>
                        <p id='user-joindate'>Joined in {userData['created_at'].slice(0, 10)}</p>
                        <p id='user-location'><i className="fa fa-map-marker" aria-hidden="true"/> {userData.location}</p>
                        <p id='user-follow'>Following : {userData.following} | Followers : {userData.followers}</p>
                    </div>
                </div>
            </div> 
            : <></>}
        </>
    )
}

export default UserPage;