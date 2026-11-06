const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderReference(api){
 const operations=Object.entries(api.paths).flatMap(([path,methods])=>Object.entries(methods).filter(([,op])=>op.operationId).map(([method,op])=>({path,method,op})));
 return `<p id="search-count" class="subtle">${operations.length} operations</p>`+operations.map(({path,method,op})=>{
 const headers=(op.parameters||[]).filter(p=>p.in==='header').map(p=>p.name).join(', ');const name=op.requestBody?.content?.['application/json']?.schema?.$ref?.split('/').at(-1);const body=name?api.components.schemas[name]:null;
 return `<details class="endpoint"><summary><span class="method ${esc(method)}">${method.toUpperCase()}</span><code>${esc(path)}</code></summary><p>${esc(op.operationId)}</p><p>${esc(op.description)}</p><div class="meta"><strong>Required scopes:</strong> <code>${esc((op['x-required-scopes']||[]).join(', '))}</code>${headers?'<br><strong>Required headers:</strong> '+esc(headers):''}</div>${body?'<div class="codebox"><span class="label">Request body schema</span><pre>'+esc(JSON.stringify(body,null,2))+'</pre></div>':''}</details>`;
 }).join('');
}
