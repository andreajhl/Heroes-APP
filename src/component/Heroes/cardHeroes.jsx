import React from 'react';

import Select, { components } from 'react-select';
import { useDispatch } from 'react-redux';
import {Accordion} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { addHeroeGroup, removeHeroe, removeHeroeGroup } from '../../actions';

import {TiDelete} from 'react-icons/ti';
import '../../styles/carousel.scss';

const controlStyles = {
    borderRadius: '10%',
    width:'auto',
    border: '1px solid #074e0f',
    background: '#00a914',
    color: 'white',
};
const ControlComponent = props=> (
    <div style={controlStyles}>
        <components.IndicatorsContainer {...props} />
    </div>
);

export default function CardHeroe({props,optionsTeam,grupo}) {

    const dispatch = useDispatch();
    const {name,id,powerstats,img}=props;
    const {intelligence, strength, speed, durability, power, combat}= powerstats;

    function handleChange(e){
        
        dispatch(addHeroeGroup(id,e.value));
    };

    return (

        <div className='card_div'>
            <div className='card_div_head'>
                {grupo? <button onClick={()=>dispatch(removeHeroeGroup(id,grupo))}  className='card_div_head_button'><TiDelete className='card_div_head_button_i'/></button> : <button onClick={()=>dispatch(removeHeroe(id))} className='card_div_head_button'><TiDelete className='card_div_head_button_i'/></button> }
                <Link  to={`/heroe/${id}`} className={!grupo?'card_div_head_img':'card_div_head_Gimg'}> <img src={img} alt={`foto de ${name}`} style={{width:'100%',height:'100%'}}/></Link>
               { optionsTeam && <Select 
                    id="select"
                    options={optionsTeam}
                    onChange={(e)=>handleChange(e)}
                    placeholder='+addGroup'
                    components={{ Control: ControlComponent }}
                />}
            </div>
           { grupo && <Accordion>
                <Accordion.Item eventKey={id}>
                    <Accordion.Header>{name}</Accordion.Header>
                    <Accordion.Body>
                    <div className='accordion-div'>
                        <p>Inteligencia: {intelligence} </p>
                        <p>Fuerza: {strength}</p>
                        <p>Velocidad: {speed}</p>
                        <p>Durabilidad: {durability}</p>
                        <p>Potencia: {power}</p>
                        <p>Combate: {combat}</p>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>}
        </div>
    );
};