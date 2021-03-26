import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const token = process.env.REACT_APP_TOKEN_KEY;


function usersGetRequest () {
    return {
        type: `USERS_GET_REQUEST`
    }
}

function usersReset () {
    return {
        type: 'USERS_RESET'
    }
}

function usersLoaded () {
    return {
        type: 'USERS_LOADED'
    }
}

function usersGetSuccess (users) {
    return {
        type: `USERS_GET_SUCCESS`,
        payload: users
    }
}

function reposGetSuccess (repos) {
    return {
        type: `REPOS_GET_SUCCESS`,
        payload: repos
    }
}

function orgsGetSuccess (orgs) {
    return {
        type: `ORGS_GET_SUCCESS`,
        payload: orgs
    }
}

function usersGetError (error) {
    return {
        type: 'USERS_GET_ERROR',
        payload: error
    }
}


const initialState = {
    loading: true,
    users: [],
    repos: [],
    orgs: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case `USERS_GET_REQUEST`:
            return {...state, loading: true}
        case `USERS_GET_SUCCESS`:
            return {...state, users: action.payload}
        case 'REPOS_GET_SUCCESS':
            return {...state, repos: action.payload}
        case 'ORGS_GET_SUCCESS':
            return {...state, orgs: action.payload}
        case `USERS_GET_ERROR`:
            return {...state, loading: false, error: action.payload}
        case `USERS_RESET`:
            return {...initialState}
        case 'USERS_LOADED':
            return {...state, loading: false}
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

// This function is executed when opening main page or searching in main page
const usersGetInitial = (login) => {
    return function(dispatch){
        dispatch(usersReset());
        dispatch(usersGetRequest());
        axios.get(!login ? `https://api.github.com/search/users?q=followers:%3E=50000+in:user` : `https://api.github.com/search/users?q=${login}+in:user&per_page=7`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(response.data.items.length > 0){
                dispatch(usersGetSuccess(response.data.items));
             }else{
                dispatch(usersGetError());
             }
            let repoArray = [];
            response.data.items.map(item => {
                axios.get(item['repos_url'])
                .then(response => {
                    let repos = response.data[2] ? `${response.data[0].name}, ${response.data[1].name}, ${response.data[2].name}`
                                : response.data[1] ? `${response.data[0].name}, ${response.data[1].name}` 
                                : response.data[0] ? `${response.data[0].name}` : 'None';
                    repoArray.push(repos);
                    if(store.getState().users.length === repoArray.length){
                        dispatch(reposGetSuccess(repoArray));
                        dispatch(usersLoaded());
                    }
                })
                .catch(error => dispatch(usersGetError(error.message)))
            })
        })
        .catch(error => dispatch(usersGetError(error.message)))
    }
}

// This function is executed when user goes in user page /:user
const getSpecificUser = (login) => {
    return function(dispatch){
        dispatch(usersReset());
        dispatch(usersGetRequest());
        axios.get(`https://api.github.com/users/${login}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(userData => {
            dispatch(usersGetSuccess(userData.data))
            axios.get(userData.data[`repos_url`])
            .then(reposData => {
                dispatch(reposGetSuccess(reposData.data));
                axios.get(userData.data['organizations_url'])
                .then(orgsData => {
                    dispatch(orgsGetSuccess(orgsData.data));
                    dispatch(usersLoaded());
                })
            })
        })
        .catch(error => dispatch(usersGetError(error.message)))
    }
}




export { store, usersGetInitial, getSpecificUser, usersReset };