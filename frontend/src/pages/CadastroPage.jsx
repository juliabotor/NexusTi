import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { Validar, mascaraCPF, mascaraTelefone } from '../services/validar';
import { api } from '../services/api';

const ESTADO_CIVIL_OPTS = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
];

const ESCOLARIDADE_OPTS = [
  { value: '', label: 'Selecione...' },
  { value: 'fundamental_inc', label: 'Fundamental incompleto' },
  { value: 'fundamental_com', label: 'Fundamental completo' },
  { value: 'medio_inc', label: '2º grau incompleto' },
  { value: 'medio_com', label: '2º grau completo' },
  { value: 'superior_inc', label: 'Superior incompleto' },
  { value: 'superior_com', label: 'Superior completo' },
  { value: 'pos', label: 'Pós-graduação / MBA' },
  { value: 'mestrado', label: 'Mestrado' },
  { value: 'doutorado', label: 'Doutorado' },
];

const INICIAL = {
  email: '', senha: '', confirmar: '', nome: '', cpf: '',
  nascimento: '', telefone: '', estadoCivil: 'solteiro', escolaridade: 'medio_com',
};

export default function CadastroPage({ onLogin, onNavigate }) {
  const [form, setForm] = useState(INICIAL);
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');
  const [carregando, setCarregando] = useState(false);

  function set(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }));
    setErros(e => ({ ...e, [campo]: '' }));
  }

  function validar() {
    const e = {};
    if (!form.email.trim()) e.email = 'O e-mail é obrigatório.';
    else if (!Validar.email(form.email)) e.email = 'Informe um e-mail válido.';

    if (!form.senha) e.senha = 'A senha é obrigatória.';
    else { const err = Validar.senha(form.senha); if (err) e.senha = err; }

    if (!form.confirmar) e.confirmar = 'Confirme sua senha.';
    else if (form.senha !== form.confirmar) e.confirmar = 'As senhas não coincidem.';

    if (!form.nome.trim()) e.nome = 'O nome completo é obrigatório.';
    else { const err = Validar.nome(form.nome); if (err) e.nome = err; }

    if (!form.cpf.trim()) e.cpf = 'O CPF é obrigatório.';
    else { const err = Validar.cpf(form.cpf); if (err) e.cpf = err; }

    if (!form.nascimento) e.nascimento = 'A data de nascimento é obrigatória.';
    else { const err = Validar.idadeMinima(form.nascimento); if (err) e.nascimento = err; }

    const errTel = Validar.telefone(form.telefone);
    if (errTel) e.telefone = errTel;

    if (!form.escolaridade) e.escolaridade = 'Selecione sua escolaridade.';

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
      const res = await api.cadastrarCliente({
        login: form.email.trim(),
        senha: form.senha,
        nome: form.nome.trim(),
        email: form.email.trim(),
        cpf: form.cpf,
        nascimento: form.nascimento,
        telefone: form.telefone,
        estado_civil: form.estadoCivil,
        escolaridade: form.escolaridade,
      });
      if (res.sucesso) {
        onLogin({ login: form.email.trim(), nome: form.nome.trim().split(' ')[0], email: form.email.trim() });
      } else {
        setErroGeral(res.mensagem || 'Erro ao cadastrar.');
      }
    } catch {
      setErroGeral('Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  }

  function handleLimpar() {
    setForm(INICIAL);
    setErros({});
    setErroGeral('');
  }

  return (
    <div className="auth-page" style={{ alignItems: 'flex-start', padding: '3rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '620px', position: 'relative', zIndex: 1 }}>
        <form id="form-auth" noValidate aria-label="Formulário de cadastro" onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div className="auth-logo">
            <button type="button" className="logo btn-reset" style={{ justifyContent: 'center', marginBottom: '0.5rem' }} onClick={() => onNavigate('home')}>
              <div className="logo-icone">NX</div>
              <span className="logo-texto">Nexus<span>TI</span></span>
            </button>
            <h1 className="auth-titulo">Criar conta</h1>
            <p className="auth-subtitulo">Preencha os dados para acessar nosso portal de serviços.</p>
          </div>

          {erroGeral && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.2rem', color: 'var(--cor-erro)', fontSize: '0.9rem' }}>
              {erroGeral}
            </div>
          )}

          <div className="cadastro-grid">
            <FormGroup id="email" label="E-mail" erro={erros.email} obrigatorio style={{ gridColumn: '1 / -1' }}>
              <input type="email" id="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="seu@email.com" autoComplete="email" />
            </FormGroup>

            <FormGroup id="senha" label="Senha" erro={erros.senha} obrigatorio>
              <input type="password" id="senha" value={form.senha} onChange={e => set('senha', e.target.value)} placeholder="••••••••" autoComplete="new-password" />
              <small style={{ fontSize: '0.75rem', color: 'var(--cor-texto-suave)', display: 'block', marginTop: '4px' }}>
                Mín. 6 chars · número · maiúscula · especial
              </small>
            </FormGroup>

            <FormGroup id="confirmar" label="Confirmar senha" erro={erros.confirmar} obrigatorio>
              <input type="password" id="confirmar" value={form.confirmar} onChange={e => set('confirmar', e.target.value)} placeholder="••••••••" autoComplete="new-password" />
            </FormGroup>

            <FormGroup id="nome" label="Nome completo" erro={erros.nome} obrigatorio style={{ gridColumn: '1 / -1' }}>
              <input type="text" id="nome" value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Seu Nome Sobrenome" autoComplete="name" />
            </FormGroup>

            <FormGroup id="cpf" label="CPF" erro={erros.cpf} obrigatorio>
              <input type="text" id="cpf" value={form.cpf} onChange={e => set('cpf', mascaraCPF(e.target.value))} placeholder="000.000.000-00" maxLength={14} inputMode="numeric" />
            </FormGroup>

            <FormGroup id="nascimento" label="Data de nascimento" erro={erros.nascimento} obrigatorio>
              <input type="date" id="nascimento" value={form.nascimento} onChange={e => set('nascimento', e.target.value)} />
            </FormGroup>

            <FormGroup id="telefone" label="Telefone (opcional)" erro={erros.telefone} style={{ gridColumn: '1 / -1' }}>
              <input type="tel" id="telefone" value={form.telefone} onChange={e => set('telefone', mascaraTelefone(e.target.value))} placeholder="(11) 99999-9999" maxLength={15} autoComplete="tel" />
            </FormGroup>

            <FormGroup id="estadoCivil" label="Estado civil" obrigatorio style={{ gridColumn: '1 / -1' }}>
              <div className="radio-grupo" role="radiogroup" aria-label="Estado civil">
                {ESTADO_CIVIL_OPTS.map(opt => (
                  <label key={opt.value} className="radio-item">
                    <input
                      type="radio"
                      name="estado_civil"
                      value={opt.value}
                      checked={form.estadoCivil === opt.value}
                      onChange={() => set('estadoCivil', opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </FormGroup>

            <FormGroup id="escolaridade" label="Escolaridade" erro={erros.escolaridade} obrigatorio style={{ gridColumn: '1 / -1' }}>
              <select id="escolaridade" value={form.escolaridade} onChange={e => set('escolaridade', e.target.value)}>
                {ESCOLARIDADE_OPTS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </FormGroup>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primario" style={{ flex: 1, justifyContent: 'center' }} disabled={carregando}>
              {carregando ? 'Cadastrando…' : 'Criar conta'}
            </button>
            <button type="button" className="btn btn-secundario" onClick={handleLimpar}>Limpar</button>
            <button type="button" className="btn btn-secundario" onClick={() => onNavigate('home')}>← Voltar</button>
          </div>

          <div className="auth-links" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: 'var(--cor-texto-suave)' }}>Já tem conta?</span>
            <button type="button" className="btn-reset link-reset" onClick={() => onNavigate('login')}>Fazer login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
