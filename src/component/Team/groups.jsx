import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addGroup } from '../../actions';
import swal from 'sweetalert';

import '../../styles/team.scss'
import Team from './team';


export default function Groups() {

    const heroes = useSelector(state=>state.heroes);
    const team = useSelector(state => state.team);
    const dispatch = useDispatch();

    const [state, setstate] = useState('');
    const [teams, setteams] = useState('');

    useEffect(() => {

      setteams(Object.keys(team));

    }, [heroes,team])

    function handleSubmit(e){

        e.preventDefault();
        teams.includes(state) ? swal(`El equipo ${state}`, "ya existe", "error") : dispatch(addGroup(state));
        setstate('');

    };

    return (
        <div className='team'>
            <div className='team_add'>
                <button onClick={(e)=>handleSubmit(e)} className='team_add_button'>Add</button>
                <input placeholder='create group..'  name='state' value={state} onChange={(e)=> setstate(e.target.value)} className='team_add_i'/>
            </div>
            <div className='team_div'>
                {
                  teams.length> 0 && teams.map((e,i)=><Team key={i} team={team[e]} nameGroup={e} />)
                }
            </div>
        </div>
    );
};