System.register([__v__("/jsenv-template-pwa/js/babel_helpers.nomodule.js")],(function(e,n){"use strict";var t,r,o,a,i,s,u,c;function InlineContent(e,n){let t=n.type,r=void 0===t?"text/plain":t;this.text=e,this.type=r}function l(e,n,t){return t?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e)}function p(e){return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];try{return Promise.resolve(e.apply(this,n))}catch(e){return Promise.reject(e)}}}function m(){}function f(e,n){return function(e,n,t){if(t)return n?n(e()):e();try{var r=Promise.resolve(e());return n?r.then(n):r}catch(e){return Promise.reject(e)}}(e,m,n)}return{setters:[function(e){}],execute:function(){t=new InlineContent('@font-face{font-family:Roboto;font-style:normal;font-weight:400;src:local(Roboto),url('+__v__("/jsenv-template-pwa/other/roboto_v27_latin_regular.woff2")+')format("woff2");font-display:swap}#splashscreen{font-family:Roboto}',{type:"text/css"}),(r=new CSSStyleSheet).replaceSync(t.text),e("loadApp",p((function(e){let t=e.appNode;performance.measure("loading app"),document.adoptedStyleSheets=[...document.adoptedStyleSheets,r];const s=o(),u=a(new URL(__v__("/jsenv-template-pwa/css/app.css"),n.meta.url));return l(i(),(function(){return l(s,(function(e){return performance.measure("rendering app"),e.render({appNode:t}),performance.measure("app rendered"),l(Promise.all([u,new Promise((e=>{window.requestIdleCallback?window.requestIdleCallback(e,{timeout:60}):window.requestAnimationFrame(e)}))]),(function(){performance.measure("app displayed")}))}))}))}))),o=p((function(){return l(n.import(__v__("/jsenv-template-pwa/js/app.nomodule.js")),(function(e){return performance.measure("app.js ready"),e}))})),a=p((function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.crossOrigin;const r=new Promise(((n,r)=>{const o=document.createElement("link");o.rel="stylesheet",o.onload=n,o.onerror=r,o.href=e,o.crossOrigin=t,document.head.appendChild(o)}));return l(r,(function(){performance.measure("app.css ready")}))})),i=p((function(){return f(s)})),s=p((function(){return l(new Promise((e=>{setTimeout(e,20)})),(function(){return performance.measure('"loading bannana..." done'),f(u)}))})),u=p((function(){return l(new Promise((e=>{setTimeout(e,30)})),(function(){return performance.measure('"loading gorilla..." done'),f(c)}))})),c=p((function(){return l(new Promise((e=>{setTimeout(e,20)})),(function(){performance.measure('"loading jungle..." done')}))}))}}}));