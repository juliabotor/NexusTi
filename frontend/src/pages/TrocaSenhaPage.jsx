import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { Validar, forcaSenha } from '../services/validar';
import { api } from '../services/api';

export default function TrocaSenhaPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const forca = forcaSenha(novaSenha);

  function set(setter, campo) {
    return (e) => {
      setter(e.target.value);
      setErros(v => ({ ...v, [campo]: '' }));
    };
  }

  function validar() {
    const e = {};
    if (!email.trim()) e.email = 'O e-mail é obrigatório.';
    else if (!Validar.email(email)) e.email = 'Informe um e-mail válido.';
    if (!senhaAtual) e.senhaAtual = 'A senha atual é obrigatória.';
    if (!novaSenha) e.novaSenha = 'A nova senha é obrigatória.';
    else { const err = Validar.senha(novaSenha); if (err) e.novaSenha = err; }
    if (!confirmar) e.confirmar = 'Confirme a nova senha.';
    else if (novaSenha !== confirmar) e.confirmar = 'As senhas não coincidem.';
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
      const res = await api.trocaSenha(email.trim(), senhaAtual, novaSenha);
      if (res.sucesso) {
        setSucesso(true);
      } else {
        setErroGeral(res.mensagem || 'Erro ao trocar senha.');
      }
    } catch {
      setErroGeral('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  }

  function handleLimpar() {
    setEmail(''); setSenhaAtual(''); setNovaSenha(''); setConfirmar('');
    setErros({}); setErroGeral(''); setSucesso(false);
  }

  const forcaClass = { fraca: 'ativa-fraca', media: 'ativa-media', forte: 'ativa-forte' };

  if (sucesso) {
    return (
      <div className="auth-page">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ marginBottom: '0.5rem' }}>Senha alterada com sucesso!</h2>
          <p style={{ color: 'var(--cor-texto-suave)', marginBottom: '2rem' }}>Faça login com sua nova senha.</p>
          <button className="btn btn-primario" onClick={() => onNavigate('login')}>Ir para o login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '480px', padding: '2rem' }}>
        <form id="form-auth" className="troca" noValidate aria-label="Formulário de troca de senha" onSubmit={handleSubmit}>
          <div className="auth-logo">
            <button type="button" className="logo btn-reset" style={{ justifyContent: 'center', marginBottom: '0.5rem' }} onClick={() => onNavigate('home')}>
              <div className="logo-icone">NX</div>
              <span className="logo-texto">Nexus<span>TI</span></span>
            </button>
            <h1 className="auth-titulo">Trocar senha</h1>
            <p className="auth-subtitulo">Informe seu e-mail e defina uma nova senha segura.</p>
          </div>

          {erroGeral && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.2rem', color: 'var(--cor-erro)', fontSize: '0.9rem' }}>
              {erroGeral}
            </div>
          )}

          <FormGroup id="email" label="E-mail cadastrado" erro={erros.email} obrigatorio>
            <input type="email" id="email" value={email} onChange={set(setEmail, 'email')} placeholder="seu@email.com" autoComplete="email" />
          </FormGroup>

          <FormGroup id="senhaAtual" label="Senha atual" erro={erros.senhaAtual} obrigatorio>
            <input type="password" id="senhaAtual" value={senhaAtual} onChange={set(setSenhaAtual, 'senhaAtual')} placeholder="••••••••" autoComplete="current-password" />
          </FormGroup>

          <FormGroup id="novaSenha" label="Nova senha" erro={erros.novaSenha} obrigatorio>
            <input type="password" id="novaSenha" value={novaSenha} onChange={set(setNovaSenha, 'novaSenha')} placeholder="••••••••" autoComplete="new-password" />
            <div className="senha-forca" aria-hidden="true">
              {[1, 2, 3, 4].map(n => (
                <div
                  key={n}
                  className={`forca-barra${forca.pontos >= n && forca.classe ? ' ' + forcaClass[forca.classe] : ''}`}
                />
              ))}
            </div>
            {forca.label && <span className="forca-label">{forca.label}</span>}
            <small style={{ display: 'block', marginTop: '6px', color: 'var(--cor-texto-suave)', fontSize: '0.78rem', lineHeight: '1.6' }}>
              Mínimo 6 caracteres · 1 número · 1 maiúscula · 1 especial (@ # $ % &amp; * ! ? / \ | - _ + . =)
            </small>
          </FormGroup>

          <FormGroup id="confirmar" label="Confirmar nova senha" erro={erros.confirmar} obrigatorio>
            <input type="password" id="confirmar" value={confirmar} onChange={set(setConfirmar, 'confirmar')} placeholder="••••••••" autoComplete="new-password" />
          </FormGroup>

          <div className="auth-botoes">
            <button type="submit" className="btn btn-primario" disabled={carregando}>
              {carregando ? 'Salvando…' : 'Salvar senha'}
            </button>
            <button type="button" className="btn btn-secundario" onClick={handleLimpar}>Limpar</button>
          </div>

          <div className="auth-links" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn-reset link-reset" onClick={() => onNavigate('login')}>← Voltar ao login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
