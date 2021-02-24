import { Link } from 'react-router-dom';

function ListView({users, repos, click}){
    return (
        users.map((item, index) => (
            <div key={item.id} className='list-user-container'>
                <img className='list-avatar' src={item[`avatar_url`]} alt="user avatar"/>
                <p className='list-username'><Link onClick={click} className='list-userlink' to={`/${item.login}`}>{item['login']}</Link>
                <span className='list-usertype'>({item['type']})</span></p>
                <p className='list-repos'><strong>Repos : </strong> {repos.length !== 0 ? repos[index] : ` Can't load repositories. API Rate Limit Exceeded`}</p>
            </div>
            )
        )
    )
}

export default ListView;