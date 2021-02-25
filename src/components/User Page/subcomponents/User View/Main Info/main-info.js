import { useSelector } from 'react-redux';


function MainInfo(){

    const userData = useSelector(state => state.users);

    return (
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
    )
}

export default MainInfo;