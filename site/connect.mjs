import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getAuth,
  setPersistence,
  inMemoryPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
const q = (s) => document.querySelector(s),
  status = q("#auth-status"),
  forms = q("#token-form"),
  result = q("#token-result");
const config = await (await fetch("/firebase-config.json")).json();
const auth = getAuth(initializeApp(config));
await setPersistence(auth, inMemoryPersistence);
const readScopes=['runtime:read','availability:read','calendar:read','reservations:read','inventory:read','content:published:read','communications:read'];
const contract=await (await fetch('/token-contract.json')).json();
const allScopes=contract.$defs.create.properties.scopes.items.enum;
const readOnly=()=>q('#token-mode').value==='read-only';
function renderScopes(){
 q('#scope-fields').replaceChildren();
 for(const scope of readOnly()?readScopes:allScopes){const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=scope;input.name='scope';input.checked=readScopes.includes(scope);input.disabled=scope==='runtime:read';label.append(input,document.createTextNode(scope));q('#scope-fields').append(label);}
 q('#generate').textContent=readOnly()?'Create read-only token':'Create scoped CRUD token';
 result.hidden=true;q('#secret').textContent='';
}
q('#token-mode').addEventListener('change',renderScopes);renderScopes();
const api = () =>
  q("#environment").value === "pre-prod"
    ? "https://aroha-retreat-preprod.web.app"
    : "https://aroharetreat.com";
const safeCode = (e) =>
  /^[A-Z_]{1,64}$/.test(e?.code || "") ? e.code : "REQUEST_UNAVAILABLE";
async function call(path, { method = "GET", body } = {}) {
  if (!auth.currentUser) throw { code: "SIGN_IN_REQUIRED" };
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(api() + "/api/v1/integration-tokens" + path, {
    method,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw { code: data?.error?.code };
  return data;
}
async function list() {
  const target = q("#tokens");
  target.replaceChildren();
  try {
    const data = await call("");
    for (const t of data.items) {
      const row = document.createElement("div");
      row.className = "token-row";
      const text = document.createElement("div"),
        name = document.createElement("strong"),
        detail = document.createElement("small");
      name.textContent = t.name;
      detail.textContent =
        (t.active ? "Active" : "Revoked") +
        " · " +
        (t.expiresAt === null ? "Never expires" : "Expires " + new Date(t.expiresAt).toLocaleString());
      text.append(name, detail);
      row.append(text);
      if (t.active) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "secondary";
        b.textContent = "Revoke";
        b.addEventListener("click", async () => {
          b.disabled = true;
          try {
            await call("/" + encodeURIComponent(t.id), {
              method: "DELETE",
              body: {},
            });
            status.textContent = "Token revoked.";
            await list();
          } catch (e) {
            status.textContent = safeCode(e);
            b.disabled = false;
          }
        });
        row.append(b);
      }
      target.append(row);
    }
    if (!data.items.length)
      target.textContent = "No integration tokens in this environment.";
  } catch (e) {
    status.textContent =
      safeCode(e) + ". This environment may still be awaiting API rollout.";
  }
}
q("#sign-in").addEventListener("click", async () => {
  status.textContent = "Opening Google sign-in…";
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch {
    status.textContent =
      "Google sign-in did not complete. Check browser popup access and authorized domain.";
  }
});
q("#sign-out").addEventListener("click", () => signOut(auth));
onAuthStateChanged(auth, (user) => {
  forms.hidden = !user;
  q("#sign-out").hidden = !user;
  q("#sign-in").hidden = !!user;
  result.hidden = true;
  q("#secret").textContent = "";
  status.textContent = user
    ? "Signed in. Choose the environment, mode and scopes for your token."
    : "Sign in with your existing Aroha Google account.";
  if (user) void list();
  else q("#tokens").replaceChildren();
});
q("#environment").addEventListener("change", () => {
  result.hidden = true;
  q("#secret").textContent = "";
  if (auth.currentUser) void list();
});
forms.addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = q("#generate");
  button.disabled = true;
  result.hidden = true;
  status.textContent = "Creating the selected scoped token…";
  try {
    const body = {
      name: q("#token-name").value,
      scopes: [...document.querySelectorAll("input[name=scope]:checked")].map(
        (x) => x.value,
      ),
      purpose: readOnly()?"mcp-readonly":"mcp",
      rowAccess: q("#staff-access").checked ? "all" : "own",
      ...(q("#client-id").value.trim()?{clientId:q("#client-id").value.trim()}:{}),
      expiresInHours: q("#expiry").value === "never" ? null : Number(q("#expiry").value),
    };
    const data = await call("", { method: "POST", body });
    q("#secret").textContent = data.token;
    result.hidden = false;
    status.textContent =
      "Token created. Copy it now; it cannot be retrieved again.";
    await list();
  } catch (e) {
    status.textContent =
      safeCode(e) + ". No replacement token was created automatically.";
  } finally {
    button.disabled = false;
  }
});
q("#copy-token").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(q("#secret").textContent);
    status.textContent =
      "Token copied. Store it in a private file; do not paste it into chat.";
  } catch {
    status.textContent =
      "Clipboard access unavailable. Select and copy the displayed token.";
  }
});
window.addEventListener("pagehide", () => {
  q("#secret").textContent = "";
});
