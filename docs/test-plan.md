# 📋 Plano de Testes — SauceDemo QA Automation

**Projeto:** qa-automation-portfolio  
**Aplicação:** [SauceDemo](https://www.saucedemo.com) + [JSONPlaceholder API](https://jsonplaceholder.typicode.com)  
**Autor:** Anemilton Leite  
**Versão:** 1.0.0  
**Data:** 2025

---

## 1. Objetivo

Validar os principais fluxos funcionais da aplicação SauceDemo e os endpoints da API JSONPlaceholder, garantindo cobertura de cenários positivos, negativos e edge cases por meio de automação com Cypress e Playwright.

---

## 2. Escopo

### ✅ In Scope
| Módulo | Descrição |
|--------|-----------|
| Autenticação | Login com diferentes tipos de usuário |
| Catálogo | Listagem e ordenação de produtos |
| Carrinho | Adicionar, remover e persistência de itens |
| Checkout | Fluxo completo de compra |
| API /posts | CRUD completo e validação de schema |
| API /users | Listagem, schema e relacionamentos |

### ❌ Out of Scope
- Testes de performance / carga
- Testes de segurança (pentest)
- Testes de acessibilidade avançada (WCAG)

---

## 3. Ambientes de Teste

| Ambiente | URL | Ferramenta |
|----------|-----|-----------|
| SauceDemo (UI) | https://www.saucedemo.com | Cypress + Playwright |
| JSONPlaceholder (API) | https://jsonplaceholder.typicode.com | Node.js Fetch |

---

## 4. Tipos de Teste

| Tipo | Ferramenta | Objetivo |
|------|-----------|---------|
| E2E / Funcional | Cypress | Validar fluxos completos via UI |
| Cross-browser | Playwright | Chrome, Firefox, Safari, Mobile |
| Visual | Playwright Screenshots | Detectar regressões visuais |
| API | Node.js | Validar contratos de API |
| CI/CD | GitHub Actions | Execução automática em cada push |

---

## 5. Critérios de Aceite

- ✅ Todos os testes marcados como críticos devem passar
- ✅ Tempo de resposta das APIs < 3000ms
- ✅ Screenshots de falha gerados automaticamente
- ✅ Relatórios HTML gerados após cada execução
- ✅ Pipeline CI/CD verde no branch `main`

---

## 6. Casos de Teste

### 6.1 Autenticação
| ID | Cenário | Tipo | Prioridade |
|----|---------|------|-----------|
| TC001 | Login com credenciais válidas | Positivo | 🔴 Alta |
| TC002 | Sessão persiste após reload | Positivo | 🟡 Média |
| TC003 | Senha incorreta exibe erro | Negativo | 🔴 Alta |
| TC004 | Usuário bloqueado exibe erro específico | Negativo | 🔴 Alta |
| TC005 | Username vazio exibe erro | Negativo | 🟡 Média |
| TC006 | Password vazio exibe erro | Negativo | 🟡 Média |
| TC007 | Ambos os campos vazios | Negativo | 🟡 Média |
| TC008 | Fechar mensagem de erro funciona | Positivo | 🟢 Baixa |

### 6.2 Carrinho
| ID | Cenário | Tipo | Prioridade |
|----|---------|------|-----------|
| TC009 | Adicionar produto ao carrinho | Positivo | 🔴 Alta |
| TC010 | Adicionar múltiplos produtos | Positivo | 🔴 Alta |
| TC011 | Produto correto aparece no carrinho | Positivo | 🔴 Alta |
| TC012 | Remover produto atualiza badge | Positivo | 🔴 Alta |
| TC013 | Carrinho persiste durante navegação | Positivo | 🟡 Média |

### 6.3 Checkout
| ID | Cenário | Tipo | Prioridade |
|----|---------|------|-----------|
| TC014 | Fluxo completo de compra (happy path) | Positivo | 🔴 Alta |
| TC015 | Resumo de preços visível antes de finalizar | Positivo | 🟡 Média |
| TC016 | Checkout sem primeiro nome bloqueia | Negativo | 🔴 Alta |
| TC017 | Checkout sem sobrenome bloqueia | Negativo | 🔴 Alta |
| TC018 | Checkout sem CEP bloqueia | Negativo | 🔴 Alta |

### 6.4 API — Posts
| ID | Cenário | Tipo | Prioridade |
|----|---------|------|-----------|
| TC-API001 | GET /posts retorna 200 e 100 itens | Positivo | 🔴 Alta |
| TC-API002 | GET /posts/1 valida schema completo | Positivo | 🔴 Alta |
| TC-API003 | GET /posts/9999 retorna 404 | Negativo | 🔴 Alta |
| TC-API004 | GET /users/1/posts filtra por usuário | Positivo | 🟡 Média |
| TC-API005 | POST /posts cria recurso com 201 | Positivo | 🔴 Alta |
| TC-API007 | PUT /posts/1 atualiza recurso completo | Positivo | 🟡 Média |
| TC-API008 | PATCH /posts/1 atualiza parcialmente | Positivo | 🟡 Média |
| TC-API009 | DELETE /posts/1 retorna 200 | Positivo | 🔴 Alta |

---

## 7. Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| SauceDemo fora do ar | Baixa | Alto | Retry automático no CI |
| JSONPlaceholder timeout | Baixa | Médio | Timeout configurado em 3s |
| Mudança de seletores | Média | Alto | Page Object Model isola seletores |

---

## 8. Métricas de Qualidade

| Métrica | Meta |
|---------|------|
| Cobertura de cenários críticos | 100% |
| Taxa de falsos positivos | < 5% |
| Tempo médio de execução da suite completa | < 5 min |
| Tempo de resposta de APIs | < 3000ms |
