import React, { useState } from 'react';
import FormGroup from '../components/FormGroup';
import { api } from '../services/api';

const ICONES = ['💻', '🛡️', '☁️', '⚙️', '📊', '🔄', '🔐', '📡', '🗄️', '🤖'];

const INICIAL = { nome: '', descricao: '', preco: '', prazo: '', icone: '💻' };

export default function CadastroServicoPage({ onNavigate }) {
  const [form, setForm] = useState(INICIAL);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  function set(campo, valor) {
    setForm(f => ({ ...f, [campo]: valor }));
    setErros(e => ({ ...e, [campo]: '' }));
  }

  function validar() {
    const e = {};
    if (!form.nome.trim()) e.nome = 'O nome do serviço é obrigatório.';
    else if (form.nome.trim().length < 3) e.nome = 'O nome deve ter ao menos 3 caracteres.';

    if (!form.descricao.trim()) e.descricao = 'A descrição é obrigatória.';
    else if (form.descricao.trim().length < 10) e.descricao = 'A descrição deve ter ao menos 10 caracteres.';

    if (!form.preco) e.preco = 'O preço é obrigatório.';
    else if (isNaN(Number(form.preco)) || Number(form.preco) <= 0) e.preco = 'Informe um preço válido maior que zero.';

    if (!form.prazo) e.prazo = 'O prazo é obrigatório.';
    else if (!Number.isInteger(Number(form.prazo)) || Number(form.prazo) <= 0) e.prazo = 'Informe um prazo em dias (número inteiro maior que zero).';

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
      const res = await api.cadastrarServico({
        nome: form.nome.trim(),
        descricao: form.descricao.trim(),
        preco: Number(form.preco),
        prazo: Number(form.prazo),
        icone: form.icone,
      });
      if (res.sucesso) {
        setSucesso(true);
        setForm(INICIAL);
      } else {
        setErroGeral(res.mensagem || 'Erro ao cadastrar serviço.');
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
    setSucesso(false);
  }

  return (
    <div className="auth-page" style={{ alignItems: 'flex-start', padding: '3rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '620px', position: 'relative', zIndex: 1 }}>
        <form id="form-auth" noValidate aria-label="Formulário de cadastro de serviço" onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          <div className="auth-logo">
            <button type="button" className="logo btn-reset" style={{ justifyContent: 'center', marginBottom: '0.5rem' }} onClick={() => onNavigate('home')}>
              <div className="logo-icone">NX</div>
              <span className="logo-texto">Nexus<span>TI</span></span>
            </button>
            <h1 className="auth-titulo">Cadastrar Serviço</h1>
            <p className="auth-subtitulo">Adicione um novo serviço de TI ao catálogo.</p>
          </div>

          {sucesso && (
            <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.2rem', color: 'var(--cor-sucesso)', fontSize: '0.9rem' }}>
              ✅ Serviço cadastrado com sucesso!{' '}
              <button type="button" className="btn-reset" style={{ color: 'var(--cor-acento)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => onNavigate('servicos')}>
                Ir ao painel
              </button>
            </div>
          )}

          {erroGeral && (
            <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '1.2rem', color: 'var(--cor-erro)', fontSize: '0.9rem' }}>
              {erroGeral}
            </div>
          )}

          {/* Ícone */}
          <div className="form-grupo">
            <label>Ícone do serviço</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {ICONES.map(ic => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => set('icone', ic)}
                  style={{
                    width: '44px', height: '44px', fontSize: '1.4rem',
                    borderRadius: '8px', border: '2px solid',
                    borderColor: form.icone === ic ? 'var(--cor-acento)' : 'var(--cor-borda)',
                    background: form.icone === ic ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  aria-label={`Ícone ${ic}`}
                  aria-pressed={form.icone === ic}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <FormGroup id="nome" label="Nome do serviço" erro={erros.nome} obrigatorio>
            <input
              type="text"
              id="nome"
              value={form.nome}
              onChange={e => set('nome', e.target.value)}
              placeholder="ex: Monitoramento de Redes"
              maxLength={100}
            />
          </FormGroup>

          <FormGroup id="descricao" label="Descrição" erro={erros.descricao} obrigatorio>
            <textarea
              id="descricao"
              value={form.descricao}
              onChange={e => set('descricao', e.target.value)}
              placeholder="Descreva o serviço oferecido..."
              rows={4}
              maxLength={500}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--cor-borda)',
                borderRadius: '8px', color: 'var(--cor-texto)', fontFamily: 'var(--fonte-corpo)',
                fontSize: '0.95rem', resize: 'vertical', outline: 'none',
                transition: 'border-color var(--transicao)',
              }}
            />
            <small style={{ color: 'var(--cor-texto-suave)', fontSize: '0.75rem' }}>
              {form.descricao.length}/500 caracteres
            </small>
          </FormGroup>

          <div className="cadastro-grid">
            <FormGroup id="preco" label="Preço (R$)" erro={erros.preco} obrigatorio>
              <input
                type="number"
                id="preco"
                value={form.preco}
                onChange={e => set('preco', e.target.value)}
                placeholder="ex: 4500.00"
                min="0"
                step="0.01"
              />
            </FormGroup>

            <FormGroup id="prazo" label="Prazo (dias)" erro={erros.prazo} obrigatorio>
              <input
                type="number"
                id="prazo"
                value={form.prazo}
                onChange={e => set('prazo', e.target.value)}
                placeholder="ex: 30"
                min="1"
                step="1"
              />
            </FormGroup>
          </div>

          {/* Preview */}
          {form.nome && (
            <div style={{ margin: '1rem 0' }}>
              <p style={{ color: 'var(--cor-texto-suave)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Preview do card:</p>
              <article className="servico-card" style={{ maxWidth: '280px' }}>
                <div className="servico-icone" aria-hidden="true">{form.icone}</div>
                <h3 className="servico-nome">{form.nome || 'Nome do serviço'}</h3>
                <p className="servico-desc">{form.descricao || 'Descrição do serviço.'}</p>
                {form.preco && <p style={{ color: 'var(--cor-acento)', fontFamily: 'var(--fonte-titulo)', fontWeight: 700, marginTop: '0.5rem' }}>
                  R$ {Number(form.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>}
              </article>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primario" style={{ flex: 1, justifyContent: 'center' }} disabled={carregando}>
              {carregando ? 'Cadastrando…' : '✅ Cadastrar Serviço'}
            </button>
            <button type="button" className="btn btn-secundario" onClick={handleLimpar}>Limpar</button>
            <button type="button" className="btn btn-secundario" onClick={() => onNavigate('home')}>← Voltar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
