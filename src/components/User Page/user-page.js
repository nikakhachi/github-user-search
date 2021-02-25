import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './user-page.css';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificUser } from '../../redux/redux';
import UserView from './subcomponents/User View/user-view';
import Error404 from './subcomponents/Errors/error404';
import Error403 from './subcomponents/Errors/error403';
import Loading from './subcomponents/Loading/loading';
import { Link } from 'react-router-dom';
import { usersReset } from '../../redux/redux';

function UserPage(){

    const userLogin = useParams().username;

    document.title = `${userLogin} | Github User Search Engine`;

    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpecificUser(userLogin));
    }, [])
    

    return (
        <div style={{textAlign: 'center'}}>
            {loading ? <Loading />
            : !loading & error === '' ? <UserView />
            : !loading & error === `Request failed with status code 404` ? <Error404 />
            : !loading & error === 'Request failed with status code 403' ? <Error403 /> : <></>}
            <Link to='/' onClick={() => dispatch(usersReset())}><button id='back-link'>Main Page</button></Link>
        </div>
    )
}

export default UserPage;