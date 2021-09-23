import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from "react-router";

import { getDetailsHeroe } from '../../actions';

import {IoSpeedometerOutline, IoArrowBackCircle} from 'react-icons/io5';
import {GiBrain, GiMuscleUp, GiHighKick} from 'react-icons/gi';
import{ OverlayTrigger, Tooltip} from 'react-bootstrap';
import {BsClockHistory} from 'react-icons/bs';
import cargando from '../../img/cargando.gif';
import {ImPower} from 'react-icons/im';
import '../../styles/details.scss';

export default function Details() {

    const details = useSelector((state) => state.details);
    const dispatch = useDispatch();
    const history = useHistory()
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetailsHeroe(id))
    }, [dispatch,id])

    const {alias, appearance, img, name, nameReal, orientation, powerstats}= details;

    if(details && details.name ){

        var {intelligence, strength, speed, durability, power, combat}= powerstats;
        var {gender,height,race,weight}=  appearance;

    }

    return (
        <div className='C-details'>
            {details && details.name ? (<div className='details'>
                <div className='details_div1'>
                    <button onClick={()=>history.push('/')} className='details_div1_b'><IoArrowBackCircle/></button>
                    <img src={img} alt={`superheroe ${name}`}  className='details_div1_i'/>
                </div>
                <div className='details_div2'>
                    <div className='details_div2_head'> 
                        <h2 className='details_div2_head_name'>{name} <span className={`details_div2_head_${orientation}`}>'{orientation}'</span></h2>
                        {nameReal && <h5 className='details_div2_head_realName'>({nameReal})</h5>}
                        <div className='details_div2_head_dAlias'>
                            <h4 className='details_div2_head_dAlias_title'>Alias</h4>
                            <div className='details_div2_head_dAlias_d'>
                                  {alias && alias.map((e,i)=><p key={i} className='details_div2_head_dAlias_d-p'>- {e.length<2 ? 'No posee Alias': e}</p>)}
                            </div>
                          
                        </div>
                        <div className='details_div2_head_dAparence'>
                            <h4 className='details_div2_head_dAlias_title'>Apariencia</h4>
                            <div className='details_div2_head_dAparence_d'>
                                <p className='details_div2_head_dAlias_d-p'>Raza: {race} </p>
                                <p className='details_div2_head_dAlias_d-p'>Genero: {gender} </p>
                                <p className='details_div2_head_dAlias_d-p'>Ojos: {appearance["eye-color"]}</p>
                                <p className='details_div2_head_dAlias_d-p'>Cabello: {appearance["hair-color"]}</p>
                                <p className='details_div2_head_dAlias_d-p'>Peso: {weight[1]} </p>
                                <p className='details_div2_head_dAlias_d-p'>Altura: {height[1]} </p>
                            </div>
                        </div>
                    </div>
                    <div className='details_div2_body'>
                        <OverlayTrigger overlay={<Tooltip>Inteligencia</Tooltip>}>
                            <div className='details_div2_body_d-1'>
                                <p className='details_div2_body_d_i'><GiBrain/></p>
                                <h4 className='details_div2_body_d_t'>{intelligence}%</h4>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip >Fuerza</Tooltip>}>
                            <div className='details_div2_body_d-2'>
                                <p className='details_div2_body_d_i'><GiMuscleUp/></p>
                                <h4 className='details_div2_body_d_t'>{strength}%</h4>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip >Velocidad</Tooltip>}>
                            <div className='details_div2_body_d-3'>
                                <p className='details_div2_body_d_i'><IoSpeedometerOutline/></p>
                                <h4 className='details_div2_body_d_t'>{speed}%</h4>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip >Durabilidad</Tooltip>}>
                            <div className='details_div2_body_d-4'>
                                <p className='details_div2_body_d_i'><BsClockHistory/></p>
                                <h4 className='details_div2_body_d_t'>{durability}%</h4>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip >Poder</Tooltip>}>
                            <div className='details_div2_body_d-5'>
                                <p className='details_div2_body_d_i'><ImPower/></p>
                                <h4 className='details_div2_body_d_t'>{power}%</h4>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip >Combate</Tooltip>}>
                            <div className='details_div2_body_d-6' >
                                <p className='details_div2_body_d_i'><GiHighKick title='combate'/></p>
                                <h4 className='details_div2_body_d_t'>{combat}%</h4>
                            </div>
                        </OverlayTrigger>
                       
                    </div>
                </div>        
            </div>) : <img src={cargando} alt='gif superheroe' className='details_cargando'/> }
  
            
        </div>
    )
}