import axios from 'axios';

export const SEARCH_HEROE='SEARCH_HEROE';
export const HEROE_DETAILS='HEROE_DETAILS';
export const REMOVE_HEROE='REMOVE_HEROE';
export const REMOVE_HEROE_GROUP='REMOVE_HEROE_GROUP';
export const ADD_HEROE_GROUP = 'ADD_HEROE_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const USER = 'USER'
export const DELETE_GROUP='DELETE_GROUP'

const URL = 'https://www.superheroapi.com/api.php/10226681008392670'

export function getHeroe(name){
    return async function(dispatch){
        let heroe=await axios.get(`${URL}/search/${name}`)
            heroe=heroe.data.results[0]
            
           if(heroe){
             heroe={
                name: heroe.name,
                id:heroe.id,
                powerstats:heroe.powerstats,
                img: heroe.image.url,
                appearance: {height:heroe.appearance.height[1], weight: heroe.appearance.weight[1]},
                orientation:heroe.biography.alignment
            }  
           } 
        return dispatch({type:SEARCH_HEROE, payload:heroe})
    };
};

export function getDetailsHeroe(id){
    return async function(dispatch){
        let heroe=await axios.get(`${URL}/${id}`)
            heroe=heroe.data
            heroe={
                name: heroe.name,
                nameReal: heroe.biography["full-name"],
                alias: heroe.biography.aliases,
                id:heroe.id,
                powerstats:heroe.powerstats,
                appearance: heroe.appearance,
                orientation: heroe.biography.alignment,
                img: heroe.image.url
            }
        return dispatch({type:HEROE_DETAILS, payload:heroe})
    };
};

export function removeHeroeGroup(id,grupo){
    return{
        type: REMOVE_HEROE_GROUP,
        payload:{
            id,
            grupo
        }
    };
};

export function removeHeroe(id){
    return{
        type: REMOVE_HEROE,
        payload:id
    };
};

export function addHeroeGroup(id,grupo){
    return{
        type: ADD_HEROE_GROUP,
        payload:{
            id,
            grupo
        }
    };
};

export function deleteGroup(name){
    return{
        type: DELETE_GROUP,
        payload:name
    }
}

export function addGroup(name){
    return{
        type: ADD_GROUP,
        payload:name
    }
}

export function loginState(token){
    localStorage.setItem('token',token)
    return{
        type:USER, 
        payload:token
    }
    
};

export function logoutState(){

    localStorage.removeItem('token');

    return {
        type: USER,
        payload:undefined
    }
}