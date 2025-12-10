import React, { useState } from 'react';
import './RatingPage.css';
import { useNavigate } from 'react-router-dom';


// Componente de Estrelas Reutilizável
const StarRating = ({ value, onRatingChange, disabled }) => {
  const [hover, setHover] = useState(0);

  
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            key={index}
            className={index <= (hover || value) ? "star-filled" : "star-empty"}
            onClick={() => onRatingChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(value)}
            disabled={disabled}
          >
            <span className="star-icon">
              {index <= (hover || value) ? '★' : '☆'}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const RatingPage = () => {
  // Estado para armazenar as notas de cada categoria separadamente (variáveis diferentes)
  const [ratings, setRatings] = useState({
    service: 0,    // Nota para Atendimento
    atmosphere: 0, // Nota para Ambiente
    flavor: 0,     // Nota para Sabor do Hambúrguer
  });
  
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Função que atualiza APENAS a variável de estado da categoria especificada
  const handleRatingChange = (category, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings, 
      [category]: rating,
    }));
    // Limpa o erro ao selecionar uma nota
    if (errors[category] && rating > 0) {
      setErrors(prevErrors => {
        const { [category]: removedError, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (ratings.service === 0) newErrors.service = 'Por favor, avalie o Atendimento.';
    if (ratings.atmosphere === 0) newErrors.atmosphere = 'Por favor, avalie o Ambiente.';
    if (ratings.flavor === 0) newErrors.flavor = 'Por favor, avalie o Sabor do Hambúrguer.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   

    // -- LOG DE DADOS (Simulação de Envio) --
    console.log('--- AVALIAÇÕES ENVIADAS ---');
    console.log('1. Atendimento (service):', ratings.service);
    console.log('2. Ambiente (atmosphere):', ratings.atmosphere);
    console.log('3. Sabor (flavor):', ratings.flavor);
    console.log('Sugestão:', suggestion || 'Nenhuma sugestão fornecida.');
    // Aqui você integraria uma chamada API (ex: axios.post) para enviar os dados
    

  };

  const navigate = useNavigate()

  return (
    <div className="rating-container">
      <div className="header">
        {/*
          IMPORTANTE: Para que sua logo apareça, 
          certifique-se de que 'logoAliados.ico' ou um arquivo compatível (.png/.svg) 
          está na pasta 'public' ou importado corretamente no seu projeto React.
        */}
        <img
          src="logoAliados.svg"
          alt="Logo Aliados"
          className="logo"
        />
        <h1>Avalie a sua experiência!</h1>

</div>
        <div className="infos">
          <label htmlFor="suggestion">Nome:</label>
          <input type='text'></input>
        </div>
      

      <div className="infos">
          <label htmlFor="suggestion">Telefone:</label>
          <input type='tel'></input>
        </div>
      

      {isSubmitted && (
        <div className="success-message">
          Obrigado! Sua avaliação foi enviada com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Categoria 1: Atendimento (ratings.service) */}
        <div className="rating-section">
          <label>1. Nota do Atendimento ({ratings.service} de 5):</label>
          <StarRating
            value={ratings.service}
            onRatingChange={(rating) => handleRatingChange('service', rating)}
            disabled={isSubmitted}
          />
          {errors.service && <p className="error-message">{errors.service}</p>}
        </div>

        {/* Categoria 2: Ambiente (ratings.atmosphere) */}
        <div className="rating-section">
          <label>2. Nota para o Ambiente ({ratings.atmosphere} de 5):</label>
          <StarRating
            value={ratings.atmosphere}
            onRatingChange={(rating) => handleRatingChange('atmosphere', rating)}
            disabled={isSubmitted}
          />
          {errors.atmosphere && <p className="error-message">{errors.atmosphere}</p>}
        </div>

        {/* Categoria 3: Sabor do Hambúrguer (ratings.flavor) */}
        <div className="rating-section">
          <label>3. Nota para o Sabor do Hambúrguer ({ratings.flavor} de 5):</label>
          <StarRating
            value={ratings.flavor}
            onRatingChange={(rating) => handleRatingChange('flavor', rating)}
            disabled={isSubmitted}
          />
          {errors.flavor && <p className="error-message">{errors.flavor}</p>}
        </div>

        {/* Campo de Sugestão (suggestion) */}
        <div className="suggestion-section">
          <label htmlFor="suggestion">Deixe uma Sugestão (Opcional):</label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Diga-nos como podemos melhorar sua experiência."
            rows="4"
            disabled={isSubmitted}
          />
        </div>

        <button type="submit" className="submit-button" onClick={() => navigate('/wheel')} disabled={isSubmitted}>
          {isSubmitted ? 'Avaliação Enviada!' : 'Enviar Avaliação'}
        </button>
      </form>
    </div>
  );
};

export default RatingPage;