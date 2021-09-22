import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import CardHeroe from './cardHeroes';
import { Carousel } from 'react-bootstrap';

import '../../styles/carousel.scss';
import folleto from '../../img/heroesApp.png'

export default function Heroes () {

    const heroes = useSelector(state => state.heroes)
    const team = useSelector(state => state.team)
    const [state, setstate] = useState('')
    const [optionsTeam, setOptionsTeam]= useState('')

    useEffect(() => {
        setstate(heroes)
        let option=[]
       
        for (const i in team) {
            if (team[i].group.length<6)option.push({value:i,label:i})
        }            
        

      setOptionsTeam(option)
    }, [heroes,team]);

    return (
        <div className='div_Ccarousel'>
           { state.length>0 ? <Carousel fade>
                {state.map((e)=><Carousel.Item key={e.id} ><CardHeroe  props={e} optionsTeam={optionsTeam}/><Carousel.Caption>{e.name}</Carousel.Caption></Carousel.Item>)}
            </Carousel> :<img src={folleto} alt='folleto heroes' style={{width:'100%',height:'90%'}} /> }       
        </div>

    )
}
