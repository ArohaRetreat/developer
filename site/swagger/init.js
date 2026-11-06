/* Configuration follows https://swagger.io/docs/open-source-tools/swagger-ui/usage/configuration/ */
(async () => {
  const status = document.querySelector('#swagger-status');
  const apiOrigins = new Set(['https://aroharetreat.com', 'https://aroha-retreat-preprod.web.app']);
  try {
    const response = await fetch('/openapi.json', {credentials:'omit', redirect:'error'});
    if (!response.ok) throw Error('CONTRACT_UNAVAILABLE');
    const spec = await response.json();
    // Change only initial selection; the canonical contract remains unchanged.
    spec.servers = [...spec.servers].sort((a,b) => Number(b.url.includes('preprod'))-Number(a.url.includes('preprod')));
    SwaggerUIBundle({
      spec, dom_id:'#swagger-ui', layout:'BaseLayout',
      deepLinking:true, filter:true, displayOperationId:true,
      persistAuthorization:false, queryConfigEnabled:false,
      validatorUrl:null, withCredentials:false, tryItOutEnabled:false,
      supportedSubmitMethods:['get','post','put','patch','delete','options','head'],
      defaultModelsExpandDepth:0, docExpansion:'list',
      requestInterceptor(request) {
        const target = new URL(request.url, location.href);
        if (!apiOrigins.has(target.origin) || target.username || target.password ||
            !target.pathname.startsWith('/api/external/v1/')) {
          throw Error('API_TARGET_NOT_ALLOWED');
        }
        request.credentials='omit';
        request.redirect='error';
        return request;
      },
      onComplete() { status.textContent='Contract '+spec.info.version+' · choose an operation to inspect or try.'; },
    });
  } catch {
    status.textContent='Swagger UI could not load. Reload this page or download the OpenAPI document.';
  }
})();
