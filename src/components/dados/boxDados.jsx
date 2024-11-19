import React from 'react';
import Num from './num';
import Info from './infoDado';
import Trat from './trat';

const BoxDados = () => {
    return (
        <div className='
        flex
        gap-10
        p-10
        w-full
        h-full'>
            <div className='
            flex
            flex-col
            gap-5
            w-1/2
            h-full'>
                <Num/>
                <Info/>
            </div>
            <div className='
            w-1/2
            h-full'>
                <Trat/>
            </div>
        </div>
    );
};

export default BoxDados;
