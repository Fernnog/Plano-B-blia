// App.js
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CreatePlanForm from './CreatePlanForm';
import PlanList from './PlanList';
import { auth, db } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import './App.css'; // Importe o CSS

function App() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [progresso, setProgresso] = useState({}); // Estado para armazenar o progresso
  const [loadingProgresso, setLoadingProgresso] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Controla qual formulário exibir (login/cadastro)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribeAuth; // Cleanup ao desmontar o componente
  }, []);

  useEffect(() => {
    if (user) {
      loadPlans();
      loadProgresso(); // Carregar progresso quando o usuário estiver logado
    } else {
      setPlans([]); // Limpar planos quando o usuário faz logout
      setProgresso({}); // Limpar progresso ao deslogar
    }
  }, [user]); // Dependência no user para recarregar planos e progresso ao logar/deslogar


  const loadPlans = async () => {
    setLoadingPlans(true);
    try {
      if (!user) return; // Não carregar planos se não houver usuário logado

      const plansRef = collection(db, 'plans');
      const q = query(plansRef, where('userId', '==', user.uid)); // Buscar planos do usuário logado
      const querySnapshot = await getDocs(q);
      const fetchedPlans = [];
      querySnapshot.forEach((doc) => {
        fetchedPlans.push({ id: doc.id, ...doc.data() });
      });
      setPlans(fetchedPlans);
    } catch (error) {
      console.error("Erro ao carregar planos:", error);
      // Tratar erro (ex: exibir mensagem para o usuário)
    } finally {
      setLoadingPlans(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handlePlanCreated = () => {
    loadPlans(); // Recarrega a lista de planos após criar um novo
  };

  const toggleAuthForm = () => {
    setShowLogin(!showLogin);
  };


  // Função para carregar o progresso do usuário
  const loadProgresso = async () => {
    setLoadingProgresso(true);
    try {
      if (!user || !plans || plans.length === 0) {
        setLoadingProgresso(false);
        return; // Não carregar progresso se não tiver usuário ou planos
      }

      const progressoUsuario = {};
      for (const plan of plans) {
        const progressoRef = doc(db, 'progress', `${user.uid}_${plan.id}`); // ID composto: userId_planId
        const progressoSnap = await getDoc(progressoRef);

        if (progressoSnap.exists()) {
          progressoUsuario[plan.id] = progressoSnap.data().leiturasConcluidas || []; // Se existir, pega as leituras concluídas
        } else {
          progressoUsuario[plan.id] = []; // Se não existir, inicializa como array vazio
        }
      }
      setProgresso(progressoUsuario);

    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    } finally {
      setLoadingProgresso(false);
    }
  };


  // Função para marcar/desmarcar leitura como concluída
  const toggleLeitura = async (planId, leitura) => {
    if (!user) {
      alert("Você precisa estar logado para marcar o progresso.");
      return;
    }

    const progressoRef = doc(db, 'progress', `${user.uid}_${planId}`); // ID composto

    // Verificar se o documento de progresso existe para este usuário e plano
    const docSnap = await getDoc(progressoRef);
    const jaConcluido = progresso[planId] && progresso[planId].some(l => l.livro === leitura.livro && l.capitulo === leitura.capitulo);


    if (docSnap.exists()) { // Se o documento existe, atualiza
      if (jaConcluido) {
        await updateDoc(progressoRef, {
          leiturasConcluidas: arrayRemove(leitura) // Remove a leitura se já estiver concluída
        });
      } else {
        await updateDoc(progressoRef, {
          leiturasConcluidas: arrayUnion(leitura) // Adiciona a leitura se não estiver concluída
        });
      }
    } else { // Se o documento não existe, cria um novo
      await updateDoc(progressoRef, { // Use updateDoc para criar com um ID específico
        leiturasConcluidas: arrayUnion(leitura),
        userId: user.uid,
        planId: planId
      });
    }
    loadProgresso(); // Recarrega o progresso atualizado
  };


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Plano de Leitura Bíblica</h1>
        {user && (
          <div className="user-info">
            <span>Olá, {user.email}</span>
            <button onClick={handleLogout} className="logout-button">Sair</button>
          </div>
        )}
      </header>

      <main className="app-main">
        {!user ? (
          <div className="auth-area">
            {showLogin ? <LoginForm /> : <RegisterForm />}
            <button className="toggle-auth-button" onClick={toggleAuthForm}>
              {showLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça Login"}
            </button>
          </div>
        ) : (
          <>
            <CreatePlanForm onPlanCreated={handlePlanCreated} />
            {loadingPlans ? <p>Carregando planos...</p> : (
              <PlanList
                plans={plans}
                progresso={progresso}
                toggleLeitura={toggleLeitura}
                loadingProgresso={loadingProgresso}
              />
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Seu Plano de Leitura Bíblica</p>
      </footer>
    </div>
  );
}

export default App;