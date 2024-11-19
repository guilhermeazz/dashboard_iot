import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../services/mqttdata';

const Trat = () => {
    const { media, maior, menor, moda, mediana, desviop } = useContext(DataContext);

    useEffect(() => {
        console.log('dados tratados atualizados no componente Trat', {
            media, maior, menor, moda, mediana, desviop
        });
    }, [media, maior, menor, moda, mediana, desviop]);

    return (
        <div className='
        bg-primary-boxes
        w-full
        h-3/4
        rounded-md
        flex
        flex-col
        p-5
        gap-10
        text-white
        font-normal
        overflow-auto
        trat-scrollbar'>
            <h1 className='
            text-primary-amarelo
            font-medium'>Informações Gerais:</h1>
            <div className='flex flex-col gap-2'>
                <h2 className='text-primary-azul'>Maior Informação:</h2>
                {maior && maior.numero !== null ? (
                    <>
                        <div className='flex gap-5'>
                            <p>Número:</p>
                            <p>{maior.numero}</p>
                        </div>
                        <div className='flex gap-5'>
                            <p>Dispositivo:</p>
                            <p>{maior.dispositivo}</p>
                        </div>
                        <div className='flex gap-5'>
                            <p>Horário:</p>
                            <p>{maior.horario}</p>
                        </div>
                    </>
                ) : (
                    <p>Nenhum dado disponível para o maior número.</p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-primary-azul'>Menor Informação:</h2>
                {menor && menor.numero !== null ? (
                    <>
                        <div className='flex gap-5'>
                            <p>Número:</p>
                            <p>{menor.numero}</p>
                        </div>
                        <div className='flex gap-5'>
                            <p>Dispositivo:</p>
                            <p>{menor.dispositivo}</p>
                        </div>
                        <div className='flex gap-5'>
                            <p>Horário:</p>
                            <p>{menor.horario}</p>
                        </div>
                    </>
                ) : (
                    <p>Nenhum dado disponível para o menor número.</p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-primary-azul'>Apuração dos Dados:</h2>
                <div className='flex gap-5'>
                    <p>Média:</p>
                    <p>{media !== null ? media : 'N/A'}</p>
                </div>
                <div className='flex gap-5'>
                    <p>Moda:</p>
                    <p>{moda !== null ? moda : 'N/A'}</p>
                </div>
                <div className='flex gap-5'>
                    <p>Mediana:</p>
                    <p>{mediana !== null ? mediana : 'N/A'}</p>
                </div>
                <div className='flex gap-5'>
                    <p>Desvio Padrão:</p>
                    <p>{desviop !== null ? desviop : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Trat;
