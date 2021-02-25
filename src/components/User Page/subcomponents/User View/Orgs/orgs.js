import { useSelector } from 'react-redux';


function Orgs(){

    const userOrgs = useSelector(state => state.orgs);

    return (
        <div className='user-box' id='user-orgs-box'>
                    <p id='user-org-title'>Organization(s)</p>
                    {userOrgs.length > 0 
                    ? <>
                    <a id='user-org-url' href={`https://github.com/${userOrgs[0].login}`} ><p id='user-org-name'>{userOrgs[0].login}</p></a>
                    <img id='user-org-img' alt='user organization logo' src={userOrgs[0]['avatar_url']}/>
                    <p id='user-org-description'>{userOrgs[0].description}</p>
                    <p id='user-orgs'><strong>Other Organizations</strong> : {userOrgs.slice(1).map((item, index) => <a key={index} id='other-orgs-link' href={`https://github.com/${item.login}`}>{item.login}</a>)}</p> 
                      </> : <p id='user-org-none'>-None-</p>}
        </div>
    )
}

export default Orgs;