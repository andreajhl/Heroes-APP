export const SEARCH_HEROE='SEARCH_HEROE';
export const HEROE_DETAILS='HEROE_DETAILS';
export const REMOVE_HEROE='REMOVE_HEROE';
export const REMOVE_HEROE_GROUP='REMOVE_HEROE_GROUP';
export const ADD_HEROE_GROUP = 'ADD_HEROE_GROUP';
export const ADD_GROUP = 'ADD_GROUP';
export const USER = 'USER'
export const DELETE_GROUP='DELETE_GROUP'

export function getHeroe(name){
    return async function(dispatch){
        let heroe=await fetch(`https://www.superheroapi.com/api.php/10226681008392670/search/${name}`)
            heroe= await heroe.json()
           if(heroe.results){
             heroe={
                name: heroe.results[0].name,
                id:heroe.results[0].id,
                powerstats:heroe.results[0].powerstats,
                img: heroe.results[0].image.url,
                appearance: {height:heroe.results[0].appearance.height[1], weight: heroe.results[0].appearance.weight[1]},
                orientation:heroe.results[0].biography.alignment
            }  
           } 
        return dispatch({type:SEARCH_HEROE, payload:heroe})
    };
};

export function getDetailsHeroe(id){
    return async function(dispatch){
        let heroe=await fetch(`https://www.superheroapi.com/api.php/10226681008392670/${id}`)
            heroe= await heroe.json()
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