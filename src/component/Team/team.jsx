import React from 'react';
import {useDispatch } from 'react-redux';
import CardHeroe from '../Heroes/cardHeroes';
import {averagePowerstast} from '../../funciones/grupos';

import { deleteGroup } from '../../actions';

import {TiDelete} from 'react-icons/ti';
import '../../styles/team.scss';

export default function Team ({nameGroup,team}) {
    const dispatch = useDispatch()
    if(team){
      var averageGroup=  averagePowerstast(team.group)      
    }
  

    return (
        <>
       {team ? <div className='group_div'>
            <div className='group_div_head'>
                <button onClick={()=>dispatch(deleteGroup(nameGroup))} className='group_div_head_b'><TiDelete/></button>
                <p className='group_div_head_p'>Equipo: <span className='group_div_head_span'>{nameGroup}</span> </p>
                <p className='group_div_head_p'>integrantes: <span className='group_div_head_span'>{team.group.length}</span></p>
            </div>
            {team.group.length>0 && <div className='group_div_body'>
                <div className='group_div_body_d1'> 
                    <div className='group_div_body_d1_d'>
                        <p className='group_div_body_d1_d-p'>powerstats grupales</p>
                        <div className='group_div_body_d1_d-1'>
                            {
                            averageGroup && averageGroup.powerstattotal.map((e,i)=><p key={i}>{e.name}: {e.number}</p>)
                            }                        
                        </div>
                    </div>
                    <div className='group_div_body_d1_d2'>
                        <p>Peso promedio: {averageGroup.weight} Kg</p>
                        <p>Altura Primedio: {averageGroup.height} cm</p>
                    </div>
                </div>
                <div className='group_div_body_div2'>
                    {
                    team.group.length>0 && team.group.map(e=><CardHeroe key={e.id} props={e} grupo={nameGroup}/>)
                    }                
                </div>                
            </div>}
        </div> : <p>Cargando</p>}
        </>
    )
}
