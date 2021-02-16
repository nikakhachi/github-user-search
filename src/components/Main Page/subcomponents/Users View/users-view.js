import './users-view.css';
import { useState, useEffect } from 'react';
import ToggleSwitch from './subcomponents/toggle-switch';
import ListView from './subcomponents/list-view';
import GridView from './subcomponents/grid-view';


function UsersView(props){

    const [userList, setUserList] = useState([]);
    const [reposList, setReposList] = useState([]);
    const [isGrid, setIsGrid] = useState(false);
    const [reposLoaded, setReposLoaded] = useState(false);

    useEffect(() => {
        if(props.name !== ''){
            fetch(`https://api.github.com/search/users?q=${props.name}+in:user&per_page=7`)
            .then(response => response.json())
            .then(info => setUserList(info.items))
            .catch(error => console.log(error))
        }
    }, [props.name]);

    useEffect(() => {
        fetch(`https://api.github.com/search/users?q=followers:%3E=50000+in:user`)
        .then(response => response.json())
        .then(info => {
            setUserList(info.items);
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
            setReposLoaded(false);
            let repoArray = [];
            userList.map(item => {
                fetch(item['repos_url'])
                .then(response => response.json())
                .then(fetchedRepos => {
                    let repos = '';
                    for(let i = 0; i < 3; i++){
                        repos += `${fetchedRepos[i]['name']}, `;
                    }
                    repoArray.push(repos);
                    if(repoArray.length === userList.length){
                        setReposLoaded(true);
                    }
                    setReposList(repoArray);
                })
                .catch(error => {});
            })
    }, [userList]);

    return(
        <>
        <ToggleSwitch setView={setIsGrid} view={isGrid}/>
        <div id='view-container'>
            {reposLoaded && !isGrid ? <ListView users={userList} repos={reposList}/> : 
            reposLoaded && isGrid ? <GridView users={userList} repos={reposList}/> : <></>}
        </div>
        </>
    )
}

export default UsersView;

