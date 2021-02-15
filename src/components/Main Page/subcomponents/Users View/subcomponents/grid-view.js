import { Link } from 'react-router-dom';

function GridView({users, repos}){
    return (
        <div id='grid-view-container'>
        {users.map((item, index) => (
            <div key={item.id} className='grid-user-container'>
                <img className='grid-avatar' src={item[`avatar_url`]} alt="user avatar"/>
                <p className='grid-username'><Link className='list-userlink' to={`/${item.login}`}>{item['login']}</Link>
                <span className='grid-usertype'>({item['type']})</span></p>
                 <p className='grid-repos'><strong>Repos :</strong>{repos.length !== 0 ? repos[index] : ` Can't load repositories. API Rate Limit Exceeded`}</p>
            </div>
            ) 
        )}
        </div>
    )
}

export default GridView;