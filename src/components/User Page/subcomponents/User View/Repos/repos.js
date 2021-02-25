import { useSelector } from 'react-redux';


function Repos(){

    const userRepos = useSelector(state => state.repos)

    return (
        <div className='user-box' id='user-repos-box'>
                    <p id='user-repos-title'>Repositories</p>
                    {userRepos.filter((item, index) => index < 3).map((item, index) => (<a key={index} href={`https://github.com/${item.owner.login}/${item.name}`}><p id='user-repo'>{item.name}</p></a>))}
        </div>
    )
}

export default Repos;