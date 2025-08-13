/*
OinosPair - Single-file React site (App.jsx) — no Tailwind, beginner-friendly

Instruções rápidas:
1) Cria o projeto Vite (ver o passo-a-passo no chat abaixo).
2) Substitui src/App.jsx por este ficheiro.
3) Coloca o ícone em public/assets/oinospair_icon_transparent_1024.png (podes usar um placeholder se quiseres).
4) Executa `npm install` e `npm run dev`.

Este ficheiro usa CSS embutido (no <style>) para não precisares de configurar Tailwind.
*/

import React, { useState, useMemo } from 'react';

const MOCK_WINES = [
  { id: 1, name: 'Quinta do Vale - Douro Tinto', type: 'tinto', price: 12.5, region: 'Douro', tags: ['full-bodied','spicy'], link: '#' },
  { id: 2, name: 'Casa Branca - Vinho Verde', type: 'branco', price: 8.0, region: 'Vinho Verde', tags: ['light','crisp','citrus'], link: '#' },
  { id: 3, name: 'Solar Rosé - Alentejo', type: 'rosé', price: 9.0, region: 'Alentejo', tags: ['fruity','fresh'], link: '#' }
];

function matchDishToType(dish) {
  const t = (dish || '').toLowerCase();
  if (!t) return null;
  if (/(salm[oã]o|atum|peixe|marisco|seafood|fish)/i.test(t)) return 'branco';
  if (/(bife|steak|carne|cordeiro|beef|lamb|vitela)/i.test(t)) return 'tinto';
  if (/(salada|veg|vegetarian|verdura)/i.test(t)) return 'branco';
  if (/(massa|pasta|pizza|lasanha)/i.test(t)) return 'tinto';
  if (/(sobremesa|doce|dessert|cake)/i.test(t)) return 'rosé';
  return null;
}

export default function App() {
  const [dish, setDish] = useState('');
  const [budget, setBudget] = useState('any');
  const [prefType, setPrefType] = useState('any');
  const [results, setResults] = useState([]);

  const suggestedType = useMemo(() => matchDishToType(dish), [dish]);

  function runRecommendation() {
    const candidates = MOCK_WINES.filter(w => {
      if (prefType !== 'any' && w.type !== prefType) return false;
      if (budget === 'low' && w.price > 10) return false;
      if (budget === 'mid' && (w.price <= 10 || w.price > 30)) return false;
      if (budget === 'high' && w.price <= 30) return false;
      return true;
    });

    candidates.sort((a,b) => ((a.type === suggestedType) ? -1 : 0) - ((b.type === suggestedType) ? -1 : 0));
    setResults(candidates);
  }

  return (
    <div>
      <style>{`
        :root { --bg1: #FDF6F0; --muted: #6b7280; --accent: #4f46e5; }
        * { box-sizing: border-box; }
        body, html, #root { height: 100%; margin: 0; }
        .page { min-height: 100vh; background: linear-gradient(180deg,var(--bg1),#fff); font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f172a; }
        .container { max-width: 980px; margin: 0 auto; padding: 24px; }
        .header { display:flex; align-items:center; gap:12px; }
        .icon { width:64px; height:64px; border-radius:14px; object-fit:cover; box-shadow: 0 8px 20px rgba(15,23,42,0.08); }
        .title { font-size:22px; font-weight:700; margin:0; }
        .subtitle { margin:0; color:var(--muted); font-size:13px; }
        .main { display:flex; gap:18px; margin-top:20px; }
        .left { flex:2; background:#fff; border-radius:14px; padding:18px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
        .right { flex:1; background:#fff; border-radius:14px; padding:18px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
        .input, select { width:100%; padding:10px 12px; border-radius:10px; border:1px solid #e6e9ee; margin-bottom:10px; font-size:14px; }
        .row { display:flex; gap:8px; align-items:center; }
        .btn { background: var(--accent); color:#fff; padding:10px 14px; border-radius:10px; border:none; cursor:pointer; }
        .hint { color:var(--muted); font-size:13px; }
        .resultsGrid { display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin-top:12px; }
        .card { border-radius:10px; border:1px solid #eef2f6; padding:12px; background:#fff; }
        .cardTitle { font-weight:600; }
        .small { color:var(--muted); font-size:12px; }
        .footer { text-align:center; color:var(--muted); font-size:13px; margin-top:26px; }
        @media (max-width:900px) { .main { flex-direction:column; } .resultsGrid { grid-template-columns: repeat(1,1fr); } }
      `}</style>

      <div className="page">
        <div className="container">
          <header className="header">
            <img className="icon" src="/assets/oinospair_icon_transparent_1024.png" alt="OinosPair" onError={(e)=>{ e.target.onerror=null; e.target.src='https://via.placeholder.com/1024?text=OinosPair'; }} />
            <div>
              <h1 className="title">OinosPair</h1>
              <p className="subtitle">Encontre o vinho ideal para o seu prato — simples e rápido.</p>
            </div>
          </header>

          <main className="main">
            <section className="left">
              <h2 style={{marginTop:0}}>Diz o prato que vais cozinhar</h2>
              <input className="input" value={dish} onChange={e => setDish(e.target.value)} placeholder="Ex.: Salmão grelhado com limão" />

              <div className="row" style={{marginBottom:10}}>
                <select value={budget} onChange={e => setBudget(e.target.value)} className="input" style={{flex:1, marginRight:8}}>
                  <option value="any">Qualquer preço</option>
                  <option value="low">Até 10€</option>
                  <option value="mid">10€–30€</option>
                  <option value="high">+30€</option>
                </select>

                <select value={prefType} onChange={e => setPrefType(e.target.value)} className="input" style={{width:160}}>
                  <option value="any">Sem preferência</option>
                  <option value="branco">Branco</option>
                  <option value="tinto">Tinto</option>
                  <option value="rosé">Rosé</option>
                </select>

              </div>

              <div style={{display:'flex', gap:10, alignItems:'center'}}>
                <button className="btn" onClick={runRecommendation}>Encontrar vinho</button>
                <div className="hint">Sugestão automática: <strong>{suggestedType ? suggestedType.toUpperCase() : '—'}</strong></div>
              </div>

              <div className="resultsGrid">
                {results.length === 0 ? (
                  <div style={{gridColumn:'1/-1', color:'#6b7280'}}>Nenhuma sugestão — experimenta outra descrição ou clica em "Encontrar vinho".</div>
                ) : (
                  results.map(w => (
                    <div key={w.id} className="card">
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>
                          <div className="cardTitle">{w.name}</div>
                          <div className="small">{w.region} • {w.type.toUpperCase()}</div>
                        </div>
                        <div style={{fontWeight:600}}>{w.price}€</div>
                      </div>

                      <p className="small" style={{marginTop:8}}>{w.tags.join(' • ')}</p>

                      <div style={{marginTop:10, display:'flex', gap:8}}>
                        <a style={{flex:1, textAlign:'center', padding:8, borderRadius:8, border:'1px solid #e6e9ee', textDecoration:'none', color:'#0f172a'}} href={w.link}>Comprar</a>
                        <button style={{padding:8, borderRadius:8, border:'1px solid #e6e9ee', background:'#f8fafc', cursor:'pointer'}}>Alternativas</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </section>

            <aside className="right">
              <h3 style={{marginTop:0}}>Perfil e favoritos</h3>
              <p className="small">Guarda preferências e vinhos favoritos para acesso rápido.</p>
              <div style={{height:96, background:'#F7FAFC', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#9ca3af'}}>(Mocked — adicionar autenticação)</div>

              <div style={{marginTop:18}}>
                <h4 style={{marginBottom:6}}>Sobre o OinosPair</h4>
                <p className="small">Aplicação de harmonização simples. Integre lojas parceiras para encomendas diretas e use aprendizagem para personalização.</p>
              </div>
            </aside>
          </main>

          <div className="footer">Use os assets do ícone em <code>/public/assets/oinospair_icon_transparent_1024.png</code>. Para submissão use a versão flattened <code>oinospair_icon_store_1024.png</code>.</div>
        </div>
      </div>
    </div>
  );
}
