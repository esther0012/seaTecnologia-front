import React from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';

const Edicao = () => {
    const location = useLocation();
    const isEtapa = /\/etapa/.test(location.pathname);

    return (
        <div>
            <div className={`embreve-bar ${isEtapa ? 'etapa' : ''}`}>Em breve</div>
        </div>
    );
};

export default Edicao;