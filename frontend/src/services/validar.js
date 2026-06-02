export const Validar = {
  email(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  },
  senha(v) {
    if (v.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (!/[0-9]/.test(v)) return 'A senha deve conter pelo menos um número.';
    if (!/[A-Z]/.test(v)) return 'A senha deve conter pelo menos uma letra maiúscula.';
    if (!/[@#$%&*!?/\\|\-_+.=]/.test(v)) return 'A senha deve conter pelo menos um caractere especial.';
    return null;
  },
  nome(v) {
    const palavras = v.trim().split(/\s+/).filter(p => p.length > 0);
    if (palavras.length < 2) return 'Informe nome e sobrenome.';
    if (palavras[0].length < 2) return 'O primeiro nome deve ter pelo menos 2 caracteres.';
    if (/[^a-zA-ZÀ-ÿ\s]/.test(v)) return 'O nome não pode conter caracteres especiais ou números.';
    return null;
  },
  cpf(v) {
    const l = v.replace(/\D/g, '');
    if (!/^\d{11}$/.test(l)) return 'CPF inválido. Use o formato NNN.NNN.NNN-NN.';
    if (/^(\d)\1{10}$/.test(l)) return 'CPF inválido.';
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(l[i]) * (10 - i);
    let d1 = (soma * 10) % 11; if (d1 >= 10) d1 = 0;
    if (d1 !== parseInt(l[9])) return 'CPF inválido.';
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(l[i]) * (11 - i);
    let d2 = (soma * 10) % 11; if (d2 >= 10) d2 = 0;
    if (d2 !== parseInt(l[10])) return 'CPF inválido.';
    return null;
  },
  idadeMinima(nascStr) {
    if (!nascStr) return 'Data de nascimento obrigatória.';
    const nasc = new Date(nascStr + 'T00:00:00');
    if (isNaN(nasc)) return 'Data inválida.';
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    if (idade < 18) return 'Você deve ter pelo menos 18 anos.';
    return null;
  },
  telefone(v) {
    if (!v || v.trim() === '') return null;
    const l = v.replace(/\D/g, '');
    if (l.length < 10 || l.length > 11) return 'Telefone inválido.';
    return null;
  },
};

export function mascaraCPF(v) {
  let s = v.replace(/\D/g, '').substring(0, 11);
  s = s.replace(/(\d{3})(\d)/, '$1.$2');
  s = s.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  s = s.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  return s;
}

export function mascaraTelefone(v) {
  let s = v.replace(/\D/g, '').substring(0, 11);
  if (s.length <= 10) {
    s = s.replace(/(\d{2})(\d)/, '($1) $2');
    s = s.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    s = s.replace(/(\d{2})(\d)/, '($1) $2');
    s = s.replace(/(\d{5})(\d)/, '$1-$2');
  }
  return s;
}

export function formatarMoeda(v) {
  return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(d) {
  const data = new Date(d);
  return data.toLocaleDateString('pt-BR');
}

export function calcularDataPrevista(dias) {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toLocaleDateString('pt-BR');
}

export function forcaSenha(v) {
  let p = 0;
  if (v.length >= 6) p++;
  if (/[0-9]/.test(v)) p++;
  if (/[A-Z]/.test(v)) p++;
  if (/[@#$%&*!?/\\|\-_+.=]/.test(v)) p++;
  if (v.length === 0) return { pontos: 0, label: '', classe: '' };
  if (p <= 1) return { pontos: 1, label: 'Senha fraca', classe: 'fraca' };
  if (p <= 2) return { pontos: 2, label: 'Senha razoável', classe: 'media' };
  if (p <= 3) return { pontos: 3, label: 'Senha boa', classe: 'media' };
  return { pontos: 4, label: 'Senha forte ✓', classe: 'forte' };
}
