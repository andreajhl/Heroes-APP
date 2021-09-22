import React from 'react';

import NavBar from '../NavBar/navBar';
import Heroes from '../Heroes/heroes';
import Group from '../Team/groups';

import '../../styles/home.scss';

export default function Home() {
   

    return (
        <div className='home'>
            <div className='home_nav'>
                <NavBar/>
            </div>
            <div className='home_div'>
                <div className='home_div_carousel' id='home_div_carousel'>
                    <Heroes/>
                </div>
                <div className='home_div_groups'>
                    <Group/>
                </div>
            </div>
        </div>
    )
}
