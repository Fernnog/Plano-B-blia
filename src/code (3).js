// PlanList.js
import React from 'react';

const PlanList = ({ plans, progresso, toggleLeitura }) => {
  return (
    <div className="plan-list">
      <h2>Seus Planos de Leitura</h2>
      {plans.length === 0 ? (
        <p>Nenhum plano criado ainda.</p>
      ) : (
        <ul>
          {plans.map((plan) => (
            <li key={plan.id} className="plan-item">
              <h3>{plan.name}</h3>
              <ul className="readings-list">
                {plan.readings.map((leitura, index) => (
                  <li key={index} className="reading-item">
                    {leitura.livro} {leitura.capitulo}
                    <input
                      type="checkbox"
                      checked={progresso[plan.id] && progresso[plan.id].some(l => l.livro === leitura.livro && l.capitulo === leitura.capitulo)}
                      onChange={() => toggleLeitura(plan.id, leitura)}
                    />
                  </li>
                ))}
              </ul>
              {/* Exibição básica de progresso */}
              <p>Progresso: {progresso[plan.id] ? Math.round((progresso[plan.id].length / plan.readings.length) * 100) : 0}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlanList;