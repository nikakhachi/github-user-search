import './users-view.css';
import { useState, useEffect } from 'react';
import ToggleSwitch from './subcomponents/toggle-switch';
import ListView from './subcomponents/list-view';
import GridView from './subcomponents/grid-view';
import { usersGetInitial, usersReset } from '../../../../redux/redux';
import { useSelector, useDispatch } from 'react-redux';


function UsersView(props){

    const users = useSelector(state => state.users);
    const repos = useSelector(state => state.repos);
    const loading = useSelector(state => state.loading);

    const [isGrid, setIsGrid] = useState(false);


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(usersGetInitial());
    }, []);

    useEffect(() => {
        if(props.name !== ''){
            dispatch(usersGetInitial(props.name))
        }
    }, [props.name])


    return(
        <>
        <ToggleSwitch setView={setIsGrid} view={isGrid}/>
        <div id='view-container'>
            {!loading && !isGrid ? <ListView users={users} repos={repos} click={() => dispatch(usersReset())}/> : 
            !loading && isGrid ? <GridView users={users} repos={repos} click={() => dispatch(usersReset())}/> : <></>}
        </div>
        </>
    )
}

export default UsersView;

