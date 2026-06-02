import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { Validar } from '../services/validar';
import { api } from '../services/api';

export default function LoginPage({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  function validar() {
    const e = {};
    if (!email.trim()) e.email = 'O e-mail é obrigatório.';
    else if (!Validar.email(email)) e.email = 'Informe um e-mail válido.';
    if (!senha) e.senha = 'A senha é obrigatória.';
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setErroGeral('');
    const e = validar();
    if (Object.keys(e).length > 0) { setErros(e); return; }
    setErros({});
    setCarregando(true);
    try {
      const res = await api.login(email.trim(), senha);
      if (res.sucesso) {
        onLogin(res.cliente);
      } else {
        setErroGeral(res.mensagem || 'Credenciais inválidas.');
      }
    } catch {
      setErroGeral('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  }

  function handleLimpar() {
    setEmail('');
    setSenha('');
    setErros({});
    setErroGeral('');
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-dots" aria-hidden="true"></div>
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '460px', padding: '2rem' }}>
        <form id="form-auth" noValidate aria-label="Formulário de login" onSubmit={handleSubmit}>
          <div className="auth-logo">
            <button type="button" className="logo btn-reset" style={{ justifyContent: 'center', marginBottom: '0.5rem' }} onClick={() => onNavigate('home')}>
              <div className="logo-icone">NX</div>
              <span className="logo-texto">Nexus<span>TI</span></span>
            </button>
            <h1 className="auth-titulo">Bem-vindo de volta</h1>
            <p className="auth-subtitulo">Acesse sua conta para continuar</p>
          </div>

          {erroGeral && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.2rem', color: 'var(--cor-erro)', fontSize: '0.9rem' }}>
              {erroGeral}
            </div>
          )}

          <FormGroup id="email" label="E-mail" erro={erros.email} obrigatorio>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErros(v => ({ ...v, email: '' })); }}
              placeholder="seu@email.com"
              autoComplete="email"
              aria-required="true"
            />
          </FormGroup>

          <FormGroup id="senha" label="Senha" erro={erros.senha} obrigatorio>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={e => { setSenha(e.target.value); setErros(v => ({ ...v, senha: '' })); }}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-required="true"
            />
          </FormGroup>

          <div className="auth-botoes">
            <button type="submit" className="btn btn-primario" disabled={carregando}>
              {carregando ? 'Entrando…' : 'Entrar'}
            </button>
            <button type="button" className="btn btn-secundario" onClick={handleLimpar}>Limpar</button>
          </div>

          <div className="auth-links">
            <button type="button" className="btn-reset link-reset" onClick={() => onNavigate('troca-senha')}>Esqueci minha senha</button>
            <button type="button" className="btn-reset link-reset" onClick={() => onNavigate('cadastro')}>Criar conta</button>
          </div>
        </form>
      </div>
    </div>
  );
}
