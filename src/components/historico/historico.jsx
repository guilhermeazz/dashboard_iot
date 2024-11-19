import React, { useEffect } from 'react';
import { DataContext } from '../../services/mqttdata';
import { useContext } from 'react';

const Hist = () => {
    const {historico} = useContext(DataContext);

    useEffect(() => {
        console.log('Histórico atualizado no componente histórico:', historico);
    }, [historico]);


    return (
        <div className='w-full h-full'>
            <div className='
            bg-primary-boxes
            text-white
            text-base
            font-normal
            flex
            flex-col
            gap-2
            w-full
            h-full
            p-5
            rounded-md
            items-start
            '>
                <h1 className='
                text-primary-amarelo
                font-medium'>Histórico:</h1>
                <div className='flex flex-col justify-center items-center w-full h-full py-10 overflow-y-auto trat-scrollbar'> {historico.length > 0 ? ( 
                    historico.map((dado, index) => ( 
                        <div key={index} className=' bg-secondary-boxes p-3 my-2 rounded-md w-full flex gap-5'> 
                            <p className='text-white'>
                                 Número: {dado.numero.toFixed(2) } 
                            </p> 
                            <p className='text-white'>
                                 Dispositivo: {dado.device_id} 
                            </p> 
                            <p className='text-white'>
                                 Horário: {dado.timestamp} 
                            </p> 
                        </div> 
                    )) 
                ) : ( 
                    <p className='text-primary-azul'>
                         Nenhum dado recebido ainda. 
                    </p> 
                )} 
                </div>
            </div>
        </div>
    )
}

export default Hist;