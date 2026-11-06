import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
test('Swagger renders canonical operations with scoped authorization and guarded API execution', async()=>{
 const spec=JSON.parse(await readFile('site/openapi.json'));
 let config; const status={textContent:''};
 await vm.runInNewContext(await readFile('site/swagger/init.js','utf8'),{
  document:{querySelector:()=>status},location:{href:'https://developer.aroharetreat.com/swagger/'},
  fetch:async(url,options)=>{assert.equal(url,'/openapi.json');assert.equal(options.credentials,'omit');return{ok:true,json:async()=>structuredClone(spec)}},
  SwaggerUIBundle:options=>{config=options;options.onComplete()},URL,Set,Error,
 });
 assert.ok(config);assert.equal(config.spec.servers[0].url,'https://aroha-retreat-preprod.web.app/api/external/v1');
 assert.equal(config.persistAuthorization,false);assert.equal(config.validatorUrl,null);assert.equal(config.queryConfigEnabled,false);
 assert.ok(config.supportedSubmitMethods.includes('post')&&config.supportedSubmitMethods.includes('delete'));
 assert.deepEqual(JSON.parse(JSON.stringify(config.spec.paths)),spec.paths);
 const request=config.requestInterceptor({url:'https://aroharetreat.com/api/external/v1/reservations',method:'POST'});
 assert.equal(request.credentials,'omit');assert.equal(request.redirect,'error');
 for(const url of ['https://example.com/api/external/v1/runtime','https://aroharetreat.com/api/v1/runtime-config','https://user:pass@aroharetreat.com/api/external/v1/runtime'])assert.throws(()=>config.requestInterceptor({url}));
 assert.match(status.textContent,/Contract 1.3.0/);
});
