import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [numero, setNumero] = useState(null);
    const [dispositivo, setDispositivo] = useState(null);
    const [tempo, setTempo] = useState(null);
    const [historico, setHistorico] = useState([]);
    const [media, setMedia] = useState(null);
    const [maior, setMaior] = useState(null);
    const [menor, setMenor] = useState(null);
    const [moda, setModa] = useState(null);
    const [mediana, setMediana] = useState(null);
    const [desviop, setDesviop] = useState(null);

    useEffect(() => {
        let socket;

        const connectWebSocket = () => {
            socket = new WebSocket('ws://localhost:5005');

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Dados recebidos do WebSocket:', data);

                setNumero(data.ultimo_dado.numero);
                setDispositivo(data.ultimo_dado.device_id);
                setTempo(data.ultimo_dado.timestamp);
                setHistorico(data.historico_dados);
            };

            socket.onopen = () => {
                console.log('Conexão WebSocket estabelecida');
            };

            socket.onclose = () => {
                console.log('Conexão WebSocket encerrada');
                // Tentar reconectar após 1 segundo
                setTimeout(connectWebSocket, 1000);
            };

            socket.onerror = (error) => {
                console.error('Erro WebSocket: ', error);
            };
        };

        connectWebSocket();

        return () => {
            if (socket) socket.close();
        };
    }, []); // O efeito roda apenas uma vez quando o componente é montado

    // Atualiza as estatísticas quando o histórico muda
    useEffect(() => {
        setMedia(calcularMedia(historico));
        setMaior(encontrarMaior(historico));
        setMenor(encontrarMenor(historico));
        setModa(calcularModa(historico));
        setMediana(calcularMediana(historico));
        setDesviop(calcularDesvioPadrao(historico));
    }, [historico]);

    return (
        <DataContext.Provider value={{ numero, dispositivo, tempo, historico, media, maior, menor, moda, mediana, desviop }}>
            {children}
        </DataContext.Provider>
    );
};

// Funções de Cálculo
const calcularMedia = (dados) => {
    if (dados.length === 0) return null;
    const soma = dados.reduce((acc, curr) => acc + curr.numero, 0);
    return soma / dados.length;
};

const encontrarMaior = (dados) => {
     if (dados.length === 0) return { numero: null, dispositivo: '', horario: '' }; const maiorDado = dados.reduce((prev, current) => (prev.numero > current.numero ? prev : current)); return { numero: maiorDado.numero, dispositivo: maiorDado.device_id, horario: maiorDado.timestamp }; 
};

const encontrarMenor = (dados) => {
    if (dados.length === 0) return { numero: null, dispositivo: '', horario: '' };
    const menorDado = dados.reduce((prev, current) => (prev.numero < current.numero ? prev : current));
    return { numero: menorDado.numero, dispositivo: menorDado.device_id, horario: menorDado.timestamp };
};


const calcularModa = (dados) => {
    if (dados.length === 0) return null;
    const frequencias = {};
    dados.forEach(dado => {
        frequencias[dado.numero] = (frequencias[dado.numero] || 0) + 1;
    });
    const modas = Object.keys(frequencias).filter(x => frequencias[x] === Math.max(...Object.values(frequencias)));
    return parseFloat(modas[0]);
};

const calcularMediana = (dados) => {
    if (dados.length === 0) return null;
    const numerosOrdenados = dados.map(dado => dado.numero).sort((a, b) => a - b);
    const meio = Math.floor(numerosOrdenados.length / 2);

    if (numerosOrdenados.length % 2 === 0) {
        return (numerosOrdenados[meio - 1] + numerosOrdenados[meio]) / 2;
    }
    return numerosOrdenados[meio];
};

const calcularDesvioPadrao = (dados) => {
    if (dados.length === 0) return null;
    const media = calcularMedia(dados);
    const variancia = dados.reduce((acc, curr) => acc + Math.pow(curr.numero - media, 2), 0) / dados.length;
    return Math.sqrt(variancia);
};
