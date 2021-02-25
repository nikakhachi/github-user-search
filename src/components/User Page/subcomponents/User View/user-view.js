import MainInfo from './Main Info/main-info';
import Orgs from './Orgs/orgs';
import Repos from './Repos/repos';
import { useDispatch } from 'react-redux';


function UserView (){

    const dispatch = useDispatch();

    return (
        <div id='user-body'>
                <MainInfo />
                <Orgs />
                <Repos />
        </div>
    )
}

export default UserView;