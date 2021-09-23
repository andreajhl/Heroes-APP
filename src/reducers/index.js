import {
    
    SEARCH_HEROE,
    HEROE_DETAILS,
    REMOVE_HEROE,
    REMOVE_HEROE_GROUP,
    ADD_HEROE_GROUP,
    ADD_GROUP,
    USER,
    DELETE_GROUP

} from '../actions/index';

import { addHeroeTeam,removeHeroeGroup, addTeam, deleteTeam } from '../funciones/grupos';

var localTeam = JSON.parse(window.localStorage.getItem("grupos"));
var token=localStorage.getItem('token');

const initialState = {
    team: localTeam? localTeam: {},
    heroes:[],
    details:{},
    user:token? token : false
};

export default function cart(state = initialState, action) {

    const {type, payload}=action;

    switch (type) {

        case SEARCH_HEROE:

            if(payload.id){
                var search= state.heroes.find(e=>e.id===payload.id)
            }
            
            return{
                ...state,
                heroes:search? [...state.heroes] : payload.id? [payload,...state.heroes] : [...state.heroes]
            };

        case HEROE_DETAILS:

            return{
                ...state,
                details: payload
            };

        case REMOVE_HEROE:

            return{
                ...state,
                heroes: state.heroes.filter(e=>e.id!==payload)
            };
        case REMOVE_HEROE_GROUP:

            let removeHeroe= removeHeroeGroup(payload.id,payload.grupo);

            return{
                ...state,
                team: {...removeHeroe}
            };

        case ADD_HEROE_GROUP:

            let newHeroes= addHeroeTeam(state.heroes,payload.id,payload.grupo);

            return{
                ...state,
                heroes: newHeroes? newHeroes.heroesArray : [...state.heroes],
                team:  newHeroes? newHeroes.state : {...state.team}
            };

        case ADD_GROUP:

            let addNewTeam=addTeam(payload);

            return{
                ...state,
                team:{ ...addNewTeam}
            };

        case DELETE_GROUP:

            let removeTeam=deleteTeam(payload);

            return{
                ...state,
                team: {...removeTeam}
            };

        case USER:

            return{
                ...state,
                user:payload
            };

        default: return state;
    };
};