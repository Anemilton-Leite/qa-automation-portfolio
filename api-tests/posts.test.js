/**
 * API Tests — JSONPlaceholder /posts
 * Cobrindo: GET, POST, PUT, PATCH, DELETE + validação de schema
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ── Helpers ──────────────────────────────────────────────────────────────────
async function request(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, data, headers: res.headers };
}

function assert(condition, message) {
  if (!condition) throw new Error(`❌ FALHOU: ${message}`);
  console.log(`  ✅ ${message}`);
}

function assertSchema(obj, schema) {
  for (const [key, type] of Object.entries(schema)) {
    assert(
      typeof obj[key] === type,
      `Campo "${key}" deve ser ${type} (recebido: ${typeof obj[key]})`
    );
  }
}

// ── Schema esperado ───────────────────────────────────────────────────────────
const POST_SCHEMA = {
  userId: "number",
  id:     "number",
  title:  "string",
  body:   "string",
};

// ── Suite de Testes ───────────────────────────────────────────────────────────
async function runTests() {
  let passed = 0;
  let failed = 0;
  const results = [];

  async function runTest(name, fn) {
    process.stdout.write(`\n🧪 ${name}\n`);
    const start = Date.now();
    try {
      await fn();
      const ms = Date.now() - start;
      console.log(`  ⏱  ${ms}ms`);
      assert(ms < 3000, `Tempo de resposta < 3000ms (${ms}ms)`);
      passed++;
      results.push({ name, status: "PASS", ms });
    } catch (err) {
      console.error(`  ${err.message}`);
      failed++;
      results.push({ name, status: "FAIL", error: err.message });
    }
  }

  console.log("\n════════════════════════════════════════════════════");
  console.log("  🔌 API TESTS — JSONPlaceholder /posts");
  console.log("════════════════════════════════════════════════════");

  // ── GET ─────────────────────────────────────────────────────────────────────
  await runTest("TC-API001 — GET /posts retorna 200 e array com 100 itens", async () => {
    const { status, data } = await request("GET", "/posts");
    assert(status === 200, "Status code é 200");
    assert(Array.isArray(data), "Response é um array");
    assert(data.length === 100, "Array contém 100 posts");
  });

  await runTest("TC-API002 — GET /posts/1 retorna post com schema correto", async () => {
    const { status, data } = await request("GET", "/posts/1");
    assert(status === 200, "Status code é 200");
    assertSchema(data, POST_SCHEMA);
    assert(data.id === 1, "ID do post é 1");
  });

  await runTest("TC-API003 — GET /posts/9999 retorna 404", async () => {
    const { status } = await request("GET", "/posts/9999");
    assert(status === 404, "Status code é 404 para recurso inexistente");
  });

  await runTest("TC-API004 — GET /users/1/posts retorna posts do usuário", async () => {
    const { status, data } = await request("GET", "/users/1/posts");
    assert(status === 200, "Status code é 200");
    assert(Array.isArray(data), "Response é um array");
    assert(data.every((p) => p.userId === 1), "Todos os posts pertencem ao userId 1");
  });

  // ── POST ────────────────────────────────────────────────────────────────────
  await runTest("TC-API005 — POST /posts cria novo post e retorna 201", async () => {
    const payload = { userId: 1, title: "QA Automation com Playwright", body: "Testando criação de recurso via API" };
    const { status, data } = await request("POST", "/posts", payload);
    assert(status === 201, "Status code é 201 Created");
    assert(typeof data.id === "number", "Response contém ID gerado");
    assert(data.title === payload.title, "Title bate com o enviado");
    assert(data.body === payload.body, "Body bate com o enviado");
  });

  await runTest("TC-API006 — POST /posts sem campos obrigatórios ainda retorna ID (comportamento da API mock)", async () => {
    const { status, data } = await request("POST", "/posts", {});
    assert(status === 201, "Status code é 201");
    assert(typeof data.id === "number", "Response contém ID mesmo sem campos");
  });

  // ── PUT ─────────────────────────────────────────────────────────────────────
  await runTest("TC-API007 — PUT /posts/1 atualiza recurso completo e retorna 200", async () => {
    const payload = { id: 1, userId: 1, title: "Título Atualizado", body: "Body atualizado via PUT" };
    const { status, data } = await request("PUT", "/posts/1", payload);
    assert(status === 200, "Status code é 200");
    assert(data.title === payload.title, "Title foi atualizado");
    assert(data.body === payload.body, "Body foi atualizado");
  });

  // ── PATCH ───────────────────────────────────────────────────────────────────
  await runTest("TC-API008 — PATCH /posts/1 atualiza apenas o título", async () => {
    const { status, data } = await request("PATCH", "/posts/1", { title: "Apenas o título mudou" });
    assert(status === 200, "Status code é 200");
    assert(data.title === "Apenas o título mudou", "Apenas o título foi alterado");
    assert(typeof data.body === "string", "Body permanece presente");
  });

  // ── DELETE ──────────────────────────────────────────────────────────────────
  await runTest("TC-API009 — DELETE /posts/1 retorna 200", async () => {
    const { status, data } = await request("DELETE", "/posts/1");
    assert(status === 200, "Status code é 200");
    assert(Object.keys(data).length === 0, "Body da resposta está vazio {}");
  });

  // ── RELATÓRIO FINAL ──────────────────────────────────────────────────────────
  console.log("\n════════════════════════════════════════════════════");
  console.log("  📊 RESULTADO FINAL");
  console.log("════════════════════════════════════════════════════");
  console.log(`  Total:   ${passed + failed}`);
  console.log(`  ✅ Pass: ${passed}`);
  console.log(`  ❌ Fail: ${failed}`);
  console.log("════════════════════════════════════════════════════\n");

  if (failed > 0) {
    console.log("Testes com falha:");
    results.filter((r) => r.status === "FAIL").forEach((r) => {
      console.log(`  - ${r.name}: ${r.error}`);
    });
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Erro inesperado:", err);
  process.exit(1);
});
