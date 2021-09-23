import swal from 'sweetalert';

var state = JSON.parse(window.localStorage.getItem("grupos"));
const MAXIMO_HEROES= 3;

export function searchHeroe(id, grupo){

    let serachHeroe=state[grupo].group.find(e=>e.id===id);

    if( serachHeroe) return swal ({ title: serachHeroe.name ,
                                    text:`ya pertenece a  el grupo ${grupo}`,
                                    icon: "warning",
                                    button :false , 
                                });
    return false;
};

export function orientationSearch(id,heroes,grupo){

    var findHeroe= heroes.find(e=>e.id===id);

    if(state[grupo][findHeroe.orientation] && state[grupo][findHeroe.orientation]>=MAXIMO_HEROES){ 
       
        return   swal ({title:`equipo ${grupo}`,
                        text:`ya tiene 3 personajes ${findHeroe.orientation}`,
                        icon: "warning",
                        button :false , 
                    });
    };

    return findHeroe;
};

export function addHeroeTeam(heroes,id,grupo){
    
    let heroe=orientationSearch(id,heroes,grupo);
    let search=searchHeroe(id,grupo);

    if(!search && heroe.orientation ){

        let heroesArray= heroes.filter(e=>e.id!==id);
    
        state[grupo]={
            [heroe.orientation]: state[grupo][heroe.orientation]? state[grupo][heroe.orientation]+=1 : state[grupo][heroe.orientation]=1 ,
            group:[heroe, ...state[grupo].group]
        };
      
        window.localStorage.setItem("grupos",JSON.stringify(state));

        return {
            state,
            heroesArray
        }; 
    };            
};

export function removeHeroeGroup(id,grupo){

    let remove=state[grupo].group.find(e=>e.id===id);

    state[grupo].group= state[grupo].group.filter(e=>e.id!==id);

    state[grupo][remove.orientation]-=1;

    window.localStorage.setItem("grupos",JSON.stringify(state));
    
    return state;
};

export function addTeam(name){

    if(state===null){
        state={}
    };

    state[name]={
        group:[]
    };

    window.localStorage.setItem("grupos",JSON.stringify(state));

    return state;
};

export function deleteTeam(name){

    delete state[name];

    window.localStorage.setItem("grupos",JSON.stringify(state));

    return state;
};

export function averagePowerstast(group){
    let intelligence={
        number:0,
        name:'intelligence'
    };

    let strength={
        number:0,
        name:'strength'
    };

    let speed={
        number:0,
        name:'speed'
    };

    let durability={
        number:0,
        name:'durability'
    };

    let power={
        number:0,
        name:'power'
    };

    let combat={
        number:0,
        name:'combat'
    };

    let weight=0;
    let height=0;

    let powerstattotal=[intelligence, strength, speed, durability, power, combat];

    group.map(e=>{

        weight+=Number(e.appearance.weight.split(' ')[0])
        height+=Number(e.appearance.height.split(' ')[0])    
        
        return powerstattotal.map(a=>(
            a.number+=e.powerstats[a.name] !=='null' ? Number(e.powerstats[a.name]) : 0
        ));
    });

    powerstattotal.sort((a,b)=>b.number - a.number);

    weight=Math.round(weight/group.length);

    height=Math.round(height/group.length);

    return {powerstattotal,weight,height};
};