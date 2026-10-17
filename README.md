# 🌌 Maya Store — Landing Page Bolsa Star Wars

Landing page de uma bolsa transversal temática, criada para a marca fictícia **Maya Store** (coleções nerd/geek). Projeto de portfólio: do design no Figma ao código em React, com efeito de **full page scroll** feito do zero, sem biblioteca.

> ⚠️ **Projeto fictício, feito apenas para estudo e portfólio.** Não é afiliado, patrocinado ou endossado pela Disney ou pela Lucasfilm. Star Wars e seus personagens pertencem aos respectivos donos.

<!-- 👉 Troque pelos seus: -->
<!-- 🔗 **Demo:** https://SEU-USUARIO.github.io/bolsa-starwars/ -->
<!-- ![Preview](./docs/preview.gif) -->

## ✨ Destaques

- **Full page scroll próprio:** troca de tela com mouse, trackpad, teclado e menu, usando um hook customizado (`useFullPage`) e `translate3d` no CSS.
- **Seção de Detalhes com duas "páginas":** grid de benefícios e um carrossel vertical circular, que conversa com o scroll da página.
- **Animações de entrada escalonadas** via variáveis CSS (`--i`) e respeito a `prefers-reduced-motion`.
- **Formulário de contato funcional** (Web3Forms) com estados de envio, sucesso e erro, e campo anti-spam.
- **Design system próprio** (cores, tipografia, raios) aplicado com tokens CSS.
- **Desktop first**, com fundo galáctico em CSS puro.

## 🛠️ Tecnologias

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- JavaScript (ES6+)
- CSS Modules e variáveis CSS
- [Web3Forms](https://web3forms.com/) para o envio do formulário
- Figma (protótipo e design system)
- Fontes: Rajdhani e Inter (Google Fonts)

## 🧠 Conceitos aplicados

- Hooks: `useState`, `useEffect`, `useRef` e hook customizado
- Composição de componentes e props (`SectionLayout`, `Button`)
- Eventos do navegador: `wheel` e `keydown` (com `passive: false`)
- Animações CSS: `transition`, `@keyframes`, `transform`, `clamp()`, `dvh`
- Grid e Flexbox, `backdrop-filter` e gradientes
- Acessibilidade: `aria-*`, `:focus-visible`, `prefers-reduced-motion`
- `fetch` com `async/await` e tratamento de erro
- Variáveis de ambiente no Vite (`import.meta.env`)

## 📁 Estrutura

```
src/
├── assets/        # imagens e logo
├── components/    # Header, Button
├── hooks/         # useFullPage (lógica do scroll de tela cheia)
├── layout/        # SectionLayout (estrutura fixa de cada tela)
├── sections/      # home, gallery, outfit, details, contact
├── App.jsx        # lista de telas e estado da tela atual
└── App.css        # tokens de design e CSS do full page scroll
```

## 🚀 Como rodar

```bash
# clonar
git clone https://github.com/SEU-USUARIO/bolsa-starwars.git
cd bolsa-starwars

# instalar
npm install

# configurar o formulário (chave gratuita em web3forms.com)
echo "VITE_WEB3FORMS_KEY=sua-chave" > .env.local

# rodar
npm run dev
```

## 🖼️ Telas

1. **Home:** apresentação do produto
2. **Galeria:** ângulos da bolsa
3. **Outfit:** a bolsa em uso
4. **Detalhes:** benefícios e carrossel dos diferenciais
5. **Contato:** formulário e benefícios de compra

## 👩‍💻 Autora

**Mayara Moraes**

<!-- [LinkedIn](https://linkedin.com/in/SEU-PERFIL) · [GitHub](https://github.com/SEU-USUARIO) -->
