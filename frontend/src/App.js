import React from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import TrocaSenhaPage from './pages/TrocaSenhaPage';
import ServicosPage from './pages/ServicosPage';
import CadastroServicoPage from './pages/CadastroServicoPage';

export default function App() {
  const { usuario, login, logout } = useAuth();
  const [page, setPage] = React.useState('home');

  function navigate(p) {
    setPage(p);
    window.scrollTo(0, 0);
  }

  function handleLogin(dados) {
    login(dados);
    navigate('servicos');
  }

  function handleLogout() {
    logout();
    navigate('home');
  }

  const showHeader = page !== 'login' && page !== 'cadastro' && page !== 'troca-senha' && page !== 'cadastro-servico';

  return (
    <>
      {showHeader && (
        <Header
          usuario={usuario}
          onLogout={handleLogout}
          currentPage={page}
          onNavigate={navigate}
        />
      )}

      {page === 'home' && <HomePage onNavigate={navigate} />}
      {page === 'login' && <LoginPage onLogin={handleLogin} onNavigate={navigate} />}
      {page === 'cadastro' && <CadastroPage onLogin={handleLogin} onNavigate={navigate} />}
      {page === 'troca-senha' && <TrocaSenhaPage onNavigate={navigate} />}
      {page === 'servicos' && <ServicosPage usuario={usuario} onNavigate={navigate} />}
      {page === 'cadastro-servico' && <CadastroServicoPage onNavigate={navigate} />}
    </>
  );
}
