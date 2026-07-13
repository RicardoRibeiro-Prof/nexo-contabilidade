import fs from 'node:fs/promises'
import path from 'node:path'

const dist=path.join(process.cwd(),'dist')
const failures=[]
const routes=['','escritorio/','servicos/','servicos/abertura-e-regularizacao/','servicos/contabilidade-para-mei/','servicos/rotinas-fiscais/','servicos/departamento-pessoal/','servicos/planejamento-tributario/','servicos/imposto-de-renda/','equipe/','artigos/','artigos/como-separar-financas-pessoais-e-empresariais/','artigos/simples-nacional-o-que-observar/','artigos/documentos-para-rotina-contabil/','contato/','politica-de-privacidade/']
const exists=f=>fs.access(f).then(()=>true).catch(()=>false)
const text=html=>html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()

for(const route of routes){
  const file=path.join(dist,route,'index.html')
  if(!(await exists(file))){failures.push(`Página ausente: ${route||'/'}`);continue}
  const html=await fs.readFile(file,'utf8')
  const h1=(html.match(/<h1\b/gi)||[]).length
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]||''
  if(!/data-prerendered="true"/.test(html))failures.push(`${route||'/'}: pré-renderização ausente`)
  if(!/<title>[^<]+<\/title>/.test(html))failures.push(`${route||'/'}: title ausente`)
  if(!/<meta name="description" content="[^"]+"/.test(html))failures.push(`${route||'/'}: description ausente`)
  if(!/<meta name="robots" content="noindex, nofollow"/.test(html))failures.push(`${route||'/'}: noindex ausente`)
  if(h1!==1)failures.push(`${route||'/'}: esperado um H1; encontrado ${h1}`)
  if(!canonical.startsWith('https://ricardoribeiro-prof.github.io/nexo-contabilidade/'))failures.push(`${route||'/'}: canonical incorreto`)
  if(!html.includes('/nexo-contabilidade/assets/styles.css'))failures.push(`${route||'/'}: CSS fora do caminho-base`)
  if(!html.includes('/nexo-contabilidade/assets/app.js'))failures.push(`${route||'/'}: JS fora do caminho-base`)
  if(text(html).length<220)failures.push(`${route||'/'}: conteúdo insuficiente`)
  if(!html.includes('>Início</a>'))failures.push(`${route||'/'}: menu Início ausente`)
}

for(const file of ['assets/styles.css','assets/app.js','assets/favicon.svg','assets/social.svg','manifest.webmanifest','robots.txt','sitemap.xml','404.html','admin/index.html'])if(!(await exists(path.join(dist,file))))failures.push(`Arquivo ausente: ${file}`)
if(failures.length){console.error(failures.map(x=>`- ${x}`).join('\n'));process.exit(1)}
console.log(`Auditoria concluída: ${routes.length} páginas públicas e arquivos essenciais validados.`)
