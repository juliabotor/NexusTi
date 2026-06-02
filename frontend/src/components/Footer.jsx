import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: '1rem' }}>
              <div className="logo-icone">NX</div>
              <span className="logo-texto">Nexus<span>TI</span></span>
            </div>
            <p style={{ color: 'var(--cor-texto-suave)', fontSize: '0.9rem', marginTop: '1rem', maxWidth: '300px' }}>
              Transformando tecnologia em resultados concretos para o seu negócio desde 2010.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <p className="footer-titulo">Formas de pagamento</p>
              <div className="pagamentos">
                {['Visa', 'Mastercard', 'Pix', 'Boleto', 'NF-e'].map(p => (
                  <span key={p} className="pagamento-badge">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="footer-titulo">Contato</p>
            <ul className="footer-lista">
              <li>📞 <a href="tel:+551133334444">(11) 3333-4444</a>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--cor-texto-suave)', marginTop: '2px' }}>Telefone fixo — Seg a Sex, 8h–18h</span>
              </li>
              <li style={{ marginTop: '0.8rem' }}>
                💬 <a href="https://wa.me/5511999998888" target="_blank" rel="noopener noreferrer">(11) 99999-8888</a>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--cor-texto-suave)', marginTop: '2px' }}>WhatsApp — Atendimento rápido</span>
              </li>
              <li style={{ marginTop: '0.8rem' }}>✉️ <a href="mailto:contato@nexusti.com.br">contato@nexusti.com.br</a></li>
            </ul>
          </div>

          <div>
            <p className="footer-titulo">Endereço</p>
            <address style={{ fontStyle: 'normal', color: 'var(--cor-texto-suave)', fontSize: '0.9rem', lineHeight: '1.9' }}>
              Av. Paulista, 1000 — Sala 1204<br />
              Bela Vista — São Paulo / SP<br />
              CEP: 01310-100<br />
              Brasil
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Nexus TI — Todos os direitos reservados. Projeto acadêmico de front-end.</p>
        </div>
      </div>
    </footer>
  );
}
