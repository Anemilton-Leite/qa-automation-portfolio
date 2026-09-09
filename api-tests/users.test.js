/**
 * API Tests — JSONPlaceholder /users
 */

const BASE_URL = "https://jsonplaceholder.typicode.com";

async function request(method, path) {
  const res = await fetch(`${BASE_URL}${path}`, { method });
  const data = await res.json();
  return { status: res.status, data };
}

function assert(condition, message) {
  if (!condition) throw new Error(`❌ FALHOU: ${message}`);
  console.log(`  ✅ ${message}`);
}

const USER_SCHEMA = ["id", "name", "username", "email", "address", "phone", "website", "company"];

async function runTests() {
  let passed = 0, failed = 0;

  async function runTest(name, fn) {
    process.stdout.write(`\n🧪 ${name}\n`);
    try {
      await fn();
      passed++;
    } catch (err) {
      console.error(`  ${err.message}`);
      failed++;
    }
  }

  console.log("\n════════════════════════════════════════════════════");
  console.log("  👤 API TESTS — JSONPlaceholder /users");
  console.log("════════════════════════════════════════════════════");

  await runTest("TC-USR001 — GET /users retorna 10 usuários", async () => {
    const { status, data } = await request("GET", "/users");
    assert(status === 200, "Status 200");
    assert(Array.isArray(data), "Response é array");
    assert(data.length === 10, "Retorna 10 usuários");
  });

  await runTest("TC-USR002 — GET /users/1 possui todos os campos do schema", async () => {
    const { status, data } = await request("GET", "/users/1");
    assert(status === 200, "Status 200");
    USER_SCHEMA.forEach((field) => {
      assert(field in data, `Campo "${field}" presente no response`);
    });
  });

  await runTest("TC-USR003 — email dos usuários tem formato válido", async () => {
    const { data } = await request("GET", "/users");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    data.forEach((user) => {
      assert(emailRegex.test(user.email), `Email válido: ${user.email}`);
    });
  });

  await runTest("TC-USR004 — GET /users/1/todos retorna tarefas do usuário", async () => {
    const { status, data } = await request("GET", "/users/1/todos");
    assert(status === 200, "Status 200");
    assert(Array.isArray(data), "Response é array");
    assert(data.every((t) => t.userId === 1), "Todas as tarefas pertencem ao userId 1");
    assert("completed" in data[0], 'Campo "completed" presente');
  });

  await runTest("TC-USR005 — GET /users/999 retorna 404", async () => {
    const { status } = await request("GET", "/users/999");
    assert(status === 404, "Status 404 para usuário inexistente");
  });

  console.log("\n════════════════════════════════════════════════════");
  console.log(`  ✅ Pass: ${passed}  ❌ Fail: ${failed}`);
  console.log("════════════════════════════════════════════════════\n");

  if (failed > 0) process.exit(1);
}

runTests().catch((err) => { console.error(err); process.exit(1); });
