import React from 'react';
import { Link } from 'react-router-dom';

const Nav =() => {
    return (

        <div className='
        w-full 
        flex
        flex-col
        gap-1
        p-2
        bg-primary-boxes 
        font-sans font-bold'>
        
            <h1 className='
            text-primary-amarelo
            flex
            justify-center
            text-xl
            '>Dashboard MQTT</h1>

            <div className='
            text-primary-azul
            flex
            gap-10
            px-10
            '>
                <Link className='hover:text-primary-amarelo' to='/'>Dados</Link>
                <Link className='hover:text-primary-amarelo' to='/graficos'>Gráficos</Link>
                <Link className='hover:text-primary-amarelo' to='/geral'>Geral</Link>
                <Link className='hover:text-primary-amarelo' to='/historico'>Histórico</Link>
                <Link className='hover:text-primary-amarelo' to='/thresholds'>Correlação</Link>
            </div>

        </div>

    );
}

export default Nav;