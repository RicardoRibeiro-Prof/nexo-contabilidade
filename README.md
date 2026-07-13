# Nexo Contabilidade

Projeto demonstrativo de escritório contábil criado para portfólio, com layout editorial, páginas estáticas pré-renderizadas, SEO por rota e publicação no GitHub Pages.

## Diferenciais do projeto

- identidade visual vinho, bege e verde-oliva;
- layout editorial e assimétrico;
- imagens reais de escritório, equipe e artigos;
- páginas separadas para escritório, serviços, equipe, artigos, contato e privacidade;
- páginas individuais de serviços e artigos;
- HTML pré-renderizado;
- modo demonstração com `noindex, nofollow`;
- auditoria automática do build;
- botão flutuante de WhatsApp;
- menu “Início” em todas as páginas.

## Executar localmente

```bash
npm ci
npm run build
```

Os arquivos finais são gerados em `dist/`.

## Publicação

O workflow `.github/workflows/deploy-pages.yml` publica a pasta `dist` no GitHub Pages a cada push na branch `main`.

O GitHub Pages foi configurado para usar **GitHub Actions**. Este commit dispara a primeira publicação oficial do projeto.

URL esperada:

`https://ricardoribeiro-prof.github.io/nexo-contabilidade/`

## Modo demonstração

O projeto usa dados fictícios e mantém `noindex, nofollow`. Antes de usar em produção, substitua nome, profissionais, telefone, WhatsApp, e-mail, endereço, imagens, textos e política de privacidade.
