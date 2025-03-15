// CreatePlanForm.js
import React, { useState } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreatePlanForm = ({ onPlanCreated }) => {
  const [planName, setPlanName] = useState('');
  const [readings, setReadings] = useState(''); // Ex: "Gênesis 1; Mateus 5-7"
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (!auth.currentUser) {
        setError("Você precisa estar logado para criar um plano.");
        return;
      }

      const readingsArray = readings.split(';').map(leitura => {
        const partes = leitura.trim().split(' ');
        const livro = partes[0];
        const capitulo = parseInt(partes[1]);
        return { livro, capitulo }; // Formato para Firestore
      });

      await addDoc(collection(db, 'plans'), {
        name: planName,
        readings: readingsArray,
        userId: auth.currentUser.uid, // Associar plano ao usuário logado
      });

      setPlanName('');
      setReadings('');
      if (onPlanCreated) {
        onPlanCreated(); // Notificar App.js para recarregar planos
      }
    } catch (err) {
      setError("Erro ao criar plano: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Plano de Leitura</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="plan-name">Nome do Plano:</label>
          <input
            type="text"
            id="plan-name"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="plan-readings">Leituras (Ex: Gênesis 1; Mateus 5-7):</label>
          <input
            type="text"
            id="plan-readings"
            value={readings}
            onChange={(e) => setReadings(e.target.value)}
            placeholder="Ex: Gênesis 1; Mateus 5-7"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Criar Plano</button>
      </form>
    </div>
  );
};

export default CreatePlanForm;
