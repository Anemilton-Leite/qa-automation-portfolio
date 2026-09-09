# 🧪 QA Automation Portfolio — Anemilton Leite

> Projeto de automação de testes completo cobrindo **UI E2E**, **API REST** e **CI/CD pipeline** — demonstrando domínio real de Cypress, Playwright e boas práticas de Quality Assurance.

![CI](https://github.com/anemiltonleite/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📌 Sobre o Projeto

Este repositório simula um ambiente real de QA em uma aplicação de e-commerce ([SauceDemo](https://www.saucedemo.com)), cobrindo desde testes funcionais de UI até validação de APIs REST públicas, com pipeline automatizado no GitHub Actions.

### O que está sendo testado?
| Camada | Ferramenta | Cobertura |
|--------|-----------|-----------|
| UI / E2E | Cypress | Login, Carrinho, Checkout, Navegação |
| UI / E2E | Playwright | Cross-browser (Chrome, Firefox, WebKit) |
| API REST | Node.js + Fetch | Endpoints CRUD (JSONPlaceholder) |
| CI/CD | GitHub Actions | Execução automática a cada push/PR |

---

## 🏗️ Estrutura do Projeto

```
qa-automation-portfolio/
│
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.cy.js          # Testes de autenticação
│   │   ├── cart/
│   │   │   └── cart.cy.js           # Fluxo de carrinho
│   │   └── checkout/
│   │       └── checkout.cy.js       # Fluxo completo de compra
│   ├── fixtures/
│   │   └── users.json               # Dados de teste
│   ├── support/
│   │   ├── commands.js              # Comandos customizados
│   │   └── pages/                   # Page Object Model
│   │       ├── LoginPage.js
│   │       ├── CartPage.js
│   │       └── CheckoutPage.js
│   └── cypress.config.js
│
├── playwright/
│   ├── tests/
│   │   ├── login.spec.js            # Testes cross-browser
│   │   └── visual.spec.js           # Testes visuais (screenshots)
│   ├── pages/                       # Page Object Model
│   │   ├── LoginPage.js
│   │   └── InventoryPage.js
│   └── playwright.config.js
│
├── api-tests/
│   ├── posts.test.js                # CRUD completo de Posts
│   ├── users.test.js                # Validação de usuários
│   └── schemas/
│       └── post.schema.js           # Validação de schema JSON
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # Pipeline CI/CD
│
├── docs/
│   ├── test-plan.md                 # Plano de Testes
│   └── bug-report-template.md      # Template de Bug Report
│
├── package.json
└── README.md
```

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
git clone https://github.com/anemiltonleite/qa-automation-portfolio.git
cd qa-automation-portfolio
npm install
npx playwright install
```

### Executar testes

```bash
# Cypress — modo interativo
npm run cy:open

# Cypress — modo headless (CI)
npm run cy:run

# Playwright — todos os browsers
npm run pw:test

# Playwright — apenas Chrome
npm run pw:chrome

# API Tests
npm run api:test

# Todos os testes (CI completo)
npm run test:all
```

---

## 📊 Resultados & Relatórios

Após execução, os relatórios ficam em:

| Ferramenta | Relatório |
|-----------|-----------|
| Cypress | `cypress/reports/index.html` |
| Playwright | `playwright-report/index.html` |
| API | Output no terminal com pass/fail detalhado |

---

## 🧩 Estratégia de Testes

### Cypress — UI E2E
- **Page Object Model** para reutilização e manutenibilidade
- **Custom Commands** para ações repetidas (ex: `cy.login()`)
- **Fixtures** para dados de teste desacoplados do código
- Cobertura de **cenários positivos e negativos**

### Playwright — Cross-browser
- Execução simultânea em **Chrome, Firefox e WebKit (Safari)**
- **Screenshots automáticos** em caso de falha
- **Testes visuais** com comparação de capturas de tela

### API Testing
- Validação de **status codes**, **schema JSON** e **tempo de resposta**
- Cobertura de operações **GET, POST, PUT, DELETE**
- Cenários de **erro e edge cases**

### CI/CD — GitHub Actions
- Executa a cada **push** e **pull request**
- Relatório de resultados direto no PR
- Falha o pipeline se qualquer teste quebrar

---

## 📋 Casos de Teste Documentados

| ID | Módulo | Cenário | Tipo | Status |
|----|--------|---------|------|--------|
| TC001 | Login | Login com credenciais válidas | Positivo | ✅ |
| TC002 | Login | Login com senha inválida | Negativo | ✅ |
| TC003 | Login | Login com usuário bloqueado | Negativo | ✅ |
| TC004 | Login | Campos obrigatórios vazios | Negativo | ✅ |
| TC005 | Carrinho | Adicionar produto ao carrinho | Positivo | ✅ |
| TC006 | Carrinho | Remover produto do carrinho | Positivo | ✅ |
| TC007 | Carrinho | Carrinho persiste após navegação | Positivo | ✅ |
| TC008 | Checkout | Fluxo completo de compra | Positivo | ✅ |
| TC009 | Checkout | Checkout sem itens no carrinho | Negativo | ✅ |
| TC010 | API | GET /posts retorna 200 e array | Positivo | ✅ |
| TC011 | API | POST /posts cria recurso | Positivo | ✅ |
| TC012 | API | DELETE /posts/1 retorna 200 | Positivo | ✅ |

---

## 🐛 Bug Reports de Exemplo

Veja [`docs/bug-report-template.md`](docs/bug-report-template.md) para o template utilizado.

**Exemplo de bug encontrado durante os testes:**

> **BUG-001** — Usuário `problem_user` consegue adicionar itens ao carrinho mas não conclui o checkout (campo "Last Name" não aceita input). Severidade: **Alta**. Ambiente: Chrome 120, SauceDemo produção.

---

## 📚 Documentação

- [📄 Plano de Testes](docs/test-plan.md)
- [🐛 Template de Bug Report](docs/bug-report-template.md)

---

## 🛠️ Stack Completa

| Categoria | Tecnologia |
|-----------|-----------|
| UI Automation | Cypress 13, Playwright 1.40 |
| Linguagem | JavaScript (ES6+) |
| API Testing | Node.js Fetch API |
| CI/CD | GitHub Actions |
| Relatórios | Cypress Mochawesome, Playwright HTML |
| Versionamento | Git + GitHub |
| Gestão de Testes | Documentação Markdown |

---

<div align="center">

**Desenvolvido por [Anemilton Leite](https://linkedin.com/in/anemilton-moura)**  
📧 Anemilton01@gmail.com · 📍 Natal, RN

</div>
