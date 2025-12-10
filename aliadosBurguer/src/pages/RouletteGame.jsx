import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './Wheel.css'

// 1. Defina os dados que aparecerão na roleta
const data = [
  { option: 'X-matuto', style: { backgroundColor: '#000', textColor: 'white' } },
  { option: 'Copo', style: { backgroundColor: '#c49629', textColor: 'black' } },
  { option: 'Chaveiro', style: { backgroundColor: '#000', textColor: 'white' } },
  { option: 'Copo', style: { backgroundColor: '#c49629', textColor: 'black' } },
  { option: 'Chaveiro', style: { backgroundColor: '#000', textColor: 'white' } },
  { option: 'Copo', style: { backgroundColor: '#c49629', textColor: 'black' } },
  { option: 'Smash', style: { backgroundColor: '#000', textColor: 'white' } },
  { option: 'Copo', style: { backgroundColor: '#c49629', textColor: 'black' } },
  { option: 'Chaveiro', style: { backgroundColor: '#000', textColor: 'white' } },
  { option: 'Copo', style: { backgroundColor: '#c49629', textColor: 'black' } },
];

const RouletteComponent = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  
  // ⭐️ NOVO ESTADO: Rastrea se o giro já ocorreu.
  const [hasSpun, setHasSpun] = useState(false); 

  const handleSpinClick = () => {
    // 1. VERIFICAÇÃO: Impede o giro se a roleta já girou ou estiver girando
    if (mustSpin || hasSpun) {
      return; 
    }

    // 2. Lógica do Giro (Só executa se não tiver girado)
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    // 3. ⭐️ MARCA COMO GIRADO: Define o estado hasSpun para true imediatamente após iniciar o giro
    setHasSpun(true); 
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    // Não é necessário mais ações aqui, o hasSpun já está em true.
  };

  return (
    <div className='container'>
      <h1>Gire e ganhe seu premio!</h1>

      <div className='roleta'>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
          outerBorderColor="#ccc"
        />
        
        <img className='logoImg' src="logoAliados.svg" alt="logo aliados" />
      </div>

      <button 
        onClick={handleSpinClick}
        // ⭐️ DESABILITA O BOTÃO: O botão fica desabilitado se mustSpin (girando) ou hasSpun (já girou) for true
        disabled={mustSpin || hasSpun} 
      >
        {mustSpin ? 'Girando...' : hasSpun ? 'Giro Único Realizado' : 'Girar a Roleta'}
      </button>
      
      {/* Exibe o resultado após o giro e se já girou */}
      {!mustSpin && hasSpun && (
        <h3>Parabens! 🎉🎉 <br/> Você ganhou um {data[prizeNumber].option}
         <br/> <br/>
         Recolha seu premio no balcão.
        </h3>
      )}

      {/* ⚠️ Se você quiser que o resultado só apareça depois de o giro parar */}
      {/* {!mustSpin && prizeNumber !== 0 && hasSpun && (
          // ... código do prêmio
      )} */}

    </div>
  );
};

export default RouletteComponent;