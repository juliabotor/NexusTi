import React from 'react';

export default function Header({ usuario, onLogout, currentPage, onNavigate }) {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-inner">
          <div className="logo-grupo">
            <button className="logo btn-reset" onClick={() => onNavigate('home')} aria-label="Nexus TI — Página inicial">
              <div className="logo-icone" aria-hidden="true">NX</div>
              <span className="logo-texto">Nexus<span>TI</span></span>
            </button>
            <span className="logo-frase">Soluções em TI desde 2010</span>
          </div>

          <ul className="nav-links">
            {currentPage === 'home' && (
              <>
                <li><a href="#sobre" className="link-nav">Sobre</a></li>
                <li><a href="#servicos-secao" className="link-nav">Serviços</a></li>
                <li><a href="#equipe" className="link-nav">Equipe</a></li>
                <li><a href="#contato" className="link-nav">Contato</a></li>
              </>
            )}
            {currentPage !== 'home' && (
              <li>
                <button className="link-nav btn-reset" onClick={() => onNavigate('home')}>← Início</button>
              </li>
            )}

            {usuario?.logado ? (
              <>
                <li>
                  <button className="btn btn-secundario" onClick={() => onNavigate('servicos')}>
                    Meu Painel
                  </button>
                </li>
                <li>
                  <button className="btn btn-secundario" onClick={onLogout} style={{ cursor: 'pointer' }}>
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="btn btn-primario" onClick={() => onNavigate('login')}>Login</button>
                </li>
                <li>
                  <button className="btn btn-secundario" onClick={() => onNavigate('cadastro')}>Cadastro</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
