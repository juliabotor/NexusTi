import React from 'react';
import Footer from '../components/Footer';

const STATS = [
  { numero: '400+', label: 'Clientes ativos' },
  { numero: '14', label: 'Anos de mercado' },
  { numero: '80+', label: 'Profissionais' },
  { numero: '3', label: 'Escritórios no Brasil' },
];

const SERVICOS = [
  { icone: '🛡️', nome: 'Segurança da Informação', desc: 'Proteção completa contra ameaças digitais: firewall, criptografia, pentest e monitoramento 24/7.' },
  { icone: '☁️', nome: 'Cloud Computing', desc: 'Migração e gestão de ambientes cloud (AWS, Azure, GCP) com alta disponibilidade e custo otimizado.' },
  { icone: '⚙️', nome: 'Suporte Técnico', desc: 'Atendimento presencial e remoto para infraestrutura de redes, hardware e software corporativo.' },
  { icone: '💻', nome: 'Desenvolvimento de Software', desc: 'Sistemas web e mobile sob medida, APIs RESTful e integração com ERPs e plataformas de terceiros.' },
  { icone: '📊', nome: 'Business Intelligence', desc: 'Painéis de dados e relatórios gerenciais para tomada de decisão baseada em dados reais.' },
  { icone: '🔄', nome: 'Backup e Recuperação', desc: 'Políticas robustas de backup automatizado com disaster recovery para continuidade de negócios.' },
];

const GALERIA = [
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', alt: 'Equipe Nexus TI em reunião de planejamento' },
  { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80', alt: 'Data center Nexus TI' },
  { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80', alt: 'Desenvolvedor trabalhando em código' },
  { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80', alt: 'Apresentação de resultados para cliente' },
];

const FUNDADORES = [
  {
    cargo: 'CEO & Co-fundador',
    nome: 'Ricardo Alves Mendonça',
    local: 'São Paulo, SP',
    bio: 'Engenheiro de Software formado pela USP, com MBA em Gestão de TI pela FGV. Atuou 8 anos como arquiteto de sistemas na IBM. Especialista em cloud computing e transformação digital.',
  },
  {
    cargo: 'CTO & Co-fundadora',
    nome: 'Fernanda Costa Lima',
    local: 'Recife, PE',
    bio: 'Mestre em Ciência da Computação pela UFPE. Certificada AWS Solutions Architect e CISSP. Liderou projetos críticos para o setor bancário nacional.',
  },
  {
    cargo: 'COO & Co-fundador',
    nome: 'Marcelo Teixeira Ramos',
    local: 'Porto Alegre, RS',
    bio: 'Administrador pela UFRGS, certificado PMP e Scrum Master. Mais de 300 projetos entregues no prazo.',
  },
];

export default function HomePage({ onNavigate }) {
  return (
    <>
      <main>
        
        <section className="hero secao" id="hero" aria-label="Apresentação">
          <div className="container">
            <div className="hero-content">
              <span className="tag-acento hero-badge">// Soluções em TI desde 2010</span>
              <h1 className="hero-titulo">
                Transformamos<br />
                tecnologia em<br />
                <span className="gradiente-texto">resultados reais.</span>
              </h1>
              <p className="hero-desc">
                A <strong>Nexus TI</strong> oferece serviços de tecnologia de ponta para empresas que buscam inovação, segurança e eficiência em cada byte de seu negócio.
              </p>
              <div className="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primario" onClick={() => onNavigate('servicos')}>Ver Serviços</button>
                <a href="#sobre" className="btn btn-secundario">Conheça a Empresa</a>
              </div>
            </div>
          </div>
        </section>

        <div className="divisor"></div>

        
        <section className="secao" id="sobre" aria-labelledby="titulo-sobre">
          <div className="container">
            <span className="tag-acento">// Nossa história</span>
            <h2 className="secao-titulo" id="titulo-sobre">Quem somos</h2>
            <p>Conheça a trajetória de quem está por trás da inovação.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              <div className="scroll-area">
                <article>
                  <p style={{ marginBottom: '1.2rem' }}>Fundada em <em>2010</em> por três engenheiros de software apaixonados por tecnologia, a <strong>Nexus TI</strong> nasceu de uma visão simples: tornar soluções de TI acessíveis e eficientes para empresas de todos os portes.</p>
                  <p style={{ marginBottom: '1.2rem' }}>Em nosso primeiro ano, atendemos 12 clientes. Hoje, somamos mais de <strong>400 empresas parceiras</strong> em todo o Brasil, com escritórios em São Paulo, Recife e Porto Alegre.</p>
                  <p style={{ marginBottom: '1.2rem' }}>Nossa missão é conectar pessoas e sistemas de forma inteligente. Acreditamos que a tecnologia deve servir ao negócio — e não o contrário.</p>
                  <p style={{ marginBottom: '1.2rem' }}>Ao longo dos anos, conquistamos certificações internacionais, incluindo <em>ISO 27001</em> (segurança da informação) e <em>ISO 9001</em> (qualidade), além de parcerias estratégicas com Microsoft, AWS e Oracle.</p>
                  <p>Seja bem-vindo à <strong>Nexus TI</strong> — onde tecnologia encontra propósito.</p>
                </article>
              </div>
              <div>
                <div className="stats-grid">
                  {STATS.map(s => (
                    <div key={s.label} className="stat-card">
                      <span className="stat-numero">{s.numero}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divisor"></div>

        
        <section className="secao" id="video" aria-labelledby="titulo-video">
          <div className="container">
            <span className="tag-acento">// Conheça mais</span>
            <h2 className="secao-titulo" id="titulo-video">Vídeo institucional</h2>
            <p>Assista e entenda como transformamos negócios através da tecnologia.</p>
            <div className="video-container">
              <a href="https://www.youtube.com/watch?v=O41Nm6l0sbY" target="_blank" rel="noopener noreferrer" className="video-play-link" aria-label="Assistir vídeo institucional no YouTube">
                <img src="https://img.youtube.com/vi/O41Nm6l0sbY/hqdefault.jpg" alt="Vídeo institucional Nexus TI" className="video-thumb" loading="lazy" />
              </a>
              <div className="video-play-btn" aria-hidden="true">
                <svg viewBox="0 0 68 48" width="72" height="52">
                  <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C56 0 34 0 34 0S12 0 7.5 1.7a8.5 8.5 0 0 0-6 6C0 12.1 0 24 0 24s0 11.9 1.5 16.3a8.5 8.5 0 0 0 6 6C12 48 34 48 34 48s22 0 26.5-1.7a8.5 8.5 0 0 0 6-6C68 35.9 68 24 68 24s0-11.9-1.5-16.3z" fill="#ff0000"/>
                  <path d="M45 24 27 14v20" fill="#fff"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <div className="divisor"></div>

        
        <section className="secao" id="galeria" aria-labelledby="titulo-galeria">
          <div className="container">
            <span className="tag-acento">// Nosso ambiente</span>
            <h2 className="secao-titulo" id="titulo-galeria">Galeria</h2>
            <p>Conheça nosso espaço, equipe e projetos em andamento.</p>
            <div className="galeria-grid">
              {GALERIA.map((img, i) => (
                <figure key={i} className="galeria-item">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <div className="divisor"></div>

        
        <section className="secao" id="servicos-secao" aria-labelledby="titulo-servicos">
          <div className="container">
            <span className="tag-acento">// O que fazemos</span>
            <h2 className="secao-titulo" id="titulo-servicos">Nossos serviços</h2>
            <p>Soluções completas para cada etapa da jornada digital da sua empresa.</p>
            <div className="servicos-grid">
              {SERVICOS.map(s => (
                <article key={s.nome} className="servico-card">
                  <div className="servico-icone" aria-hidden="true">{s.icone}</div>
                  <h3 className="servico-nome">{s.nome}</h3>
                  <p className="servico-desc">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="divisor"></div>

        
        <section className="secao" id="equipe" aria-labelledby="titulo-equipe">
          <div className="container">
            <span className="tag-acento">// Quem fundou</span>
            <h2 className="secao-titulo" id="titulo-equipe">Nossos fundadores</h2>
            <p>Conheça as mentes por trás da Nexus TI.</p>
            <div className="fundadores-table">
              <table aria-label="Tabela de fundadores da Nexus TI">
                <thead>
                  <tr>
                    <th scope="col">Cargo</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Mini currículo</th>
                  </tr>
                </thead>
                <tbody>
                  {FUNDADORES.map(f => (
                    <tr key={f.nome}>
                      <td><strong>{f.cargo}</strong></td>
                      <td>
                        <strong>{f.nome}</strong><br />
                        <span style={{ fontSize: '0.8rem', color: 'var(--cor-texto-suave)' }}>{f.local}</span>
                      </td>
                      <td>{f.bio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
