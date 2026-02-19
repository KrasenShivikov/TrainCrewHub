(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();const Bl=`<div class="d-flex flex-column min-vh-100 bg-light-subtle">\r
  <header id="app-header"></header>\r
  <main id="page-content" class="container py-4 flex-grow-1"></main>\r
  <footer id="app-footer"></footer>\r
</div>\r
`,Kl=`<nav class="navbar navbar-expand-lg navbar-dark app-navbar">\r
  <div class="container-xl px-3 px-lg-4">\r
\r
    <!-- Brand -->\r
    <a class="navbar-brand d-flex align-items-center gap-2" href="/" data-link>\r
      <span class="app-navbar-logo-icon"><i class="bi bi-train-front-fill"></i></span>\r
      <span class="app-navbar-logo-text">TrainCrewHub</span>\r
    </a>\r
\r
    <!-- Toggler -->\r
    <button\r
      class="navbar-toggler border-0 shadow-none"\r
      type="button"\r
      data-bs-toggle="collapse"\r
      data-bs-target="#mainNav"\r
      aria-controls="mainNav"\r
      aria-expanded="false"\r
      aria-label="Toggle navigation"\r
    >\r
      <span class="navbar-toggler-icon"></span>\r
    </button>\r
\r
    <!-- Nav links -->\r
    <div class="collapse navbar-collapse" id="mainNav">\r
      <ul class="navbar-nav me-auto gap-0 gap-lg-1 mt-2 mt-lg-0">\r
\r
        <li class="nav-item">\r
          <a class="nav-link app-nav-link" href="/" data-link>\r
            <i class="bi bi-house-door"></i>\r
            <span>Начало</span>\r
          </a>\r
        </li>\r
\r
        <li class="nav-item dropdown">\r
          <a class="nav-link app-nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\r
            <i class="bi bi-calendar3"></i>\r
            <span>Графици</span>\r
          </a>\r
          <ul class="dropdown-menu app-dropdown">\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/schedule-keys" data-link>\r
                <i class="bi bi-calendar-event app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Ключ-График</div><div class="app-dropdown-desc">Управление на ключове</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/plan-schedule" data-link>\r
                <i class="bi bi-layout-text-sidebar app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">План График</div><div class="app-dropdown-desc">Планиране на графика</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/schedule" data-link>\r
                <i class="bi bi-calendar-check app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">График</div><div class="app-dropdown-desc">Преглед на текущия график</div></div>\r
              </a>\r
            </li>\r
          </ul>\r
        </li>\r
\r
        <li class="nav-item dropdown">\r
          <a class="nav-link app-nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\r
            <i class="bi bi-clipboard-check"></i>\r
            <span>Повески</span>\r
          </a>\r
          <ul class="dropdown-menu app-dropdown">\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/trains" data-link>\r
                <i class="bi bi-train-front app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Влакове</div><div class="app-dropdown-desc">Разписание и информация</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/duties" data-link>\r
                <i class="bi bi-list-task app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Повески</div><div class="app-dropdown-desc">Каталог с повески</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/duty-types" data-link>\r
                <i class="bi bi-tags app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Типове повески</div><div class="app-dropdown-desc">Категории и типове</div></div>\r
              </a>\r
            </li>\r
            <li><hr class="dropdown-divider my-1"></li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/planned-duties" data-link>\r
                <i class="bi bi-calendar2-plus app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Планирани повески</div><div class="app-dropdown-desc">Планирано изпълнение</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/actual-duties" data-link>\r
                <i class="bi bi-clipboard2-check app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Реални повески</div><div class="app-dropdown-desc">Реално изпълнение</div></div>\r
              </a>\r
            </li>\r
          </ul>\r
        </li>\r
\r
        <li class="nav-item dropdown">\r
          <a class="nav-link app-nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">\r
            <i class="bi bi-people"></i>\r
            <span>Персонал</span>\r
          </a>\r
          <ul class="dropdown-menu app-dropdown">\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/employees" data-link>\r
                <i class="bi bi-person-badge app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Служители</div><div class="app-dropdown-desc">Управление на персонала</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/employee-absences" data-link>\r
                <i class="bi bi-person-dash app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Отсъствия</div><div class="app-dropdown-desc">Отпуски и болнични</div></div>\r
              </a>\r
            </li>\r
            <li>\r
              <a class="dropdown-item app-dropdown-item" href="/user-profiles" data-link>\r
                <i class="bi bi-shield-person app-dropdown-icon"></i>\r
                <div><div class="app-dropdown-label">Потребителски профили</div><div class="app-dropdown-desc">Права и роли</div></div>\r
              </a>\r
            </li>\r
          </ul>\r
        </li>\r
\r
        <li class="nav-item">\r
          <a class="nav-link app-nav-link" href="/documents" data-link>\r
            <i class="bi bi-file-earmark-text"></i>\r
            <span>Документи</span>\r
          </a>\r
        </li>\r
\r
        <li class="nav-item d-none" id="nav-admin">\r
          <a class="nav-link app-nav-link" href="/admin" data-link>\r
            <i class="bi bi-gear"></i>\r
            <span>Админ</span>\r
          </a>\r
        </li>\r
\r
      </ul>\r
\r
      <!-- Right side: auth -->\r
      <ul class="navbar-nav gap-0 gap-lg-1 mt-2 mt-lg-0">\r
        <li class="nav-item" id="nav-sign-in">\r
          <a class="nav-link app-nav-link" href="/login" data-link>\r
            <i class="bi bi-box-arrow-in-right"></i>\r
            <span>Вход</span>\r
          </a>\r
        </li>\r
        <li class="nav-item" id="nav-register">\r
          <a class="nav-link app-nav-link" href="/register" data-link>\r
            <i class="bi bi-person-plus"></i>\r
            <span>Регистрация</span>\r
          </a>\r
        </li>\r
        <li class="nav-item d-none" id="nav-my-profile">\r
          <a class="nav-link app-nav-link" href="/user-profiles" data-link>\r
            <i class="bi bi-person-circle"></i>\r
            <span>Профили</span>\r
          </a>\r
        </li>\r
        <li class="nav-item d-none" id="nav-logout">\r
          <button type="button" class="nav-link app-nav-link btn btn-link p-0 border-0 text-decoration-none">\r
            <i class="bi bi-box-arrow-right"></i>\r
            <span>Изход</span>\r
          </button>\r
        </li>\r
      </ul>\r
    </div>\r
  </div>\r
</nav>\r
`;function us(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(e);s<r.length;s++)t.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(e,r[s])&&(n[r[s]]=e[r[s]]);return n}function zl(e,t,n,r){function s(a){return a instanceof n?a:new n(function(i){i(a)})}return new(n||(n=Promise))(function(a,i){function o(c){try{l(r.next(c))}catch(u){i(u)}}function d(c){try{l(r.throw(c))}catch(u){i(u)}}function l(c){c.done?a(c.value):s(c.value).then(o,d)}l((r=r.apply(e,t||[])).next())})}const Wl=e=>e?(...t)=>e(...t):(...t)=>fetch(...t);class ka extends Error{constructor(t,n="FunctionsError",r){super(t),this.name=n,this.context=r}}class Vl extends ka{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}}class ni extends ka{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}}class ri extends ka{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}}var Ks;(function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"})(Ks||(Ks={}));class Gl{constructor(t,{headers:n={},customFetch:r,region:s=Ks.Any}={}){this.url=t,this.headers=n,this.region=s,this.fetch=Wl(r)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t){return zl(this,arguments,void 0,function*(n,r={}){var s;let a,i;try{const{headers:o,method:d,body:l,signal:c,timeout:u}=r;let p={},{region:m}=r;m||(m=this.region);const h=new URL(`${this.url}/${n}`);m&&m!=="any"&&(p["x-region"]=m,h.searchParams.set("forceFunctionRegion",m));let y;l&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&l instanceof Blob||l instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",y=l):typeof l=="string"?(p["Content-Type"]="text/plain",y=l):typeof FormData<"u"&&l instanceof FormData?y=l:(p["Content-Type"]="application/json",y=JSON.stringify(l)):l&&typeof l!="string"&&!(typeof Blob<"u"&&l instanceof Blob)&&!(l instanceof ArrayBuffer)&&!(typeof FormData<"u"&&l instanceof FormData)?y=JSON.stringify(l):y=l;let f=c;u&&(i=new AbortController,a=setTimeout(()=>i.abort(),u),c?(f=i.signal,c.addEventListener("abort",()=>i.abort())):f=i.signal);const b=yield this.fetch(h.toString(),{method:d||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),o),body:y,signal:f}).catch(k=>{throw new Vl(k)}),w=b.headers.get("x-relay-error");if(w&&w==="true")throw new ni(b);if(!b.ok)throw new ri(b);let v=((s=b.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),_;return v==="application/json"?_=yield b.json():v==="application/octet-stream"||v==="application/pdf"?_=yield b.blob():v==="text/event-stream"?_=b:v==="multipart/form-data"?_=yield b.formData():_=yield b.text(),{data:_,error:null,response:b}}catch(o){return{data:null,error:o,response:o instanceof ri||o instanceof ni?o.context:void 0}}finally{a&&clearTimeout(a)}})}}var Jl=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}},Ql=class{constructor(e){var t,n,r;this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=(t=e.shouldThrowOnError)!==null&&t!==void 0?t:!1,this.signal=e.signal,this.isMaybeSingle=(n=e.isMaybeSingle)!==null&&n!==void 0?n:!1,this.urlLengthLimit=(r=e.urlLengthLimit)!==null&&r!==void 0?r:8e3,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}then(e,t){var n=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const r=this.fetch;let s=r(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async a=>{let i=null,o=null,d=null,l=a.status,c=a.statusText;if(a.ok){var u,p;if(n.method!=="HEAD"){var m;const b=await a.text();b===""||(n.headers.get("Accept")==="text/csv"||n.headers.get("Accept")&&(!((m=n.headers.get("Accept"))===null||m===void 0)&&m.includes("application/vnd.pgrst.plan+text"))?o=b:o=JSON.parse(b))}const y=(u=n.headers.get("Prefer"))===null||u===void 0?void 0:u.match(/count=(exact|planned|estimated)/),f=(p=a.headers.get("content-range"))===null||p===void 0?void 0:p.split("/");y&&f&&f.length>1&&(d=parseInt(f[1])),n.isMaybeSingle&&n.method==="GET"&&Array.isArray(o)&&(o.length>1?(i={code:"PGRST116",details:`Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},o=null,d=null,l=406,c="Not Acceptable"):o.length===1?o=o[0]:o=null)}else{var h;const y=await a.text();try{i=JSON.parse(y),Array.isArray(i)&&a.status===404&&(o=[],i=null,l=200,c="OK")}catch{a.status===404&&y===""?(l=204,c="No Content"):i={message:y}}if(i&&n.isMaybeSingle&&(!(i==null||(h=i.details)===null||h===void 0)&&h.includes("0 rows"))&&(i=null,l=200,c="OK"),i&&n.shouldThrowOnError)throw new Jl(i)}return{error:i,data:o,count:d,status:l,statusText:c}});return this.shouldThrowOnError||(s=s.catch(a=>{var i;let o="",d="",l="";const c=a==null?void 0:a.cause;if(c){var u,p,m,h;const b=(u=c==null?void 0:c.message)!==null&&u!==void 0?u:"",w=(p=c==null?void 0:c.code)!==null&&p!==void 0?p:"";o=`${(m=a==null?void 0:a.name)!==null&&m!==void 0?m:"FetchError"}: ${a==null?void 0:a.message}`,o+=`

Caused by: ${(h=c==null?void 0:c.name)!==null&&h!==void 0?h:"Error"}: ${b}`,w&&(o+=` (${w})`),c!=null&&c.stack&&(o+=`
${c.stack}`)}else{var y;o=(y=a==null?void 0:a.stack)!==null&&y!==void 0?y:""}const f=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(l="",d="Request was aborted (timeout or manual cancellation)",f>this.urlLengthLimit&&(d+=`. Note: Your request URL is ${f} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((c==null?void 0:c.name)==="HeadersOverflowError"||(c==null?void 0:c.code)==="UND_ERR_HEADERS_OVERFLOW")&&(l="",d="HTTP headers exceeded server limits (typically 16KB)",f>this.urlLengthLimit&&(d+=`. Your request URL is ${f} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(i=a==null?void 0:a.name)!==null&&i!==void 0?i:"FetchError"}: ${a==null?void 0:a.message}`,details:o,hint:d,code:l},data:null,count:null,status:0,statusText:""}})),s.then(e,t)}returns(){return this}overrideTypes(){return this}},Yl=class extends Ql{select(e){let t=!1;const n=(e??"*").split("").map(r=>/\s/.test(r)&&!t?"":(r==='"'&&(t=!t),r)).join("");return this.url.searchParams.set("select",n),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:n,foreignTable:r,referencedTable:s=r}={}){const a=s?`${s}.order`:"order",i=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${i?`${i},`:""}${e}.${t?"asc":"desc"}${n===void 0?"":n?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:n=t}={}){const r=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(r,`${e}`),this}range(e,t,{foreignTable:n,referencedTable:r=n}={}){const s=typeof r>"u"?"offset":`${r}.offset`,a=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:n=!1,buffers:r=!1,wal:s=!1,format:a="text"}={}){var i;const o=[e?"analyze":null,t?"verbose":null,n?"settings":null,r?"buffers":null,s?"wal":null].filter(Boolean).join("|"),d=(i=this.headers.get("Accept"))!==null&&i!==void 0?i:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${d}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};const si=new RegExp("[,()]");var on=class extends Yl{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){const n=Array.from(new Set(t)).map(r=>typeof r=="string"&&si.test(r)?`"${r}"`:`${r}`).join(",");return this.url.searchParams.append(e,`in.(${n})`),this}notIn(e,t){const n=Array.from(new Set(t)).map(r=>typeof r=="string"&&si.test(r)?`"${r}"`:`${r}`).join(",");return this.url.searchParams.append(e,`not.in.(${n})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:n,type:r}={}){let s="";r==="plain"?s="pl":r==="phrase"?s="ph":r==="websearch"&&(s="w");const a=n===void 0?"":`(${n})`;return this.url.searchParams.append(e,`${s}fts${a}.${t}`),this}match(e){return Object.entries(e).forEach(([t,n])=>{this.url.searchParams.append(t,`eq.${n}`)}),this}not(e,t,n){return this.url.searchParams.append(e,`not.${t}.${n}`),this}or(e,{foreignTable:t,referencedTable:n=t}={}){const r=n?`${n}.or`:"or";return this.url.searchParams.append(r,`(${e})`),this}filter(e,t,n){return this.url.searchParams.append(e,`${t}.${n}`),this}},Xl=class{constructor(e,{headers:t={},schema:n,fetch:r,urlLengthLimit:s=8e3}){this.url=e,this.headers=new Headers(t),this.schema=n,this.fetch=r,this.urlLengthLimit=s}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){const{head:n=!1,count:r}=t??{},s=n?"HEAD":"GET";let a=!1;const i=(e??"*").split("").map(l=>/\s/.test(l)&&!a?"":(l==='"'&&(a=!a),l)).join(""),{url:o,headers:d}=this.cloneRequestState();return o.searchParams.set("select",i),r&&d.append("Prefer",`count=${r}`),new on({method:s,url:o,headers:d,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(e,{count:t,defaultToNull:n=!0}={}){var r;const s="POST",{url:a,headers:i}=this.cloneRequestState();if(t&&i.append("Prefer",`count=${t}`),n||i.append("Prefer","missing=default"),Array.isArray(e)){const o=e.reduce((d,l)=>d.concat(Object.keys(l)),[]);if(o.length>0){const d=[...new Set(o)].map(l=>`"${l}"`);a.searchParams.set("columns",d.join(","))}}return new on({method:s,url:a,headers:i,schema:this.schema,body:e,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(e,{onConflict:t,ignoreDuplicates:n=!1,count:r,defaultToNull:s=!0}={}){var a;const i="POST",{url:o,headers:d}=this.cloneRequestState();if(d.append("Prefer",`resolution=${n?"ignore":"merge"}-duplicates`),t!==void 0&&o.searchParams.set("on_conflict",t),r&&d.append("Prefer",`count=${r}`),s||d.append("Prefer","missing=default"),Array.isArray(e)){const l=e.reduce((c,u)=>c.concat(Object.keys(u)),[]);if(l.length>0){const c=[...new Set(l)].map(u=>`"${u}"`);o.searchParams.set("columns",c.join(","))}}return new on({method:i,url:o,headers:d,schema:this.schema,body:e,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit})}update(e,{count:t}={}){var n;const r="PATCH",{url:s,headers:a}=this.cloneRequestState();return t&&a.append("Prefer",`count=${t}`),new on({method:r,url:s,headers:a,schema:this.schema,body:e,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:e}={}){var t;const n="DELETE",{url:r,headers:s}=this.cloneRequestState();return e&&s.append("Prefer",`count=${e}`),new on({method:n,url:r,headers:s,schema:this.schema,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}};function Zn(e){"@babel/helpers - typeof";return Zn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Zn(e)}function Zl(e,t){if(Zn(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(Zn(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ed(e){var t=Zl(e,"string");return Zn(t)=="symbol"?t:t+""}function td(e,t,n){return(t=ed(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ai(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function $r(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ai(Object(n),!0).forEach(function(r){td(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ai(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var nd=class Po{constructor(t,{headers:n={},schema:r,fetch:s,timeout:a,urlLengthLimit:i=8e3}={}){this.url=t,this.headers=new Headers(n),this.schemaName=r,this.urlLengthLimit=i;const o=s??globalThis.fetch;a!==void 0&&a>0?this.fetch=(d,l)=>{const c=new AbortController,u=setTimeout(()=>c.abort(),a),p=l==null?void 0:l.signal;if(p){if(p.aborted)return clearTimeout(u),o(d,l);const m=()=>{clearTimeout(u),c.abort()};return p.addEventListener("abort",m,{once:!0}),o(d,$r($r({},l),{},{signal:c.signal})).finally(()=>{clearTimeout(u),p.removeEventListener("abort",m)})}return o(d,$r($r({},l),{},{signal:c.signal})).finally(()=>clearTimeout(u))}:this.fetch=o}from(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Xl(new URL(`${this.url}/${t}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(t){return new Po(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(t,n={},{head:r=!1,get:s=!1,count:a}={}){var i;let o;const d=new URL(`${this.url}/rpc/${t}`);let l;const c=m=>m!==null&&typeof m=="object"&&(!Array.isArray(m)||m.some(c)),u=r&&Object.values(n).some(c);u?(o="POST",l=n):r||s?(o=r?"HEAD":"GET",Object.entries(n).filter(([m,h])=>h!==void 0).map(([m,h])=>[m,Array.isArray(h)?`{${h.join(",")}}`:`${h}`]).forEach(([m,h])=>{d.searchParams.append(m,h)})):(o="POST",l=n);const p=new Headers(this.headers);return u?p.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&p.set("Prefer",`count=${a}`),new on({method:o,url:d,headers:p,schema:this.schemaName,body:l,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit})}};class rd{constructor(){}static detectEnvironment(){var t;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((t=navigator.userAgent)===null||t===void 0)&&t.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const n=globalThis.process;if(n){const r=n.versions;if(r&&r.node){const s=r.node,a=parseInt(s.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const t=this.detectEnvironment();if(t.constructor)return t.constructor;let n=t.error||"WebSocket not supported in this environment.";throw t.workaround&&(n+=`

Suggested solution: ${t.workaround}`),new Error(n)}static createWebSocket(t,n){const r=this.getWebSocketConstructor();return new r(t,n)}static isWebSocketSupported(){try{const t=this.detectEnvironment();return t.type==="native"||t.type==="ws"}catch{return!1}}}const sd="2.95.3",ad=`realtime-js/${sd}`,id="1.0.0",Do="2.0.0",ii=Do,zs=1e4,od=1e3,ld=100;var pt;(function(e){e[e.connecting=0]="connecting",e[e.open=1]="open",e[e.closing=2]="closing",e[e.closed=3]="closed"})(pt||(pt={}));var _e;(function(e){e.closed="closed",e.errored="errored",e.joined="joined",e.joining="joining",e.leaving="leaving"})(_e||(_e={}));var Qe;(function(e){e.close="phx_close",e.error="phx_error",e.join="phx_join",e.reply="phx_reply",e.leave="phx_leave",e.access_token="access_token"})(Qe||(Qe={}));var Ws;(function(e){e.websocket="websocket"})(Ws||(Ws={}));var Mt;(function(e){e.Connecting="connecting",e.Open="open",e.Closing="closing",e.Closed="closed"})(Mt||(Mt={}));class dd{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=t??[]}encode(t,n){if(t.event===this.BROADCAST_EVENT&&!(t.payload instanceof ArrayBuffer)&&typeof t.payload.event=="string")return n(this._binaryEncodeUserBroadcastPush(t));let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return n(JSON.stringify(r))}_binaryEncodeUserBroadcastPush(t){var n;return this._isArrayBuffer((n=t.payload)===null||n===void 0?void 0:n.payload)?this._encodeBinaryUserBroadcastPush(t):this._encodeJsonUserBroadcastPush(t)}_encodeBinaryUserBroadcastPush(t){var n,r;const s=(r=(n=t.payload)===null||n===void 0?void 0:n.payload)!==null&&r!==void 0?r:new ArrayBuffer(0);return this._encodeUserBroadcastPush(t,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(t){var n,r;const s=(r=(n=t.payload)===null||n===void 0?void 0:n.payload)!==null&&r!==void 0?r:{},i=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(t,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(t,n,r){var s,a;const i=t.topic,o=(s=t.ref)!==null&&s!==void 0?s:"",d=(a=t.join_ref)!==null&&a!==void 0?a:"",l=t.payload.event,c=this.allowedMetadataKeys?this._pick(t.payload,this.allowedMetadataKeys):{},u=Object.keys(c).length===0?"":JSON.stringify(c);if(d.length>255)throw new Error(`joinRef length ${d.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`userEvent length ${l.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+d.length+o.length+i.length+l.length+u.length,m=new ArrayBuffer(this.HEADER_LENGTH+p);let h=new DataView(m),y=0;h.setUint8(y++,this.KINDS.userBroadcastPush),h.setUint8(y++,d.length),h.setUint8(y++,o.length),h.setUint8(y++,i.length),h.setUint8(y++,l.length),h.setUint8(y++,u.length),h.setUint8(y++,n),Array.from(d,b=>h.setUint8(y++,b.charCodeAt(0))),Array.from(o,b=>h.setUint8(y++,b.charCodeAt(0))),Array.from(i,b=>h.setUint8(y++,b.charCodeAt(0))),Array.from(l,b=>h.setUint8(y++,b.charCodeAt(0))),Array.from(u,b=>h.setUint8(y++,b.charCodeAt(0)));var f=new Uint8Array(m.byteLength+r.byteLength);return f.set(new Uint8Array(m),0),f.set(new Uint8Array(r),m.byteLength),f.buffer}decode(t,n){if(this._isArrayBuffer(t)){let r=this._binaryDecode(t);return n(r)}if(typeof t=="string"){const r=JSON.parse(t),[s,a,i,o,d]=r;return n({join_ref:s,ref:a,topic:i,event:o,payload:d})}return n({})}_binaryDecode(t){const n=new DataView(t),r=n.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(t,n,s)}}_decodeUserBroadcast(t,n,r){const s=n.getUint8(1),a=n.getUint8(2),i=n.getUint8(3),o=n.getUint8(4);let d=this.HEADER_LENGTH+4;const l=r.decode(t.slice(d,d+s));d=d+s;const c=r.decode(t.slice(d,d+a));d=d+a;const u=r.decode(t.slice(d,d+i));d=d+i;const p=t.slice(d,t.byteLength),m=o===this.JSON_ENCODING?JSON.parse(r.decode(p)):p,h={type:this.BROADCAST_EVENT,event:c,payload:m};return i>0&&(h.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:l,event:this.BROADCAST_EVENT,payload:h}}_isArrayBuffer(t){var n;return t instanceof ArrayBuffer||((n=t==null?void 0:t.constructor)===null||n===void 0?void 0:n.name)==="ArrayBuffer"}_pick(t,n){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).filter(([r])=>n.includes(r)))}}class Mo{constructor(t,n){this.callback=t,this.timerCalc=n,this.timer=void 0,this.tries=0,this.callback=t,this.timerCalc=n}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var ce;(function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"})(ce||(ce={}));const oi=(e,t,n={})=>{var r;const s=(r=n.skipTypes)!==null&&r!==void 0?r:[];return t?Object.keys(t).reduce((a,i)=>(a[i]=cd(i,e,t,s),a),{}):{}},cd=(e,t,n,r)=>{const s=t.find(o=>o.name===e),a=s==null?void 0:s.type,i=n[e];return a&&!r.includes(a)?Oo(a,i):Vs(i)},Oo=(e,t)=>{if(e.charAt(0)==="_"){const n=e.slice(1,e.length);return hd(t,n)}switch(e){case ce.bool:return ud(t);case ce.float4:case ce.float8:case ce.int2:case ce.int4:case ce.int8:case ce.numeric:case ce.oid:return pd(t);case ce.json:case ce.jsonb:return md(t);case ce.timestamp:return fd(t);case ce.abstime:case ce.date:case ce.daterange:case ce.int4range:case ce.int8range:case ce.money:case ce.reltime:case ce.text:case ce.time:case ce.timestamptz:case ce.timetz:case ce.tsrange:case ce.tstzrange:return Vs(t);default:return Vs(t)}},Vs=e=>e,ud=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},pd=e=>{if(typeof e=="string"){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},md=e=>{if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e},hd=(e,t)=>{if(typeof e!="string")return e;const n=e.length-1,r=e[n];if(e[0]==="{"&&r==="}"){let a;const i=e.slice(1,n);try{a=JSON.parse("["+i+"]")}catch{a=i?i.split(","):[]}return a.map(o=>Oo(t,o))}return e},fd=e=>typeof e=="string"?e.replace(" ","T"):e,jo=e=>{const t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),t.pathname===""||t.pathname==="/"?t.pathname="/api/broadcast":t.pathname=t.pathname+"/api/broadcast",t.href};class xs{constructor(t,n,r={},s=zs){this.channel=t,this.event=n,this.payload=r,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(t){this.timeout=t,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(t){this.payload=Object.assign(Object.assign({},this.payload),t)}receive(t,n){var r;return this._hasReceived(t)&&n((r=this.receivedResp)===null||r===void 0?void 0:r.response),this.recHooks.push({status:t,callback:n}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const t=n=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=n,this._matchReceive(n)};this.channel._on(this.refEvent,{},t),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(t,n){this.refEvent&&this.channel._trigger(this.refEvent,{status:t,response:n})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:t,response:n}){this.recHooks.filter(r=>r.status===t).forEach(r=>r.callback(n))}_hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}}var li;(function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"})(li||(li={}));class Gn{constructor(t,n){this.channel=t,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const r=(n==null?void 0:n.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(r.state,{},s=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Gn.syncState(this.state,s,a,i),this.pendingDiffs.forEach(d=>{this.state=Gn.syncDiff(this.state,d,a,i)}),this.pendingDiffs=[],o()}),this.channel._on(r.diff,{},s=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=Gn.syncDiff(this.state,s,a,i),o())}),this.onJoin((s,a,i)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:a,newPresences:i})}),this.onLeave((s,a,i)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:a,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(t,n,r,s){const a=this.cloneDeep(t),i=this.transformState(n),o={},d={};return this.map(a,(l,c)=>{i[l]||(d[l]=c)}),this.map(i,(l,c)=>{const u=a[l];if(u){const p=c.map(f=>f.presence_ref),m=u.map(f=>f.presence_ref),h=c.filter(f=>m.indexOf(f.presence_ref)<0),y=u.filter(f=>p.indexOf(f.presence_ref)<0);h.length>0&&(o[l]=h),y.length>0&&(d[l]=y)}else o[l]=c}),this.syncDiff(a,{joins:o,leaves:d},r,s)}static syncDiff(t,n,r,s){const{joins:a,leaves:i}={joins:this.transformState(n.joins),leaves:this.transformState(n.leaves)};return r||(r=()=>{}),s||(s=()=>{}),this.map(a,(o,d)=>{var l;const c=(l=t[o])!==null&&l!==void 0?l:[];if(t[o]=this.cloneDeep(d),c.length>0){const u=t[o].map(m=>m.presence_ref),p=c.filter(m=>u.indexOf(m.presence_ref)<0);t[o].unshift(...p)}r(o,c,d)}),this.map(i,(o,d)=>{let l=t[o];if(!l)return;const c=d.map(u=>u.presence_ref);l=l.filter(u=>c.indexOf(u.presence_ref)<0),t[o]=l,s(o,l,d),l.length===0&&delete t[o]}),t}static map(t,n){return Object.getOwnPropertyNames(t).map(r=>n(r,t[r]))}static transformState(t){return t=this.cloneDeep(t),Object.getOwnPropertyNames(t).reduce((n,r)=>{const s=t[r];return"metas"in s?n[r]=s.metas.map(a=>(a.presence_ref=a.phx_ref,delete a.phx_ref,delete a.phx_ref_prev,a)):n[r]=s,n},{})}static cloneDeep(t){return JSON.parse(JSON.stringify(t))}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var di;(function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"})(di||(di={}));var Jn;(function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"})(Jn||(Jn={}));var it;(function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"})(it||(it={}));class mn{constructor(t,n={config:{}},r){var s,a;if(this.topic=t,this.params=n,this.socket=r,this.bindings={},this.state=_e.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},n.config),this.timeout=this.socket.timeout,this.joinPush=new xs(this,Qe.join,this.params,this.timeout),this.rejoinTimer=new Mo(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=_e.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=_e.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=_e.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=_e.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=_e.errored,this.rejoinTimer.scheduleTimeout())}),this._on(Qe.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new Gn(this),this.broadcastEndpointURL=jo(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((a=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||a===void 0)&&a.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(t,n=this.timeout){var r,s,a;if(this.socket.isConnected()||this.socket.connect(),this.state==_e.closed){const{config:{broadcast:i,presence:o,private:d}}=this.params,l=(s=(r=this.bindings.postgres_changes)===null||r===void 0?void 0:r.map(m=>m.filter))!==null&&s!==void 0?s:[],c=!!this.bindings[Jn.PRESENCE]&&this.bindings[Jn.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,u={},p={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:l,private:d};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(m=>t==null?void 0:t(it.CHANNEL_ERROR,m)),this._onClose(()=>t==null?void 0:t(it.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this.joinedOnce=!0,this._rejoin(n),this.joinPush.receive("ok",async({postgres_changes:m})=>{var h;if(this.socket._isManualToken()||this.socket.setAuth(),m===void 0){t==null||t(it.SUBSCRIBED);return}else{const y=this.bindings.postgres_changes,f=(h=y==null?void 0:y.length)!==null&&h!==void 0?h:0,b=[];for(let w=0;w<f;w++){const v=y[w],{filter:{event:_,schema:k,table:x,filter:L}}=v,T=m&&m[w];if(T&&T.event===_&&mn.isFilterValueEqual(T.schema,k)&&mn.isFilterValueEqual(T.table,x)&&mn.isFilterValueEqual(T.filter,L))b.push(Object.assign(Object.assign({},v),{id:T.id}));else{this.unsubscribe(),this.state=_e.errored,t==null||t(it.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=b,t&&t(it.SUBSCRIBED);return}}).receive("error",m=>{this.state=_e.errored,t==null||t(it.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(m).join(", ")||"error")))}).receive("timeout",()=>{t==null||t(it.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(t,n={}){return await this.send({type:"presence",event:"track",payload:t},n.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,n,r){return this.state===_e.joined&&t===Jn.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(t,n,r)}async httpSend(t,n,r={}){var s;if(n==null)return Promise.reject("Payload is required for httpSend()");const a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const i={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:t,payload:n,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);if(o.status===202)return{success:!0};let d=o.statusText;try{const l=await o.json();d=l.error||l.message||d}catch{}return Promise.reject(new Error(d))}async send(t,n={}){var r,s;if(!this._canPush()&&t.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:i}=t,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const d={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:i,private:this.private}]})};try{const l=await this._fetchWithTimeout(this.broadcastEndpointURL,d,(r=n.timeout)!==null&&r!==void 0?r:this.timeout);return await((s=l.body)===null||s===void 0?void 0:s.cancel()),l.ok?"ok":"error"}catch(l){return l.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var i,o,d;const l=this._push(t.type,t,n.timeout||this.timeout);t.type==="broadcast"&&!(!((d=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||d===void 0)&&d.ack)&&a("ok"),l.receive("ok",()=>a("ok")),l.receive("error",()=>a("error")),l.receive("timeout",()=>a("timed out"))})}updateJoinPayload(t){this.joinPush.updatePayload(t)}unsubscribe(t=this.timeout){this.state=_e.leaving;const n=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(Qe.close,"leave",this._joinRef())};this.joinPush.destroy();let r=null;return new Promise(s=>{r=new xs(this,Qe.leave,{},t),r.receive("ok",()=>{n(),s("ok")}).receive("timeout",()=>{n(),s("timed out")}).receive("error",()=>{s("error")}),r.send(),this._canPush()||r.trigger("ok",{})}).finally(()=>{r==null||r.destroy()})}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=_e.closed,this.bindings={}}async _fetchWithTimeout(t,n,r){const s=new AbortController,a=setTimeout(()=>s.abort(),r),i=await this.socket.fetch(t,Object.assign(Object.assign({},n),{signal:s.signal}));return clearTimeout(a),i}_push(t,n,r=this.timeout){if(!this.joinedOnce)throw`tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new xs(this,t,n,r);return this._canPush()?s.send():this._addToPushBuffer(s),s}_addToPushBuffer(t){if(t.startTimeout(),this.pushBuffer.push(t),this.pushBuffer.length>ld){const n=this.pushBuffer.shift();n&&(n.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${n.event}`,n.payload))}}_onMessage(t,n,r){return n}_isMember(t){return this.topic===t}_joinRef(){return this.joinPush.ref}_trigger(t,n,r){var s,a;const i=t.toLocaleLowerCase(),{close:o,error:d,leave:l,join:c}=Qe;if(r&&[o,d,l,c].indexOf(i)>=0&&r!==this._joinRef())return;let p=this._onMessage(i,n,r);if(n&&!p)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(m=>{var h,y,f;return((h=m.filter)===null||h===void 0?void 0:h.event)==="*"||((f=(y=m.filter)===null||y===void 0?void 0:y.event)===null||f===void 0?void 0:f.toLocaleLowerCase())===i}).map(m=>m.callback(p,r)):(a=this.bindings[i])===null||a===void 0||a.filter(m=>{var h,y,f,b,w,v;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in m){const _=m.id,k=(h=m.filter)===null||h===void 0?void 0:h.event;return _&&((y=n.ids)===null||y===void 0?void 0:y.includes(_))&&(k==="*"||(k==null?void 0:k.toLocaleLowerCase())===((f=n.data)===null||f===void 0?void 0:f.type.toLocaleLowerCase()))}else{const _=(w=(b=m==null?void 0:m.filter)===null||b===void 0?void 0:b.event)===null||w===void 0?void 0:w.toLocaleLowerCase();return _==="*"||_===((v=n==null?void 0:n.event)===null||v===void 0?void 0:v.toLocaleLowerCase())}else return m.type.toLocaleLowerCase()===i}).map(m=>{if(typeof p=="object"&&"ids"in p){const h=p.data,{schema:y,table:f,commit_timestamp:b,type:w,errors:v}=h;p=Object.assign(Object.assign({},{schema:y,table:f,commit_timestamp:b,eventType:w,new:{},old:{},errors:v}),this._getPayloadRecords(h))}m.callback(p,r)})}_isClosed(){return this.state===_e.closed}_isJoined(){return this.state===_e.joined}_isJoining(){return this.state===_e.joining}_isLeaving(){return this.state===_e.leaving}_replyEventName(t){return`chan_reply_${t}`}_on(t,n,r){const s=t.toLocaleLowerCase(),a={type:s,filter:n,callback:r};return this.bindings[s]?this.bindings[s].push(a):this.bindings[s]=[a],this}_off(t,n){const r=t.toLocaleLowerCase();return this.bindings[r]&&(this.bindings[r]=this.bindings[r].filter(s=>{var a;return!(((a=s.type)===null||a===void 0?void 0:a.toLocaleLowerCase())===r&&mn.isEqual(s.filter,n))})),this}static isEqual(t,n){if(Object.keys(t).length!==Object.keys(n).length)return!1;for(const r in t)if(t[r]!==n[r])return!1;return!0}static isFilterValueEqual(t,n){return(t??void 0)===(n??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(t){this._on(Qe.close,{},t)}_onError(t){this._on(Qe.error,{},n=>t(n))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(t=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=_e.joining,this.joinPush.resend(t))}_getPayloadRecords(t){const n={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(n.new=oi(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(n.old=oi(t.columns,t.old_record)),n}}const ks=()=>{},Ar={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},yd=[1e3,2e3,5e3,1e4],bd=1e4,vd=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class gd{constructor(t,n){var r;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=zs,this.transport=null,this.heartbeatIntervalMs=Ar.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=ks,this.ref=0,this.reconnectTimer=null,this.vsn=ii,this.logger=ks,this.conn=null,this.sendBuffer=[],this.serializer=new dd,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=s=>s?(...a)=>s(...a):(...a)=>fetch(...a),!(!((r=n==null?void 0:n.params)===null||r===void 0)&&r.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=n.params.apikey,this.endPoint=`${t}/${Ws.websocket}`,this.httpEndpoint=jo(t),this._initializeOptions(n),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(n==null?void 0:n.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=rd.createWebSocket(this.endpointURL())}catch(t){this._setConnectionState("disconnected");const n=t.message;throw n.includes("Node.js")?new Error(`${n}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${n}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(t,n){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const r=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(r),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(t?this.conn.close(t,n??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(t){const n=await t.unsubscribe();return n==="ok"&&this._remove(t),this.channels.length===0&&this.disconnect(),n}async removeAllChannels(){const t=await Promise.all(this.channels.map(n=>n.unsubscribe()));return this.channels=[],this.disconnect(),t}log(t,n,r){this.logger(t,n,r)}connectionState(){switch(this.conn&&this.conn.readyState){case pt.connecting:return Mt.Connecting;case pt.open:return Mt.Open;case pt.closing:return Mt.Closing;default:return Mt.Closed}}isConnected(){return this.connectionState()===Mt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(t,n={config:{}}){const r=`realtime:${t}`,s=this.getChannels().find(a=>a.topic===r);if(s)return s;{const a=new mn(`realtime:${t}`,n,this);return this.channels.push(a),a}}push(t){const{topic:n,event:r,payload:s,ref:a}=t,i=()=>{this.encode(t,o=>{var d;(d=this.conn)===null||d===void 0||d.send(o)})};this.log("push",`${n} ${r} (${a})`,s),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(t=null){this._authPromise=this._performAuth(t);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var t;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(n){this.log("error","error in heartbeat callback",n)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(n){this.log("error","error in heartbeat callback",n)}this._wasManualDisconnect=!1,(t=this.conn)===null||t===void 0||t.close(od,"heartbeat timeout"),setTimeout(()=>{var n;this.isConnected()||(n=this.reconnectTimer)===null||n===void 0||n.scheduleTimeout()},Ar.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(n){this.log("error","error in heartbeat callback",n)}this._setAuthSafely("heartbeat")}onHeartbeat(t){this.heartbeatCallback=t}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}_makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}_leaveOpenTopic(t){let n=this.channels.find(r=>r.topic===t&&(r._isJoined()||r._isJoining()));n&&(this.log("transport",`leaving duplicate topic "${t}"`),n.unsubscribe())}_remove(t){this.channels=this.channels.filter(n=>n.topic!==t.topic)}_onConnMessage(t){this.decode(t.data,n=>{if(n.topic==="phoenix"&&n.event==="phx_reply"&&n.ref&&n.ref===this.pendingHeartbeatRef){const l=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(n.payload.status==="ok"?"ok":"error",l)}catch(c){this.log("error","error in heartbeat callback",c)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:r,event:s,payload:a,ref:i}=n,o=i?`(${i})`:"",d=a.status||"";this.log("receive",`${d} ${r} ${s} ${o}`.trim(),a),this.channels.filter(l=>l._isMember(r)).forEach(l=>l._trigger(s,a,i)),this._triggerStateCallbacks("message",n)})}_clearTimer(t){var n;t==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):t==="reconnect"&&((n=this.reconnectTimer)===null||n===void 0||n.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=t=>this._onConnError(t),this.conn.onmessage=t=>this._onConnMessage(t),this.conn.onclose=t=>this._onConnClose(t),this.conn.readyState===pt.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===pt.open||this.conn.readyState===pt.connecting)try{this.conn.close()}catch(t){this.log("error","Error closing connection",t)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(t=>t.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(n=>{this.log("error","error waiting for auth on connect",n),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const t=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(t),this.workerRef.onerror=n=>{this.log("worker","worker error",n.message),this._terminateWorker()},this.workerRef.onmessage=n=>{n.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(t){var n;this._setConnectionState("disconnected"),this.log("transport","close",t),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(n=this.reconnectTimer)===null||n===void 0||n.scheduleTimeout(),this._triggerStateCallbacks("close",t)}_onConnError(t){this._setConnectionState("disconnected"),this.log("transport",`${t}`),this._triggerChanError(),this._triggerStateCallbacks("error",t);try{this.heartbeatCallback("error")}catch(n){this.log("error","error in heartbeat callback",n)}}_triggerChanError(){this.channels.forEach(t=>t._trigger(Qe.error))}_appendParams(t,n){if(Object.keys(n).length===0)return t;const r=t.match(/\?/)?"&":"?",s=new URLSearchParams(n);return`${t}${r}${s}`}_workerObjectUrl(t){let n;if(t)n=t;else{const r=new Blob([vd],{type:"application/javascript"});n=URL.createObjectURL(r)}return n}_setConnectionState(t,n=!1){this._connectionState=t,t==="connecting"?this._wasManualDisconnect=!1:t==="disconnecting"&&(this._wasManualDisconnect=n)}async _performAuth(t=null){let n,r=!1;if(t)n=t,r=!0;else if(this.accessToken)try{n=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),n=this.accessTokenValue}else n=this.accessTokenValue;r?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=n&&(this.accessTokenValue=n,this.channels.forEach(s=>{const a={access_token:n,version:ad};n&&s.updateJoinPayload(a),s.joinedOnce&&s._isJoined()&&s._push(Qe.access_token,{access_token:n})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(t="general"){this._isManualToken()||this.setAuth().catch(n=>{this.log("error",`Error setting auth in ${t}`,n)})}_triggerStateCallbacks(t,n){try{this.stateChangeCallbacks[t].forEach(r=>{try{r(n)}catch(s){this.log("error",`error in ${t} callback`,s)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}_setupReconnectionTimer(){this.reconnectTimer=new Mo(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},Ar.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(t){var n,r,s,a,i,o,d,l,c,u,p,m;switch(this.transport=(n=t==null?void 0:t.transport)!==null&&n!==void 0?n:null,this.timeout=(r=t==null?void 0:t.timeout)!==null&&r!==void 0?r:zs,this.heartbeatIntervalMs=(s=t==null?void 0:t.heartbeatIntervalMs)!==null&&s!==void 0?s:Ar.HEARTBEAT_INTERVAL,this.worker=(a=t==null?void 0:t.worker)!==null&&a!==void 0?a:!1,this.accessToken=(i=t==null?void 0:t.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=t==null?void 0:t.heartbeatCallback)!==null&&o!==void 0?o:ks,this.vsn=(d=t==null?void 0:t.vsn)!==null&&d!==void 0?d:ii,t!=null&&t.params&&(this.params=t.params),t!=null&&t.logger&&(this.logger=t.logger),(t!=null&&t.logLevel||t!=null&&t.log_level)&&(this.logLevel=t.logLevel||t.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(l=t==null?void 0:t.reconnectAfterMs)!==null&&l!==void 0?l:h=>yd[h-1]||bd,this.vsn){case id:this.encode=(c=t==null?void 0:t.encode)!==null&&c!==void 0?c:(h,y)=>y(JSON.stringify(h)),this.decode=(u=t==null?void 0:t.decode)!==null&&u!==void 0?u:(h,y)=>y(JSON.parse(h));break;case Do:this.encode=(p=t==null?void 0:t.encode)!==null&&p!==void 0?p:this.serializer.encode.bind(this.serializer),this.decode=(m=t==null?void 0:t.decode)!==null&&m!==void 0?m:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=t==null?void 0:t.workerUrl}}}var er=class extends Error{constructor(e,t){var n;super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType==="CommitStateUnknownException"||[500,502,504].includes(t.status)&&((n=t.icebergType)==null?void 0:n.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function wd(e,t,n){const r=new URL(t,e);if(n)for(const[s,a]of Object.entries(n))a!==void 0&&r.searchParams.set(s,a);return r.toString()}async function _d(e){return!e||e.type==="none"?{}:e.type==="bearer"?{Authorization:`Bearer ${e.token}`}:e.type==="header"?{[e.name]:e.value}:e.type==="custom"?await e.getHeaders():{}}function Sd(e){const t=e.fetchImpl??globalThis.fetch;return{async request({method:n,path:r,query:s,body:a,headers:i}){const o=wd(e.baseUrl,r,s),d=await _d(e.auth),l=await t(o,{method:n,headers:{...a?{"Content-Type":"application/json"}:{},...d,...i},body:a?JSON.stringify(a):void 0}),c=await l.text(),u=(l.headers.get("content-type")||"").includes("application/json"),p=u&&c?JSON.parse(c):c;if(!l.ok){const m=u?p:void 0,h=m==null?void 0:m.error;throw new er((h==null?void 0:h.message)??`Request failed with status ${l.status}`,{status:l.status,icebergType:h==null?void 0:h.type,icebergCode:h==null?void 0:h.code,details:m})}return{status:l.status,headers:l.headers,data:p}}}}function Cr(e){return e.join("")}var xd=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){const t=e?{parent:Cr(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(r=>({namespace:r}))}async createNamespace(e,t){const n={namespace:e.namespace,properties:t==null?void 0:t.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:n})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Cr(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Cr(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Cr(e.namespace)}`}),!0}catch(t){if(t instanceof er&&t.status===404)return!1;throw t}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(n){if(n instanceof er&&n.status===409)return;throw n}}};function Yt(e){return e.join("")}var kd=class{constructor(e,t="",n){this.client=e,this.prefix=t,this.accessDelegation=n}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Yt(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){const n={};return this.accessDelegation&&(n["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Yt(e.namespace)}/tables`,body:t,headers:n})).data.metadata}async updateTable(e,t){const n=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Yt(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":n.data["metadata-location"],metadata:n.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Yt(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String((t==null?void 0:t.purge)??!1)}})}async loadTable(e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Yt(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){const t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Yt(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(n){if(n instanceof er&&n.status===404)return!1;throw n}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(n){if(n instanceof er&&n.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw n}}},qd=class{constructor(e){var r;let t="v1";e.catalogName&&(t+=`/${e.catalogName}`);const n=e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`;this.client=Sd({baseUrl:n,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=(r=e.accessDelegation)==null?void 0:r.join(","),this.namespaceOps=new xd(this.client,t),this.tableOps=new kd(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}},ps=class extends Error{constructor(e,t="storage",n,r){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t==="vectors"?"StorageVectorsError":"StorageError",this.status=n,this.statusCode=r}};function ms(e){return typeof e=="object"&&e!==null&&"__isStorageError"in e}var Rr=class extends ps{constructor(e,t,n,r="storage"){super(e,r,t,n),this.name=r==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=n}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},No=class extends ps{constructor(e,t,n="storage"){super(e,n),this.name=n==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};const Ld=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Td=e=>{if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Gs=e=>{if(Array.isArray(e))return e.map(n=>Gs(n));if(typeof e=="function"||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([n,r])=>{const s=n.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));t[s]=Gs(r)}),t},Ed=e=>!e||typeof e!="string"||e.length===0||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e);function tr(e){"@babel/helpers - typeof";return tr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},tr(e)}function $d(e,t){if(tr(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(tr(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ad(e){var t=$d(e,"string");return tr(t)=="symbol"?t:t+""}function Cd(e,t,n){return(t=Ad(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ci(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ci(Object(n),!0).forEach(function(r){Cd(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ci(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const ui=e=>{var t;return e.msg||e.message||e.error_description||(typeof e.error=="string"?e.error:(t=e.error)===null||t===void 0?void 0:t.message)||JSON.stringify(e)},Rd=async(e,t,n,r)=>{if(e&&typeof e=="object"&&"status"in e&&"ok"in e&&typeof e.status=="number"&&!(n!=null&&n.noResolveJson)){const s=e,a=s.status||500;if(typeof s.json=="function")s.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||a+"";t(new Rr(ui(i),a,o,r))}).catch(()=>{if(r==="vectors"){const i=a+"";t(new Rr(s.statusText||`HTTP ${a} error`,a,i,r))}else{const i=a+"";t(new Rr(s.statusText||`HTTP ${a} error`,a,i,r))}});else{const i=a+"";t(new Rr(s.statusText||`HTTP ${a} error`,a,i,r))}}else t(new No(ui(e),e,r))},Id=(e,t,n,r)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"||e==="HEAD"||!r?Z(Z({},s),n):(Td(r)?(s.headers=Z({"Content-Type":"application/json"},t==null?void 0:t.headers),s.body=JSON.stringify(r)):s.body=r,t!=null&&t.duplex&&(s.duplex=t.duplex),Z(Z({},s),n))};async function Cn(e,t,n,r,s,a,i){return new Promise((o,d)=>{e(n,Id(t,r,s,a)).then(l=>{if(!l.ok)throw l;if(r!=null&&r.noResolveJson)return l;if(i==="vectors"){const c=l.headers.get("content-type");if(l.headers.get("content-length")==="0"||l.status===204)return{};if(!c||!c.includes("application/json"))return{}}return l.json()}).then(l=>o(l)).catch(l=>Rd(l,d,r,i))})}function Ho(e="storage"){return{get:async(t,n,r,s)=>Cn(t,"GET",n,r,s,void 0,e),post:async(t,n,r,s,a)=>Cn(t,"POST",n,s,a,r,e),put:async(t,n,r,s,a)=>Cn(t,"PUT",n,s,a,r,e),head:async(t,n,r,s)=>Cn(t,"HEAD",n,Z(Z({},r),{},{noResolveJson:!0}),s,void 0,e),remove:async(t,n,r,s,a)=>Cn(t,"DELETE",n,s,a,r,e)}}const Pd=Ho("storage"),{get:nr,post:Je,put:Js,head:Dd,remove:qa}=Pd,ze=Ho("vectors");var En=class{constructor(e,t={},n,r="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.fetch=Ld(n),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(n){if(t.shouldThrowOnError)throw n;if(ms(n))return{data:null,error:n};throw n}}},Md=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(ms(t))return{data:null,error:t};throw t}}};let Uo;Uo=Symbol.toStringTag;var Od=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[Uo]="BlobDownloadBuilder",this.promise=null}asStream(){return new Md(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(ms(t))return{data:null,error:t};throw t}}};const jd={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},pi={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Nd=class extends En{constructor(e,t={},n,r){super(e,t,r,"storage"),this.bucketId=n}async uploadOrUpdate(e,t,n,r){var s=this;return s.handleOperation(async()=>{let a;const i=Z(Z({},pi),r);let o=Z(Z({},s.headers),e==="POST"&&{"x-upsert":String(i.upsert)});const d=i.metadata;typeof Blob<"u"&&n instanceof Blob?(a=new FormData,a.append("cacheControl",i.cacheControl),d&&a.append("metadata",s.encodeMetadata(d)),a.append("",n)):typeof FormData<"u"&&n instanceof FormData?(a=n,a.has("cacheControl")||a.append("cacheControl",i.cacheControl),d&&!a.has("metadata")&&a.append("metadata",s.encodeMetadata(d))):(a=n,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,d&&(o["x-metadata"]=s.toBase64(s.encodeMetadata(d))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!i.duplex&&(i.duplex="half")),r!=null&&r.headers&&(o=Z(Z({},o),r.headers));const l=s._removeEmptyFolders(t),c=s._getFinalPath(l),u=await(e=="PUT"?Js:Je)(s.fetch,`${s.url}/object/${c}`,a,Z({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{path:l,id:u.Id,fullPath:u.Key}})}async upload(e,t,n){return this.uploadOrUpdate("POST",e,t,n)}async uploadToSignedUrl(e,t,n,r){var s=this;const a=s._removeEmptyFolders(e),i=s._getFinalPath(a),o=new URL(s.url+`/object/upload/sign/${i}`);return o.searchParams.set("token",t),s.handleOperation(async()=>{let d;const l=Z({upsert:pi.upsert},r),c=Z(Z({},s.headers),{"x-upsert":String(l.upsert)});return typeof Blob<"u"&&n instanceof Blob?(d=new FormData,d.append("cacheControl",l.cacheControl),d.append("",n)):typeof FormData<"u"&&n instanceof FormData?(d=n,d.append("cacheControl",l.cacheControl)):(d=n,c["cache-control"]=`max-age=${l.cacheControl}`,c["content-type"]=l.contentType),{path:a,fullPath:(await Js(s.fetch,o.toString(),d,{headers:c})).Key}})}async createSignedUploadUrl(e,t){var n=this;return n.handleOperation(async()=>{let r=n._getFinalPath(e);const s=Z({},n.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");const a=await Je(n.fetch,`${n.url}/object/upload/sign/${r}`,{},{headers:s}),i=new URL(n.url+a.url),o=i.searchParams.get("token");if(!o)throw new ps("No token returned by API");return{signedUrl:i.toString(),path:e,token:o}})}async update(e,t,n){return this.uploadOrUpdate("PUT",e,t,n)}async move(e,t,n){var r=this;return r.handleOperation(async()=>await Je(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:r.headers}))}async copy(e,t,n){var r=this;return r.handleOperation(async()=>({path:(await Je(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:e,destinationKey:t,destinationBucket:n==null?void 0:n.destinationBucket},{headers:r.headers})).Key}))}async createSignedUrl(e,t,n){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(e),a=await Je(r.fetch,`${r.url}/object/sign/${s}`,Z({expiresIn:t},n!=null&&n.transform?{transform:n.transform}:{}),{headers:r.headers});const i=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return{signedUrl:encodeURI(`${r.url}${a.signedURL}${i}`)}})}async createSignedUrls(e,t,n){var r=this;return r.handleOperation(async()=>{const s=await Je(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:t,paths:e},{headers:r.headers}),a=n!=null&&n.download?`&download=${n.download===!0?"":n.download}`:"";return s.map(i=>Z(Z({},i),{},{signedUrl:i.signedURL?encodeURI(`${r.url}${i.signedURL}${a}`):null}))})}download(e,t,n){const r=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",s=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),a=s?`?${s}`:"",i=this._getFinalPath(e),o=()=>nr(this.fetch,`${this.url}/${r}/${i}${a}`,{headers:this.headers,noResolveJson:!0},n);return new Od(o,this.shouldThrowOnError)}async info(e){var t=this;const n=t._getFinalPath(e);return t.handleOperation(async()=>Gs(await nr(t.fetch,`${t.url}/object/info/${n}`,{headers:t.headers})))}async exists(e){var t=this;const n=t._getFinalPath(e);try{return await Dd(t.fetch,`${t.url}/object/${n}`,{headers:t.headers}),{data:!0,error:null}}catch(r){if(t.shouldThrowOnError)throw r;if(ms(r)&&r instanceof No){const s=r.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:r}}throw r}}getPublicUrl(e,t){const n=this._getFinalPath(e),r=[],s=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";s!==""&&r.push(s);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",i=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});i!==""&&r.push(i);let o=r.join("&");return o!==""&&(o=`?${o}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${n}${o}`)}}}async remove(e){var t=this;return t.handleOperation(async()=>await qa(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,n){var r=this;return r.handleOperation(async()=>{const s=Z(Z(Z({},jd),t),{},{prefix:e||""});return await Je(r.fetch,`${r.url}/object/list/${r.bucketId}`,s,{headers:r.headers},n)})}async listV2(e,t){var n=this;return n.handleOperation(async()=>{const r=Z({},e);return await Je(n.fetch,`${n.url}/object/list-v2/${n.bucketId}`,r,{headers:n.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}};const Hd="2.95.3",kr={"X-Client-Info":`storage-js/${Hd}`};var Ud=class extends En{constructor(e,t={},n,r){const s=new URL(e);r!=null&&r.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const a=s.href.replace(/\/$/,""),i=Z(Z({},kr),t);super(a,i,n,"storage")}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const n=t.listBucketOptionsToQueryString(e);return await nr(t.fetch,`${t.url}/bucket${n}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await nr(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var n=this;return n.handleOperation(async()=>await Je(n.fetch,`${n.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async updateBucket(e,t){var n=this;return n.handleOperation(async()=>await Js(n.fetch,`${n.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:n.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await Je(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await qa(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},Fd=class extends En{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=Z(Z({},kr),t);super(r,s,n,"storage")}async createBucket(e){var t=this;return t.handleOperation(async()=>await Je(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const n=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&n.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&n.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&n.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&n.set("sortOrder",e.sortOrder),e!=null&&e.search&&n.set("search",e.search);const r=n.toString(),s=r?`${t.url}/bucket?${r}`:`${t.url}/bucket`;return await nr(t.fetch,s,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await qa(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!Ed(e))throw new ps("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const n=new qd({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(n,{get(s,a){const i=s[a];return typeof i!="function"?i:async(...o)=>{try{return{data:await i.apply(s,o),error:null}}catch(d){if(r)throw d;return{data:null,error:d}}}}})}},Bd=class extends En{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=Z(Z({},kr),{},{"Content-Type":"application/json"},t);super(r,s,n,"vectors")}async createIndex(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var n=this;return n.handleOperation(async()=>await ze.post(n.fetch,`${n.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var n=this;return n.handleOperation(async()=>await ze.post(n.fetch,`${n.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:n.headers})||{})}},Kd=class extends En{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=Z(Z({},kr),{},{"Content-Type":"application/json"},t);super(r,s,n,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},zd=class extends En{constructor(e,t={},n){const r=e.replace(/\/$/,""),s=Z(Z({},kr),{},{"Content-Type":"application/json"},t);super(r,s,n,"vectors")}async createBucket(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await ze.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},Wd=class extends zd{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new Vd(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,n=this;return t().call(n,e)}async getBucket(e){var t=()=>super.getBucket,n=this;return t().call(n,e)}async listBuckets(e={}){var t=()=>super.listBuckets,n=this;return t().call(n,e)}async deleteBucket(e){var t=()=>super.deleteBucket,n=this;return t().call(n,e)}},Vd=class extends Bd{constructor(e,t,n,r){super(e,t,r),this.vectorBucketName=n}async createIndex(e){var t=()=>super.createIndex,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,n=this;return t().call(n,n.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,n=this;return t().call(n,n.vectorBucketName,e)}index(e){return new Gd(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},Gd=class extends Kd{constructor(e,t,n,r,s){super(e,t,s),this.vectorBucketName=n,this.indexName=r}async putVectors(e){var t=()=>super.putVectors,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async getVectors(e){var t=()=>super.getVectors,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,n=this;return t().call(n,Z(Z({},e),{},{vectorBucketName:n.vectorBucketName,indexName:n.indexName}))}},Jd=class extends Ud{constructor(e,t={},n,r){super(e,t,n,r)}from(e){return new Nd(this.url,this.headers,e,this.fetch)}get vectors(){return new Wd(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Fd(this.url+"/iceberg",this.headers,this.fetch)}};const Fo="2.95.3",ln=30*1e3,Qs=3,qs=Qs*ln,Qd="http://localhost:9999",Yd="supabase.auth.token",Xd={"X-Client-Info":`gotrue-js/${Fo}`},Ys="X-Supabase-Api-Version",Bo={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Zd=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,ec=10*60*1e3;class rr extends Error{constructor(t,n,r){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=n,this.code=r}}function J(e){return typeof e=="object"&&e!==null&&"__isAuthError"in e}class tc extends rr{constructor(t,n,r){super(t,n,r),this.name="AuthApiError",this.status=n,this.code=r}}function nc(e){return J(e)&&e.name==="AuthApiError"}class Ot extends rr{constructor(t,n){super(t),this.name="AuthUnknownError",this.originalError=n}}class dt extends rr{constructor(t,n,r,s){super(t,r,s),this.name=n,this.status=r}}class Ue extends dt{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ls(e){return J(e)&&e.name==="AuthSessionMissingError"}class Xt extends dt{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Ir extends dt{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}}class Pr extends dt{constructor(t,n=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=n}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function rc(e){return J(e)&&e.name==="AuthImplicitGrantRedirectError"}class mi extends dt{constructor(t,n=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=n}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class sc extends dt{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Xs extends dt{constructor(t,n){super(t,"AuthRetryableFetchError",n,void 0)}}function Ts(e){return J(e)&&e.name==="AuthRetryableFetchError"}class hi extends dt{constructor(t,n,r){super(t,"AuthWeakPasswordError",n,"weak_password"),this.reasons=r}}class Zs extends dt{constructor(t){super(t,"AuthInvalidJwtError",400,"invalid_jwt")}}const es="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),fi=` 	
\r=`.split(""),ac=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<fi.length;t+=1)e[fi[t].charCodeAt(0)]=-2;for(let t=0;t<es.length;t+=1)e[es[t].charCodeAt(0)]=t;return e})();function yi(e,t,n){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const r=t.queue>>t.queuedBits-6&63;n(es[r]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const r=t.queue>>t.queuedBits-6&63;n(es[r]),t.queuedBits-=6}}function Ko(e,t,n){const r=ac[e];if(r>-1)for(t.queue=t.queue<<6|r,t.queuedBits+=6;t.queuedBits>=8;)n(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else{if(r===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}}function bi(e){const t=[],n=i=>{t.push(String.fromCodePoint(i))},r={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},a=i=>{lc(i,r,n)};for(let i=0;i<e.length;i+=1)Ko(e.charCodeAt(i),s,a);return t.join("")}function ic(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function oc(e,t){for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n);if(r>55295&&r<=56319){const s=(r-55296)*1024&65535;r=(e.charCodeAt(n+1)-56320&65535|s)+65536,n+=1}ic(r,t)}}function lc(e,t,n){if(t.utf8seq===0){if(e<=127){n(e);return}for(let r=1;r<6;r+=1)if(!(e>>7-r&1)){t.utf8seq=r;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw new Error("Invalid UTF-8 sequence");t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|e&63,t.utf8seq-=1,t.utf8seq===0&&n(t.codepoint)}}function gn(e){const t=[],n={queue:0,queuedBits:0},r=s=>{t.push(s)};for(let s=0;s<e.length;s+=1)Ko(e.charCodeAt(s),n,r);return new Uint8Array(t)}function dc(e){const t=[];return oc(e,n=>t.push(n)),new Uint8Array(t)}function Bt(e){const t=[],n={queue:0,queuedBits:0},r=s=>{t.push(s)};return e.forEach(s=>yi(s,n,r)),yi(null,n,r),t.join("")}function cc(e){return Math.round(Date.now()/1e3)+e}function uc(){return Symbol("auth-callback")}const Le=()=>typeof window<"u"&&typeof document<"u",At={tested:!1,writable:!1},zo=()=>{if(!Le())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(At.tested)return At.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),At.tested=!0,At.writable=!0}catch{At.tested=!0,At.writable=!1}return At.writable};function pc(e){const t={},n=new URL(e);if(n.hash&&n.hash[0]==="#")try{new URLSearchParams(n.hash.substring(1)).forEach((s,a)=>{t[a]=s})}catch{}return n.searchParams.forEach((r,s)=>{t[s]=r}),t}const Wo=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),mc=e=>typeof e=="object"&&e!==null&&"status"in e&&"ok"in e&&"json"in e&&typeof e.json=="function",dn=async(e,t,n)=>{await e.setItem(t,JSON.stringify(n))},Ct=async(e,t)=>{const n=await e.getItem(t);if(!n)return null;try{return JSON.parse(n)}catch{return n}},qe=async(e,t)=>{await e.removeItem(t)};class hs{constructor(){this.promise=new hs.promiseConstructor((t,n)=>{this.resolve=t,this.reject=n})}}hs.promiseConstructor=Promise;function Dr(e){const t=e.split(".");if(t.length!==3)throw new Zs("Invalid JWT structure");for(let r=0;r<t.length;r++)if(!Zd.test(t[r]))throw new Zs("JWT not in base64url format");return{header:JSON.parse(bi(t[0])),payload:JSON.parse(bi(t[1])),signature:gn(t[2]),raw:{header:t[0],payload:t[1]}}}async function hc(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function fc(e,t){return new Promise((r,s)=>{(async()=>{for(let a=0;a<1/0;a++)try{const i=await e(a);if(!t(a,null,i)){r(i);return}}catch(i){if(!t(a,i)){s(i);return}}})()})}function yc(e){return("0"+e.toString(16)).substr(-2)}function bc(){const t=new Uint32Array(56);if(typeof crypto>"u"){const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",r=n.length;let s="";for(let a=0;a<56;a++)s+=n.charAt(Math.floor(Math.random()*r));return s}return crypto.getRandomValues(t),Array.from(t,yc).join("")}async function vc(e){const n=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-256",n),s=new Uint8Array(r);return Array.from(s).map(a=>String.fromCharCode(a)).join("")}async function gc(e){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const n=await vc(e);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Zt(e,t,n=!1){const r=bc();let s=r;n&&(s+="/PASSWORD_RECOVERY"),await dn(e,`${t}-code-verifier`,s);const a=await gc(r);return[a,r===a?"plain":"s256"]}const wc=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function _c(e){const t=e.headers.get(Ys);if(!t||!t.match(wc))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function Sc(e){if(!e)throw new Error("Missing exp claim");const t=Math.floor(Date.now()/1e3);if(e<=t)throw new Error("JWT has expired")}function xc(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const kc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function en(e){if(!kc.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Es(){const e={};return new Proxy(e,{get:(t,n)=>{if(n==="__isUserNotAvailableProxy")return!0;if(typeof n=="symbol"){const r=n.toString();if(r==="Symbol(Symbol.toPrimitive)"||r==="Symbol(Symbol.toStringTag)"||r==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${n}" property of the session object is not supported. Please use getUser() instead.`)},set:(t,n)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(t,n)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function qc(e,t){return new Proxy(e,{get:(n,r,s)=>{if(r==="__isInsecureUserWarningProxy")return!0;if(typeof r=="symbol"){const a=r.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(n,r,s)}return!t.value&&typeof r=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(n,r,s)}})}function vi(e){return JSON.parse(JSON.stringify(e))}const Rt=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),Lc=[502,503,504];async function gi(e){var t;if(!mc(e))throw new Xs(Rt(e),0);if(Lc.includes(e.status))throw new Xs(Rt(e),e.status);let n;try{n=await e.json()}catch(a){throw new Ot(Rt(a),a)}let r;const s=_c(e);if(s&&s.getTime()>=Bo["2024-01-01"].timestamp&&typeof n=="object"&&n&&typeof n.code=="string"?r=n.code:typeof n=="object"&&n&&typeof n.error_code=="string"&&(r=n.error_code),r){if(r==="weak_password")throw new hi(Rt(n),e.status,((t=n.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(r==="session_not_found")throw new Ue}else if(typeof n=="object"&&n&&typeof n.weak_password=="object"&&n.weak_password&&Array.isArray(n.weak_password.reasons)&&n.weak_password.reasons.length&&n.weak_password.reasons.reduce((a,i)=>a&&typeof i=="string",!0))throw new hi(Rt(n),e.status,n.weak_password.reasons);throw new tc(Rt(n),e.status||500,r)}const Tc=(e,t,n,r)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),s.body=JSON.stringify(r),Object.assign(Object.assign({},s),n))};async function X(e,t,n,r){var s;const a=Object.assign({},r==null?void 0:r.headers);a[Ys]||(a[Ys]=Bo["2024-01-01"].name),r!=null&&r.jwt&&(a.Authorization=`Bearer ${r.jwt}`);const i=(s=r==null?void 0:r.query)!==null&&s!==void 0?s:{};r!=null&&r.redirectTo&&(i.redirect_to=r.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",d=await Ec(e,t,n+o,{headers:a,noResolveJson:r==null?void 0:r.noResolveJson},{},r==null?void 0:r.body);return r!=null&&r.xform?r==null?void 0:r.xform(d):{data:Object.assign({},d),error:null}}async function Ec(e,t,n,r,s,a){const i=Tc(t,r,s,a);let o;try{o=await e(n,Object.assign({},i))}catch(d){throw console.error(d),new Xs(Rt(d),0)}if(o.ok||await gi(o),r!=null&&r.noResolveJson)return o;try{return await o.json()}catch(d){await gi(d)}}function Ge(e){var t;let n=null;Cc(e)&&(n=Object.assign({},e),e.expires_at||(n.expires_at=cc(e.expires_in)));const r=(t=e.user)!==null&&t!==void 0?t:e;return{data:{session:n,user:r},error:null}}function wi(e){const t=Ge(e);return!t.error&&e.weak_password&&typeof e.weak_password=="object"&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message=="string"&&e.weak_password.reasons.reduce((n,r)=>n&&typeof r=="string",!0)&&(t.data.weak_password=e.weak_password),t}function vt(e){var t;return{data:{user:(t=e.user)!==null&&t!==void 0?t:e},error:null}}function $c(e){return{data:e,error:null}}function Ac(e){const{action_link:t,email_otp:n,hashed_token:r,redirect_to:s,verification_type:a}=e,i=us(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:t,email_otp:n,hashed_token:r,redirect_to:s,verification_type:a},d=Object.assign({},i);return{data:{properties:o,user:d},error:null}}function _i(e){return e}function Cc(e){return e.access_token&&e.refresh_token&&e.expires_in}const $s=["global","local","others"];class Rc{constructor({url:t="",headers:n={},fetch:r}){this.url=t,this.headers=n,this.fetch=Wo(r),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(t,n=$s[0]){if($s.indexOf(n)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${$s.join(", ")}`);try{return await X(this.fetch,"POST",`${this.url}/logout?scope=${n}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(r){if(J(r))return{data:null,error:r};throw r}}async inviteUserByEmail(t,n={}){try{return await X(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:n.data},headers:this.headers,redirectTo:n.redirectTo,xform:vt})}catch(r){if(J(r))return{data:{user:null},error:r};throw r}}async generateLink(t){try{const{options:n}=t,r=us(t,["options"]),s=Object.assign(Object.assign({},r),n);return"newEmail"in r&&(s.new_email=r==null?void 0:r.newEmail,delete s.newEmail),await X(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:Ac,redirectTo:n==null?void 0:n.redirectTo})}catch(n){if(J(n))return{data:{properties:null,user:null},error:n};throw n}}async createUser(t){try{return await X(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:vt})}catch(n){if(J(n))return{data:{user:null},error:n};throw n}}async listUsers(t){var n,r,s,a,i,o,d;try{const l={nextPage:null,lastPage:0,total:0},c=await X(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(n=t==null?void 0:t.page)===null||n===void 0?void 0:n.toString())!==null&&r!==void 0?r:"",per_page:(a=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:_i});if(c.error)throw c.error;const u=await c.json(),p=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,m=(d=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&d!==void 0?d:[];return m.length>0&&(m.forEach(h=>{const y=parseInt(h.split(";")[0].split("=")[1].substring(0,1)),f=JSON.parse(h.split(";")[1].split("=")[1]);l[`${f}Page`]=y}),l.total=parseInt(p)),{data:Object.assign(Object.assign({},u),l),error:null}}catch(l){if(J(l))return{data:{users:[]},error:l};throw l}}async getUserById(t){en(t);try{return await X(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:vt})}catch(n){if(J(n))return{data:{user:null},error:n};throw n}}async updateUserById(t,n){en(t);try{return await X(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:n,headers:this.headers,xform:vt})}catch(r){if(J(r))return{data:{user:null},error:r};throw r}}async deleteUser(t,n=!1){en(t);try{return await X(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:n},xform:vt})}catch(r){if(J(r))return{data:{user:null},error:r};throw r}}async _listFactors(t){en(t.userId);try{const{data:n,error:r}=await X(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:n,error:r}}catch(n){if(J(n))return{data:null,error:n};throw n}}async _deleteFactor(t){en(t.userId),en(t.id);try{return{data:await X(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(n){if(J(n))return{data:null,error:n};throw n}}async _listOAuthClients(t){var n,r,s,a,i,o,d;try{const l={nextPage:null,lastPage:0,total:0},c=await X(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(n=t==null?void 0:t.page)===null||n===void 0?void 0:n.toString())!==null&&r!==void 0?r:"",per_page:(a=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:_i});if(c.error)throw c.error;const u=await c.json(),p=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,m=(d=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&d!==void 0?d:[];return m.length>0&&(m.forEach(h=>{const y=parseInt(h.split(";")[0].split("=")[1].substring(0,1)),f=JSON.parse(h.split(";")[1].split("=")[1]);l[`${f}Page`]=y}),l.total=parseInt(p)),{data:Object.assign(Object.assign({},u),l),error:null}}catch(l){if(J(l))return{data:{clients:[]},error:l};throw l}}async _createOAuthClient(t){try{return await X(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:t,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(J(n))return{data:null,error:n};throw n}}async _getOAuthClient(t){try{return await X(this.fetch,"GET",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(J(n))return{data:null,error:n};throw n}}async _updateOAuthClient(t,n){try{return await X(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${t}`,{body:n,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(J(r))return{data:null,error:r};throw r}}async _deleteOAuthClient(t){try{return await X(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(n){if(J(n))return{data:null,error:n};throw n}}async _regenerateOAuthClientSecret(t){try{return await X(this.fetch,"POST",`${this.url}/admin/oauth/clients/${t}/regenerate_secret`,{headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(J(n))return{data:null,error:n};throw n}}}function Si(e={}){return{getItem:t=>e[t]||null,setItem:(t,n)=>{e[t]=n},removeItem:t=>{delete e[t]}}}const tn={debug:!!(globalThis&&zo()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Vo extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}}class Ic extends Vo{}async function Pc(e,t,n){tn.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const r=new globalThis.AbortController;return t>0&&setTimeout(()=>{r.abort(),tn.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)},t),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:r.signal},async s=>{if(s){tn.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,s.name);try{return await n()}finally{tn.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,s.name)}}else{if(t===0)throw tn.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new Ic(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(tn.debug)try{const a=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(a,null,"  "))}catch(a){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",a)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await n()}}))}function Dc(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Go(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Mc(e){return parseInt(e,16)}function Oc(e){const t=new TextEncoder().encode(e);return"0x"+Array.from(t,r=>r.toString(16).padStart(2,"0")).join("")}function jc(e){var t;const{chainId:n,domain:r,expirationTime:s,issuedAt:a=new Date,nonce:i,notBefore:o,requestId:d,resources:l,scheme:c,uri:u,version:p}=e;{if(!Number.isInteger(n))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${n}`);if(!r)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((t=e.statement)===null||t===void 0)&&t.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)}const m=Go(e.address),h=c?`${c}://${r}`:r,y=e.statement?`${e.statement}
`:"",f=`${h} wants you to sign in with your Ethereum account:
${m}

${y}`;let b=`URI: ${u}
Version: ${p}
Chain ID: ${n}${i?`
Nonce: ${i}`:""}
Issued At: ${a.toISOString()}`;if(s&&(b+=`
Expiration Time: ${s.toISOString()}`),o&&(b+=`
Not Before: ${o.toISOString()}`),d&&(b+=`
Request ID: ${d}`),l){let w=`
Resources:`;for(const v of l){if(!v||typeof v!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${v}`);w+=`
- ${v}`}b+=w}return`${f}
${b}`}class we extends Error{constructor({message:t,code:n,cause:r,name:s}){var a;super(t,{cause:r}),this.__isWebAuthnError=!0,this.name=(a=s??(r instanceof Error?r.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=n}}class ts extends we{constructor(t,n){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:n,message:t}),this.name="WebAuthnUnknownError",this.originalError=n}}function Nc({error:e,options:t}){var n,r,s;const{publicKey:a}=t;if(!a)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new we({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((n=a.authenticatorSelection)===null||n===void 0?void 0:n.requireResidentKey)===!0)return new we({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((r=a.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new we({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new we({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new we({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new we({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new we({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new we({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const i=window.location.hostname;if(Jo(i)){if(a.rp.id!==i)return new we({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new we({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new we({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new we({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new we({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function Hc({error:e,options:t}){const{publicKey:n}=t;if(!n)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new we({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new we({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const r=window.location.hostname;if(Jo(r)){if(n.rpId!==r)return new we({message:`The RP ID "${n.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new we({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new we({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new we({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}class Uc{createNewAbortSignal(){if(this.controller){const n=new Error("Cancelling existing WebAuthn API call for new one");n.name="AbortError",this.controller.abort(n)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const Fc=new Uc;function Bc(e){if(!e)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(e);const{challenge:t,user:n,excludeCredentials:r}=e,s=us(e,["challenge","user","excludeCredentials"]),a=gn(t).buffer,i=Object.assign(Object.assign({},n),{id:gn(n.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:a,user:i});if(r&&r.length>0){o.excludeCredentials=new Array(r.length);for(let d=0;d<r.length;d++){const l=r[d];o.excludeCredentials[d]=Object.assign(Object.assign({},l),{id:gn(l.id).buffer,type:l.type||"public-key",transports:l.transports})}}return o}function Kc(e){if(!e)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(e);const{challenge:t,allowCredentials:n}=e,r=us(e,["challenge","allowCredentials"]),s=gn(t).buffer,a=Object.assign(Object.assign({},r),{challenge:s});if(n&&n.length>0){a.allowCredentials=new Array(n.length);for(let i=0;i<n.length;i++){const o=n[i];a.allowCredentials[i]=Object.assign(Object.assign({},o),{id:gn(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function zc(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const n=e;return{id:e.id,rawId:e.id,response:{attestationObject:Bt(new Uint8Array(e.response.attestationObject)),clientDataJSON:Bt(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:(t=n.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Wc(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const n=e,r=e.getClientExtensionResults(),s=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:Bt(new Uint8Array(s.authenticatorData)),clientDataJSON:Bt(new Uint8Array(s.clientDataJSON)),signature:Bt(new Uint8Array(s.signature)),userHandle:s.userHandle?Bt(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:r,authenticatorAttachment:(t=n.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Jo(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function xi(){var e,t;return!!(Le()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.create)=="function"&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.get)=="function")}async function Vc(e){try{const t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ts("Browser returned unexpected credential type",t)}:{data:null,error:new ts("Empty credential response",t)}}catch(t){return{data:null,error:Nc({error:t,options:e})}}}async function Gc(e){try{const t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new ts("Browser returned unexpected credential type",t)}:{data:null,error:new ts("Empty credential response",t)}}catch(t){return{data:null,error:Hc({error:t,options:e})}}}const Jc={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Qc={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function ns(...e){const t=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),n=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),r={};for(const s of e)if(s)for(const a in s){const i=s[a];if(i!==void 0)if(Array.isArray(i))r[a]=i;else if(n(i))r[a]=i;else if(t(i)){const o=r[a];t(o)?r[a]=ns(o,i):r[a]=ns(i)}else r[a]=i}return r}function Yc(e,t){return ns(Jc,e,t||{})}function Xc(e,t){return ns(Qc,e,t||{})}class Zc{constructor(t){this.client=t,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(t){return this.client.mfa.enroll(Object.assign(Object.assign({},t),{factorType:"webauthn"}))}async _challenge({factorId:t,webauthn:n,friendlyName:r,signal:s},a){var i;try{const{data:o,error:d}=await this.client.mfa.challenge({factorId:t,webauthn:n});if(!o)return{data:null,error:d};const l=s??Fc.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:c}=o.webauthn.credential_options.publicKey;if(!c.name){const u=r;if(u)c.name=`${c.id}:${u}`;else{const m=(await this.client.getUser()).data.user,h=((i=m==null?void 0:m.user_metadata)===null||i===void 0?void 0:i.name)||(m==null?void 0:m.email)||(m==null?void 0:m.id)||"User";c.name=`${c.id}:${h}`}}c.displayName||(c.displayName=c.name)}switch(o.webauthn.type){case"create":{const c=Yc(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:p}=await Vc({publicKey:c,signal:l});return u?{data:{factorId:t,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const c=Xc(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:p}=await Gc(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:c,signal:l}));return u?{data:{factorId:t,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(o){return J(o)?{data:null,error:o}:{data:null,error:new Ot("Unexpected error in challenge",o)}}}async _verify({challengeId:t,factorId:n,webauthn:r}){return this.client.mfa.verify({factorId:n,challengeId:t,webauthn:r})}async _authenticate({factorId:t,webauthn:{rpId:n=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!n)return{data:null,error:new rr("rpId is required for WebAuthn authentication")};try{if(!xi())return{data:null,error:new Ot("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:t,webauthn:{rpId:n,rpOrigins:r},signal:s},{request:a});if(!i)return{data:null,error:o};const{webauthn:d}=i;return this._verify({factorId:t,challengeId:i.challengeId,webauthn:{type:d.type,rpId:n,rpOrigins:r,credential_response:d.credential_response}})}catch(i){return J(i)?{data:null,error:i}:{data:null,error:new Ot("Unexpected error in authenticate",i)}}}async _register({friendlyName:t,webauthn:{rpId:n=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!n)return{data:null,error:new rr("rpId is required for WebAuthn registration")};try{if(!xi())return{data:null,error:new Ot("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:t});if(!i)return await this.client.mfa.listFactors().then(c=>{var u;return(u=c.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===t&&p.status!=="unverified")}).then(c=>c?this.client.mfa.unenroll({factorId:c==null?void 0:c.id}):void 0),{data:null,error:o};const{data:d,error:l}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:n,rpOrigins:r},signal:s},{create:a});return d?this._verify({factorId:i.id,challengeId:d.challengeId,webauthn:{rpId:n,rpOrigins:r,type:d.webauthn.type,credential_response:d.webauthn.credential_response}}):{data:null,error:l}}catch(i){return J(i)?{data:null,error:i}:{data:null,error:new Ot("Unexpected error in register",i)}}}}Dc();const eu={url:Qd,storageKey:Yd,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Xd,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:1e4};async function ki(e,t,n){return await n()}const nn={};class sr{get jwks(){var t,n;return(n=(t=nn[this.storageKey])===null||t===void 0?void 0:t.jwks)!==null&&n!==void 0?n:{keys:[]}}set jwks(t){nn[this.storageKey]=Object.assign(Object.assign({},nn[this.storageKey]),{jwks:t})}get jwks_cached_at(){var t,n;return(n=(t=nn[this.storageKey])===null||t===void 0?void 0:t.cachedAt)!==null&&n!==void 0?n:Number.MIN_SAFE_INTEGER}set jwks_cached_at(t){nn[this.storageKey]=Object.assign(Object.assign({},nn[this.storageKey]),{cachedAt:t})}constructor(t){var n,r,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},eu),t);if(this.storageKey=a.storageKey,this.instanceID=(n=sr.nextInstanceID[this.storageKey])!==null&&n!==void 0?n:0,sr.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&Le()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.admin=new Rc({url:a.url,headers:a.headers,fetch:a.fetch}),this.url=a.url,this.headers=a.headers,this.fetch=Wo(a.fetch),this.lock=a.lock||ki,this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock?this.lock=a.lock:this.persistSession&&Le()&&(!((r=globalThis==null?void 0:globalThis.navigator)===null||r===void 0)&&r.locks)?this.lock=Pc:this.lock=ki,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Zc(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:zo()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Si(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=Si(this.memoryStorage)),Le()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i);try{await this._notifyAllSubscribers(i.data.event,i.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}this.initialize().catch(i=>{this._debug("#initialize()","error",i)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(t){if(this.throwOnError&&t&&t.error)throw t.error;return t}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Fo}) ${new Date().toISOString()}`}_debug(...t){return this.logDebugMessages&&this.logger(this._logPrefix(),...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var t;try{let n={},r="none";if(Le()&&(n=pc(window.location.href),this._isImplicitGrantCallback(n)?r="implicit":await this._isPKCECallback(n)&&(r="pkce")),Le()&&this.detectSessionInUrl&&r!=="none"){const{data:s,error:a}=await this._getSessionFromURL(n,r);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),rc(a)){const d=(t=a.details)===null||t===void 0?void 0:t.code;if(d==="identity_already_exists"||d==="identity_not_found"||d==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:i,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(n){return J(n)?this._returnResult({error:n}):this._returnResult({error:new Ot("Unexpected error during initialization",n)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var n,r,s;try{const a=await X(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(r=(n=t==null?void 0:t.options)===null||n===void 0?void 0:n.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:(s=t==null?void 0:t.options)===null||s===void 0?void 0:s.captchaToken}},xform:Ge}),{data:i,error:o}=a;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const d=i.session,l=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",d)),this._returnResult({data:{user:l,session:d},error:null})}catch(a){if(J(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(t){var n,r,s;try{let a;if("email"in t){const{email:c,password:u,options:p}=t;let m=null,h=null;this.flowType==="pkce"&&([m,h]=await Zt(this.storage,this.storageKey)),a=await X(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:p==null?void 0:p.emailRedirectTo,body:{email:c,password:u,data:(n=p==null?void 0:p.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:m,code_challenge_method:h},xform:Ge})}else if("phone"in t){const{phone:c,password:u,options:p}=t;a=await X(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:u,data:(r=p==null?void 0:p.data)!==null&&r!==void 0?r:{},channel:(s=p==null?void 0:p.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:Ge})}else throw new Ir("You must provide either an email or phone number and a password");const{data:i,error:o}=a;if(o||!i)return await qe(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const d=i.session,l=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",d)),this._returnResult({data:{user:l,session:d},error:null})}catch(a){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(t){try{let n;if("email"in t){const{email:a,password:i,options:o}=t;n=await X(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:wi})}else if("phone"in t){const{phone:a,password:i,options:o}=t;n=await X(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:wi})}else throw new Ir("You must provide either an email or phone number and a password");const{data:r,error:s}=n;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!r||!r.session||!r.user){const a=new Xt;return this._returnResult({data:{user:null,session:null},error:a})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:Object.assign({user:r.user,session:r.session},r.weak_password?{weakPassword:r.weak_password}:null),error:s})}catch(n){if(J(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithOAuth(t){var n,r,s,a;return await this._handleProviderSignIn(t.provider,{redirectTo:(n=t.options)===null||n===void 0?void 0:n.redirectTo,scopes:(r=t.options)===null||r===void 0?void 0:r.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(a=t.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(t))}async signInWithWeb3(t){const{chain:n}=t;switch(n){case"ethereum":return await this.signInWithEthereum(t);case"solana":return await this.signInWithSolana(t);default:throw new Error(`@supabase/auth-js: Unsupported chain "${n}"`)}}async signInWithEthereum(t){var n,r,s,a,i,o,d,l,c,u,p;let m,h;if("message"in t)m=t.message,h=t.signature;else{const{chain:y,wallet:f,statement:b,options:w}=t;let v;if(Le())if(typeof f=="object")v=f;else{const q=window;if("ethereum"in q&&typeof q.ethereum=="object"&&"request"in q.ethereum&&typeof q.ethereum.request=="function")v=q.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof f!="object"||!(w!=null&&w.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");v=f}const _=new URL((n=w==null?void 0:w.url)!==null&&n!==void 0?n:window.location.href),k=await v.request({method:"eth_requestAccounts"}).then(q=>q).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!k||k.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const x=Go(k[0]);let L=(r=w==null?void 0:w.signInWithEthereum)===null||r===void 0?void 0:r.chainId;if(!L){const q=await v.request({method:"eth_chainId"});L=Mc(q)}const T={domain:_.host,address:x,statement:b,uri:_.href,version:"1",chainId:L,nonce:(s=w==null?void 0:w.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(i=(a=w==null?void 0:w.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=w==null?void 0:w.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(d=w==null?void 0:w.signInWithEthereum)===null||d===void 0?void 0:d.notBefore,requestId:(l=w==null?void 0:w.signInWithEthereum)===null||l===void 0?void 0:l.requestId,resources:(c=w==null?void 0:w.signInWithEthereum)===null||c===void 0?void 0:c.resources};m=jc(T),h=await v.request({method:"personal_sign",params:[Oc(m),x]})}try{const{data:y,error:f}=await X(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:m,signature:h},!((u=t.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=t.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Ge});if(f)throw f;if(!y||!y.session||!y.user){const b=new Xt;return this._returnResult({data:{user:null,session:null},error:b})}return y.session&&(await this._saveSession(y.session),await this._notifyAllSubscribers("SIGNED_IN",y.session)),this._returnResult({data:Object.assign({},y),error:f})}catch(y){if(J(y))return this._returnResult({data:{user:null,session:null},error:y});throw y}}async signInWithSolana(t){var n,r,s,a,i,o,d,l,c,u,p,m;let h,y;if("message"in t)h=t.message,y=t.signature;else{const{chain:f,wallet:b,statement:w,options:v}=t;let _;if(Le())if(typeof b=="object")_=b;else{const x=window;if("solana"in x&&typeof x.solana=="object"&&("signIn"in x.solana&&typeof x.solana.signIn=="function"||"signMessage"in x.solana&&typeof x.solana.signMessage=="function"))_=x.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(v!=null&&v.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");_=b}const k=new URL((n=v==null?void 0:v.url)!==null&&n!==void 0?n:window.location.href);if("signIn"in _&&_.signIn){const x=await _.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},v==null?void 0:v.signInWithSolana),{version:"1",domain:k.host,uri:k.href}),w?{statement:w}:null));let L;if(Array.isArray(x)&&x[0]&&typeof x[0]=="object")L=x[0];else if(x&&typeof x=="object"&&"signedMessage"in x&&"signature"in x)L=x;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in L&&"signature"in L&&(typeof L.signedMessage=="string"||L.signedMessage instanceof Uint8Array)&&L.signature instanceof Uint8Array)h=typeof L.signedMessage=="string"?L.signedMessage:new TextDecoder().decode(L.signedMessage),y=L.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in _)||typeof _.signMessage!="function"||!("publicKey"in _)||typeof _!="object"||!_.publicKey||!("toBase58"in _.publicKey)||typeof _.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");h=[`${k.host} wants you to sign in with your Solana account:`,_.publicKey.toBase58(),...w?["",w,""]:[""],"Version: 1",`URI: ${k.href}`,`Issued At: ${(s=(r=v==null?void 0:v.signInWithSolana)===null||r===void 0?void 0:r.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((a=v==null?void 0:v.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${v.signInWithSolana.notBefore}`]:[],...!((i=v==null?void 0:v.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${v.signInWithSolana.expirationTime}`]:[],...!((o=v==null?void 0:v.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${v.signInWithSolana.chainId}`]:[],...!((d=v==null?void 0:v.signInWithSolana)===null||d===void 0)&&d.nonce?[`Nonce: ${v.signInWithSolana.nonce}`]:[],...!((l=v==null?void 0:v.signInWithSolana)===null||l===void 0)&&l.requestId?[`Request ID: ${v.signInWithSolana.requestId}`]:[],...!((u=(c=v==null?void 0:v.signInWithSolana)===null||c===void 0?void 0:c.resources)===null||u===void 0)&&u.length?["Resources",...v.signInWithSolana.resources.map(L=>`- ${L}`)]:[]].join(`
`);const x=await _.signMessage(new TextEncoder().encode(h),"utf8");if(!x||!(x instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");y=x}}try{const{data:f,error:b}=await X(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:h,signature:Bt(y)},!((p=t.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(m=t.options)===null||m===void 0?void 0:m.captchaToken}}:null),xform:Ge});if(b)throw b;if(!f||!f.session||!f.user){const w=new Xt;return this._returnResult({data:{user:null,session:null},error:w})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:b})}catch(f){if(J(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async _exchangeCodeForSession(t){const n=await Ct(this.storage,`${this.storageKey}-code-verifier`),[r,s]=(n??"").split("/");try{if(!r&&this.flowType==="pkce")throw new sc;const{data:a,error:i}=await X(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:r},xform:Ge});if(await qe(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!a||!a.session||!a.user){const o=new Xt;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:s??null}),error:i})}catch(a){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(t){try{const{options:n,provider:r,token:s,access_token:a,nonce:i}=t,o=await X(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:r,id_token:s,access_token:a,nonce:i,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}},xform:Ge}),{data:d,error:l}=o;if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!d||!d.session||!d.user){const c=new Xt;return this._returnResult({data:{user:null,session:null},error:c})}return d.session&&(await this._saveSession(d.session),await this._notifyAllSubscribers("SIGNED_IN",d.session)),this._returnResult({data:d,error:l})}catch(n){if(J(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithOtp(t){var n,r,s,a,i;try{if("email"in t){const{email:o,options:d}=t;let l=null,c=null;this.flowType==="pkce"&&([l,c]=await Zt(this.storage,this.storageKey));const{error:u}=await X(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(n=d==null?void 0:d.data)!==null&&n!==void 0?n:{},create_user:(r=d==null?void 0:d.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:l,code_challenge_method:c},redirectTo:d==null?void 0:d.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in t){const{phone:o,options:d}=t,{data:l,error:c}=await X(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=d==null?void 0:d.data)!==null&&s!==void 0?s:{},create_user:(a=d==null?void 0:d.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},channel:(i=d==null?void 0:d.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:l==null?void 0:l.message_id},error:c})}throw new Ir("You must provide either an email or phone number.")}catch(o){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(t){var n,r;try{let s,a;"options"in t&&(s=(n=t.options)===null||n===void 0?void 0:n.redirectTo,a=(r=t.options)===null||r===void 0?void 0:r.captchaToken);const{data:i,error:o}=await X(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:a}}),redirectTo:s,xform:Ge});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const d=i.session,l=i.user;return d!=null&&d.access_token&&(await this._saveSession(d),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",d)),this._returnResult({data:{user:l,session:d},error:null})}catch(s){if(J(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(t){var n,r,s,a,i;try{let o=null,d=null;this.flowType==="pkce"&&([o,d]=await Zt(this.storage,this.storageKey));const l=await X(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(r=(n=t.options)===null||n===void 0?void 0:n.redirectTo)!==null&&r!==void 0?r:void 0}),!((s=t==null?void 0:t.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:d}),headers:this.headers,xform:$c});return!((a=l.data)===null||a===void 0)&&a.url&&Le()&&!(!((i=t.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(l.data.url),this._returnResult(l)}catch(o){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{const{data:{session:n},error:r}=t;if(r)throw r;if(!n)throw new Ue;const{error:s}=await X(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:n.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(t){if(J(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async resend(t){try{const n=`${this.url}/resend`;if("email"in t){const{email:r,type:s,options:a}=t,{error:i}=await X(this.fetch,"POST",n,{headers:this.headers,body:{email:r,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},redirectTo:a==null?void 0:a.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in t){const{phone:r,type:s,options:a}=t,{data:i,error:o}=await X(this.fetch,"POST",n,{headers:this.headers,body:{phone:r,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i==null?void 0:i.message_id},error:o})}throw new Ir("You must provide either an email or phone number and a type")}catch(n){if(J(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async n=>n))}async _acquireLock(t,n){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){const r=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await r,await n()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const r=n();for(this.pendingInLock.push((async()=>{try{await r}catch{}})()),await r;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await r}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{const n=await this.__loadSession();return await t(n)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null;const n=await Ct(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",n),n!==null&&(this._isValidSession(n)?t=n:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};const r=t.expires_at?t.expires_at*1e3-Date.now()<qs:!1;if(this._debug("#__loadSession()",`session has${r?"":" not"} expired`,"expires_at",t.expires_at),!r){if(this.userStorage){const i=await Ct(this.userStorage,this.storageKey+"-user");i!=null&&i.user?t.user=i.user:t.user=Es()}if(this.storage.isServer&&t.user&&!t.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};t.user=qc(t.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:t},error:null}}const{data:s,error:a}=await this._callRefreshToken(t.refresh_token);return a?this._returnResult({data:{session:null},error:a}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(t){if(t)return await this._getUser(t);await this.initializePromise;const n=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return n.data.user&&(this.suppressGetSessionWarning=!0),n}async _getUser(t){try{return t?await X(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:vt}):await this._useSession(async n=>{var r,s,a;const{data:i,error:o}=n;if(o)throw o;return!(!((r=i.session)===null||r===void 0)&&r.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Ue}:await X(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0,xform:vt})})}catch(n){if(J(n))return Ls(n)&&(await this._removeSession(),await qe(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:n});throw n}}async updateUser(t,n={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(t,n))}async _updateUser(t,n={}){try{return await this._useSession(async r=>{const{data:s,error:a}=r;if(a)throw a;if(!s.session)throw new Ue;const i=s.session;let o=null,d=null;this.flowType==="pkce"&&t.email!=null&&([o,d]=await Zt(this.storage,this.storageKey));const{data:l,error:c}=await X(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:n==null?void 0:n.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:o,code_challenge_method:d}),jwt:i.access_token,xform:vt});if(c)throw c;return i.user=l.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(r){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(r))return this._returnResult({data:{user:null},error:r});throw r}}async setSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new Ue;const n=Date.now()/1e3;let r=n,s=!0,a=null;const{payload:i}=Dr(t.access_token);if(i.exp&&(r=i.exp,s=r<=n),s){const{data:o,error:d}=await this._callRefreshToken(t.refresh_token);if(d)return this._returnResult({data:{user:null,session:null},error:d});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:d}=await this._getUser(t.access_token);if(d)return this._returnResult({data:{user:null,session:null},error:d});a={access_token:t.access_token,refresh_token:t.refresh_token,user:o.user,token_type:"bearer",expires_in:r-n,expires_at:r},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(n){if(J(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async n=>{var r;if(!t){const{data:i,error:o}=n;if(o)throw o;t=(r=i.session)!==null&&r!==void 0?r:void 0}if(!(t!=null&&t.refresh_token))throw new Ue;const{data:s,error:a}=await this._callRefreshToken(t.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(n){if(J(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async _getSessionFromURL(t,n){try{if(!Le())throw new Pr("No browser detected.");if(t.error||t.error_description||t.error_code)throw new Pr(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});switch(n){case"implicit":if(this.flowType==="pkce")throw new mi("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Pr("Not a valid implicit grant flow url.");break;default:}if(n==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!t.code)throw new mi("No code detected.");const{data:w,error:v}=await this._exchangeCodeForSession(t.code);if(v)throw v;const _=new URL(window.location.href);return _.searchParams.delete("code"),window.history.replaceState(window.history.state,"",_.toString()),{data:{session:w.session,redirectType:null},error:null}}const{provider_token:r,provider_refresh_token:s,access_token:a,refresh_token:i,expires_in:o,expires_at:d,token_type:l}=t;if(!a||!o||!i||!l)throw new Pr("No session defined in URL");const c=Math.round(Date.now()/1e3),u=parseInt(o);let p=c+u;d&&(p=parseInt(d));const m=p-c;m*1e3<=ln&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${u}s`);const h=p-u;c-h>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",h,p,c):c-h<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",h,p,c);const{data:y,error:f}=await this._getUser(a);if(f)throw f;const b={provider_token:r,provider_refresh_token:s,access_token:a,expires_in:u,expires_at:p,refresh_token:i,token_type:l,user:y.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:b,redirectType:t.type},error:null})}catch(r){if(J(r))return this._returnResult({data:{session:null,redirectType:null},error:r});throw r}}_isImplicitGrantCallback(t){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),t):!!(t.access_token||t.error_description)}async _isPKCECallback(t){const n=await Ct(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&n)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async n=>{var r;const{data:s,error:a}=n;if(a&&!Ls(a))return this._returnResult({error:a});const i=(r=s.session)===null||r===void 0?void 0:r.access_token;if(i){const{error:o}=await this.admin.signOut(i,t);if(o&&!(nc(o)&&(o.status===404||o.status===401||o.status===403)||Ls(o)))return this._returnResult({error:o})}return t!=="others"&&(await this._removeSession(),await qe(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(t){const n=uc(),r={id:n,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",n),this.stateChangeEmitters.delete(n)}};return this._debug("#onAuthStateChange()","registered callback with id",n),this.stateChangeEmitters.set(n,r),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(n)})))(),{data:{subscription:r}}}async _emitInitialSession(t){return await this._useSession(async n=>{var r,s;try{const{data:{session:a},error:i}=n;if(i)throw i;await((r=this.stateChangeEmitters.get(t))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",t,"session",a)}catch(a){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",a),console.error(a)}})}async resetPasswordForEmail(t,n={}){let r=null,s=null;this.flowType==="pkce"&&([r,s]=await Zt(this.storage,this.storageKey,!0));try{return await X(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:r,code_challenge_method:s,gotrue_meta_security:{captcha_token:n.captchaToken}},headers:this.headers,redirectTo:n.redirectTo})}catch(a){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var t;try{const{data:n,error:r}=await this.getUser();if(r)throw r;return this._returnResult({data:{identities:(t=n.user.identities)!==null&&t!==void 0?t:[]},error:null})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}}async linkIdentity(t){return"token"in t?this.linkIdentityIdToken(t):this.linkIdentityOAuth(t)}async linkIdentityOAuth(t){var n;try{const{data:r,error:s}=await this._useSession(async a=>{var i,o,d,l,c;const{data:u,error:p}=a;if(p)throw p;const m=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(i=t.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=t.options)===null||o===void 0?void 0:o.scopes,queryParams:(d=t.options)===null||d===void 0?void 0:d.queryParams,skipBrowserRedirect:!0});return await X(this.fetch,"GET",m,{headers:this.headers,jwt:(c=(l=u.session)===null||l===void 0?void 0:l.access_token)!==null&&c!==void 0?c:void 0})});if(s)throw s;return Le()&&!(!((n=t.options)===null||n===void 0)&&n.skipBrowserRedirect)&&window.location.assign(r==null?void 0:r.url),this._returnResult({data:{provider:t.provider,url:r==null?void 0:r.url},error:null})}catch(r){if(J(r))return this._returnResult({data:{provider:t.provider,url:null},error:r});throw r}}async linkIdentityIdToken(t){return await this._useSession(async n=>{var r;try{const{error:s,data:{session:a}}=n;if(s)throw s;const{options:i,provider:o,token:d,access_token:l,nonce:c}=t,u=await X(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(r=a==null?void 0:a.access_token)!==null&&r!==void 0?r:void 0,body:{provider:o,id_token:d,access_token:l,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:Ge}),{data:p,error:m}=u;return m?this._returnResult({data:{user:null,session:null},error:m}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new Xt}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:m}))}catch(s){if(await qe(this.storage,`${this.storageKey}-code-verifier`),J(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(t){try{return await this._useSession(async n=>{var r,s;const{data:a,error:i}=n;if(i)throw i;return await X(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(r=a.session)===null||r===void 0?void 0:r.access_token)!==null&&s!==void 0?s:void 0})})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}}async _refreshAccessToken(t){const n=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(n,"begin");try{const r=Date.now();return await fc(async s=>(s>0&&await hc(200*Math.pow(2,s-1)),this._debug(n,"refreshing attempt",s),await X(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:Ge})),(s,a)=>{const i=200*Math.pow(2,s);return a&&Ts(a)&&Date.now()+i-r<ln})}catch(r){if(this._debug(n,"error",r),J(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}finally{this._debug(n,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,n){const r=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:n.redirectTo,scopes:n.scopes,queryParams:n.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",n,"url",r),Le()&&!n.skipBrowserRedirect&&window.location.assign(r),{data:{provider:t,url:r},error:null}}async _recoverAndRefresh(){var t,n;const r="#_recoverAndRefresh()";this._debug(r,"begin");try{const s=await Ct(this.storage,this.storageKey);if(s&&this.userStorage){let i=await Ct(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:s.user},await dn(this.userStorage,this.storageKey+"-user",i)),s.user=(t=i==null?void 0:i.user)!==null&&t!==void 0?t:Es()}else if(s&&!s.user&&!s.user){const i=await Ct(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(s.user=i.user,await qe(this.storage,this.storageKey+"-user"),await dn(this.storage,this.storageKey,s)):s.user=Es()}if(this._debug(r,"session from storage",s),!this._isValidSession(s)){this._debug(r,"session is not valid"),s!==null&&await this._removeSession();return}const a=((n=s.expires_at)!==null&&n!==void 0?n:1/0)*1e3-Date.now()<qs;if(this._debug(r,`session has${a?"":" not"} expired with margin of ${qs}s`),a){if(this.autoRefreshToken&&s.refresh_token){const{error:i}=await this._callRefreshToken(s.refresh_token);i&&(console.error(i),Ts(i)||(this._debug(r,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(s.access_token);!o&&(i!=null&&i.user)?(s.user=i.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(r,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(r,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(r,"error",s),console.error(s);return}finally{this._debug(r,"end")}}async _callRefreshToken(t){var n,r;if(!t)throw new Ue;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new hs;const{data:a,error:i}=await this._refreshAccessToken(t);if(i)throw i;if(!a.session)throw new Ue;await this._saveSession(a.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const o={data:a.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(a){if(this._debug(s,"error",a),J(a)){const i={data:null,error:a};return Ts(a)||await this._removeSession(),(n=this.refreshingDeferred)===null||n===void 0||n.resolve(i),i}throw(r=this.refreshingDeferred)===null||r===void 0||r.reject(a),a}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,n,r=!0){const s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",n,`broadcast = ${r}`);try{this.broadcastChannel&&r&&this.broadcastChannel.postMessage({event:t,session:n});const a=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(t,n)}catch(d){a.push(d)}});if(await Promise.all(i),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await qe(this.storage,`${this.storageKey}-code-verifier`);const n=Object.assign({},t),r=n.user&&n.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!r&&n.user&&await dn(this.userStorage,this.storageKey+"-user",{user:n.user});const s=Object.assign({},n);delete s.user;const a=vi(s);await dn(this.storage,this.storageKey,a)}else{const s=vi(n);await dn(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await qe(this.storage,this.storageKey),await qe(this.storage,this.storageKey+"-code-verifier"),await qe(this.storage,this.storageKey+"-user"),this.userStorage&&await qe(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&Le()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(n){console.error("removing visibilitychange callback failed",n)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const t=setInterval(()=>this._autoRefreshTokenTick(),ln);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t);const n=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=n,n&&typeof n=="object"&&typeof n.unref=="function"?n.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(n)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t);const n=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,n&&clearTimeout(n)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async n=>{const{data:{session:r}}=n;if(!r||!r.refresh_token||!r.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((r.expires_at*1e3-t)/ln);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${ln}ms, refresh threshold is ${Qs} ticks`),s<=Qs&&await this._callRefreshToken(r.refresh_token)})}catch(n){console.error("Auto refresh tick failed with error. This is likely a transient error.",n)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof Vo)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!Le()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(t){this._debug("#visibilityChangedCallback","error",t)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){const n=`#_onVisibilityChanged(${t})`;this._debug(n,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(n,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,n,r){const s=[`provider=${encodeURIComponent(n)}`];if(r!=null&&r.redirectTo&&s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),r!=null&&r.scopes&&s.push(`scopes=${encodeURIComponent(r.scopes)}`),this.flowType==="pkce"){const[a,i]=await Zt(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(i)}`});s.push(o.toString())}if(r!=null&&r.queryParams){const a=new URLSearchParams(r.queryParams);s.push(a.toString())}return r!=null&&r.skipBrowserRedirect&&s.push(`skip_http_redirect=${r.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async n=>{var r;const{data:s,error:a}=n;return a?this._returnResult({data:null,error:a}):await X(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(r=s==null?void 0:s.session)===null||r===void 0?void 0:r.access_token})})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}}async _enroll(t){try{return await this._useSession(async n=>{var r,s;const{data:a,error:i}=n;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:t.factorType==="totp"?{issuer:t.issuer}:{}),{data:d,error:l}=await X(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(r=a==null?void 0:a.session)===null||r===void 0?void 0:r.access_token});return l?this._returnResult({data:null,error:l}):(t.factorType==="totp"&&d.type==="totp"&&(!((s=d==null?void 0:d.totp)===null||s===void 0)&&s.qr_code)&&(d.totp.qr_code=`data:image/svg+xml;utf-8,${d.totp.qr_code}`),this._returnResult({data:d,error:null}))})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}}async _verify(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async n=>{var r;const{data:s,error:a}=n;if(a)return this._returnResult({data:null,error:a});const i=Object.assign({challenge_id:t.challengeId},"webauthn"in t?{webauthn:Object.assign(Object.assign({},t.webauthn),{credential_response:t.webauthn.type==="create"?zc(t.webauthn.credential_response):Wc(t.webauthn.credential_response)})}:{code:t.code}),{data:o,error:d}=await X(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:i,headers:this.headers,jwt:(r=s==null?void 0:s.session)===null||r===void 0?void 0:r.access_token});return d?this._returnResult({data:null,error:d}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:d}))})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}})}async _challenge(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async n=>{var r;const{data:s,error:a}=n;if(a)return this._returnResult({data:null,error:a});const i=await X(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:t,headers:this.headers,jwt:(r=s==null?void 0:s.session)===null||r===void 0?void 0:r.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Bc(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Kc(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}})}async _challengeAndVerify(t){const{data:n,error:r}=await this._challenge({factorId:t.factorId});return r?this._returnResult({data:null,error:r}):await this._verify({factorId:t.factorId,challengeId:n.id,code:t.code})}async _listFactors(){var t;const{data:{user:n},error:r}=await this.getUser();if(r)return{data:null,error:r};const s={all:[],phone:[],totp:[],webauthn:[]};for(const a of(t=n==null?void 0:n.factors)!==null&&t!==void 0?t:[])s.all.push(a),a.status==="verified"&&s[a.factor_type].push(a);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(t){var n,r,s,a;if(t)try{const{payload:m}=Dr(t);let h=null;m.aal&&(h=m.aal);let y=h;const{data:{user:f},error:b}=await this.getUser(t);if(b)return this._returnResult({data:null,error:b});((r=(n=f==null?void 0:f.factors)===null||n===void 0?void 0:n.filter(_=>_.status==="verified"))!==null&&r!==void 0?r:[]).length>0&&(y="aal2");const v=m.amr||[];return{data:{currentLevel:h,nextLevel:y,currentAuthenticationMethods:v},error:null}}catch(m){if(J(m))return this._returnResult({data:null,error:m});throw m}const{data:{session:i},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:d}=Dr(i.access_token);let l=null;d.aal&&(l=d.aal);let c=l;((a=(s=i.user.factors)===null||s===void 0?void 0:s.filter(m=>m.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(c="aal2");const p=d.amr||[];return{data:{currentLevel:l,nextLevel:c,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(t){try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;return s?this._returnResult({data:null,error:s}):r?await X(this.fetch,"GET",`${this.url}/oauth/authorizations/${t}`,{headers:this.headers,jwt:r.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new Ue})})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}}async _approveAuthorization(t,n){try{return await this._useSession(async r=>{const{data:{session:s},error:a}=r;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new Ue});const i=await X(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&Le()&&!(n!=null&&n.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(r){if(J(r))return this._returnResult({data:null,error:r});throw r}}async _denyAuthorization(t,n){try{return await this._useSession(async r=>{const{data:{session:s},error:a}=r;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new Ue});const i=await X(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&Le()&&!(n!=null&&n.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(r){if(J(r))return this._returnResult({data:null,error:r});throw r}}async _listOAuthGrants(){try{return await this._useSession(async t=>{const{data:{session:n},error:r}=t;return r?this._returnResult({data:null,error:r}):n?await X(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new Ue})})}catch(t){if(J(t))return this._returnResult({data:null,error:t});throw t}}async _revokeOAuthGrant(t){try{return await this._useSession(async n=>{const{data:{session:r},error:s}=n;return s?this._returnResult({data:null,error:s}):r?(await X(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,query:{client_id:t.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Ue})})}catch(n){if(J(n))return this._returnResult({data:null,error:n});throw n}}async fetchJwk(t,n={keys:[]}){let r=n.keys.find(o=>o.kid===t);if(r)return r;const s=Date.now();if(r=this.jwks.keys.find(o=>o.kid===t),r&&this.jwks_cached_at+ec>s)return r;const{data:a,error:i}=await X(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=s,r=a.keys.find(o=>o.kid===t),!r)?null:r}async getClaims(t,n={}){try{let r=t;if(!r){const{data:m,error:h}=await this.getSession();if(h||!m.session)return this._returnResult({data:null,error:h});r=m.session.access_token}const{header:s,payload:a,signature:i,raw:{header:o,payload:d}}=Dr(r);n!=null&&n.allowExpired||Sc(a.exp);const l=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,n!=null&&n.keys?{keys:n.keys}:n==null?void 0:n.jwks);if(!l){const{error:m}=await this.getUser(r);if(m)throw m;return{data:{claims:a,header:s,signature:i},error:null}}const c=xc(s.alg),u=await crypto.subtle.importKey("jwk",l,c,!0,["verify"]);if(!await crypto.subtle.verify(c,u,i,dc(`${o}.${d}`)))throw new Zs("Invalid JWT signature");return{data:{claims:a,header:s,signature:i},error:null}}catch(r){if(J(r))return this._returnResult({data:null,error:r});throw r}}}sr.nextInstanceID={};const tu=sr,nu="2.95.3";let Bn="";typeof Deno<"u"?Bn="deno":typeof document<"u"?Bn="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Bn="react-native":Bn="node";const ru={"X-Client-Info":`supabase-js-${Bn}/${nu}`},su={headers:ru},au={schema:"public"},iu={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},ou={};function ar(e){"@babel/helpers - typeof";return ar=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ar(e)}function lu(e,t){if(ar(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(ar(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function du(e){var t=lu(e,"string");return ar(t)=="symbol"?t:t+""}function cu(e,t,n){return(t=du(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qi(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?qi(Object(n),!0).forEach(function(r){cu(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qi(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}const uu=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),pu=()=>Headers,mu=(e,t,n)=>{const r=uu(n),s=pu();return async(a,i)=>{var o;const d=(o=await t())!==null&&o!==void 0?o:e;let l=new s(i==null?void 0:i.headers);return l.has("apikey")||l.set("apikey",e),l.has("Authorization")||l.set("Authorization",`Bearer ${d}`),r(a,ve(ve({},i),{},{headers:l}))}};function hu(e){return e.endsWith("/")?e:e+"/"}function fu(e,t){var n,r;const{db:s,auth:a,realtime:i,global:o}=e,{db:d,auth:l,realtime:c,global:u}=t,p={db:ve(ve({},d),s),auth:ve(ve({},l),a),realtime:ve(ve({},c),i),storage:{},global:ve(ve(ve({},u),o),{},{headers:ve(ve({},(n=u==null?void 0:u.headers)!==null&&n!==void 0?n:{}),(r=o==null?void 0:o.headers)!==null&&r!==void 0?r:{})}),accessToken:async()=>""};return e.accessToken?p.accessToken=e.accessToken:delete p.accessToken,p}function yu(e){const t=e==null?void 0:e.trim();if(!t)throw new Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(hu(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var bu=class extends tu{constructor(e){super(e)}},vu=class{constructor(e,t,n){var r,s;this.supabaseUrl=e,this.supabaseKey=t;const a=yu(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const i=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:au,realtime:ou,auth:ve(ve({},iu),{},{storageKey:i}),global:su},d=fu(n??{},o);if(this.storageKey=(r=d.auth.storageKey)!==null&&r!==void 0?r:"",this.headers=(s=d.global.headers)!==null&&s!==void 0?s:{},d.accessToken)this.accessToken=d.accessToken,this.auth=new Proxy({},{get:(c,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var l;this.auth=this._initSupabaseAuthClient((l=d.auth)!==null&&l!==void 0?l:{},this.headers,d.global.fetch)}this.fetch=mu(t,this._getAccessToken.bind(this),d.global.fetch),this.realtime=this._initRealtimeClient(ve({headers:this.headers,accessToken:this._getAccessToken.bind(this)},d.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(c=>this.realtime.setAuth(c)).catch(c=>console.warn("Failed to set initial Realtime auth token:",c)),this.rest=new nd(new URL("rest/v1",a).href,{headers:this.headers,schema:d.db.schema,fetch:this.fetch,timeout:d.db.timeout,urlLengthLimit:d.db.urlLengthLimit}),this.storage=new Jd(this.storageUrl.href,this.headers,this.fetch,n==null?void 0:n.storage),d.accessToken||this._listenForAuthEvents()}get functions(){return new Gl(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},n={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,n)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this,t,n;if(e.accessToken)return await e.accessToken();const{data:r}=await e.auth.getSession();return(t=(n=r.session)===null||n===void 0?void 0:n.access_token)!==null&&t!==void 0?t:e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:s,storageKey:a,flowType:i,lock:o,debug:d,throwOnError:l},c,u){const p={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new bu({url:this.authUrl.href,headers:ve(ve({},p),c),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:n,storage:r,userStorage:s,flowType:i,lock:o,debug:d,throwOnError:l,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some(m=>m.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new gd(this.realtimeUrl.href,ve(ve({},e),{},{params:ve(ve({},{apikey:this.supabaseKey}),e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",t==null?void 0:t.access_token)})}_handleTokenChanged(e,t,n){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==n?(this.changedAccessToken=n,this.realtime.setAuth(n)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const gu=(e,t,n)=>new vu(e,t,n);function wu(){if(typeof window<"u")return!1;const e=globalThis.process;if(!e)return!1;const t=e.version;if(t==null)return!1;const n=t.match(/^v(\d+)\./);return n?parseInt(n[1],10)<=18:!1}wu()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const _u="https://ujxczpaupfqaiqrcoykl.supabase.co",Su="sb_publishable_EJ7wzzBh1hnKE0j_j7E1mQ_9TAJvRoO",S=gu(_u,Su),Li="app-toast-container";function xu(){let e=document.getElementById(Li);return e||(e=document.createElement("div"),e.id=Li,e.className="toast-container position-fixed top-0 end-0 p-3",e.style.zIndex="1080",document.body.appendChild(e)),e}function ku(e){return e==="success"?"text-bg-success":e==="error"?"text-bg-danger":e==="warning"?"text-bg-warning":"text-bg-primary"}function qu(e){const t=String(e||"").trim(),n=t.toLowerCase();return t?n.includes("row-level security")||n.includes("violates row-level security policy")?"Нямаш нужните права за това действие.":n.includes("foreign key constraint")||n.includes("violates foreign key constraint")?"Операцията не може да се изпълни, защото записът е свързан с други данни.":n.includes("duplicate key value")||n.includes("unique constraint")||n.includes("already exists")?"Запис с тези данни вече съществува.":n.includes("violates not-null constraint")?"Липсва задължително поле. Провери въведените данни.":n.includes("invalid input syntax")||n.includes("invalid uuid")||n.includes("date/time field value out of range")?"Невалиден формат на въведени данни.":n.includes("permission denied")||n.includes("not authorized")||n.includes("unauthorized")?"Нямаш достъп за това действие.":n.includes("jwt")||n.includes("token")||n.includes("session")?"Сесията е изтекла. Влез отново в системата.":n.includes("failed to fetch")||n.includes("networkerror")||n.includes("network request failed")?"Проблем с връзката. Провери интернет и опитай отново.":t:"Възникна неочаквана грешка."}function g(e,t="info"){const n=xu(),r=document.createElement("div"),s=t==="error"?qu(e):String(e??"");r.className=`toast align-items-center border-0 ${ku(t)} show`,r.setAttribute("role","alert"),r.setAttribute("aria-live","assertive"),r.setAttribute("aria-atomic","true"),r.innerHTML=`
    <div class="d-flex">
      <div class="toast-body">${s}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
    </div>
  `;const a=r.querySelector("button");a==null||a.addEventListener("click",()=>{r.remove()}),n.appendChild(r),window.setTimeout(()=>{r.remove()},4e3)}async function wn(){const{data:e,error:t}=await S.auth.getSession();return t?null:e.session||null}async function La(e){if(!e)return!1;const{data:t,error:n}=await S.from("user_roles").select("id").eq("user_id",e).eq("role","admin").limit(1);return n?!1:Array.isArray(t)&&t.length>0}async function Lu(){var n;const e=await wn(),t=((n=e==null?void 0:e.user)==null?void 0:n.id)||"";return t?La(t):!1}async function ea(e){if(!e)return!1;const{data:t,error:n}=await S.from("user_roles").select("id").eq("user_id",e).limit(1);return n?!1:Array.isArray(t)&&t.length>0}async function Qo(e){if(!e)return!1;const{data:t,error:n}=await S.from("user_profiles").select("is_active").eq("id",e).maybeSingle();return n?!1:t?t.is_active!==!1:!0}async function Ti(){var r;const e=await wn(),t=((r=e==null?void 0:e.user)==null?void 0:r.id)||"";return t?await Qo(t)?{allowed:!0,reason:""}:(await S.auth.signOut(),{allowed:!1,reason:"inactive-profile"}):{allowed:!1,reason:"no-session"}}const Tu={page_plan_schedule:"Страница План-График",page_schedule:"Страница График",schedule_keys:"Ключ-Графици",duties:"Повески",duty_types:"Типове повески",trains:"Влакове",employees:"Служители",employee_absences:"Отсъствия",planned_duties:"Планирани повески",actual_duties:"Реални повески",user_roles:"Роли на потребители",user_profiles:"Потребителски профили",role_permissions:"Права по роли",schedule_key_duties:"Повески към ключ-график",positions:"Позиции",absence_reasons:"Причини за отсъствие",duty_trains:"Влакове към повески",documents:"Документи"},ta={none:0,own:1,role_attached_employees:2,all:3};let It="",jt=new Map,Pt=!1,Kt=null;function Nt(e){const t=String(e||"").trim();return Object.hasOwn(ta,t)?t:"none"}function Rn(e,t){const n=Nt(e),r=Nt(t);return ta[n]>=ta[r]?n:r}async function Eu(){var d,l;const{data:e}=await S.auth.getSession(),t=((l=(d=e==null?void 0:e.session)==null?void 0:d.user)==null?void 0:l.id)||"";if(!t){It="",jt=new Map,Pt=!0;return}if(Pt&&It===t)return;const{data:n,error:r}=await S.from("user_roles").select("role").eq("user_id",t);if(r){It=t,jt=new Map,Pt=!0;return}const s=[...new Set((n||[]).map(c=>String((c==null?void 0:c.role)||"").trim()).filter(Boolean))];if(!s.length){It=t,jt=new Map,Pt=!0;return}const{data:a,error:i}=await S.from("role_permissions").select("resource, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope").in("role",s);if(i){It=t,jt=new Map,Pt=!0;return}const o=new Map;(a||[]).forEach(c=>{const u=String((c==null?void 0:c.resource)||"").trim();if(!u)return;const p=o.get(u)||{view_screen_scope:"none",view_records_scope:"none",create_records_scope:"none",edit_records_scope:"none",delete_records_scope:"none"};o.set(u,{view_screen_scope:Rn(p.view_screen_scope,c==null?void 0:c.view_screen_scope),view_records_scope:Rn(p.view_records_scope,c==null?void 0:c.view_records_scope),create_records_scope:Rn(p.create_records_scope,c==null?void 0:c.create_records_scope),edit_records_scope:Rn(p.edit_records_scope,c==null?void 0:c.edit_records_scope),delete_records_scope:Rn(p.delete_records_scope,c==null?void 0:c.delete_records_scope)})}),It=t,jt=o,Pt=!0}async function Vr(e,t){await Eu();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return"none";const s=jt.get(n);return s?r==="view_screen"?Nt(s.view_screen_scope):r==="view_records"?Nt(s.view_records_scope):r==="edit_records"?Nt(s.edit_records_scope):r==="create_records"?Nt(s.create_records_scope):r==="delete_records"?Nt(s.delete_records_scope):"none":"none"}async function Yo(e){return await Vr(e,"view_screen")!=="none"}function rn(e,t){if(!e)return;const n=e.dataset.permissionHidden==="1";if(t){e.classList.add("d-none"),e.dataset.permissionHidden="1";return}n&&(e.classList.remove("d-none"),delete e.dataset.permissionHidden)}async function $u(e,t){Kt&&(Kt(),Kt=null);const n=String(t||"").trim();if(!e||!n)return;const r=await Vr(n,"edit_records"),s=await Vr(n,"create_records"),a=await Vr(n,"delete_records"),i=s==="none",o=r==="none",d=a==="none",l=['button[id^="open-create-"]','button[id^="open-add-"]',"#open-auto-plan-duty","#go-to-plan-schedule","#add-selected-to-actual-duty","#go-to-schedule","#schedule-confirm-from-timetable","button[data-actual-add-duty-id]"],c=['[data-action="edit"]','[data-duty-action="edit"]','[data-action="duplicate"]','[data-duty-action="duplicate"]',"button[data-actual-edit-id]","button[data-actual-drag-id]","#schedule-actual-edit-save"],u=['[data-action="delete"]','[data-duty-action="delete"]',"#open-bulk-delete-planned-duty","#open-bulk-delete-actual-duty"],p=()=>{i&&e.querySelectorAll(l.join(",")).forEach(y=>rn(y,!0)),o&&e.querySelectorAll(c.join(",")).forEach(y=>rn(y,!0)),d&&e.querySelectorAll(u.join(",")).forEach(y=>rn(y,!0)),i||e.querySelectorAll(l.join(",")).forEach(y=>rn(y,!1)),o||e.querySelectorAll(c.join(",")).forEach(y=>rn(y,!1)),d||e.querySelectorAll(u.join(",")).forEach(y=>rn(y,!1))},m=y=>{const f=y.target;if(f){if(i&&f.closest(l.join(","))){y.preventDefault(),y.stopPropagation(),g("Нямаш права за създаване.","warning");return}if(o&&f.closest(c.join(","))){y.preventDefault(),y.stopPropagation(),g("Нямаш права за редакция.","warning");return}d&&f.closest(u.join(","))&&(y.preventDefault(),y.stopPropagation(),g("Нямаш права за изтриване.","warning"))}},h=new MutationObserver(()=>{p()});p(),e.addEventListener("click",m,!0),h.observe(e,{childList:!0,subtree:!0}),Kt=()=>{e.removeEventListener("click",m,!0),h.disconnect()}}function Au(){Kt&&(Kt(),Kt=null)}function Xo(){It="",jt=new Map,Pt=!1}function Ta(e){const t=String(e||"").trim();return t?Tu[t]||t:"-"}let As,Mr,Or,jr;async function Cu(e){e.innerHTML=Kl;const t=e.querySelector("nav.navbar"),n=e.querySelector("#nav-sign-in"),r=e.querySelector("#nav-register"),s=e.querySelector("#nav-my-profile"),a=e.querySelector("#nav-logout"),i=e.querySelector("#nav-admin"),o=a==null?void 0:a.querySelector("button"),d=e.querySelector("#mainNav"),l=e.querySelector(".navbar-toggler"),c=globalThis.bootstrap,u=!!(c!=null&&c.Collapse),p=!!(c!=null&&c.Dropdown),m=()=>{if(d){if(u){c.Collapse.getOrCreateInstance(d,{toggle:!1}).hide();return}d.classList.contains("show")&&(d.classList.remove("show"),l==null||l.setAttribute("aria-expanded","false"))}},h=()=>{if(p){e.querySelectorAll(".dropdown-toggle").forEach(w=>{try{c.Dropdown.getOrCreateInstance(w).hide()}catch{}});return}e.querySelectorAll(".nav-item.dropdown").forEach(w=>{var _;w.classList.remove("show"),(_=w.querySelector(".dropdown-menu"))==null||_.classList.remove("show");const v=w.querySelector(".dropdown-toggle");v&&v.setAttribute("aria-expanded","false")})},y=()=>{const w=window.location.pathname;e.querySelectorAll("a[data-link]").forEach(k=>{const L=k.getAttribute("href")===w;k.classList.toggle("active",L),k.setAttribute("aria-current",L?"page":"false")}),e.querySelectorAll(".nav-item.dropdown").forEach(k=>{const x=k.querySelector(".dropdown-toggle"),L=!!k.querySelector(".dropdown-item.active");x==null||x.classList.toggle("active",L),x&&x.setAttribute("aria-current",L?"page":"false")})},f=async()=>{var E;const{data:w}=await S.auth.getSession(),v=w.session,_=!!v,k=((E=v==null?void 0:v.user)==null?void 0:E.id)||"",x=k?await ea(k):!1,L=_&&!x;if(t==null||t.classList.toggle("d-none",!_),n==null||n.classList.toggle("d-none",_),r==null||r.classList.toggle("d-none",_),a==null||a.classList.toggle("d-none",!_),L){e.querySelectorAll("#mainNav .navbar-nav > li").forEach($=>{$.classList.add("d-none")}),a==null||a.classList.remove("d-none"),i==null||i.classList.add("d-none"),s==null||s.classList.add("d-none");return}let T=!1;k&&(T=await La(k)),i==null||i.classList.toggle("d-none",!T),s==null||s.classList.toggle("d-none",!T);const q={"/schedule-keys":"schedule_keys","/duties":"duties","/duty-types":"duty_types","/trains":"trains","/employees":"employees","/employee-absences":"employee_absences","/planned-duties":"planned_duties","/actual-duties":"actual_duties","/documents":"documents","/user-profiles":"user_profiles","/plan-schedule":"page_plan_schedule","/schedule":"page_schedule","/schedule-key-duties":"duties"};await Promise.all(Object.entries(q).map(async([$,A])=>{const C=e.querySelector(`a[data-link][href="${$}"]`),R=C==null?void 0:C.closest("li");if(!C||!R)return;if(!_){R.classList.add("d-none");return}const P=await Yo(A);R.classList.toggle("d-none",!P)}))};e.addEventListener("click",w=>{const v=w.target.closest(".dropdown-toggle");if(v&&e.contains(v)){if(w.preventDefault(),p){const q=v.closest(".nav-item.dropdown"),E=q==null?void 0:q.classList.contains("show");h();const $=c.Dropdown.getOrCreateInstance(v);E?$.hide():$.show();return}const x=v.closest(".nav-item.dropdown"),L=x==null?void 0:x.querySelector(".dropdown-menu"),T=x==null?void 0:x.classList.contains("show");h(),!T&&x&&L&&(x.classList.add("show"),L.classList.add("show"),v.setAttribute("aria-expanded","true"));return}const _=w.target.closest(".navbar-toggler");if(_&&e.contains(_)){if(w.preventDefault(),h(),d)if(u)c.Collapse.getOrCreateInstance(d,{toggle:!1}).toggle();else{const x=!d.classList.contains("show");d.classList.toggle("show",x),l==null||l.setAttribute("aria-expanded",x?"true":"false")}return}w.target.closest("a[data-link]")&&(h(),m())}),o==null||o.addEventListener("click",async()=>{const{error:w}=await S.auth.signOut();if(w){g(w.message,"error");return}g("Logged out successfully.","success"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))}),As&&As.unsubscribe(),Mr&&window.removeEventListener("route:changed",Mr),Or&&document.removeEventListener("click",Or),jr&&document.removeEventListener("keydown",jr),Mr=y,window.addEventListener("route:changed",Mr),Or=w=>{e.contains(w.target)||(h(),m())},document.addEventListener("click",Or),jr=w=>{w.key==="Escape"&&h()},document.addEventListener("keydown",jr);const{data:b}=S.auth.onAuthStateChange(()=>{Xo(),f()});As=b.subscription,await f(),y()}const Ru=`<footer id="app-footer-inner" class="border-top py-3" style="background:var(--app-surface,#fff);">\r
  <div class="container-xl px-3 px-lg-4">\r
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">\r
      <span class="d-inline-flex align-items-center gap-2 text-muted" style="font-size:0.8rem;">\r
        <i class="bi bi-train-front-fill text-primary" style="font-size:0.95rem;"></i>\r
        <span class="fw-semibold text-body">TrainCrewHub</span>\r
        <span class="vr opacity-25 mx-1"></span>\r
        <span>Платформа за управление на влакови екипажи</span>\r
      </span>\r
      <span class="text-muted" style="font-size:0.75rem;">\r
        &copy; <span id="footer-year"></span> TrainCrewHub\r
      </span>\r
    </div>\r
  </div>\r
</footer>\r
<script>\r
  (function(){ var el = document.getElementById('footer-year'); if(el) el.textContent = new Date().getFullYear(); })();\r
<\/script>\r
`;async function Iu(e){e.innerHTML=Ru}async function Pu(e){e.innerHTML=Bl;const t=e.querySelector("#app-header"),n=e.querySelector("#app-footer");await Promise.all([Cu(t),Iu(n)])}const Du=`<div class="d-flex flex-column gap-3">\r
  <section class="card border-0 shadow-sm">\r
    <div class="card-body p-4 p-md-5">\r
      <div class="d-flex flex-wrap align-items-center gap-2 mb-2">\r
        <h1 class="h3 mb-0" id="index-welcome-title">Добре дошъл в TrainCrewHub</h1>\r
      </div>\r
      <p class="text-secondary mb-0" id="index-welcome-subtitle">Зареждане на профил...</p>\r
    </div>\r
  </section>\r
\r
  <section class="card border-0 shadow-sm">\r
    <div class="card-body p-4">\r
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
        <h2 class="h5 mb-0">Бързи действия</h2>\r
        <span class="text-secondary small">Навигация към основните екрани</span>\r
      </div>\r
      <div class="d-flex flex-wrap gap-2" id="index-quick-actions">\r
        <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>\r
        <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>\r
        <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>\r
        <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>\r
        <a href="/schedule" data-link class="btn btn-outline-primary">График</a>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <section class="card border-0 shadow-sm" id="index-management-section">\r
    <div class="card-body p-4">\r
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
        <h2 class="h5 mb-0" id="index-management-title">Оперативен преглед за днес</h2>\r
        <button type="button" class="btn btn-sm btn-outline-secondary" id="index-refresh">Опресни</button>\r
      </div>\r
      <div class="row g-3" id="index-kpis">\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-planned">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-1">Планирани повески</div>\r
            <div class="h4 mb-0" id="index-kpi-planned">-</div>\r
          </article>\r
        </div>\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-actual">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-2">Реални повески</div>\r
            <div class="h4 mb-0" id="index-kpi-actual">-</div>\r
          </article>\r
        </div>\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-absences">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-3">Активни отсъствия</div>\r
            <div class="h4 mb-0" id="index-kpi-absences">-</div>\r
          </article>\r
        </div>\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-employees">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-4">Активни служители</div>\r
            <div class="h4 mb-0" id="index-kpi-employees">-</div>\r
          </article>\r
        </div>\r
      </div>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-certificates-panel">\r
        <h3 class="h6 mb-3">Сертификати</h3>\r
        <div class="d-flex flex-column gap-2">\r
          <div class="d-flex justify-content-between align-items-center border rounded p-2">\r
            <span>Изтичат до 30 дни</span>\r
            <button\r
              type="button"\r
              class="badge text-bg-warning border-0"\r
              id="index-certificates-soon-toggle"\r
              data-index-cert-action="toggle-soon"\r
            >\r
              0\r
            </button>\r
          </div>\r
          <div class="table-responsive d-none" id="index-certificates-soon-details">\r
            <table class="table table-sm align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Служител</th>\r
                  <th>Сертификат</th>\r
                  <th>Дата</th>\r
                </tr>\r
              </thead>\r
              <tbody id="index-certificates-soon-body">\r
                <tr><td colspan="3" class="text-secondary">Няма служители.</td></tr>\r
              </tbody>\r
            </table>\r
          </div>\r
\r
          <div class="d-flex justify-content-between align-items-center border rounded p-2">\r
            <span>Вече изтекли</span>\r
            <button\r
              type="button"\r
              class="badge text-bg-danger border-0"\r
              id="index-certificates-expired-toggle"\r
              data-index-cert-action="toggle-expired"\r
            >\r
              0\r
            </button>\r
          </div>\r
          <div class="table-responsive d-none" id="index-certificates-expired-details">\r
            <table class="table table-sm align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Служител</th>\r
                  <th>Сертификат</th>\r
                  <th>Дата</th>\r
                </tr>\r
              </thead>\r
              <tbody id="index-certificates-expired-body">\r
                <tr><td colspan="3" class="text-secondary">Няма служители.</td></tr>\r
              </tbody>\r
            </table>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-absences-panel">\r
        <h3 class="h6 mb-3">Отсъстващи</h3>\r
        <div class="d-flex flex-column gap-2" id="index-absence-reasons-body">\r
          <p class="text-secondary mb-0">Няма активни отсъствия.</p>\r
        </div>\r
      </section>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-workload-panel">\r
        <div class="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">\r
          <h3 class="h6 mb-0">Натовареност на всички служители</h3>\r
          <div class="d-flex align-items-end gap-2">\r
            <div>\r
              <label for="index-workload-date" class="form-label mb-1">Към дата</label>\r
              <input id="index-workload-date" type="date" class="form-control form-control-sm" />\r
            </div>\r
            <button id="index-workload-refresh" type="button" class="btn btn-sm btn-outline-secondary">Опресни</button>\r
          </div>\r
        </div>\r
\r
        <div class="table-responsive">\r
          <table class="table table-sm align-middle mb-0">\r
            <thead>\r
              <tr>\r
                <th>Служител</th>\r
                <th>Планирани</th>\r
                <th>Реални</th>\r
                <th>Норма</th>\r
                <th>Отклонение</th>\r
              </tr>\r
            </thead>\r
            <tbody id="index-workload-body">\r
              <tr>\r
                <td colspan="5" class="text-secondary">Няма данни.</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </section>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-pending-users-panel">\r
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
          <h3 class="h6 mb-0">Чакащи потребители за роля</h3>\r
          <div class="d-flex align-items-center gap-2">\r
            <span class="badge text-bg-warning" id="index-pending-users-count">0</span>\r
            <a href="/admin" data-link class="btn btn-sm btn-outline-primary">Към роли</a>\r
          </div>\r
        </div>\r
        <div class="table-responsive">\r
          <table class="table table-sm align-middle mb-0">\r
            <thead>\r
              <tr>\r
                <th>Потребител</th>\r
                <th>Създаден на</th>\r
                <th>Чака от</th>\r
              </tr>\r
            </thead>\r
            <tbody id="index-pending-users-body">\r
              <tr>\r
                <td colspan="3" class="text-secondary">Няма чакащи потребители.</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </section>\r
\r
      <p class="text-secondary small mt-3 mb-0" id="index-last-updated">-</p>\r
    </div>\r
  </section>\r
\r
  <section class="card border-0 shadow-sm d-none" id="index-crew-section">\r
    <div class="card-body p-4">\r
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
        <h2 class="h5 mb-0">Моите повески за месеца</h2>\r
        <div class="d-flex align-items-center gap-2">\r
          <button type="button" class="btn btn-sm btn-outline-secondary" id="index-crew-prev-month">◀</button>\r
          <div class="fw-semibold" id="index-crew-month-label">-</div>\r
          <button type="button" class="btn btn-sm btn-outline-secondary" id="index-crew-next-month">▶</button>\r
          <button type="button" class="btn btn-sm btn-outline-primary" id="index-crew-today-month">Днес</button>\r
          <button type="button" class="btn btn-sm btn-outline-secondary" id="index-refresh-crew">Опресни</button>\r
        </div>\r
      </div>\r
\r
      <div class="index-crew-calendar-weekdays mb-2" aria-hidden="true">\r
        <span>Пн</span>\r
        <span>Вт</span>\r
        <span>Ср</span>\r
        <span>Чт</span>\r
        <span>Пт</span>\r
        <span>Сб</span>\r
        <span>Нд</span>\r
      </div>\r
\r
      <div class="index-crew-calendar-days mb-3" id="index-crew-calendar-days"></div>\r
\r
      <div class="d-flex flex-wrap align-items-center gap-2 mb-3 small text-secondary">\r
        <span class="badge text-bg-primary">П</span>\r
        <span>Планирани</span>\r
        <span class="badge text-bg-success">Р</span>\r
        <span>Реални</span>\r
        <span class="badge text-bg-warning">Промяна</span>\r
        <span>Смяна на служител — чака потвърждение</span>\r
        <span class="badge text-bg-info">ΔN</span>\r
        <span>Брой промени</span>\r
      </div>\r
\r
      <section class="border rounded p-3 mb-3" id="index-crew-hours-summary">\r
        <div class="row g-3">\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Планирани часове до дата</div>\r
            <div class="fw-semibold" id="index-crew-planned-hours-total">00:00</div>\r
          </div>\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Реални часове до дата</div>\r
            <div class="fw-semibold" id="index-crew-actual-hours-total">00:00</div>\r
          </div>\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Норма (работни дни BG) до дата</div>\r
            <div class="fw-semibold" id="index-crew-norm-hours-total">00:00</div>\r
          </div>\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Отклонение (Реални − Норма)</div>\r
            <div class="fw-semibold" id="index-crew-deviation-hours-total">+00:00</div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <h3 class="h6 mb-2" id="index-crew-selected-date-label">Избери ден</h3>\r
\r
      <div class="row g-3">\r
        <div class="col-12 col-xl-6">\r
          <h3 class="h6">Планирани</h3>\r
          <div class="d-flex flex-column gap-2" id="index-crew-planned-body">\r
            <p class="text-secondary mb-0">Няма планирани повески.</p>\r
          </div>\r
        </div>\r
        <div class="col-12 col-xl-6">\r
          <h3 class="h6">Реални</h3>\r
          <div class="d-flex flex-column gap-2" id="index-crew-actual-body">\r
            <p class="text-secondary mb-0">Няма реални повески.</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="mt-3">\r
        <h3 class="h6">Промени за деня</h3>\r
        <div class="d-flex flex-column gap-2" id="index-crew-change-body">\r
          <p class="text-secondary mb-0">Няма регистрирани промени за избрания ден.</p>\r
        </div>\r
      </div>\r
\r
      <div class="mt-3">\r
        <h3 class="h6">Отсъствия</h3>\r
        <div class="d-flex flex-column gap-2" id="index-crew-absence-body">\r
          <p class="text-secondary mb-0">Няма отсъствия за избрания ден.</p>\r
        </div>\r
      </div>\r
\r
      <p class="text-secondary small mt-3 mb-0" id="index-crew-last-updated">-</p>\r
    </div>\r
  </section>\r
</div>\r
\r
<div id="index-timetable-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="index-timetable-preview-title" class="h5 mb-0">Преглед на разписание</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="index-timetable-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="index-timetable-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="index-timetable-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <iframe\r
          id="index-timetable-preview-frame"\r
          title="Преглед на разписание"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="index-actual-duty-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 620px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Редакция на реална повеска</h2>\r
          <button id="index-actual-duty-edit-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="index-actual-duty-edit-form" class="row g-3">\r
          <input type="hidden" id="index-actual-duty-edit-id" />\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-start" class="form-label">Начало</label>\r
            <input id="index-actual-duty-start" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-end" class="form-label">Край</label>\r
            <input id="index-actual-duty-end" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-break-start" class="form-label">Начало на прекъсване</label>\r
            <input id="index-actual-duty-break-start" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-break-end" class="form-label">Край на прекъсване</label>\r
            <input id="index-actual-duty-break-end" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="index-actual-duty-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="index-actual-duty-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Vt(e){if(!e)return"00:00";const t=String(e).match(/(\d{1,2}):(\d{2})(?::\d{2})?/);if(!t)return"00:00";const[,n,r]=t;return`${n.padStart(2,"0")}:${r}`}function Ei(e){if(!e)return 0;const[t,n]=e.split(":"),r=Number(t),s=Number(n);return!Number.isFinite(r)||!Number.isFinite(s)?0:r*60+s}function je(e,t){const n=Ei(e),r=Ei(t);return r>=n?r-n:24*60-n+r}async function Mu(e,t){const{setText:n,formatDateTime:r,escapeHtml:s}=t,[a,i,o,d]=await Promise.all([S.from("user_profiles").select("id",{count:"exact",head:!0}),S.from("user_roles").select("user_id"),S.from("roles").select("name",{count:"exact",head:!0}),S.from("user_profiles").select("id",{count:"exact",head:!0}).not("employee_id","is",null)]);[a,i,o,d].some(u=>u.error)&&g("Част от админ данните на индекс страницата не могат да се заредят.","warning");const c=new Set((i.data||[]).map(u=>u.user_id).filter(Boolean));n(e,"#index-kpi-planned",String(a.count??0)),n(e,"#index-kpi-actual",String(c.size)),n(e,"#index-kpi-absences",String(d.count??0)),n(e,"#index-kpi-employees",String(o.count??0)),await Ou(e,{setText:n,formatDateTime:r,escapeHtml:s}),n(e,"#index-last-updated",`Последно обновяване: ${r(new Date)}`)}async function Ou(e,t){const{setText:n,formatDateTime:r,escapeHtml:s}=t,a=e.querySelector("#index-pending-users-panel"),i=e.querySelector("#index-pending-users-body");if(!a||!i)return;const[{data:o,error:d},{data:l,error:c}]=await Promise.all([S.from("user_profiles").select("id, username, created_at").order("created_at",{ascending:!0}),S.from("user_roles").select("user_id")]);if(d||c){g("Списъкът с чакащи потребители не може да се зареди.","warning"),n(e,"#index-pending-users-count","0"),i.innerHTML='<tr><td colspan="3" class="text-secondary">Грешка при зареждане.</td></tr>';return}const u=new Set((l||[]).map(m=>String((m==null?void 0:m.user_id)||"").trim()).filter(Boolean)),p=(o||[]).filter(m=>!u.has(String((m==null?void 0:m.id)||"").trim()));if(n(e,"#index-pending-users-count",String(p.length)),!p.length){i.innerHTML='<tr><td colspan="3" class="text-secondary">Няма чакащи потребители.</td></tr>';return}i.innerHTML=p.map(m=>{const h=String((m==null?void 0:m.username)||"").trim()||String((m==null?void 0:m.id)||"-"),y=(m==null?void 0:m.created_at)||"",f=y?new Date(y):null,b=f&&!Number.isNaN(f.getTime())?r(f):"-",w=ju(y);return`
        <tr>
          <td>${s(h)}</td>
          <td>${s(b)}</td>
          <td>${s(w)}</td>
        </tr>
      `}).join("")}function ju(e){if(!e)return"-";const t=new Date(e);if(Number.isNaN(t.getTime()))return"-";const n=Math.max(Date.now()-t.getTime(),0),r=Math.floor(n/6e4),s=Math.floor(r/(24*60)),a=Math.floor(r%(24*60)/60),i=r%60;return s>0?`${s} д ${a} ч`:a>0?`${a} ч ${i} мин`:i>0?`${i} мин`:"под 1 мин"}function Nu(e){const{loadKpiSnapshot:t,getTodayIsoDate:n,formatDate:r,escapeHtml:s,formatMinutesAsClock:a,formatSignedMinutesAsClock:i,getDeviationClassByThreshold:o,parseIsoDateSafe:d,toMonthKey:l,getMonthBounds:c,countBulgarianWorkdays:u,getDutyTimingSummary:p,getActualDutyTimingSummary:m,getDistinctBadgeClassByReason:h}=e,y={groups:[],selectedKey:""};function f(A,C,R,P){const K=A.querySelector(C);if(K){if(!R.length){K.innerHTML=`<tr><td colspan="3" class="text-secondary">${P}</td></tr>`;return}K.innerHTML=R.map(H=>`
        <tr>
          <td>${s(H.employeeName)}</td>
          <td>${s(H.certificateLabel)}</td>
          <td>${s(r(H.date))}</td>
        </tr>
      `).join("")}}function b(A){const C=new Date;C.setHours(0,0,0,0);const R=new Date(C);R.setDate(R.getDate()+30);const P=[{key:"psychological_assessment_expiry",label:"Психологическа годност"},{key:"medical_certificate_expiry",label:"Медицинско"},{key:"license_expiry",label:"Лиценз"}],K=[],H=[];(A||[]).forEach(N=>{const W=`${(N==null?void 0:N.first_name)||""} ${(N==null?void 0:N.last_name)||""}`.trim()||"-";P.forEach(ee=>{const de=N==null?void 0:N[ee.key];if(!de)return;const O=new Date(`${de}T00:00:00`);if(Number.isNaN(O.getTime()))return;const D={employeeName:W,certificateLabel:ee.label,date:de};if(O<C){H.push(D);return}O<=R&&K.push(D)})});const G=(N,W)=>{const ee=String(N.date).localeCompare(String(W.date));return ee!==0?ee:String(N.employeeName).localeCompare(String(W.employeeName),"bg")};return{soon:K.sort(G),expired:H.sort(G)}}function w(A,C){return C?A==="expired"?"text-bg-danger":"text-bg-warning":"text-bg-secondary"}function v(A,C){const R=A.querySelector("#index-certificates-soon-details"),P=A.querySelector("#index-certificates-expired-details");if(!(!R||!P)){if(C==="soon"){R.classList.toggle("d-none"),P.classList.add("d-none");return}C==="expired"&&(P.classList.toggle("d-none"),R.classList.add("d-none"))}}async function _(A){const C=A.querySelector("#index-certificates-panel"),R=A.querySelector("#index-certificates-soon-toggle"),P=A.querySelector("#index-certificates-expired-toggle");if(!C||!R||!P)return;const{data:K,error:H}=await S.from("employees").select("first_name, last_name, psychological_assessment_expiry, medical_certificate_expiry, license_expiry").eq("is_active",!0).order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(H){g("Сертификатите не могат да се заредят.","warning"),R.textContent="0",P.textContent="0",R.className="badge text-bg-secondary border-0",P.className="badge text-bg-secondary border-0",f(A,"#index-certificates-soon-body",[],"Няма служители."),f(A,"#index-certificates-expired-body",[],"Няма служители.");return}const G=b(K||[]);R.textContent=String(G.soon.length),P.textContent=String(G.expired.length),R.className=`badge ${w("soon",G.soon.length)} border-0`,P.className=`badge ${w("expired",G.expired.length)} border-0`,f(A,"#index-certificates-soon-body",G.soon,"Няма служители с изтичащи сертификати."),f(A,"#index-certificates-expired-body",G.expired,"Няма служители с изтекли сертификати.")}function k(A){const C=new Map;(A||[]).forEach(P=>{var ee,de,O;const K=String(((ee=P==null?void 0:P.absence_reasons)==null?void 0:ee.name)||"").trim()||"Без посочена причина",H=`${((de=P==null?void 0:P.employees)==null?void 0:de.first_name)||""} ${((O=P==null?void 0:P.employees)==null?void 0:O.last_name)||""}`.trim()||"-",G=(P==null?void 0:P.start_date)||"",N=(P==null?void 0:P.end_date)||"",W=C.get(K)||{reason:K,details:[]};W.details.push({employeeName:H,startDate:G,endDate:N}),C.set(K,W)});const R=Array.from(C.values()).map(P=>({...P,details:P.details.sort((K,H)=>String(K.employeeName).localeCompare(String(H.employeeName),"bg")),count:P.details.length}));return R.sort((P,K)=>K.count!==P.count?K.count-P.count:String(P.reason).localeCompare(String(K.reason),"bg")),R}function x(A,C){const R=A.querySelector("#index-absence-reasons-body");if(R){if(!C.length){R.innerHTML='<p class="text-secondary mb-0">Няма активни отсъствия.</p>';return}R.innerHTML=C.map((P,K)=>{const H=h(P.reason),G=String(K),N=G===y.selectedKey,W=P.details.map(ee=>{const de=`${r(ee.startDate)} - ${r(ee.endDate)}`;return`
              <tr>
                <td>${s(ee.employeeName)}</td>
                <td>${s(de)}</td>
              </tr>
            `}).join("");return`
          <div class="d-flex justify-content-between align-items-center border rounded p-2">
            <span>${s(P.reason)}</span>
            <button
              type="button"
              class="badge ${H} border-0"
              data-index-absence-action="toggle-reason"
              data-index-absence-key="${G}"
              aria-expanded="${N?"true":"false"}"
            >
              ${s(String(P.count))}
            </button>
          </div>
          ${N?`
            <div class="table-responsive">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Служител</th>
                    <th>Период</th>
                  </tr>
                </thead>
                <tbody>
                  ${W}
                </tbody>
              </table>
            </div>
          `:""}
        `}).join("")}}function L(A,C){if(C===""||C===y.selectedKey){y.selectedKey="",x(A,y.groups);return}if(!(y.groups[Number(C)]||null)){y.selectedKey="",x(A,y.groups);return}y.selectedKey=String(C),x(A,y.groups)}async function T(A){const C=n(),{data:R,error:P}=await S.from("employee_absences").select("start_date, end_date, employees(first_name, last_name), absence_reasons(name)").lte("start_date",C).gte("end_date",C).order("start_date",{ascending:!0});if(P){g("Отсъствията не могат да се заредят.","warning"),y.groups=[],y.selectedKey="",x(A,[]);return}y.groups=k(R||[]),y.selectedKey="",x(A,y.groups)}function q(A,C){const R=A.querySelector("#index-workload-body");if(R){if(!C.length){R.innerHTML='<tr><td colspan="5" class="text-secondary">Няма данни.</td></tr>';return}R.innerHTML=C.map(P=>`
        <tr>
          <td>${s(P.employeeName)}</td>
          <td>${s(P.planned)}</td>
          <td>${s(P.actual)}</td>
          <td>${s(P.norm)}</td>
          <td><span class="badge ${s(P.deviationClass)}">${s(P.deviation)}</span></td>
        </tr>
      `).join("")}}async function E(A){const C=A.querySelector("#index-workload-date"),R=String((C==null?void 0:C.value)||n()),P=d(R);if(!P){q(A,[]);return}const K=l(P),{startDate:H}=c(K),G=u(H,R)*8*60,[N,W,ee]=await Promise.all([S.from("employees").select("id, first_name, last_name").eq("is_active",!0).order("last_name",{ascending:!0}).order("first_name",{ascending:!0}),S.from("planned_duties").select("employee_id, date, duties(start_time, end_time, break_start_time, break_end_time)").gte("date",H).lte("date",R),S.from("actual_duties").select("employee_id, date, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(start_time, end_time, break_start_time, break_end_time)").gte("date",H).lte("date",R)]);if(N.error||W.error||ee.error){g("Натовареността не може да се зареди.","warning"),q(A,[]);return}const de=N.data||[],O=W.data||[],D=ee.data||[],U=new Map;O.forEach(F=>{const Q=String((F==null?void 0:F.employee_id)||"");if(!Q)return;const ne=Number(p(F==null?void 0:F.duties).durationMinutes);Number.isFinite(ne)&&U.set(Q,Number(U.get(Q)||0)+ne)});const z=new Map;D.forEach(F=>{const Q=String((F==null?void 0:F.employee_id)||"");if(!Q)return;const ne=Number(m(F).durationMinutes);Number.isFinite(ne)&&z.set(Q,Number(z.get(Q)||0)+ne)});const Y=de.map(F=>{const Q=String((F==null?void 0:F.id)||""),ne=`${(F==null?void 0:F.first_name)||""} ${(F==null?void 0:F.last_name)||""}`.trim()||"-",he=Number(U.get(Q)||0),ie=Number(z.get(Q)||0),re=ie-G;return{employeeName:ne,planned:a(he),actual:a(ie),norm:a(G),deviation:i(re),deviationClass:o(re),deviationMinutes:re}});Y.sort((F,Q)=>{const ne=Math.abs(Number(Q.deviationMinutes||0))-Math.abs(Number(F.deviationMinutes||0));return ne!==0?ne:String(F.employeeName).localeCompare(String(Q.employeeName),"bg")}),q(A,Y)}async function $(A){await Promise.all([t(A),_(A),T(A),E(A)])}return{toggleCertificateDetails:v,toggleAbsenceReasonDetails:L,loadHeadOfTransportWorkload:E,loadHeadOfTransportSnapshot:$}}function Hu(e){return String(e||"").trim().toLowerCase()}function Kn(e,t){const n=(e||[]).map(r=>Hu(r));return t.some(r=>n.includes(r))}function Ea(e){return Kn(e,["crew","crew_member","user"])}function Uu(e){return Kn(e,["admin"])?"admin":Kn(e,["head_of_transport"])?"head_of_transport":Kn(e,["crew_instructor","instructor"])?"instructor":Kn(e,["crew_manager"])?"manager":Ea(e)?"crew":"default"}function Ht(e){return e==="head_of_transport"||e==="instructor"}function Fu(e,t){const{loadCrewMonthlySnapshot:n,crewCalendarState:r,toMonthKey:s,shiftMonthKey:a,getTodayIsoDate:i,renderCrewCalendarAndDetails:o,openCrewActualDutyEditModal:d,openCrewTimetablePreview:l,closeCrewTimetablePreview:c,closeCrewActualDutyEditModal:u,saveCrewActualDutyEdits:p}=t,m=e.querySelector("#index-refresh-crew"),h=e.querySelector("#index-crew-prev-month"),y=e.querySelector("#index-crew-next-month"),f=e.querySelector("#index-crew-today-month"),b=e.querySelector("#index-crew-calendar-days"),w=e.querySelector("#index-crew-actual-body"),v=e.querySelector("#index-timetable-preview-modal"),_=e.querySelector("#index-timetable-preview-close"),k=e.querySelector("#index-actual-duty-edit-modal"),x=e.querySelector("#index-actual-duty-edit-close"),L=e.querySelector("#index-actual-duty-edit-cancel"),T=e.querySelector("#index-actual-duty-edit-form");m==null||m.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";q==="crew"&&(m.disabled=!0,await n(e,E,r.visibleMonth),m.disabled=!1)}),h==null||h.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";if(q!=="crew")return;const $=r.visibleMonth||s(new Date),A=a($,-1);await n(e,E,A)}),y==null||y.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";if(q!=="crew")return;const $=r.visibleMonth||s(new Date),A=a($,1);await n(e,E,A)}),f==null||f.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";if(q!=="crew")return;const $=new Date;r.visibleMonth=s($),r.selectedDate=i(),await n(e,E,r.visibleMonth)}),b==null||b.addEventListener("click",q=>{const E=q.target.closest('button[data-index-crew-action="select-day"]');if(!E||(e.dataset.indexMode||"default")!=="crew")return;const A=E.getAttribute("data-date")||"";A&&(r.selectedDate=A,o(e))}),w==null||w.addEventListener("click",q=>{const E=q.target.closest('button[data-index-crew-action="edit-actual-duty"]');if(E){if((e.dataset.indexMode||"default")!=="crew")return;const K=E.getAttribute("data-actual-duty-id")||"";if(!K)return;d(e,K);return}const $=q.target.closest('button[data-index-crew-action="preview-timetable"]');if(!$||(e.dataset.indexMode||"default")!=="crew")return;const C=decodeURIComponent($.getAttribute("data-preview-url")||""),R=decodeURIComponent($.getAttribute("data-preview-label")||"");l(e,C,R)}),_==null||_.addEventListener("click",()=>{c(e)}),v==null||v.addEventListener("click",q=>{q.target===v&&c(e)}),x==null||x.addEventListener("click",()=>{u(e)}),L==null||L.addEventListener("click",()=>{u(e)}),k==null||k.addEventListener("click",q=>{q.target===k&&u(e)}),T==null||T.addEventListener("submit",async q=>{q.preventDefault(),await p(e)})}function Bu(e){const{crewCalendarState:t,ensureCrewSelectedDate:n,renderCrewCalendar:r,renderCrewHoursSummary:s,renderCrewSelectedDayDetails:a,toMonthKey:i,getMonthBounds:o,loadSchedulePublicationDates:d,loadScheduleChangesSummary:l,formatDateTime:c,setText:u}=e;function p(f){n(t.visibleMonth),r(f),s(f),a(f)}const m=f=>{if(!f)return"";if(f instanceof Date&&!Number.isNaN(f.getTime()))return f.toISOString().slice(0,10);const b=String(f).trim(),w=b.match(/\d{4}-\d{2}-\d{2}/);return w?w[0]:b},h=f=>{if(!f||typeof f!="object")return f;const b=m(f.date);return!b||f.date===b?f:{...f,date:b}};async function y(f,b,w){const v=w||t.visibleMonth||i(new Date);if(t.visibleMonth=v,!b){t.plannedRows=[],t.actualRows=[],t.actualRowsById=new Map,t.absenceRows=[],t.confirmedDates=new Set,t.pendingConfirmationDates=new Set,t.changeCountByDate=new Map,t.changeEventsByDate=new Map,t.selectedDate="",p(f),u(f,"#index-crew-last-updated","Липсва прикачен служител към профила.");return}const{startDate:_,endDate:k}=o(v),[x,L,T,q,E]=await Promise.all([S.from("planned_duties").select("date, assignment_role, duties(name, start_time, end_time, second_day, break_start_time, break_end_time)").eq("employee_id",b).gte("date",_).lte("date",k).order("date",{ascending:!0}).order("duty_id",{ascending:!0}),S.from("actual_duties").select("id, date, assignment_role, reported_at, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(name, start_time, end_time, second_day, break_start_time, break_end_time, duty_files, duty_trains(sequence_order, trains(number, timetable_url)))").eq("employee_id",b).gte("date",_).lte("date",k).order("date",{ascending:!0}).order("reported_at",{ascending:!1}),S.from("employee_absences").select("start_date, end_date, absence_reasons(name)").eq("employee_id",b).lte("start_date",k).gte("end_date",_).order("start_date",{ascending:!0}),d(_,k),l(_,k)]);(x.error||L.error||T.error||q.error||E.error)&&g("Част от данните за моите повески не могат да се заредят.","warning");const $=q.confirmedDateSet||new Set,A=q.pendingConfirmationDateSet||new Set,C=E.changeCountByDate||new Map,R=E.changeEventsByDate||new Map,P=x.data||[],K=L.data||[],H=P.map(h),G=K.map(h).filter(N=>$.has(m(N==null?void 0:N.date)));t.plannedRows=H,t.actualRows=G,t.actualRowsById=new Map(t.actualRows.map(N=>[String((N==null?void 0:N.id)||""),N])),t.absenceRows=T.data||[],t.confirmedDates=$,t.pendingConfirmationDates=A,t.changeCountByDate=C,t.changeEventsByDate=R,p(f),u(f,"#index-crew-last-updated",`Последно обновяване: ${c(new Date)}`)}return{loadCrewMonthlySnapshot:y,renderCrewCalendarAndDetails:p}}const Ku={БО:"text-bg-warning",ДО:"text-bg-danger",ПО:"text-bg-primary",НП:"text-bg-dark",К:"text-bg-info",ОТС:"text-bg-secondary"};function zu(e){const{crewCalendarState:t,setText:n,getTodayIsoDate:r,toMonthKey:s,toIsoDateFromDate:a,parseMonthKey:i,formatMonthLabel:o,getMonthBounds:d,formatDate:l,formatDateTime:c,escapeHtml:u,countBulgarianWorkdays:p,getDutyTimingSummary:m,getActualDutyTimingSummary:h,formatMinutesAsClock:y,formatSignedMinutesAsClock:f,getDeviationClassByThreshold:b,formatRoleLabel:w,getDistinctBadgeClassByReason:v}=e;function _(O){if(!O)return"";if(O instanceof Date&&!Number.isNaN(O.getTime()))return O.toISOString().slice(0,10);const D=String(O).trim(),U=D.match(/\d{4}-\d{2}-\d{2}/);return U?U[0]:D}function k(O){return O&&t.actualRowsById.get(O)||null}function x(O,D){const U=O.querySelector("#index-actual-duty-edit-modal"),z=O.querySelector("#index-actual-duty-edit-id"),Y=O.querySelector("#index-actual-duty-start"),F=O.querySelector("#index-actual-duty-end"),Q=O.querySelector("#index-actual-duty-break-start"),ne=O.querySelector("#index-actual-duty-break-end"),he=k(D);if(!U||!z||!Y||!F||!Q||!ne||!he){g("Не е намерена реална повеска за редакция.","warning");return}z.value=D;const ie=h(he);Y.value=ie.startTime==="-"?"":ie.startTime,F.value=ie.endTime==="-"?"":ie.endTime,Q.value=ie.breakStartTime==="-"?"00:00":ie.breakStartTime,ne.value=ie.breakEndTime==="-"?"00:00":ie.breakEndTime,t.editingActualDutyId=D,U.classList.remove("d-none")}function L(O){const D=O.querySelector("#index-actual-duty-edit-modal"),U=O.querySelector("#index-actual-duty-edit-form"),z=O.querySelector("#index-actual-duty-edit-id");U&&U.reset(),z&&(z.value=""),t.editingActualDutyId="",D==null||D.classList.add("d-none")}function T(O){if(Array.isArray(O))return O.map((U,z)=>q(U,z)).filter(U=>U.url);const D=String(O||"").trim();if(!D)return[];if(D.startsWith("["))try{const U=JSON.parse(D);if(Array.isArray(U))return U.map((z,Y)=>q(z,Y)).filter(z=>z.url)}catch{return[{url:D,label:"Разписание 1"}]}return D.split(`
`).map((U,z)=>q(U,z)).filter(U=>U.url)}function q(O,D){if(O&&typeof O=="object"&&!Array.isArray(O)){const z=String(O.url||"").trim(),Y=String(O.label||"").trim()||`Разписание ${D+1}`;return{url:z,label:Y}}return{url:String(O||"").trim(),label:`Разписание ${D+1}`}}function E(O){const D=String(O||"").trim();if(!D)return"ОТС";const U=D.toLowerCase(),z={бо:"БО",болничен:"БО","болничен отпуск":"БО",до:"ДО","допълнителен отпуск":"ДО",по:"ПО","платен отпуск":"ПО",нп:"НП","неплатен отпуск":"НП",командировка:"К"};if(z[U])return z[U];if(D.length<=4&&/^[\p{L}\p{N}]+$/u.test(D))return D.toUpperCase();const Y=D.split(/\s+/).map(F=>F.trim()).filter(Boolean);return Y.length>=2?Y.slice(0,3).map(F=>F.charAt(0).toUpperCase()).join(""):D.slice(0,2).toUpperCase()}function $(O){const D=E(O);return Ku[D]||v(O)}function A(O,D){const U=new Date(`${O}T00:00:00`),z=new Date(`${D}T00:00:00`);if(Number.isNaN(U.getTime())||Number.isNaN(z.getTime())||U>z)return[];const Y=[],F=new Date(U);for(;F<=z;)Y.push(a(F)),F.setDate(F.getDate()+1);return Y}function C(O){var D;return String(((D=O==null?void 0:O.absence_reasons)==null?void 0:D.name)||"").trim()||"Отсъствие"}function R(O){const D=String(O||"").trim();if(!D)return"";try{const z=new URL(D).pathname.split("/").pop()||"",Y=z.includes(".")?z.split(".").pop():"";return String(Y||"").toLowerCase()}catch{return""}}function P(O){const D=R(O);return["doc","docx","xls","xlsx","ppt","pptx"].includes(D)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(O)}`:O}function K(O,D,U){const z=O.querySelector("#index-timetable-preview-modal"),Y=O.querySelector("#index-timetable-preview-frame"),F=O.querySelector("#index-timetable-preview-title"),Q=O.querySelector("#index-timetable-preview-fallback"),ne=O.querySelector("#index-timetable-preview-open");if(!z||!Y||!F||!Q||!ne)return;const he=String(D||"").trim();if(!he){g("Липсва линк за преглед.","warning");return}const ie=P(he);F.textContent=U?`Преглед: ${U}`:"Преглед на разписание",ne.setAttribute("href",he),Q.classList.add("d-none"),Y.src="about:blank",Y.src=ie,Y.onload=()=>{if(ie!==he){Q.classList.add("d-none");return}const re=R(he),$e=["doc","docx","xls","xlsx","ppt","pptx"].includes(re);Q.classList.toggle("d-none",!$e)},Y.onerror=()=>{Q.classList.remove("d-none")},z.classList.remove("d-none")}function H(O){const D=O.querySelector("#index-timetable-preview-modal"),U=O.querySelector("#index-timetable-preview-frame"),z=O.querySelector("#index-timetable-preview-fallback"),Y=O.querySelector("#index-timetable-preview-open");!D||!U||!z||!Y||(U.src="about:blank",Y.setAttribute("href","#"),z.classList.add("d-none"),D.classList.add("d-none"))}function G(O){const D=i(O),U=s(D),z=r(),Y=z.startsWith(U),F=new Set([...t.plannedRows.map(re=>_(re==null?void 0:re.date)).filter(Boolean),...t.actualRows.map(re=>_(re==null?void 0:re.date)).filter(Boolean),...t.absenceRows.flatMap(re=>A(re==null?void 0:re.start_date,re==null?void 0:re.end_date)),...Array.from(t.pendingConfirmationDates||[]).map(re=>_(re)).filter(Boolean),...Array.from((t.changeCountByDate||new Map).keys()).map(re=>_(re)).filter(Boolean)]),Q=_(t.selectedDate),ne=Q?F.has(Q):!1,he=F.size>0;if(Q&&Q.startsWith(U)&&(!he||ne))return;const ie=[...F].sort((re,$e)=>String(re).localeCompare(String($e),"bg"));if(Y&&F.has(z)){t.selectedDate=z;return}if(ie.length){t.selectedDate=String(ie[0]);return}t.selectedDate=`${U}-01`}function N(){const O=new Map;return t.plannedRows.forEach(D=>{const U=_(D==null?void 0:D.date);if(!U)return;const z=O.get(U)||{planned:0,actual:0};z.planned+=1,O.set(U,z)}),t.actualRows.forEach(D=>{const U=_(D==null?void 0:D.date);if(!U)return;const z=O.get(U)||{planned:0,actual:0};z.actual+=1,O.set(U,z)}),t.pendingConfirmationDates.forEach(D=>{const U=_(D);if(!U)return;const z=O.get(U)||{planned:0,actual:0,absences:[]};z.pendingConfirmation=!0,O.set(U,z)}),t.changeCountByDate.forEach((D,U)=>{const z=_(U);if(!z)return;const Y=O.get(z)||{planned:0,actual:0,absences:[]};Y.changeCount=Number(D||0),O.set(z,Y)}),t.absenceRows.forEach(D=>{const U=C(D),z=$(U);A(D==null?void 0:D.start_date,D==null?void 0:D.end_date).forEach(Y=>{const F=O.get(Y)||{planned:0,actual:0,absences:[]};Array.isArray(F.absences)||(F.absences=[]),F.absences.some(ne=>(ne==null?void 0:ne.reason)===U)||F.absences.push({reason:U,className:z}),O.set(Y,F)})}),O}function W(O){const D=O.querySelector("#index-crew-calendar-days");if(!D)return;const U=t.visibleMonth||s(new Date),z=i(U),Y=new Date(z.getFullYear(),z.getMonth(),1),F=Y.getDay(),Q=F===0?6:F-1,ne=new Date(Y);ne.setDate(Y.getDate()-Q);const he=N(),ie=r();n(O,"#index-crew-month-label",o(U));const re=[];for(let $e=0;$e<42;$e+=1){const M=new Date(ne);M.setDate(ne.getDate()+$e);const fe=`${s(M)}-${String(M.getDate()).padStart(2,"0")}`,Xe=M.getMonth()!==z.getMonth(),Ae=fe===t.selectedDate,Qt=fe===ie,De=he.get(fe)||{planned:0,actual:0,absences:[]},$t=Array.isArray(De.absences)?De.absences.map(st=>`<span class="badge ${u(st.className||"text-bg-danger")}" title="${u(st.reason||"Отсъствие")}">${u(st.reason||"Отсъствие")}</span>`).join(""):"";re.push(`
        <button
          type="button"
          class="index-crew-calendar-day ${Xe?"is-other-month":""} ${Ae?"is-selected":""} ${Qt?"is-today":""}"
          data-index-crew-action="select-day"
          data-date="${fe}"
        >
          <span class="index-crew-calendar-day-number">${M.getDate()}</span>
          <span class="index-crew-calendar-day-flags">
            ${De.planned?`<span class="badge text-bg-primary">П${De.planned}</span>`:""}
            ${De.actual?`<span class="badge text-bg-success">Р${De.actual}</span>`:""}
            ${De.pendingConfirmation?'<span class="badge text-bg-warning">Промяна</span>':""}
            ${De.changeCount?`<span class="badge text-bg-info" title="Извършени промени за деня">Δ${u(String(De.changeCount))}</span>`:""}
            ${$t}
          </span>
        </button>
      `)}D.innerHTML=re.join("")}function ee(O){const D=_(t.selectedDate),U=O.querySelector("#index-crew-planned-body"),z=O.querySelector("#index-crew-actual-body"),Y=O.querySelector("#index-crew-change-body"),F=O.querySelector("#index-crew-absence-body");if(!U||!z||!Y||!F)return;n(O,"#index-crew-selected-date-label",`Детайли за ${l(D)}`);const Q=t.plannedRows.filter(M=>_(M==null?void 0:M.date)===D).sort((M,se)=>{var fe,Xe;return String(((fe=M==null?void 0:M.duties)==null?void 0:fe.start_time)||"").localeCompare(String(((Xe=se==null?void 0:se.duties)==null?void 0:Xe.start_time)||""),"bg")});Q.length?U.innerHTML=Q.map(M=>{var Qt,De,$t,st;const se=((Qt=M==null?void 0:M.duties)==null?void 0:Qt.name)||"-",fe=w(M==null?void 0:M.assignment_role),Xe=`${((De=M==null?void 0:M.duties)==null?void 0:De.start_time)||"-"} - ${(($t=M==null?void 0:M.duties)==null?void 0:$t.end_time)||"-"}${(st=M==null?void 0:M.duties)!=null&&st.second_day?" (+1)":""}`,Ae=m(M==null?void 0:M.duties);return`
            <article class="border rounded p-2">
              <div class="fw-semibold">${u(se)}</div>
              <div class="small text-secondary">${u(fe)} · ${u(Xe)}</div>
              <div class="small mt-1">
                <div><span class="text-secondary">Начало:</span> ${u(Ae.startTime)}</div>
                <div><span class="text-secondary">Край:</span> ${u(Ae.endTime)}</div>
                <div><span class="text-secondary">Начало на прекъсване:</span> ${u(Ae.breakStartTime)}</div>
                <div><span class="text-secondary">Край на прекъсване:</span> ${u(Ae.breakEndTime)}</div>
                <div><span class="text-secondary">Прекъсване:</span> ${u(Ae.breakDuration)}</div>
                <div><span class="text-secondary">Времетраене:</span> ${u(Ae.duration)}</div>
              </div>
            </article>
          `}).join(""):U.innerHTML='<p class="text-secondary mb-0">Няма планирани повески.</p>';const ne=t.actualRows.filter(M=>_(M==null?void 0:M.date)===D).sort((M,se)=>String((se==null?void 0:se.reported_at)||"").localeCompare(String((M==null?void 0:M.reported_at)||""),"bg")),he=t.confirmedDates.has(D),ie=t.pendingConfirmationDates.has(D);he?ne.length?z.innerHTML=ne.map(M=>{var Qa,Ya,Xa,Za;const se=((Qa=M==null?void 0:M.duties)==null?void 0:Qa.name)||"-",fe=w(M==null?void 0:M.assignment_role),Xe=M!=null&&M.reported_at?c(new Date(M.reported_at)):"-",Ae=h(M),Qt=Array.isArray((Ya=M==null?void 0:M.duties)==null?void 0:Ya.duty_trains)?[...M.duties.duty_trains].sort((Ce,ct)=>Number((Ce==null?void 0:Ce.sequence_order)||0)-Number((ct==null?void 0:ct.sequence_order)||0)):(Xa=M==null?void 0:M.duties)!=null&&Xa.duty_trains?[M.duties.duty_trains]:[],De=T((Za=M==null?void 0:M.duties)==null?void 0:Za.duty_files),$t=Qt.map(Ce=>{var ei,ti;const ct=(ei=Ce==null?void 0:Ce.trains)!=null&&ei.number?`Влак ${Ce.trains.number}`:"Влак",Er=T((ti=Ce==null?void 0:Ce.trains)==null?void 0:ti.timetable_url);if(!Er.length)return`<div class="small">${u(ct)}: <span class="text-secondary">без разписание</span></div>`;const An=Er.map(_s=>{const Ul=encodeURIComponent(_s.url),Fl=encodeURIComponent(_s.label||"Разписание"),Ss=_s.label||"Разписание";return`
                    <span class="d-inline-flex align-items-center gap-1 me-2">
                      <span>${u(Ss)}</span>
                      <button
                        type="button"
                        class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                        data-index-crew-action="preview-timetable"
                        data-preview-url="${u(Ul)}"
                        data-preview-label="${u(Fl)}"
                        title="Преглед: ${u(Ss)}"
                        aria-label="Преглед: ${u(Ss)}"
                      >
                        👁
                      </button>
                    </span>
                  `}).join(" ");return`<div class="small">${u(ct)}: ${An}</div>`}).join(""),st=De.map(Ce=>{const ct=encodeURIComponent(Ce.url),Er=encodeURIComponent(Ce.label||"Файл"),An=Ce.label||"Файл";return`
                <span class="d-inline-flex align-items-center gap-1 me-2 small">
                  <span>${u(An)}</span>
                  <button
                    type="button"
                    class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                    data-index-crew-action="preview-timetable"
                    data-preview-url="${u(ct)}"
                    data-preview-label="${u(Er)}"
                    title="Преглед: ${u(An)}"
                    aria-label="Преглед: ${u(An)}"
                  >
                    👁
                  </button>
                </span>
              `}).join("");return`
            <article class="border rounded p-2">
              <div class="d-flex align-items-start justify-content-between gap-2">
                <div class="fw-semibold">${u(se)}</div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary py-0 px-2"
                  title="Редакция на часове"
                  aria-label="Редакция на часове"
                  data-index-crew-action="edit-actual-duty"
                  data-actual-duty-id="${u(String((M==null?void 0:M.id)||""))}"
                >
                  ✎
                </button>
              </div>
              <div class="small text-secondary mb-1">${u(fe)} · Отчетена: ${u(Xe)}</div>
              <div class="small mb-1">
                <div><span class="text-secondary">Начало:</span> ${u(Ae.startTime)}</div>
                <div><span class="text-secondary">Край:</span> ${u(Ae.endTime)}</div>
                <div><span class="text-secondary">Начало на прекъсване:</span> ${u(Ae.breakStartTime)}</div>
                <div><span class="text-secondary">Край на прекъсване:</span> ${u(Ae.breakEndTime)}</div>
                <div><span class="text-secondary">Прекъсване:</span> ${u(Ae.breakDuration)}</div>
                <div><span class="text-secondary">Времетраене:</span> ${u(Ae.duration)}</div>
              </div>
              ${$t?`<div class="small"><span class="fw-semibold">Разписания:</span> ${$t}</div>`:""}
              ${st?`<div class="small"><span class="fw-semibold">Файлове:</span> ${st}</div>`:""}
            </article>
          `}).join(""):z.innerHTML='<p class="text-secondary mb-0">Няма реални повески.</p>':z.innerHTML=ie?'<p class="text-warning mb-0">Има смяна на служител по реална повеска. Нужна е повторна валидация от разписание.</p>':'<p class="text-secondary mb-0">Графикът за деня не е потвърден от разписание.</p>';const re=t.changeEventsByDate.get(D)||[];re.length?Y.innerHTML=re.map(M=>`
          <article class="border rounded p-2">
            <div class="small">${u(M.summary||"-")}</div>
            <div class="small text-secondary">${u(M.changedAt||"-")}</div>
          </article>
        `).join(""):Y.innerHTML='<p class="text-secondary mb-0">Няма регистрирани промени за избрания ден.</p>';const $e=t.absenceRows.filter(M=>{const se=String((M==null?void 0:M.start_date)||""),fe=String((M==null?void 0:M.end_date)||"");return!!(se&&fe&&D>=se&&D<=fe)}).sort((M,se)=>{const fe=String((M==null?void 0:M.start_date)||"").localeCompare(String((se==null?void 0:se.start_date)||""),"bg");return fe!==0?fe:C(M).localeCompare(C(se),"bg")});if(!$e.length){F.innerHTML='<p class="text-secondary mb-0">Няма отсъствия за избрания ден.</p>';return}F.innerHTML=$e.map(M=>{const se=C(M),fe=$(se),Xe=`${l(M==null?void 0:M.start_date)} - ${l(M==null?void 0:M.end_date)}`;return`
          <article class="border rounded p-2">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <span class="badge ${u(fe)}">${u(se)}</span>
            </div>
            <div class="small text-secondary">Период: ${u(Xe)}</div>
          </article>
        `}).join("")}function de(O){const D=O.querySelector("#index-crew-planned-hours-total"),U=O.querySelector("#index-crew-actual-hours-total"),z=O.querySelector("#index-crew-norm-hours-total"),Y=O.querySelector("#index-crew-deviation-hours-total");if(!D||!U||!z||!Y)return;const F=String(t.selectedDate||"").trim();if(!F){D.textContent="00:00",U.textContent="00:00",z.textContent="00:00",Y.textContent="+00:00",Y.className="fw-semibold badge text-bg-success";return}const{startDate:Q}=d(t.visibleMonth||s(new Date)),ne=F>=Q?F:Q,he=t.plannedRows.filter(M=>{const se=String((M==null?void 0:M.date)||"");return!!(se&&se>=Q&&se<=ne)}).reduce((M,se)=>{const fe=Number(m(se==null?void 0:se.duties).durationMinutes);return Number.isFinite(fe)?M+fe:M},0),ie=t.actualRows.filter(M=>{const se=String((M==null?void 0:M.date)||"");return!!(se&&se>=Q&&se<=ne)}).reduce((M,se)=>{const fe=Number(h(se).durationMinutes);return Number.isFinite(fe)?M+fe:M},0),re=p(Q,ne)*8*60,$e=ie-re;D.textContent=y(he),U.textContent=y(ie),z.textContent=y(re),Y.textContent=f($e),Y.className=`fw-semibold badge ${b($e)}`}return{openCrewActualDutyEditModal:x,closeCrewActualDutyEditModal:L,openCrewTimetablePreview:K,closeCrewTimetablePreview:H,ensureCrewSelectedDate:G,renderCrewCalendar:W,renderCrewSelectedDayDetails:ee,renderCrewHoursSummary:de}}function hn(e){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0");return`${t}-${n}`}function Et(e){const t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${n}-${r}`}function fs(e){const[t,n]=String(e||"").split("-"),r=Number(t),s=Number(n);if(!Number.isInteger(r)||!Number.isInteger(s)||s<1||s>12){const a=new Date;return new Date(a.getFullYear(),a.getMonth(),1)}return new Date(r,s-1,1)}function Wu(e,t){const n=fs(e);return n.setMonth(n.getMonth()+t),hn(n)}function Vu(e){const t=fs(e);return new Intl.DateTimeFormat("bg-BG",{month:"long",year:"numeric"}).format(t)}function Cs(e){const t=fs(e),n=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Et(t),endDate:Et(n)}}function ir(e){const t=String(e||"").trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;const[n,r,s]=t.split("-"),a=Number(n),i=Number(r),o=Number(s);return!Number.isInteger(a)||!Number.isInteger(i)||!Number.isInteger(o)?null:new Date(a,i-1,o)}function Gu(e,t,n){return new Date(Date.UTC(e,t-1,n))}function Ju(e){const t=e%4,n=e%7,s=(19*(e%19)+15)%30,a=(2*t+4*n-s+34)%7,i=Math.floor((s+a+114)/31),o=(s+a+114)%31+1,d=Gu(e,i,o);return d.setUTCDate(d.getUTCDate()+13),new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())}function Qu(e,t){const n=Et(t);e.add(n);const r=t.getDay();if(r!==0&&r!==6)return;const s=new Date(t);for(s.setDate(s.getDate()+1);s.getDay()===0||s.getDay()===6||e.has(Et(s));)s.setDate(s.getDate()+1);e.add(Et(s))}function Yu(e){const t=new Set;[[1,1],[3,3],[5,1],[5,6],[5,24],[9,6],[9,22],[12,24],[12,25],[12,26]].forEach(([a,i])=>{Qu(t,new Date(e,a-1,i))});const r=Ju(e);return[-2,-1,0,1].forEach(a=>{const i=new Date(r);i.setDate(i.getDate()+a),t.add(Et(i))}),t}function Xu(e,t){const n=ir(e),r=ir(t);if(!n||!r||n>r)return new Set;const s=new Set;for(let a=n.getFullYear();a<=r.getFullYear();a+=1)Yu(a).forEach(o=>s.add(o));return s}function $i(e,t){const n=ir(e),r=ir(t);if(!n||!r||n>r)return 0;const s=Xu(e,t);let a=0;const i=new Date(n);for(;i<=r;){const o=i.getDay(),d=Et(i),l=o===0||o===6,c=s.has(d);!l&&!c&&(a+=1),i.setDate(i.getDate()+1)}return a}function Ai(e){const t=String(e||"").trim().toLowerCase();return t==="chief"?"Началник влак":t==="conductor"?"Кондуктор":t||"-"}function Zu(e){const t=String((e==null?void 0:e.first_name)||"").trim(),n=String((e==null?void 0:e.last_name)||"").trim();return`${t} ${n}`.trim()||"-"}async function ep(e,t,n){const{data:r,error:s}=await e.from("schedule_publications").select("schedule_date, is_confirmed").gte("schedule_date",t).lte("schedule_date",n);if(s)return{confirmedDateSet:new Set,pendingConfirmationDateSet:new Set,error:s};const a=new Set,i=new Set,o=d=>{const l=String(d||"").trim(),c=l.match(/\d{4}-\d{2}-\d{2}/);return c?c[0]:l};return(r||[]).forEach(d=>{const l=o(d==null?void 0:d.schedule_date);if(l){if(d!=null&&d.is_confirmed){a.add(l);return}i.add(l)}}),{confirmedDateSet:a,pendingConfirmationDateSet:i,error:null}}async function tp(e,t,n,r){const{data:s,error:a}=await e.from("schedule_change_events").select("schedule_date, action, old_duty_id, new_duty_id, old_employee_id, new_employee_id, old_assignment_role, new_assignment_role, changed_at").gte("schedule_date",t).lte("schedule_date",n).order("changed_at",{ascending:!1});if(a)return{changeCountByDate:new Map,changeEventsByDate:new Map,error:a};const i=new Set,o=new Set;(s||[]).forEach(h=>{h!=null&&h.old_duty_id&&i.add(h.old_duty_id),h!=null&&h.new_duty_id&&i.add(h.new_duty_id),h!=null&&h.old_employee_id&&o.add(h.old_employee_id),h!=null&&h.new_employee_id&&o.add(h.new_employee_id)});const[d,l]=await Promise.all([i.size?e.from("duties").select("id, name").in("id",Array.from(i)):Promise.resolve({data:[],error:null}),o.size?e.from("employees").select("id, first_name, last_name").in("id",Array.from(o)):Promise.resolve({data:[],error:null})]);if(d.error||l.error)return{changeCountByDate:new Map,changeEventsByDate:new Map,error:d.error||l.error};const c=new Map((d.data||[]).map(h=>[String((h==null?void 0:h.id)||""),String((h==null?void 0:h.name)||"").trim()||"-"]).filter(([h])=>h)),u=new Map((l.data||[]).map(h=>[String((h==null?void 0:h.id)||""),Zu(h)]).filter(([h])=>h)),p=new Map,m=new Map;return(s||[]).forEach(h=>{const y=String((h==null?void 0:h.schedule_date)||"").trim();if(!y)return;const f=Number(p.get(y)||0);p.set(y,f+1);const b=c.get(String((h==null?void 0:h.old_duty_id)||""))||"-",w=c.get(String((h==null?void 0:h.new_duty_id)||""))||"-",v=u.get(String((h==null?void 0:h.old_employee_id)||""))||"-",_=u.get(String((h==null?void 0:h.new_employee_id)||""))||"-",k=Ai(h==null?void 0:h.old_assignment_role),x=Ai(h==null?void 0:h.new_assignment_role),L=String((h==null?void 0:h.action)||"").trim().toLowerCase(),T=h!=null&&h.changed_at?r(new Date(h.changed_at)):"-";let q="";L==="insert"?q=`Добавено: ${_} | ${w} | ${x}`:L==="delete"?q=`Премахнато: ${v} | ${b} | ${k}`:q=`Промяна: ${v} | ${b} | ${k} → ${_} | ${w} | ${x}`;const E=m.get(y)||[];E.push({summary:q,changedAt:T}),m.set(y,E)}),{changeCountByDate:p,changeEventsByDate:m,error:null}}function Ci(e,t){t.forEach((n,r)=>{const s=e.querySelector(`#index-kpi-label-${r+1}`);s&&(s.textContent=n)})}function np(e,t,n){const{setText:r,isTransportAnalyticsMode:s,getTodayIsoDate:a}=n,i=e.querySelector("#index-management-section"),o=e.querySelector("#index-crew-section"),d=e.querySelector("#index-kpi-card-planned"),l=e.querySelector("#index-kpi-card-actual"),c=e.querySelector("#index-kpi-card-absences"),u=e.querySelector("#index-kpi-card-employees"),p=e.querySelector("#index-certificates-panel"),m=e.querySelector("#index-absences-panel"),h=e.querySelector("#index-workload-panel"),y=e.querySelector("#index-pending-users-panel"),f=e.querySelector("#index-workload-date"),b=e.querySelector("#index-certificates-soon-details"),w=e.querySelector("#index-certificates-expired-details"),v=e.querySelector("#index-quick-actions"),_=(t==null?void 0:t.mode)||"default";if(r(e,"#index-management-title","Оперативен преглед за днес"),Ci(e,["Планирани повески","Реални повески","Активни отсъствия","Активни служители"]),_!=="crew"){e.dataset.indexMode=_,i==null||i.classList.remove("d-none"),o==null||o.classList.add("d-none"),d==null||d.classList.remove("d-none"),l==null||l.classList.remove("d-none"),c==null||c.classList.remove("col-xl-6"),c==null||c.classList.add("col-xl-3"),u==null||u.classList.remove("col-xl-6"),u==null||u.classList.add("col-xl-3"),p==null||p.classList.add("d-none"),m==null||m.classList.add("d-none"),h==null||h.classList.add("d-none"),y==null||y.classList.add("d-none"),b==null||b.classList.add("d-none"),w==null||w.classList.add("d-none"),v&&(_==="admin"?(v.innerHTML=`
          <a href="/admin" data-link class="btn btn-outline-danger">Админ Панел</a>
          <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>
        `,r(e,"#index-welcome-subtitle","Административен преглед на потребители, роли и системно състояние."),r(e,"#index-management-title","Административен преглед"),Ci(e,["Профили","Потребители с роля","Профили със служител","Роли"]),y==null||y.classList.remove("d-none")):_==="manager"?(v.innerHTML=`
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `,r(e,"#index-welcome-subtitle","Оперативен преглед за управление на екипи и дневни повески.")):s(_)&&(v.innerHTML=`
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `,r(e,"#index-welcome-subtitle","Оперативен преглед с акцент върху празни позиции, сертификати и отсъствия."),d==null||d.classList.add("d-none"),l==null||l.classList.add("d-none"),c==null||c.classList.remove("col-xl-3"),c==null||c.classList.add("col-xl-6"),u==null||u.classList.remove("col-xl-3"),u==null||u.classList.add("col-xl-6"),p==null||p.classList.remove("d-none"),m==null||m.classList.remove("d-none"),h==null||h.classList.remove("d-none"),f&&!f.value&&(f.value=a())));return}e.dataset.indexMode="crew",e.dataset.indexEmployeeId=t.employeeId||"",i==null||i.classList.add("d-none"),o==null||o.classList.remove("d-none"),r(e,"#index-welcome-subtitle","Виждаш своя месечен календар за планирани и реални повески."),v&&(v.innerHTML=`
      <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
      <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
    `)}const fn={visibleMonth:"",selectedDate:"",plannedRows:[],actualRows:[],actualRowsById:new Map,absenceRows:[],confirmedDates:new Set,pendingConfirmationDates:new Set,changeCountByDate:new Map,changeEventsByDate:new Map,editingActualDutyId:""},rp=-20*60,sp=30*60;function yn(){return new Date().toISOString().slice(0,10)}function Qn(e){return new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium",timeStyle:"short"}).format(e)}function Ri(e){return e?new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium"}).format(new Date(`${e}T00:00:00`)):"-"}function ap(e){return String(e||"").trim().toLowerCase()}function na(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function zn(e){return e==null||e===""?"":Vt(String(e))||""}function Nr(e){const t=zn(e);return t?t.slice(0,5):"-"}function rs(e){const t=Number(e);if(!Number.isFinite(t)||t<0)return"-";const n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Ii(e){const t=Number(e);if(!Number.isFinite(t))return"-";const n=t<0?"-":"+",r=Math.abs(t),s=Math.floor(r/60),a=r%60;return`${n}${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Pi(e){const t=Number(e||0);return Number.isFinite(t)?t<rp||t>sp?"text-bg-danger":"text-bg-success":"text-bg-secondary"}function ra(e){const t=zn(e==null?void 0:e.start_time),n=zn(e==null?void 0:e.end_time),r=zn(e==null?void 0:e.break_start_time),s=zn(e==null?void 0:e.break_end_time),a=r&&s?je(r,s):null,i=t&&n?je(t,n):null,o=Number.isFinite(i)&&Number.isFinite(a)?Math.max(0,i-a):null;return{startTime:Nr(e==null?void 0:e.start_time),endTime:Nr(e==null?void 0:e.end_time),breakStartTime:Nr(e==null?void 0:e.break_start_time),breakEndTime:Nr(e==null?void 0:e.break_end_time),breakDuration:a===null?"-":rs(a),duration:o===null?"-":rs(o),breakDurationMinutes:a,durationMinutes:o}}function Di(e){const t=(e==null?void 0:e.duties)||{};return ra({start_time:(e==null?void 0:e.start_time_override)??(t==null?void 0:t.start_time),end_time:(e==null?void 0:e.end_time_override)??(t==null?void 0:t.end_time),break_start_time:(e==null?void 0:e.break_start_time_override)??(t==null?void 0:t.break_start_time),break_end_time:(e==null?void 0:e.break_end_time_override)??(t==null?void 0:t.break_end_time)})}function Hr(e){return e?`${String(e).slice(0,5)}:00`:null}async function ip(e,t,n){var y,f,b,w,v;if((e.dataset.indexMode||"default")!=="crew")return;const s=e.dataset.indexEmployeeId||"",a=(((y=e.querySelector("#index-actual-duty-edit-id"))==null?void 0:y.value)||"").trim(),i=(((f=e.querySelector("#index-actual-duty-start"))==null?void 0:f.value)||"").trim(),o=(((b=e.querySelector("#index-actual-duty-end"))==null?void 0:b.value)||"").trim(),d=(((w=e.querySelector("#index-actual-duty-break-start"))==null?void 0:w.value)||"").trim(),l=(((v=e.querySelector("#index-actual-duty-break-end"))==null?void 0:v.value)||"").trim(),c=e.querySelector("#index-actual-duty-edit-save");if(!a||!i||!o||!d||!l){g("Попълни всички полета.","warning");return}const u=je(i,o);if(je(d,l)>u){g("Прекъсването не може да е по-голямо от продължителността.","warning");return}const m=(c==null?void 0:c.innerHTML)||"Запази";c&&(c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:h}=await S.from("actual_duties").update({start_time_override:Hr(i),end_time_override:Hr(o),break_start_time_override:Hr(d),break_end_time_override:Hr(l)}).eq("id",a);if(c&&(c.disabled=!1,c.innerHTML=m),h){g(h.message||"Редакцията не беше запазена.","error");return}n(e),await t(e,s,fn.visibleMonth),g("Реалната повеска е обновена.","success")}function op(e){const t=ap(e);return t==="chief"?"Началник влак":t==="conductor"?"Кондуктор":t==="driver"?"Машинист":t==="assistant_driver"?"Пом. машинист":"Кондуктор"}function We(e,t,n){const r=e.querySelector(t);r&&(r.textContent=n)}async function lp(e){const{data:t}=await S.auth.getSession(),n=(t==null?void 0:t.session)||null,r=(n==null?void 0:n.user)||null;if(!(r!=null&&r.id))return We(e,"#index-welcome-title","Добре дошъл в TrainCrewHub"),We(e,"#index-welcome-subtitle","Влез в профила си, за да видиш персонална информация."),{userId:"",employeeId:"",roles:[],crew:!1,mode:"default"};const[{data:s},{data:a}]=await Promise.all([S.from("user_profiles").select("username, employee_id, employees(first_name, last_name)").eq("id",r.id).maybeSingle(),S.from("user_roles").select("role").eq("user_id",r.id)]),i=(s==null?void 0:s.username)||r.email||r.id,o=s!=null&&s.employees?`${s.employees.first_name||""} ${s.employees.last_name||""}`.trim():"",d=[...new Set((a||[]).map(c=>String((c==null?void 0:c.role)||"").trim()).filter(Boolean))],l=Uu(d);return We(e,"#index-welcome-title",`Здравей, ${i}${o?` | ${o}`:""}`),We(e,"#index-welcome-subtitle","Тук виждаш твоя профил и бърз оперативен преглед за деня."),{userId:r.id,employeeId:(s==null?void 0:s.employee_id)||"",roles:d,crew:Ea(d),mode:l}}function Mi(e){const t=["text-bg-primary","text-bg-success","text-bg-warning","text-bg-danger","text-bg-info","text-bg-dark"],n=String(e||"").trim().toLowerCase();if(!n)return t[0];const r={бо:"text-bg-warning",do:"text-bg-danger",до:"text-bg-danger",болничен:"text-bg-warning",отпуск:"text-bg-primary",командировка:"text-bg-info"};if(r[n])return r[n];let s=0;for(let a=0;a<n.length;a+=1)s=(s*31+n.charCodeAt(a))%2147483647;return t[Math.abs(s)%t.length]}async function sa(e){var c;const t=yn(),[n,r,s,a,i]=await Promise.all([S.from("planned_duties").select("id",{count:"exact",head:!0}).eq("date",t),S.from("actual_duties").select("id",{count:"exact",head:!0}).eq("date",t),S.from("employee_absences").select("id",{count:"exact",head:!0}).lte("start_date",t).gte("end_date",t),S.from("employees").select("id",{count:"exact",head:!0}).eq("is_active",!0),S.from("schedule_publications").select("is_confirmed").eq("schedule_date",t).maybeSingle()]);[n,r,s,a,i].some(u=>u.error)&&g("Част от данните за индекс страницата не могат да се заредят.","warning");const l=!!((c=i==null?void 0:i.data)!=null&&c.is_confirmed)?Number(r.count??0):0;We(e,"#index-kpi-planned",String(n.count??0)),We(e,"#index-kpi-actual",String(l)),We(e,"#index-kpi-absences",String(s.count??0)),We(e,"#index-kpi-employees",String(a.count??0)),We(e,"#index-last-updated",`Последно обновяване: ${Qn(new Date)}`)}async function Zo(e){await Mu(e,{setText:We,formatDateTime:Qn,escapeHtml:na})}function dp(e,t,n,r){const s=e.querySelector("#index-refresh"),a=e.querySelector("#index-certificates-panel"),i=e.querySelector("#index-absences-panel"),o=e.querySelector("#index-workload-date"),d=e.querySelector("#index-workload-refresh"),{loadCrewMonthlySnapshot:l,renderCrewCalendarAndDetails:c}=n,{openCrewActualDutyEditModal:u,openCrewTimetablePreview:p,closeCrewTimetablePreview:m,closeCrewActualDutyEditModal:h}=r;Fu(e,{loadCrewMonthlySnapshot:l,crewCalendarState:fn,toMonthKey:hn,shiftMonthKey:Wu,getTodayIsoDate:yn,renderCrewCalendarAndDetails:c,openCrewActualDutyEditModal:u,openCrewTimetablePreview:p,closeCrewTimetablePreview:m,closeCrewActualDutyEditModal:h,saveCrewActualDutyEdits:y=>ip(y,l,h)}),s==null||s.addEventListener("click",async()=>{const y=e.dataset.indexMode||"default";if(y==="admin"){s.disabled=!0,await Zo(e),s.disabled=!1;return}if(Ht(y)){s.disabled=!0,await t.loadHeadOfTransportSnapshot(e),s.disabled=!1;return}y!=="crew"&&(s.disabled=!0,await sa(e),s.disabled=!1)}),a==null||a.addEventListener("click",y=>{const f=y.target.closest("button[data-index-cert-action]");if(!f)return;const b=e.dataset.indexMode||"default";if(!Ht(b))return;const w=f.getAttribute("data-index-cert-action")||"";if(w==="toggle-soon"){t.toggleCertificateDetails(e,"soon");return}w==="toggle-expired"&&t.toggleCertificateDetails(e,"expired")}),i==null||i.addEventListener("click",y=>{const f=y.target.closest("button[data-index-absence-action]");if(!f)return;const b=e.dataset.indexMode||"default";if(!Ht(b)||(f.getAttribute("data-index-absence-action")||"")!=="toggle-reason")return;const v=f.getAttribute("data-index-absence-key")||"";t.toggleAbsenceReasonDetails(e,v)}),o==null||o.addEventListener("change",async()=>{const y=e.dataset.indexMode||"default";Ht(y)&&await t.loadHeadOfTransportWorkload(e)}),d==null||d.addEventListener("click",async()=>{const y=e.dataset.indexMode||"default";Ht(y)&&(d.disabled=!0,await t.loadHeadOfTransportWorkload(e),d.disabled=!1)})}async function cp(e){e.innerHTML=Du;const t=Nu({loadKpiSnapshot:sa,getTodayIsoDate:yn,formatDate:Ri,escapeHtml:na,formatMinutesAsClock:rs,formatSignedMinutesAsClock:Ii,getDeviationClassByThreshold:Pi,parseIsoDateSafe:ir,toMonthKey:hn,getMonthBounds:Cs,countBulgarianWorkdays:$i,getDutyTimingSummary:ra,getActualDutyTimingSummary:Di,getDistinctBadgeClassByReason:Mi}),n=zu({crewCalendarState:fn,setText:We,getTodayIsoDate:yn,toMonthKey:hn,toIsoDateFromDate:Et,parseMonthKey:fs,formatMonthLabel:Vu,getMonthBounds:Cs,formatDate:Ri,formatDateTime:Qn,escapeHtml:na,countBulgarianWorkdays:$i,getDutyTimingSummary:ra,getActualDutyTimingSummary:Di,formatMinutesAsClock:rs,formatSignedMinutesAsClock:Ii,getDeviationClassByThreshold:Pi,formatRoleLabel:op,getDistinctBadgeClassByReason:Mi}),r=Bu({crewCalendarState:fn,ensureCrewSelectedDate:n.ensureCrewSelectedDate,renderCrewCalendar:n.renderCrewCalendar,renderCrewHoursSummary:n.renderCrewHoursSummary,renderCrewSelectedDayDetails:n.renderCrewSelectedDayDetails,toMonthKey:hn,getMonthBounds:Cs,loadSchedulePublicationDates:(a,i)=>ep(S,a,i),loadScheduleChangesSummary:(a,i)=>tp(S,a,i,Qn),formatDateTime:Qn,setText:We});dp(e,t,r,n);const s=await lp(e);if(np(e,s,{setText:We,isTransportAnalyticsMode:Ht,getTodayIsoDate:yn}),(s==null?void 0:s.mode)==="crew"){const a=hn(new Date);fn.visibleMonth=a,fn.selectedDate=yn(),await r.loadCrewMonthlySnapshot(e,s.employeeId||"",a);return}if((s==null?void 0:s.mode)==="admin"){await Zo(e);return}if(Ht((s==null?void 0:s.mode)||"default")){await t.loadHeadOfTransportSnapshot(e);return}await sa(e)}const up=`<section class="card border-0 shadow-sm" style="max-width: 400px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-4 text-center">Вход</h1>\r
    \r
    <form id="login-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="identifier" class="form-label">Имейл или потребителско име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="identifier"\r
          name="identifier"\r
          placeholder="email@domain.com или username"\r
          required\r
        />\r
      </div>\r
      \r
      <div class="mb-3">\r
        <label for="password" class="form-label">Парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="password"\r
            name="password"\r
            placeholder="••••••••"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="password"\r
            aria-label="Покажи паролата"\r
          >\r
            <i class="bi bi-eye"></i>\r
          </button>\r
        </div>\r
        <div class="mt-2 text-end">\r
          <a href="/forgot-password" data-link class="small text-primary">Забравена парола?</a>\r
        </div>\r
      </div>\r
      \r
      <button type="submit" class="btn btn-primary w-100"><i class="bi bi-box-arrow-in-right me-1"></i>Вход</button>\r
    </form>\r
    \r
    <div class="mt-3 text-center">\r
      <p class="text-secondary small">\r
        Нямаш акаунт?\r
        <a href="/register" data-link class="text-primary fw-semibold">Регистрирай се</a>\r
      </p>\r
    </div>\r
  </div>\r
</section>\r
`;async function pp({attempts:e=10,delayMs:t=120}={}){var n,r;for(let s=0;s<e;s+=1){const{data:a}=await S.auth.getSession();if((r=(n=a==null?void 0:a.session)==null?void 0:n.user)!=null&&r.id)return!0;await new Promise(i=>{window.setTimeout(i,t)})}return!1}async function mp(e){e.innerHTML=up,hp(e),fp(e)}function hp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-toggle-password")||"",r=e.querySelector(`#${n}`);if(!r)return;const s=r.type==="password";r.type=s?"text":"password",t.innerHTML=s?'<i class="bi bi-eye-slash"></i>':'<i class="bi bi-eye"></i>',t.setAttribute("aria-label",s?"Скрий паролата":"Покажи паролата")})})}function fp(e){const t=e.querySelector("#login-form");t&&t.addEventListener("submit",async n=>{var p,m,h,y,f;n.preventDefault();const r=t.querySelector('input[name="identifier"]').value.trim(),s=t.querySelector('input[name="password"]').value;if(!r||!s){g("Попълни имейл/потребителско име и парола.","warning");return}let a=r;if(!r.includes("@")){const{data:b}=await S.rpc("resolve_login_email",{input_username:r});b&&(a=String(b).trim())}const i=t.querySelector('button[type="submit"]'),o=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Влизане...';const{data:d,error:l}=await S.auth.signInWithPassword({email:a,password:s});if(i.disabled=!1,i.innerHTML=o,l){g("Невалидни данни за вход.","error");return}const c=((p=d==null?void 0:d.user)==null?void 0:p.id)||((h=(m=d==null?void 0:d.session)==null?void 0:m.user)==null?void 0:h.id)||"";if(c&&!await Qo(c)){await S.auth.signOut(),g("Профилът е деактивиран. Свържи се с администратор.","warning");return}if(g("Успешен вход.","success"),!(!!((f=(y=d==null?void 0:d.session)==null?void 0:y.user)!=null&&f.id)||await pp())){g("Влизането е успешно, но сесията не е активирана. Опитай отново.","warning");return}window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))})}const yp=`<section class="card border-0 shadow-sm" style="max-width: 400px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-4 text-center">Регистрация</h1>\r
    \r
    <form id="register-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="username" class="form-label">Потребителско име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="username"\r
          name="username"\r
          placeholder="username"\r
          minlength="3"\r
          maxlength="30"\r
          pattern="^[A-Za-z0-9_]{3,30}$"\r
          title="Потребителското име трябва да е между 3 и 30 символа и да съдържа само латински букви, цифри и _"\r
          autocomplete="username"\r
          required\r
        />\r
        <div class="form-text">3-30 символа: латински букви, цифри и _</div>\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="email" class="form-label">Имейл</label>\r
        <input\r
          type="email"\r
          class="form-control"\r
          id="email"\r
          name="email"\r
          placeholder="your@email.com"\r
          required\r
        />\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="first_name" class="form-label">Собствено име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="first_name"\r
          name="first_name"\r
          placeholder="Собствено име"\r
          required\r
        />\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="last_name" class="form-label">Фамилия</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="last_name"\r
          name="last_name"\r
          placeholder="Фамилия"\r
          required\r
        />\r
      </div>\r
      \r
      <div class="mb-3">\r
        <label for="password" class="form-label">Парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="password"\r
            name="password"\r
            placeholder="••••••••"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="password"\r
            aria-label="Покажи паролата"\r
          >\r
            <i class="bi bi-eye"></i>\r
          </button>\r
        </div>\r
      </div>\r
      \r
      <div class="mb-3">\r
        <label for="confirm-password" class="form-label">Потвърди парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="confirm-password"\r
            name="confirm-password"\r
            placeholder="••••••••"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="confirm-password"\r
            aria-label="Покажи потвърждението на паролата"\r
          >\r
            <i class="bi bi-eye"></i>\r
          </button>\r
        </div>\r
      </div>\r
      \r
      <button type="submit" class="btn btn-primary w-100"><i class="bi bi-person-check me-1"></i>Създай акаунт</button>\r
    </form>\r
    \r
    <div class="mt-3 text-center">\r
      <p class="text-secondary small">\r
        Вече имаш акаунт?\r
        <a href="/login" data-link class="text-primary fw-semibold">Влез оттук</a>\r
      </p>\r
    </div>\r
  </div>\r
</section>\r
`;async function bp(e){e.innerHTML=yp,vp(e),gp(e)}function vp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-toggle-password")||"",r=e.querySelector(`#${n}`);if(!r)return;const s=r.type==="password";r.type=s?"text":"password",t.innerHTML=s?'<i class="bi bi-eye-slash"></i>':'<i class="bi bi-eye"></i>';const a=n.includes("confirm"),i=a?"Покажи потвърждението на паролата":"Покажи паролата",o=a?"Скрий потвърждението на паролата":"Скрий паролата";t.setAttribute("aria-label",s?o:i)})})}function gp(e){const t=e.querySelector("#register-form");t&&t.addEventListener("submit",async n=>{var b;n.preventDefault();const r=t.querySelector('input[name="username"]').value.trim(),s=t.querySelector('input[name="email"]').value.trim(),a=t.querySelector('input[name="first_name"]').value.trim(),i=t.querySelector('input[name="last_name"]').value.trim(),o=t.querySelector('input[name="password"]').value,d=t.querySelector('input[name="confirm-password"]').value;if(!r||!s||!a||!i||!o||!d){g("Моля, попълни всички полета.","warning");return}if(!/^[A-Za-z0-9_]{3,30}$/.test(r)){g("Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.","warning");return}const c=/[\u0400-\u04FF]/;if(c.test(o)||c.test(d)){g("Паролата не трябва да съдържа кирилица.","warning");return}if(o!==d){g("Паролите не съвпадат.","warning");return}const u=t.querySelector('button[type="submit"]'),p=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Регистрация...';const{data:m,error:h}=await S.auth.signUp({email:s,password:o,options:{data:{username:r,first_name:a,last_name:i}}});if(h){u.disabled=!1,u.innerHTML=p,g(h.message,"error");return}const y=(b=m.user)==null?void 0:b.id;if(y){const{error:w}=await S.from("user_profiles").upsert({id:y,username:r,email:s,first_name:a,last_name:i,created_from:s},{onConflict:"id"});if(w){u.disabled=!1,u.innerHTML=p,g(w.message,"error");return}}if(!!!m.session){const{error:w}=await S.auth.signInWithPassword({email:s,password:o});if(w){u.disabled=!1,u.innerHTML=p,g("Регистрацията е успешна, но автоматичният вход е достъпен след имейл потвърждение.","warning"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"));return}}u.disabled=!1,u.innerHTML=p,g("Регистрацията е успешна. Вече си влязъл в системата.","success"),window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))})}const wp=`<section class="card border-0 shadow-sm" style="max-width: 440px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-3 text-center">Възстановяване на парола</h1>\r
    <p class="text-secondary small mb-4 text-center">\r
      Въведи имейл или потребителско име. Ако акаунтът съществува, ще получиш линк за смяна на паролата.\r
    </p>\r
\r
    <form id="forgot-password-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="forgot-identifier" class="form-label">Имейл или потребителско име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="forgot-identifier"\r
          name="identifier"\r
          placeholder="email@domain.com или username"\r
          required\r
        />\r
      </div>\r
\r
      <button type="submit" class="btn btn-primary w-100"><i class="bi bi-envelope me-1"></i>Изпрати линк</button>\r
    </form>\r
\r
    <div class="mt-3 text-center">\r
      <a href="/login" data-link class="text-primary fw-semibold">Назад към вход</a>\r
    </div>\r
  </div>\r
</section>\r
`;function _p(){return`${window.location.origin}/reset-password`}async function Sp(e){if(e.includes("@"))return e;const{data:t}=await S.rpc("resolve_login_email",{input_username:e});return String(t||"").trim()}async function xp(e){e.innerHTML=wp;const t=e.querySelector("#forgot-password-form");t&&t.addEventListener("submit",async n=>{var i;n.preventDefault();const r=(((i=t.querySelector('input[name="identifier"]'))==null?void 0:i.value)||"").trim();if(!r){g("Въведи имейл или потребителско име.","warning");return}const s=t.querySelector('button[type="submit"]'),a=(s==null?void 0:s.innerHTML)||"Изпрати линк";s&&(s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изпращане...');try{const o=await Sp(r);o&&await S.auth.resetPasswordForEmail(o,{redirectTo:_p()})}catch{}s&&(s.disabled=!1,s.innerHTML=a),g("Ако акаунтът съществува, изпратихме инструкции за смяна на паролата.","success"),t.reset()})}const kp=`<section class="card border-0 shadow-sm" style="max-width: 460px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-3 text-center">Задай нова парола</h1>\r
    <p id="reset-password-info" class="text-secondary small mb-4 text-center">\r
      Отвори страницата през линка от имейла за възстановяване.\r
    </p>\r
\r
    <form id="reset-password-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="reset-password" class="form-label">Нова парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="reset-password"\r
            name="password"\r
            minlength="6"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="reset-password"\r
            aria-label="Покажи новата парола"\r
          >\r
            <i class="bi bi-eye"></i>\r
          </button>\r
        </div>\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="reset-password-confirm" class="form-label">Потвърди нова парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="reset-password-confirm"\r
            name="confirm-password"\r
            minlength="6"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="reset-password-confirm"\r
            aria-label="Покажи потвърждението на новата парола"\r
          >\r
            <i class="bi bi-eye"></i>\r
          </button>\r
        </div>\r
      </div>\r
\r
      <button id="reset-password-submit" type="submit" class="btn btn-primary w-100" disabled><i class="bi bi-floppy me-1"></i>Запази нова парола</button>\r
    </form>\r
\r
    <div class="mt-3 text-center">\r
      <a href="/login" data-link class="text-primary fw-semibold">Към вход</a>\r
    </div>\r
  </div>\r
</section>\r
`;function qp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-toggle-password")||"",r=e.querySelector(`#${n}`);if(!r)return;const s=r.type==="password";r.type=s?"text":"password",t.innerHTML=s?'<i class="bi bi-eye-slash"></i>':'<i class="bi bi-eye"></i>';const a=n.includes("confirm"),i=a?"Покажи потвърждението на новата парола":"Покажи новата парола",o=a?"Скрий потвърждението на новата парола":"Скрий новата парола";t.setAttribute("aria-label",s?o:i)})})}function Lp(){const e=String(window.location.hash||"").replace(/^#/,""),t=new URLSearchParams(e);return{accessToken:t.get("access_token")||"",refreshToken:t.get("refresh_token")||"",type:t.get("type")||""}}async function Tp(){const t=new URLSearchParams(window.location.search).get("code")||"";if(t){const{error:s}=await S.auth.exchangeCodeForSession(t);if(!s)return!0}const n=Lp();if(n.type!=="recovery"||!n.accessToken||!n.refreshToken)return!1;const{error:r}=await S.auth.setSession({access_token:n.accessToken,refresh_token:n.refreshToken});return r?!1:(window.history.replaceState({},"","/reset-password"),!0)}async function Ep(e){var i,o;e.innerHTML=kp,qp(e);const t=e.querySelector("#reset-password-info"),n=e.querySelector("#reset-password-submit"),r=e.querySelector("#reset-password-form"),{data:s}=await S.auth.getSession();let a=!!((o=(i=s==null?void 0:s.session)==null?void 0:i.user)!=null&&o.id);if(a||(a=await Tp()),!a){t&&(t.textContent="Линкът е невалиден или е изтекъл. Заяви нов линк за възстановяване.",t.className="text-warning small mb-4 text-center"),n&&(n.disabled=!0);return}t&&(t.textContent="Въведи нова парола за профила си."),n&&(n.disabled=!1),r==null||r.addEventListener("submit",async d=>{var h,y;d.preventDefault();const l=(((h=e.querySelector("#reset-password"))==null?void 0:h.value)||"").trim(),c=(((y=e.querySelector("#reset-password-confirm"))==null?void 0:y.value)||"").trim();if(!l||!c){g("Попълни и двете полета за парола.","warning");return}if(l.length<6){g("Паролата трябва да е поне 6 символа.","warning");return}const u=/[\u0400-\u04FF]/;if(u.test(l)||u.test(c)){g("Паролата не трябва да съдържа кирилица.","warning");return}if(l!==c){g("Паролите не съвпадат.","warning");return}const p=(n==null?void 0:n.innerHTML)||"Запази нова парола";n&&(n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:m}=await S.auth.updateUser({password:l});if(n&&(n.disabled=!1,n.innerHTML=p),m){g(m.message||"Неуспешна смяна на паролата.","error");return}g("Паролата е сменена успешно.","success"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))})}const $p=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5 text-center">\r
    <h1 class="h4 mb-3">Акаунтът чака одобрение</h1>\r
    <p class="text-secondary mb-4">\r
      Нямаш активна роля в системата. Моля, изчакай администратор да ти присвои роля.\r
    </p>\r
    <div class="d-flex flex-wrap justify-content-center gap-2">\r
      <button type="button" class="btn btn-outline-secondary" id="pending-access-refresh"><i class="bi bi-arrow-clockwise me-1"></i>Опресни</button>\r
      <button type="button" class="btn btn-primary" id="pending-access-logout"><i class="bi bi-box-arrow-right me-1"></i>Изход</button>\r
    </div>\r
  </div>\r
</section>\r
`,Ap=3e4;let Gr=null,Yn=null;function Oi(){Gr&&(window.clearInterval(Gr),Gr=null),Yn&&(window.removeEventListener("route:changed",Yn),Yn=null)}function ji(){window.location.pathname==="/pending-access"&&window.dispatchEvent(new PopStateEvent("popstate"))}async function Cp(e){Oi(),e.innerHTML=$p;const t=e.querySelector("#pending-access-refresh"),n=e.querySelector("#pending-access-logout");t==null||t.addEventListener("click",()=>{ji()}),n==null||n.addEventListener("click",async()=>{const{error:r}=await S.auth.signOut();if(r){g(r.message,"error");return}g("Излезе успешно от системата.","success"),window.history.replaceState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))}),Gr=window.setInterval(()=>{ji()},Ap),Yn=()=>{window.location.pathname!=="/pending-access"&&Oi()},window.addEventListener("route:changed",Yn)}const Rp=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Ключ-График</h1>\r
      <button id="open-create-schedule-key" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Нов Ключ-График</button>\r
    </div>\r
\r
    <p class="text-secondary">Списък с активни и архивни ключове на графици.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3">\r
        <div class="col-md-4">\r
          <label for="filter-name" class="form-label">Наименование</label>\r
          <input id="filter-name" class="form-control form-control-sm" type="text" placeholder="Търси по име" />\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-crew-role" class="form-label">Екип</label>\r
          <select id="filter-crew-role" class="form-select form-select-sm">\r
            <option value="">Всички</option>\r
            <option value="началник влак">Началник влак</option>\r
            <option value="кондуктор">Кондуктор</option>\r
          </select>\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-active" class="form-label">Активен</label>\r
          <select id="filter-active" class="form-select form-select-sm">\r
            <option value="">Всички</option>\r
            <option value="true">Да</option>\r
            <option value="false">Не</option>\r
          </select>\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-valid-from" class="form-label">От дата</label>\r
          <input id="filter-valid-from" class="form-control form-control-sm" type="date" />\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-valid-to" class="form-label">До дата</label>\r
          <input id="filter-valid-to" class="form-control form-control-sm" type="date" />\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Наименование</th>\r
            <th>Екип</th>\r
            <th>Активен</th>\r
            <th>От дата</th>\r
            <th>До дата</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="schedule-keys-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="schedule-keys-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="schedule-keys-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="schedule-keys-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="schedule-keys-pagination-label" class="text-secondary small"></div>\r
      <button id="schedule-keys-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="schedule-key-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="schedule-keys-form-title" class="h5 mb-0">Нов Ключ-График</h2>\r
          <button id="schedule-key-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-keys-form">\r
          <input type="hidden" id="schedule-key-id" />\r
          <input type="hidden" id="schedule-key-type" value="seasonal" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="schedule-key-name" class="form-label">Наименование</label>\r
              <input id="schedule-key-name" class="form-control" type="text" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="schedule-key-crew-role" class="form-label">Екип</label>\r
              <select id="schedule-key-crew-role" class="form-select" required>\r
                <option value="началник влак">Началник влак</option>\r
                <option value="кондуктор">Кондуктор</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3 d-flex align-items-end">\r
              <div class="form-check mb-2">\r
                <input class="form-check-input" type="checkbox" id="schedule-key-active" checked />\r
                <label class="form-check-label" for="schedule-key-active">Активен</label>\r
              </div>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="schedule-key-valid-from" class="form-label">От дата</label>\r
              <input id="schedule-key-valid-from" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="schedule-key-valid-to" class="form-label">До дата</label>\r
              <input id="schedule-key-valid-to" class="form-control" type="date" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-key-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-key-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този запис?</p>\r
        <input type="hidden" id="schedule-key-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="schedule-key-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="schedule-key-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Rs(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ni=new Map;function Ip(e,t){const n=Ni.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){_n(a);return}}};Ni.set(e,r),document.addEventListener("keydown",r)}function _n(e){var t,n;e.classList.add("d-none"),(t=document.querySelector("#schedule-key-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#schedule-key-delete-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Ze(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const ue={rows:[],filters:{name:"",crewRole:"",isActive:"",validFrom:"",validTo:""},page:1,pageSize:20},Hi=20;function Ne(e,t=1,n=Hi){const r=Array.isArray(e)?e:[],s=Number(n)>0?Number(n):Hi,a=r.length,i=Math.max(1,Math.ceil(a/s)),o=el(Number(t)||1,i),d=(o-1)*s,l=d+s;return{pageItems:r.slice(d,l),page:o,pageSize:s,totalItems:a,totalPages:i}}function el(e,t){const n=Number(t)>0?Number(t):1,r=Number(e)||1;return Math.min(Math.max(1,r),n)}function ke(e,t){const n=e.querySelector(t.rootSelector),r=e.querySelector(t.prevSelector),s=e.querySelector(t.nextSelector),a=e.querySelector(t.labelSelector);if(!n||!r||!s||!a)return;const i=Number(t.totalItems)||0,o=Number(t.totalPages)||1,d=el(Number(t.page)||1,o);if(i===0||o<=1){n.classList.add("d-none"),r.disabled=!0,s.disabled=!0,a.textContent="";return}n.classList.remove("d-none"),r.disabled=d<=1,s.disabled=d>=o,a.textContent=`Страница ${d} от ${o}`}function He(e,t){const n=e.querySelector(t.rootSelector),r=e.querySelector(t.prevSelector),s=e.querySelector(t.nextSelector);!n||!r||!s||n.dataset.paginationBound!=="true"&&(n.dataset.paginationBound="true",r.addEventListener("click",()=>{var a;(a=t.onPrev)==null||a.call(t)}),s.addEventListener("click",()=>{var a;(a=t.onNext)==null||a.call(t)}))}async function $a(e){const{data:t,error:n}=await S.from("schedule_keys").select("id, name, is_active, type, crew_role, valid_from, valid_to").order("valid_from",{ascending:!1});if(n){g(n.message,"error"),ue.rows=[],tt(e,"Грешка при зареждане на Ключ-График.");return}ue.rows=t||[],tt(e)}function tt(e,t){const n=e.querySelector("#schedule-keys-table-body"),r=e.querySelector("#schedule-keys-empty");He(e,{rootSelector:"#schedule-keys-pagination",prevSelector:"#schedule-keys-pagination-prev",nextSelector:"#schedule-keys-pagination-next",onPrev:()=>{ue.page=Math.max(1,(ue.page||1)-1),tt(e)},onNext:()=>{ue.page=(ue.page||1)+1,tt(e)}});const s=ue.rows.filter(l=>{const c=!ue.filters.name||(l.name||"").toLowerCase().includes(ue.filters.name),u=!ue.filters.crewRole||l.crew_role===ue.filters.crewRole,p=!ue.filters.isActive||String(!!l.is_active)===ue.filters.isActive,m=!ue.filters.validFrom||l.valid_from===ue.filters.validFrom,h=!ue.filters.validTo||l.valid_to===ue.filters.validTo;return c&&u&&p&&m&&h}),{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,ue.page,ue.pageSize);if(ue.page=i,ke(e,{rootSelector:"#schedule-keys-pagination",prevSelector:"#schedule-keys-pagination-prev",nextSelector:"#schedule-keys-pagination-next",labelSelector:"#schedule-keys-pagination-label",page:i,totalItems:o,totalPages:d}),!s.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма записи по зададените филтри.";return}r.classList.add("d-none"),n.innerHTML=a.map(l=>`
        <tr>
          <td>${Ze(l.name??"-")}</td>
          <td>${Ze(l.crew_role??"-")}</td>
          <td>${l.is_active?"Да":"Не"}</td>
          <td>${Ze(l.valid_from??"-")}</td>
          <td>${Ze(l.valid_to??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${l.id}"
                data-name="${Ze(l.name??"")}"
                data-type="${Ze(l.type??"seasonal")}"
                data-crew-role="${Ze(l.crew_role??"кондуктор")}"
                data-active="${l.is_active?"true":"false"}"
                data-valid-from="${Ze(l.valid_from??"")}"
                data-valid-to="${Ze(l.valid_to??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duties"
                data-id="${l.id}"
                data-name="${Ze(l.name??"")}"
              >
                Повески
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${l.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `).join("")}async function Pp(e){e.innerHTML=Rp,Dp(e),await $a(e)}function Dp(e){const t=e.querySelector("#open-create-schedule-key"),n=e.querySelector("#schedule-keys-form"),r=e.querySelector("#schedule-key-cancel-btn"),s=e.querySelector("#schedule-keys-table-body"),a=e.querySelector("#schedule-key-modal"),i=e.querySelector("#schedule-key-delete-modal"),o=e.querySelector("#schedule-key-modal-close"),d=e.querySelector("#schedule-key-delete-confirm"),l=e.querySelector("#schedule-key-delete-cancel"),c=e.querySelector("#filter-name"),u=e.querySelector("#filter-crew-role"),p=e.querySelector("#filter-active"),m=e.querySelector("#filter-valid-from"),h=e.querySelector("#filter-valid-to"),y=e.querySelector("#filter-reset");t==null||t.addEventListener("click",()=>{Aa(e),Rs(a)}),n==null||n.addEventListener("submit",async f=>{f.preventDefault(),await Mp(e)}),r==null||r.addEventListener("click",()=>{_n(a)}),o==null||o.addEventListener("click",()=>{_n(a)}),l==null||l.addEventListener("click",()=>{_n(i)}),c==null||c.addEventListener("input",f=>{ue.filters.name=f.target.value.trim().toLowerCase(),tt(e)}),u==null||u.addEventListener("change",f=>{ue.filters.crewRole=f.target.value,tt(e)}),p==null||p.addEventListener("change",f=>{ue.filters.isActive=f.target.value,tt(e)}),m==null||m.addEventListener("change",f=>{ue.filters.validFrom=f.target.value,tt(e)}),h==null||h.addEventListener("change",f=>{ue.filters.validTo=f.target.value,tt(e)}),y==null||y.addEventListener("click",()=>{ue.filters={name:"",crewRole:"",isActive:"",validFrom:"",validTo:""},c&&(c.value=""),u&&(u.value=""),p&&(p.value=""),m&&(m.value=""),h&&(h.value=""),tt(e)}),Ip("schedule-keys",[i,a]),d==null||d.addEventListener("click",async()=>{const f=e.querySelector("#schedule-key-delete-id").value;await jp(f,e)}),s==null||s.addEventListener("click",async f=>{const b=f.target.closest("button[data-action]");if(!b)return;const w=b.getAttribute("data-action");if(w==="edit"){Op(e,{id:b.getAttribute("data-id"),name:b.getAttribute("data-name"),type:b.getAttribute("data-type"),crewRole:b.getAttribute("data-crew-role")||"кондуктор",isActive:b.getAttribute("data-active")==="true",validFrom:b.getAttribute("data-valid-from"),validTo:b.getAttribute("data-valid-to")}),Rs(a);return}if(w==="delete"){const v=b.getAttribute("data-id");e.querySelector("#schedule-key-delete-id").value=v,Rs(i);return}if(w==="duties"){const v=b.getAttribute("data-id"),_=b.getAttribute("data-name")||"",k=new URLSearchParams({scheduleKeyId:v,scheduleKeyName:_});window.history.pushState({},"",`/schedule-key-duties?${k.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}})}async function Mp(e){var v;const t=e.querySelector("#schedule-key-id"),n=e.querySelector("#schedule-key-name"),r=e.querySelector("#schedule-key-type"),s=e.querySelector("#schedule-key-crew-role"),a=e.querySelector("#schedule-key-active"),i=e.querySelector("#schedule-key-valid-from"),o=e.querySelector("#schedule-key-valid-to"),d=e.querySelector("#schedule-key-save-btn"),l=n.value.trim(),c=(r==null?void 0:r.value)||"seasonal",u=s.value,p=a.checked,m=i.value,h=o.value,y=t.value;if(!l||!u||!m||!h){g("Моля, попълни всички задължителни полета.","warning");return}if(!["началник влак","кондуктор"].includes(u)){g("Невалидна стойност за екип.","warning");return}if(h<m){g('Полето "До дата" трябва да е след "От дата".',"warning");return}const f=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const b={name:l,type:c,crew_role:u,is_active:p,valid_from:m,valid_to:h};let w;if(y)({error:w}=await S.from("schedule_keys").update(b).eq("id",y));else{const{data:_}=await S.auth.getUser(),k=((v=_==null?void 0:_.user)==null?void 0:v.email)??"web_app";({error:w}=await S.from("schedule_keys").insert({...b,created_from:k}))}if(d.disabled=!1,d.innerHTML=f,w){g(tl(w),"error");return}g(y?"Записът е обновен.":"Записът е създаден.","success"),_n(e.querySelector("#schedule-key-modal")),Aa(e),await $a(e)}function Op(e,t){e.querySelector("#schedule-key-id").value=t.id,e.querySelector("#schedule-key-name").value=t.name??"",e.querySelector("#schedule-key-type").value=t.type??"seasonal",e.querySelector("#schedule-key-crew-role").value=t.crewRole??"кондуктор",e.querySelector("#schedule-key-active").checked=!!t.isActive,e.querySelector("#schedule-key-valid-from").value=t.validFrom??"",e.querySelector("#schedule-key-valid-to").value=t.validTo??"",e.querySelector("#schedule-keys-form-title").textContent="Редакция на Ключ-График",e.querySelector("#schedule-key-save-btn").textContent="Запази",e.querySelector("#schedule-key-cancel-btn").classList.remove("d-none")}function Aa(e){e.querySelector("#schedule-key-id").value="",e.querySelector("#schedule-key-name").value="",e.querySelector("#schedule-key-type").value="seasonal",e.querySelector("#schedule-key-crew-role").value="кондуктор",e.querySelector("#schedule-key-active").checked=!0,e.querySelector("#schedule-key-valid-from").value="",e.querySelector("#schedule-key-valid-to").value="",e.querySelector("#schedule-keys-form-title").textContent="Нов Ключ-График",e.querySelector("#schedule-key-save-btn").textContent="Създай",e.querySelector("#schedule-key-cancel-btn").classList.add("d-none")}async function jp(e,t){const n=t.querySelector("#schedule-key-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("schedule_keys").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,s){g(tl(s),"error");return}g("Записът е изтрит.","success"),_n(t.querySelector("#schedule-key-delete-modal")),Aa(t),await $a(t)}function tl(e){const t=String((e==null?void 0:e.message)||"").trim(),n=t.toLowerCase();return String((e==null?void 0:e.code)||"").trim()==="23503"||n.includes("foreign key constraint")||n.includes("duties_schedule_key_id_fkey")?"Този ключ-график не може да бъде изтрит или променен, защото се използва в повески.":t||"Възникна неочаквана грешка."}const Np=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">\r
      <h1 class="h3 mb-0">Повески</h1>\r
      <button id="open-create-duty" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Нова Повеска</button>\r
    </div>\r
\r
    <p class="text-secondary">Списък с повески и тяхното времетраене.</p>\r
\r
        <section class="search-panel mb-4" aria-label="Панел за търсене">\r
          <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
            <button id="duties-filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-4">\r
          <label for="duties-search" class="form-label">Име</label>\r
          <input id="duties-search" type="text" class="form-control" placeholder="Търси по наименование" />\r
        </div>\r
        <div class="col-md-4">\r
          <label for="duties-schedule-key-filter" class="form-label">Ключ-график</label>\r
          <select id="duties-schedule-key-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
        <div class="col-md-4">\r
              <label for="duties-type-filter" class="form-label">Тип</label>\r
              <select id="duties-type-filter" class="form-select">\r
                <option value="">Всички</option>\r
              </select>\r
            </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle table-mobile-wrap">\r
        <thead>\r
          <tr>\r
            <th class="duties-name-col">Наименование</th>\r
            <th>Тип</th>\r
            <th>Начало</th>\r
            <th>Край</th>\r
            <th>Прекъсване</th>\r
            <th>Времетраене</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="duties-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="duties-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <div id="duties-pagination" class="d-flex justify-content-between align-items-center mt-3 d-none">\r
      <small id="duties-page-info" class="text-secondary"></small>\r
      <div class="d-flex gap-2">\r
        <button id="duties-prev-page" type="button" class="btn btn-sm btn-outline-secondary">Назад</button>\r
        <button id="duties-next-page" type="button" class="btn btn-sm btn-outline-secondary">Напред</button>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
\r
<div id="duty-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="duty-form-title" class="h5 mb-0">Нова Повеска</h2>\r
          <button id="duty-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="duty-form">\r
          <input type="hidden" id="duty-id" />\r
\r
          <div id="duty-form-fields" class="row g-3"></div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="duty-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="duty-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш тази повеска?</p>\r
        <input type="hidden" id="duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 960px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Профил на повеска</h2>\r
          <button id="duty-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <div id="duty-profile-content"></div>\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="duty-profile-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
          <button id="duty-profile-duplicate" type="button" class="btn btn-outline-secondary">Копирай</button>\r
          <button id="duty-profile-edit" type="button" class="btn btn-primary">Редакция</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-attachment-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="duty-attachment-preview-title" class="h5 mb-0">Преглед на файл</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="duty-attachment-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="duty-attachment-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="duty-attachment-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <div id="duty-attachment-preview-text-wrap" class="d-none">\r
          <pre id="duty-attachment-preview-text" class="border rounded p-3 bg-light mb-0" style="height: min(72vh, 760px); overflow: auto; white-space: pre-wrap; word-break: break-word;"></pre>\r
        </div>\r
        <div id="duty-attachment-preview-csv-wrap" class="d-none">\r
          <p id="duty-attachment-preview-csv-note" class="text-secondary small mb-2"></p>\r
          <div class="table-responsive border rounded" style="height: min(72vh, 760px); overflow: auto;">\r
            <table class="table table-sm table-striped table-bordered mb-0">\r
              <thead id="duty-attachment-preview-csv-head"></thead>\r
              <tbody id="duty-attachment-preview-csv-body"></tbody>\r
            </table>\r
          </div>\r
        </div>\r
        <iframe\r
          id="duty-attachment-preview-frame"\r
          title="Преглед на файл"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function nl({duty:e,scheduleKeyNames:t,trainNumbers:n,attachmentEntries:r,escapeHtml:s,intervalToTimeInput:a,formatInterval:i}){var u;const o=((e==null?void 0:e.start_time)||"-").slice(0,5)||"-",d=((e==null?void 0:e.end_time)||"-").slice(0,5)||"-",l=(a((e==null?void 0:e.break_start_time)||"00:00:00")||"-").slice(0,5)||"-",c=(a((e==null?void 0:e.break_end_time)||"00:00:00")||"-").slice(0,5)||"-";return`
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Наименование</div>
          <div class="fw-semibold">${s((e==null?void 0:e.name)||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Тип</div>
          <div class="fw-semibold">${s(((u=e==null?void 0:e.duty_types)==null?void 0:u.name)||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Ключ-графици</div>
          <div class="fw-semibold">${s(t!=null&&t.length?t.join(", "):"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Влакове</div>
          <div class="fw-semibold">${s(n!=null&&n.length?n.join(", "):"-")}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${s(o)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${s(d)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Втори ден</div>
          <div class="fw-semibold">${e!=null&&e.second_day?"Да":"Не"}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${s(l)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${s(c)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${s(i(e==null?void 0:e.break_duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${s(i(e==null?void 0:e.duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small mb-2">Прикачени файлове</div>
          <div class="fw-semibold">
            ${(r||[]).length?(r||[]).map(p=>{const m=(p==null?void 0:p.label)||"Файл",h=(p==null?void 0:p.url)||"#";return`
          <div class="d-flex align-items-center gap-2 mb-1">
            <button
              type="button"
              class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
              data-duty-profile-action="preview-attachment"
              data-url="${s(h)}"
              data-label="${s(m)}"
              title="Преглед: ${s(m)}"
              aria-label="Преглед: ${s(m)}"
            >
              👁
            </button>
            <a href="${s(h)}" target="_blank" rel="noopener noreferrer">${s(m)}</a>
          </div>
        `}).join(""):"-"}
          </div>
        </div>
      </div>
    </div>
  `}function aa({idPrefix:e}){return`
    <div class="col-md-6">
      <label for="${e}-name" class="form-label">Наименование</label>
      <input id="${e}-name" class="form-control" type="text" required />
    </div>

    <div class="col-md-6">
      <label for="${e}-type" class="form-label">Тип на повеската</label>
      <select id="${e}-type" class="form-select" required>
        <option value="">Избери тип</option>
      </select>
    </div>

    <div class="col-md-6">
      <label for="${e}-schedule-keys" class="form-label">Ключ-Графици</label>
      <select id="${e}-schedule-keys" class="form-select" multiple required size="5"></select>
      <div class="form-text">Може да избереш един или повече ключ-графика.</div>
    </div>

    <div class="col-md-6">
      <label for="${e}-trains" class="form-label">Влакове</label>
      <select id="${e}-trains" class="form-select" multiple size="5"></select>
      <div class="form-text">Избери един или повече влака за тази повеска.</div>
    </div>

    <div class="col-md-6">
      <label for="${e}-start" class="form-label">Начало</label>
      <input id="${e}-start" class="form-control" type="time" required />
    </div>

    <div class="col-md-6">
      <label for="${e}-end" class="form-label">Край</label>
      <input id="${e}-end" class="form-control" type="time" required />
    </div>

    <div class="col-md-6 d-flex align-items-end">
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="${e}-second-day" />
        <label class="form-check-label" for="${e}-second-day">Втори ден</label>
      </div>
    </div>

    <div class="col-md-6">
      <label for="${e}-break-start" class="form-label">Начало на прекъсването</label>
      <input id="${e}-break-start" class="form-control" type="time" value="00:00" required />
    </div>

    <div class="col-md-6">
      <label for="${e}-break-end" class="form-label">Край на прекъсването</label>
      <input id="${e}-break-end" class="form-control" type="time" value="00:00" required />
    </div>

    <div class="col-12">
      <label for="${e}-notes" class="form-label">Бележки</label>
      <textarea id="${e}-notes" class="form-control" rows="3" placeholder="Въведи бележки (по избор)"></textarea>
    </div>
  `}function Gt(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ui=new Map;function Hp(e,t){const n=Ui.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ye(a);return}}};Ui.set(e,r),document.addEventListener("keydown",r)}function Ye(e){var t,n,r,s;e.classList.add("d-none"),(t=document.querySelector("#duty-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#duty-delete-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#duty-profile-modal"))!=null&&r.classList.contains("d-none"))&&((s=document.querySelector("#duty-attachment-preview-modal"))!=null&&s.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Fi(e){return e?typeof e=="string"?e.replace(".000000",""):String(e):"-"}function be(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Ur=20,te={allDuties:[],searchQuery:"",scheduleKeyFilter:"",dutyTypeFilter:"",currentPage:1};async function Ca(e){const{data:t,error:n}=await S.from("duties").select("id, name, notes, duty_files, duty_type_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))").order("display_order",{ascending:!0}).order("name",{ascending:!0});if(n){g(n.message,"error"),te.allDuties=[],mt(e,"Грешка при зареждане на повеските.");return}te.allDuties=t||[],mt(e)}function mt(e,t){const n=e.querySelector("#duties-table-body"),r=e.querySelector("#duties-empty"),s=e.querySelector("#duties-pagination"),a=e.querySelector("#duties-page-info"),i=e.querySelector("#duties-prev-page"),o=e.querySelector("#duties-next-page");zp(e),Wp(e);const d=te.allDuties.filter(m=>{var k;const h=(m.name||"").toLowerCase(),y=(((k=m.duty_types)==null?void 0:k.name)||"").toLowerCase(),f=ia(m).map(x=>x.toLowerCase()),b=Fp(m).join(" ").toLowerCase(),w=!te.searchQuery||h.includes(te.searchQuery)||b.includes(te.searchQuery),v=!te.scheduleKeyFilter||f.includes(te.scheduleKeyFilter),_=!te.dutyTypeFilter||y===te.dutyTypeFilter;return w&&v&&_});if(!d.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма въведени повески.",s.classList.add("d-none");return}r.classList.add("d-none");const l=Math.max(1,Math.ceil(d.length/Ur));te.currentPage>l&&(te.currentPage=l),te.currentPage<1&&(te.currentPage=1);const c=(te.currentPage-1)*Ur,u=c+Ur,p=d.slice(c,u);if(n.innerHTML=p.map(m=>{var v;const h=ia(m),y=Up(m);Bp(m);const f=Kp(m),b=`<span class="badge text-bg-info" title="${be(h.join(", "))}">${y.length} кл-гр</span>`,w=f>0?`<span class="badge text-bg-secondary" title="Прикачени файлове">${f} док.</span>`:"";return`
        <tr data-duty-id="${m.id}">
          <td>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${b}
              ${w}
              <span class="duties-name-ellipsis" title="${be(m.name??"-")}">${be(m.name??"-")}</span>
            </div>
          </td>
          <td>${be(((v=m.duty_types)==null?void 0:v.name)??"-")}</td>
          <td>${be(m.start_time??"-")}</td>
          <td>${be(m.end_time??"-")}</td>
          <td>${be(Fi(m.break_duration_interval))}</td>
          <td>${be(Fi(m.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${m.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${m.id}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duplicate"
                data-id="${m.id}"
              >
                Копирай
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${m.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),d.length<=Ur){s.classList.add("d-none");return}s.classList.remove("d-none"),a.textContent=`Страница ${te.currentPage} от ${l}`,i.disabled=te.currentPage<=1,o.disabled=te.currentPage>=l}function rl(e){return Array.isArray(e.schedule_key_duties)?e.schedule_key_duties:e.schedule_key_duties?[e.schedule_key_duties]:[]}function sl(e){return Array.isArray(e.duty_trains)?e.duty_trains:e.duty_trains?[e.duty_trains]:[]}function ia(e){const t=rl(e).map(n=>{var r;return(r=n==null?void 0:n.schedule_keys)==null?void 0:r.name}).filter(Boolean);return[...new Set(t)]}function Up(e){const t=rl(e).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean);return[...new Set(t)]}function Fp(e){const t=sl(e).map(n=>{var r;return(r=n==null?void 0:n.trains)==null?void 0:r.number}).filter(Boolean);return[...new Set(t)]}function Bp(e){const t=sl(e).map(n=>({trainId:n==null?void 0:n.train_id,sequenceOrder:Number.isFinite(Number(n==null?void 0:n.sequence_order))?Number(n.sequence_order):Number.MAX_SAFE_INTEGER})).filter(n=>!!n.trainId).sort((n,r)=>n.sequenceOrder-r.sequenceOrder);return[...new Set(t.map(n=>n.trainId))]}function Kp(e){const t=String((e==null?void 0:e.duty_files)||"").trim();if(!t)return 0;if(t.startsWith("["))try{const n=JSON.parse(t);if(Array.isArray(n))return n.filter(r=>String((r==null?void 0:r.url)||"").trim()).length}catch{return 1}return t.split(`
`).map(n=>n.trim()).filter(Boolean).length}function zp(e){const t=e.querySelector("#duties-type-filter");if(!t)return;const n=te.dutyTypeFilter||"",r=[...new Set(te.allDuties.map(s=>{var a;return String(((a=s==null?void 0:s.duty_types)==null?void 0:a.name)||"").trim()}).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${r.map(s=>`<option value="${be(s.toLowerCase())}">${be(s)}</option>`).join("")}
  `,t.value=n}function Wp(e){const t=e.querySelector("#duties-schedule-key-filter");if(!t)return;const n=te.scheduleKeyFilter||"",r=[...new Set(te.allDuties.flatMap(s=>ia(s)).map(s=>String(s||"").trim()).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${r.map(s=>`<option value="${be(s.toLowerCase())}">${be(s)}</option>`).join("")}
  `,t.value=n}const or="duty-files",lr=5;async function Vp(e){e.innerHTML=Np,Gp(e),Yp(e),await Qp(e),await Xp(e),await Jp(e),await Ca(e)}function Gp(e){const t=e.querySelector("#duty-form-fields");t&&(t.innerHTML=`
    ${aa({idPrefix:"duty"})}

    <div class="col-12">
      <label for="duty-attachment-file" class="form-label">Файлове</label>
      <input id="duty-attachment-file" class="form-control" type="file" multiple />
      <div class="form-text">Може да добавиш до ${lr} файла общо.</div>
    </div>

    <div id="duty-current-attachments-wrap" class="col-12 d-none">
      <label class="form-label">Текущи файлове</label>
      <div id="duty-current-attachments-links" class="d-flex flex-column gap-2"></div>
    </div>

    <input type="hidden" id="duty-existing-attachments" />
    <input type="hidden" id="duty-draft-attachments" />
  `)}async function Jp(e){const t=e.querySelector("#duty-trains"),{data:n,error:r}=await S.from("trains").select("id, number, origin_station, destination_station").order("number",{ascending:!0});if(r){g(dm(r),"error");return}const s=(n||[]).map(a=>{const i=`${a.origin_station||"-"} - ${a.destination_station||"-"}`;return`<option value="${a.id}">${be(a.number||"-")} (${be(i)})</option>`}).join("");t.innerHTML=s}async function Qp(e){const t=e.querySelector("#duty-type"),{data:n,error:r}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>`<option value="${a.id}">${be(a.name)}</option>`).join("");t.innerHTML='<option value="">Избери тип</option>'+s}function Yp(e){var T,q;const t=e.querySelector("#open-create-duty"),n=e.querySelector("#duty-form"),r=e.querySelector("#duty-cancel-btn"),s=e.querySelector("#duties-table-body"),a=e.querySelector("#duty-modal"),i=e.querySelector("#duty-delete-modal"),o=e.querySelector("#duty-profile-modal"),d=e.querySelector("#duty-attachment-preview-modal"),l=e.querySelector("#duty-modal-close"),c=e.querySelector("#duty-delete-confirm"),u=e.querySelector("#duty-delete-cancel"),p=e.querySelector("#duty-profile-close"),m=e.querySelector("#duty-profile-close-secondary"),h=e.querySelector("#duty-profile-duplicate"),y=e.querySelector("#duty-profile-edit"),f=e.querySelector("#duties-search"),b=e.querySelector("#duties-schedule-key-filter"),w=e.querySelector("#duties-type-filter"),v=e.querySelector("#duties-filter-reset"),_=e.querySelector("#duties-prev-page"),k=e.querySelector("#duties-next-page"),x=e.querySelector("#duty-attachment-file"),L=e.querySelector("#duty-current-attachments-links");t==null||t.addEventListener("click",()=>{Ra(e),Gt(a)}),n==null||n.addEventListener("submit",async E=>{E.preventDefault(),await Zp(e)}),r==null||r.addEventListener("click",()=>{Ye(a)}),l==null||l.addEventListener("click",()=>{Ye(a)}),u==null||u.addEventListener("click",()=>{Ye(i)}),p==null||p.addEventListener("click",()=>{Ye(o)}),m==null||m.addEventListener("click",()=>{Ye(o)}),(T=e.querySelector("#duty-profile-content"))==null||T.addEventListener("click",E=>{const $=E.target.closest('button[data-duty-profile-action="preview-attachment"]');if(!$)return;const A=String($.getAttribute("data-url")||"").trim(),C=String($.getAttribute("data-label")||"").trim();Bi(e,A,C)}),(q=e.querySelector("#duty-attachment-preview-close"))==null||q.addEventListener("click",()=>{sm(e)}),y==null||y.addEventListener("click",()=>{var $;const E=(($=o==null?void 0:o.dataset)==null?void 0:$.dutyId)||"";E&&(Ye(o),Ki(e,E))}),h==null||h.addEventListener("click",()=>{var $;const E=(($=o==null?void 0:o.dataset)==null?void 0:$.dutyId)||"";E&&(Ye(o),zi(e,E))}),f==null||f.addEventListener("input",E=>{te.searchQuery=E.target.value.trim().toLowerCase(),te.currentPage=1,mt(e)}),w==null||w.addEventListener("change",E=>{te.dutyTypeFilter=E.target.value||"",te.currentPage=1,mt(e)}),b==null||b.addEventListener("change",E=>{te.scheduleKeyFilter=E.target.value||"",te.currentPage=1,mt(e)}),v==null||v.addEventListener("click",()=>{te.searchQuery="",te.scheduleKeyFilter="",te.dutyTypeFilter="",te.currentPage=1,f&&(f.value=""),b&&(b.value=""),w&&(w.value=""),mt(e)}),_==null||_.addEventListener("click",()=>{te.currentPage-=1,mt(e)}),k==null||k.addEventListener("click",()=>{te.currentPage+=1,mt(e)}),x==null||x.addEventListener("change",()=>{var E;(E=x.files)!=null&&E.length&&x.files.length>lr&&(g(`Може да избереш до ${lr} файла наведнъж.`,"warning"),x.value="")}),L==null||L.addEventListener("input",E=>{const $=E.target.closest(".duty-existing-attachment-label");if(!$)return;const A=Number($.getAttribute("data-index"));if(!Number.isInteger(A)||A<0)return;const C=e.querySelector("#duty-draft-attachments"),R=Jt((C==null?void 0:C.value)||"");R[A]&&(R[A].label=$.value,C&&(C.value=dr(R)||""))}),L==null||L.addEventListener("click",E=>{const $=E.target.closest(".duty-existing-attachment-preview");if($){const K=String($.getAttribute("data-url")||"").trim(),H=String($.getAttribute("data-label")||"").trim();Bi(e,K,H);return}const A=E.target.closest(".duty-existing-attachment-remove");if(!A)return;const C=Number(A.getAttribute("data-index"));if(!Number.isInteger(C)||C<0)return;const R=e.querySelector("#duty-draft-attachments"),P=Jt((R==null?void 0:R.value)||"");P[C]&&(P.splice(C,1),Ia(e,P))}),Hp("duties",[d,o,i,a]),c==null||c.addEventListener("click",async()=>{const E=e.querySelector("#duty-delete-id").value;await em(E,e)}),s==null||s.addEventListener("click",async E=>{const $=E.target.closest("button[data-action]");if(!$)return;const A=$.getAttribute("data-action");if(A==="profile"){const C=$.getAttribute("data-id");cm(e,C);return}if(A==="edit"){const C=$.getAttribute("data-id");Ki(e,C);return}if(A==="duplicate"){const C=$.getAttribute("data-id");zi(e,C);return}if(A==="delete"){const C=$.getAttribute("data-id");e.querySelector("#duty-delete-id").value=C,Gt(i)}})}async function Xp(e){const t=e.querySelector("#duty-schedule-keys"),{data:n,error:r}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>`<option value="${a.id}">${be(a.name)}</option>`).join("");t.innerHTML=s}async function Zp(e){var z,Y;const t=e.querySelector("#duty-id"),n=e.querySelector("#duty-name"),r=e.querySelector("#duty-type"),s=e.querySelector("#duty-schedule-keys"),a=e.querySelector("#duty-trains"),i=Wn(e,"#duty-start","#duty-start-time"),o=Wn(e,"#duty-end","#duty-end-time"),d=e.querySelector("#duty-second-day"),l=Wn(e,"#duty-break-start","#duty-break-start-time"),c=Wn(e,"#duty-break-end","#duty-break-end-time"),u=e.querySelector("#duty-notes"),p=e.querySelector("#duty-attachment-file"),m=e.querySelector("#duty-existing-attachments"),h=e.querySelector("#duty-draft-attachments"),y=e.querySelector("#duty-save-btn"),f=n.value.trim(),b=r.value||null,w=Array.from(s.selectedOptions||[]).map(F=>F.value).filter(Boolean),v=Array.from(a.selectedOptions||[]).map(F=>F.value).filter(Boolean),_=w[0]||null,k=(i==null?void 0:i.value)||"",x=(o==null?void 0:o.value)||"",L=d.checked,T=(l==null?void 0:l.value)||"00:00",q=(c==null?void 0:c.value)||"00:00",E=u.value.trim()||null,$=Jt((m==null?void 0:m.value)||""),A=Jt((h==null?void 0:h.value)||""),C=Array.from((p==null?void 0:p.files)||[]),R=t.value;if(!f||!b||!k||!x){g("Моля, попълни всички задължителни полета.","warning");return}if(!w.length){g("Избери поне един ключ-график.","warning");return}const P=je(k,x);if(je(T,q)>P){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const H=y.innerHTML;y.disabled=!0,y.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const G=R||crypto.randomUUID(),N=ss(A),W=[];if(N.length+C.length>lr){y.disabled=!1,y.innerHTML=H,g(`Максимум ${lr} файла/линка за една повеска.`,"warning");return}if(C.length){const F=await rm(C,G);if(!F){y.disabled=!1,y.innerHTML=H;return}F.forEach(Q=>{Q!=null&&Q.url&&N.push({url:Q.url,label:Q.label||cr(Q.url,N.length)}),Q!=null&&Q.objectPath&&W.push(Q.objectPath)})}const de=ss(N),O={name:f,duty_type_id:b,schedule_key_id:_,start_time:k,end_time:x,second_day:L,break_start_time:T,break_end_time:q,notes:E,duty_files:dr(de)};let D,U=R||null;if(R)({error:D}=await S.from("duties").update(O).eq("id",R));else{const{data:F}=await S.auth.getUser(),Q=((z=F==null?void 0:F.user)==null?void 0:z.id)??((Y=F==null?void 0:F.user)==null?void 0:Y.email)??"web_app",ne=te.allDuties.reduce((re,$e)=>Math.max(re,Number($e.display_order)||0),0),{data:he,error:ie}=await S.from("duties").insert({...O,id:G,created_from:Q,display_order:ne+1}).select("id").single();D=ie,U=(he==null?void 0:he.id)??null}if(!D&&U&&(D=await tm(U,w)),!D&&U&&(D=await nm(U,v)),y.disabled=!1,y.innerHTML=H,D){W.length&&await ur(W),g(D.message,"error");return}if(R){const F=$.map(ie=>oa(ie.url)).filter(Boolean),Q=de.map(ie=>oa(ie.url)).filter(Boolean),ne=new Set(Q),he=F.filter(ie=>!ne.has(ie));he.length&&await ur(he)}g(R?"Повеската е обновена.":"Повеската е създадена.","success"),Ye(e.querySelector("#duty-modal")),Ra(e),await Ca(e)}function al(e,t){const n=Jt(t.dutyFiles);e.querySelector("#duty-id").value=t.id,e.querySelector("#duty-name").value=t.name??"",e.querySelector("#duty-type").value=t.dutyTypeId??"";const r=e.querySelector("#duty-schedule-keys"),s=t.scheduleKeyIds||[];Array.from(r.options).forEach(o=>{o.selected=s.includes(o.value)});const a=e.querySelector("#duty-trains"),i=t.trainIds||[];Array.from(a.options).forEach(o=>{o.selected=i.includes(o.value)}),wt(e,t.startTime??"","#duty-start","#duty-start-time"),wt(e,t.endTime??"","#duty-end","#duty-end-time"),e.querySelector("#duty-second-day").checked=!!t.secondDay,wt(e,Vt(t.breakStartTime),"#duty-break-start","#duty-break-start-time"),wt(e,Vt(t.breakEndTime),"#duty-break-end","#duty-break-end-time"),e.querySelector("#duty-notes").value=t.notes??"",e.querySelector("#duty-existing-attachments").value=dr(n)||"",e.querySelector("#duty-draft-attachments").value=dr(n)||"",e.querySelector("#duty-attachment-file").value="",Ia(e,n),e.querySelector("#duty-form-title").textContent="Редакция на Повеска",e.querySelector("#duty-save-btn").textContent="Запази"}function Ra(e){e.querySelector("#duty-id").value="",e.querySelector("#duty-name").value="",e.querySelector("#duty-type").value="";const t=e.querySelector("#duty-schedule-keys");Array.from(t.options).forEach(r=>{r.selected=!1});const n=e.querySelector("#duty-trains");Array.from(n.options).forEach(r=>{r.selected=!1}),wt(e,"","#duty-start","#duty-start-time"),wt(e,"","#duty-end","#duty-end-time"),e.querySelector("#duty-second-day").checked=!1,wt(e,"00:00","#duty-break-start","#duty-break-start-time"),wt(e,"00:00","#duty-break-end","#duty-break-end-time"),e.querySelector("#duty-notes").value="",e.querySelector("#duty-existing-attachments").value="",e.querySelector("#duty-draft-attachments").value="",e.querySelector("#duty-attachment-file").value="",Ia(e,[]),e.querySelector("#duty-form-title").textContent="Нова Повеска",e.querySelector("#duty-save-btn").textContent="Създай"}async function em(e,t){const n=t.querySelector("#duty-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{data:s,error:a}=await S.from("duties").select("duty_files").eq("id",e).maybeSingle();if(a){n.disabled=!1,n.innerHTML=r,g(a.message,"error");return}const{error:i}=await S.from("duties").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,i){g(i.message,"error");return}const o=Jt(s==null?void 0:s.duty_files).map(d=>oa(d.url)).filter(Boolean);o.length&&await ur(o),g("Повеската е изтрита.","success"),Ye(t.querySelector("#duty-delete-modal")),Ra(t),await Ca(t)}async function tm(e,t){const{error:n}=await S.from("schedule_key_duties").delete().eq("duty_id",e);if(n)return n;const r=t.map(a=>({duty_id:e,schedule_key_id:a})),{error:s}=await S.from("schedule_key_duties").insert(r);return s}async function nm(e,t){const{error:n}=await S.from("duty_trains").delete().eq("duty_id",e);if(n)return n;if(!t.length)return null;const r=t.map((a,i)=>({duty_id:e,train_id:a,sequence_order:i+1})),{error:s}=await S.from("duty_trains").insert(r);return s}function Ia(e,t){const n=e.querySelector("#duty-current-attachments-wrap"),r=e.querySelector("#duty-current-attachments-links"),s=e.querySelector("#duty-draft-attachments");if(!n||!r||!s)return;const a=ss(t);if(s.value=dr(a)||"",!a.length){n.classList.add("d-none"),r.innerHTML="";return}n.classList.remove("d-none"),r.innerHTML=a.map((i,o)=>{const d=i.label||cr(i.url,o);return`
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${be(i.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none duty-existing-attachment-preview"
                data-url="${be(i.url)}"
                data-label="${be(d)}"
                title="Преглед"
                aria-label="Преглед"
              >
                👁
              </button>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger duty-existing-attachment-remove"
              data-index="${o}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm duty-existing-attachment-label"
            data-index="${o}"
            value="${be(d)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `}).join("")}function Jt(e){if(Array.isArray(e))return e.map((n,r)=>Jr(n,r)).filter(n=>n.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const n=JSON.parse(t);if(Array.isArray(n))return n.map((r,s)=>Jr(r,s)).filter(r=>r.url)}catch{return[{url:t,label:cr(t,0)}]}return t.split(`
`).map((n,r)=>Jr(n,r)).filter(n=>n.url)}function Jr(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const r=String(e.url||"").trim(),s=String(e.label||"").trim()||cr(r,t);return{url:r,label:s}}const n=String(e||"").trim();return{url:n,label:cr(n,t)}}function dr(e){const t=ss(e);return t.length?JSON.stringify(t):""}function ss(e){const t=[],n=new Set;for(const r of e||[]){const s=Jr(r,t.length);if(!s.url)continue;const a=s.url.toLowerCase();n.has(a)||(n.add(a),t.push(s))}return t}function cr(e,t){const n=String(e||"").trim();if(!n)return`Файл ${t+1}`;try{const s=new URL(n).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}async function rm(e,t){var r;if(!Array.isArray(e)||!e.length||!t)return[];const n=[];for(const s of e){const i=(((r=s.name)==null?void 0:r.split(".").pop())||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf",o=Math.random().toString(36).slice(2,10),d=`${t}/${Date.now()}-${o}.${i}`,{error:l}=await S.storage.from(or).upload(d,s,{upsert:!0,contentType:s.type||void 0});if(l)return n.length&&await ur(n.map(u=>u.objectPath)),g(l.message,"error"),null;const{data:c}=S.storage.from(or).getPublicUrl(d);if(!(c!=null&&c.publicUrl))return await ur([d,...n.map(u=>u.objectPath)]),g("Файлът е качен, но не успях да генерирам публичен линк.","error"),null;n.push({url:c.publicUrl,label:s.name||"",objectPath:d})}return n}function oa(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t)){const n=t.replace(/^\/+/,""),r=`${or}/`;return n.startsWith(r)?n.slice(r.length):""}try{const n=new URL(t),r=`/storage/v1/object/public/${or}/`,s=n.pathname.indexOf(r);return s===-1?"":decodeURIComponent(n.pathname.slice(s+r.length))}catch{return""}}async function ur(e){const t=Array.from(new Set((e||[]).filter(Boolean)));t.length&&await S.storage.from(or).remove(t)}function Bi(e,t,n){const r=e.querySelector("#duty-attachment-preview-modal"),s=e.querySelector("#duty-attachment-preview-frame"),a=e.querySelector("#duty-attachment-preview-text-wrap"),i=e.querySelector("#duty-attachment-preview-text"),o=e.querySelector("#duty-attachment-preview-csv-wrap"),d=e.querySelector("#duty-attachment-preview-csv-note"),l=e.querySelector("#duty-attachment-preview-csv-head"),c=e.querySelector("#duty-attachment-preview-csv-body"),u=e.querySelector("#duty-attachment-preview-title"),p=e.querySelector("#duty-attachment-preview-fallback"),m=e.querySelector("#duty-attachment-preview-open");if(!r||!s||!a||!i||!o||!d||!l||!c||!u||!p||!m)return;const h=String(t||"").trim();if(!h){g("Липсва линк за преглед.","warning");return}const y=lm(h),f=la(h),b=f==="csv",w=["txt","csv","json"].includes(f);u.textContent=n?`Преглед: ${n}`:"Преглед на файл",m.setAttribute("href",h),p.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),d.textContent="",l.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",b?(o.classList.remove("d-none"),s.classList.add("d-none"),am(h,l,c,d,p)):w?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",om(h,i,p)):(s.src=y,s.onload=()=>{if(y!==h){p.classList.add("d-none");return}const v=la(h),_=["doc","docx","xls","xlsx","ppt","pptx"].includes(v);p.classList.toggle("d-none",!_)},s.onerror=()=>{p.classList.remove("d-none")}),Gt(r)}function sm(e){const t=e.querySelector("#duty-attachment-preview-modal"),n=e.querySelector("#duty-attachment-preview-frame"),r=e.querySelector("#duty-attachment-preview-text-wrap"),s=e.querySelector("#duty-attachment-preview-text"),a=e.querySelector("#duty-attachment-preview-csv-wrap"),i=e.querySelector("#duty-attachment-preview-csv-note"),o=e.querySelector("#duty-attachment-preview-csv-head"),d=e.querySelector("#duty-attachment-preview-csv-body"),l=e.querySelector("#duty-attachment-preview-fallback"),c=e.querySelector("#duty-attachment-preview-open");!t||!n||!r||!s||!a||!i||!o||!d||!l||!c||(n.src="about:blank",n.classList.remove("d-none"),r.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",d.innerHTML="",c.setAttribute("href","#"),l.classList.add("d-none"),Ye(t))}async function am(e,t,n,r,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=im(i);if(!o.length){t.innerHTML="",n.innerHTML="",r.textContent="Файлът е празен.",s.classList.add("d-none");return}const d=200,l=o.slice(0,d),c=l[0]||[],u=l.slice(1);t.innerHTML=`
      <tr>${c.map(p=>`<th>${be(p)}</th>`).join("")}</tr>
    `,n.innerHTML=u.map(p=>`<tr>${p.map(m=>`<td>${be(m)}</td>`).join("")}</tr>`).join(""),o.length>d?r.textContent=`Показани са първите ${d} реда от общо ${o.length}.`:r.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",n.innerHTML="",r.textContent="",s.classList.remove("d-none")}}function im(e){const t=[];let n=[],r="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(r+='"',a+=1):s=!s;continue}if(!s&&i===","){n.push(r),r="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),n.push(r),t.push(n),n=[],r="";continue}r+=i}return(r.length||n.length)&&(n.push(r),t.push(n)),t}async function om(e,t,n){try{const r=await fetch(e,{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.text();t.textContent=s||"(Празен файл)",n.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",n.classList.remove("d-none")}}function lm(e){const t=la(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function la(e){const t=String(e||"").trim();if(!t)return"";try{const r=new URL(t).pathname.split("/").pop()||"",s=r.includes(".")?r.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}function dm(e){const t=String((e==null?void 0:e.message)||"").trim(),n=t.toLowerCase(),r=n.includes("row-level security")||n.includes("violates row-level security policy")||String((e==null?void 0:e.code)||"")==="42501";return r&&n.includes("duty_trains")?"Нямаш права да свързваш влакове към повески. Свържи се с администратор.":r&&n.includes("duties")?"Нямаш права да създаваш или редактираш повески. Свържи се с администратор.":r?"Достъпът е ограничен от права за сигурност (RLS).":t||"Възникна неочаквана грешка."}function cm(e,t){const n=te.allDuties.find(c=>c.id===t),r=e.querySelector("#duty-profile-content"),s=e.querySelector("#duty-profile-modal"),a=e.querySelector("#duty-profile-duplicate"),i=e.querySelector("#duty-profile-edit");if(!r||!s)return;if(!n){s.dataset.dutyId="",i&&(i.disabled=!0),a&&(a.disabled=!0),r.innerHTML='<p class="text-secondary mb-0">Няма данни за тази повеска.</p>',Gt(s);return}s.dataset.dutyId=n.id,i&&(i.disabled=!1),a&&(a.disabled=!1);const o=um(n),d=pm(n),l=Jt(n==null?void 0:n.duty_files);r.innerHTML=nl({duty:n,scheduleKeyNames:o,trainNumbers:d,attachmentEntries:l,escapeHtml:be,intervalToTimeInput:Vt,formatInterval:mm}),Gt(s)}function Ki(e,t){const n=te.allDuties.find(r=>r.id===t);if(!n){g("Не е намерена повеска за редакция.","warning");return}al(e,{id:n.id,name:n.name||"",dutyTypeId:n.duty_type_id||"",scheduleKeyIds:il(n),trainIds:ol(n),startTime:as(n.start_time),endTime:as(n.end_time),secondDay:!!n.second_day,breakStartTime:n.break_start_time||"00:00:00",breakEndTime:n.break_end_time||"00:00:00",notes:n.notes||"",dutyFiles:n.duty_files||""}),Gt(e.querySelector("#duty-modal"))}function zi(e,t){const n=te.allDuties.find(r=>r.id===t);if(!n){g("Не е намерена повеска за копиране.","warning");return}al(e,{id:"",name:n.name?`${n.name} (копие)`:"",dutyTypeId:n.duty_type_id||"",scheduleKeyIds:il(n),trainIds:ol(n),startTime:as(n.start_time),endTime:as(n.end_time),secondDay:!!n.second_day,breakStartTime:n.break_start_time||"00:00:00",breakEndTime:n.break_end_time||"00:00:00",notes:n.notes||"",dutyFiles:n.duty_files||""}),e.querySelector("#duty-id").value="",e.querySelector("#duty-form-title").textContent="Нова Повеска (копие)",e.querySelector("#duty-save-btn").textContent="Създай",Gt(e.querySelector("#duty-modal"))}function um(e){const n=(Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]).map(r=>{var s;return(s=r==null?void 0:r.schedule_keys)==null?void 0:s.name}).filter(Boolean);return[...new Set(n)]}function il(e){const n=(Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]).map(r=>r==null?void 0:r.schedule_key_id).filter(Boolean);return[...new Set(n)]}function pm(e){return(Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]).map(n=>{var r;return{number:(r=n==null?void 0:n.trains)==null?void 0:r.number,sequenceOrder:Number.isFinite(Number(n==null?void 0:n.sequence_order))?Number(n.sequence_order):Number.MAX_SAFE_INTEGER}}).filter(n=>!!n.number).sort((n,r)=>n.sequenceOrder-r.sequenceOrder).map(n=>n.number).filter((n,r,s)=>s.indexOf(n)===r)}function ol(e){return(Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]).map(n=>({id:n==null?void 0:n.train_id,sequenceOrder:Number.isFinite(Number(n==null?void 0:n.sequence_order))?Number(n.sequence_order):Number.MAX_SAFE_INTEGER})).filter(n=>!!n.id).sort((n,r)=>n.sequenceOrder-r.sequenceOrder).map(n=>n.id).filter((n,r,s)=>s.indexOf(n)===r)}function as(e){return e?String(e).slice(0,5):""}function Wn(e,...t){for(const n of t){const r=e.querySelector(n);if(r)return r}return null}function wt(e,t,...n){const r=Wn(e,...n);r&&(r.value=t)}function mm(e){return e?String(e).replace(".000000",""):"-"}const hm=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Служители</h1>\r
      <button id="open-create-employee" type="button" class="btn btn-primary"><i class="bi bi-person-plus me-1"></i>Нов служител</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на служители и срокове на документи.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="employees-filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="employees-search" class="form-label">Търсене</label>\r
          <input id="employees-search" type="text" class="form-control" placeholder="Търси по име или позиция" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employees-position-filter" class="form-label">Позиция</label>\r
          <select id="employees-position-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employees-active-filter" class="form-label">Активен</label>\r
          <select id="employees-active-filter" class="form-select">\r
            <option value="">Всички</option>\r
            <option value="true">Да</option>\r
            <option value="false">Не</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Име</th>\r
            <th>Свързан профил</th>\r
            <th>Позиция</th>\r
            <th>Активен</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="employees-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="employees-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="employees-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="employees-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="employees-pagination-label" class="text-secondary small"></div>\r
      <button id="employees-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="employee-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="employee-form-title" class="h5 mb-0">Нов служител</h2>\r
          <button id="employee-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="employee-form">\r
          <input type="hidden" id="employee-id" />\r
          <input type="hidden" id="employee-photo-path" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="employee-first-name" class="form-label">Име</label>\r
              <input id="employee-first-name" class="form-control" type="text" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-last-name" class="form-label">Фамилия</label>\r
              <input id="employee-last-name" class="form-control" type="text" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-position" class="form-label">Позиция</label>\r
              <select id="employee-position" class="form-select">\r
                <option value="">Без позиция</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6 d-flex align-items-end">\r
              <div class="form-check mb-2">\r
                <input class="form-check-input" type="checkbox" id="employee-active" checked />\r
                <label class="form-check-label" for="employee-active">Активен</label>\r
              </div>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="employee-psych-expiry" class="form-label">Психологическа оценка</label>\r
              <input id="employee-psych-expiry" class="form-control" type="date" />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="employee-medical-expiry" class="form-label">Медицинско свидетелство</label>\r
              <input id="employee-medical-expiry" class="form-control" type="date" />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="employee-license-expiry" class="form-label">Лиценз</label>\r
              <input id="employee-license-expiry" class="form-control" type="date" />\r
            </div>\r
\r
            <div class="col-12">\r
              <label for="employee-photo-file" class="form-label">Снимка</label>\r
              <input id="employee-photo-file" class="form-control" type="file" accept="image/*" />\r
              <div class="d-flex justify-content-between align-items-center mt-2">\r
                <div class="form-text m-0">Избери изображение (jpg, png, webp).</div>\r
                <button id="employee-photo-remove-btn" type="button" class="btn btn-sm btn-outline-secondary">Премахни снимка</button>\r
              </div>\r
            </div>\r
\r
            <div class="col-12">\r
              <div class="border rounded p-3 text-center bg-light">\r
                <img\r
                  id="employee-photo-preview"\r
                  src=""\r
                  alt="Преглед на снимка"\r
                  class="img-thumbnail d-none"\r
                  style="max-height: 160px; object-fit: cover;"\r
                />\r
                <div id="employee-photo-preview-empty" class="small text-secondary">Няма избрана снимка</div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="employee-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="employee-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="employee-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този служител?</p>\r
        <input type="hidden" id="employee-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="employee-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="employee-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="employee-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="employee-profile-title" class="h5 mb-0">Профил на служител</h2>\r
          <button id="employee-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div class="row g-3">\r
          <div class="col-12">\r
            <div class="text-center">\r
              <img\r
                id="employee-profile-photo"\r
                src=""\r
                alt="Снимка на служителя"\r
                class="img-thumbnail d-none"\r
                style="max-height: 180px; object-fit: cover;"\r
              />\r
              <div id="employee-profile-photo-empty" class="small text-secondary">Няма снимка</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Име</div>\r
            <div id="employee-profile-name" class="fw-semibold">-</div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Позиция</div>\r
            <div id="employee-profile-position">-</div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Активен</div>\r
            <div id="employee-profile-active">-</div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Свързани профили</div>\r
            <div id="employee-profile-linked-profiles">-</div>\r
          </div>\r
          <div class="col-md-4">\r
            <div class="small text-secondary">Психологическа оценка</div>\r
            <div id="employee-profile-psych">-</div>\r
          </div>\r
          <div class="col-md-4">\r
            <div class="small text-secondary">Медицинско свидетелство</div>\r
            <div id="employee-profile-medical">-</div>\r
          </div>\r
          <div class="col-md-4">\r
            <div class="small text-secondary">Лиценз</div>\r
            <div id="employee-profile-license">-</div>\r
          </div>\r
          <div class="col-12">\r
            <div class="small text-secondary">Други сертификати</div>\r
            <pre id="employee-profile-certificates" class="bg-light border rounded p-3 mb-0" style="white-space: pre-wrap;">-</pre>\r
          </div>\r
        </div>\r
\r
        <div class="d-flex justify-content-end mt-4">\r
          <button id="employee-profile-close-btn" type="button" class="btn btn-outline-secondary">Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Qr(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Wi=new Map;function fm(e,t){const n=Wi.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){gt(a);return}}};Wi.set(e,r),document.addEventListener("keydown",r)}function gt(e){var t,n,r;e.classList.add("d-none"),(t=document.querySelector("#employee-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#employee-delete-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#employee-profile-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Fe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const ye={rows:[],searchQuery:"",positionFilter:"",activeFilter:"",page:1,pageSize:20};async function Pa(e){const{data:t,error:n}=await S.from("employees").select("id, first_name, last_name, position_id, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, positions(title), user_profiles(id, username)").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){g(n.message,"error"),ye.rows=[],_t(e,"Грешка при зареждане на служители.");return}ye.rows=t||[],_t(e)}function _t(e,t){const n=e.querySelector("#employees-table-body"),r=e.querySelector("#employees-empty");ym(e),He(e,{rootSelector:"#employees-pagination",prevSelector:"#employees-pagination-prev",nextSelector:"#employees-pagination-next",onPrev:()=>{ye.page=Math.max(1,(ye.page||1)-1),_t(e)},onNext:()=>{ye.page=(ye.page||1)+1,_t(e)}});const s=ye.rows.filter(l=>{var y;const c=`${l.first_name||""} ${l.last_name||""}`.toLowerCase(),u=(((y=l.positions)==null?void 0:y.title)||"").toLowerCase(),p=!ye.searchQuery||c.includes(ye.searchQuery)||u.includes(ye.searchQuery),m=!ye.positionFilter||u===ye.positionFilter,h=!ye.activeFilter||String(!!l.is_active)===ye.activeFilter;return p&&m&&h}),{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,ye.page,ye.pageSize);if(ye.page=i,ke(e,{rootSelector:"#employees-pagination",prevSelector:"#employees-pagination-prev",nextSelector:"#employees-pagination-next",labelSelector:"#employees-pagination-label",page:i,totalItems:o,totalPages:d}),!s.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма въведени служители.";return}r.classList.add("d-none"),n.innerHTML=a.map(l=>{var p;const c=Array.isArray(l.user_profiles)?l.user_profiles:l.user_profiles?[l.user_profiles]:[],u=c.length?c.map(m=>{const h=(m==null?void 0:m.username)||(m==null?void 0:m.id)||"";return h||""}).filter(Boolean).join(", "):"-";return`
        <tr data-employee-id="${l.id}">
          <td>${Fe(l.first_name??"")} ${Fe(l.last_name??"")}</td>
          <td>${Fe(u)}</td>
          <td>${Fe(((p=l.positions)==null?void 0:p.title)??"-")}</td>
          <td>${l.is_active?"Да":"Не"}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${l.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${l.id}"
                data-first-name="${Fe(l.first_name??"")}"
                data-last-name="${Fe(l.last_name??"")}"
                data-position-id="${l.position_id??""}"
                data-active="${l.is_active?"true":"false"}"
                data-photo-url="${Fe(l.photo_url??"")}"
                data-psych-expiry="${Fe(l.psychological_assessment_expiry??"")}"
                data-medical-expiry="${Fe(l.medical_certificate_expiry??"")}"
                data-license-expiry="${Fe(l.license_expiry??"")}"
              >
                Редакция
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function ym(e){const t=e.querySelector("#employees-position-filter");if(!t)return;const n=ye.positionFilter||"",r=[...new Set(ye.rows.map(s=>{var a;return String(((a=s==null?void 0:s.positions)==null?void 0:a.title)||"").trim()}).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${r.map(s=>`<option value="${Fe(s.toLowerCase())}">${Fe(s)}</option>`).join("")}
  `,t.value=n}const Vi="employee-photos";let In=null;async function bm(e){e.innerHTML=hm,gm(e),await wm(e),await Pa(e);const t=vm();t&&await ll(e,t)}function vm(){return new URLSearchParams(window.location.search).get("profile")||""}function gm(e){const t=e.querySelector("#open-create-employee"),n=e.querySelector("#employee-form"),r=e.querySelector("#employee-cancel-btn"),s=e.querySelector("#employees-table-body"),a=e.querySelector("#employee-modal"),i=e.querySelector("#employee-delete-modal"),o=e.querySelector("#employee-profile-modal"),d=e.querySelector("#employee-modal-close"),l=e.querySelector("#employee-profile-close"),c=e.querySelector("#employee-profile-close-btn"),u=e.querySelector("#employee-delete-confirm"),p=e.querySelector("#employee-delete-cancel"),m=e.querySelector("#employees-search"),h=e.querySelector("#employees-position-filter"),y=e.querySelector("#employees-active-filter"),f=e.querySelector("#employees-filter-reset"),b=e.querySelector("#employee-photo-file"),w=e.querySelector("#employee-photo-remove-btn");t==null||t.addEventListener("click",()=>{Da(e),Qr(a)}),n==null||n.addEventListener("submit",async v=>{v.preventDefault(),await _m(e)}),r==null||r.addEventListener("click",()=>{gt(a)}),d==null||d.addEventListener("click",()=>{gt(a)}),p==null||p.addEventListener("click",()=>{gt(i)}),l==null||l.addEventListener("click",()=>{gt(o)}),c==null||c.addEventListener("click",()=>{gt(o)}),m==null||m.addEventListener("input",v=>{ye.searchQuery=v.target.value.trim().toLowerCase(),_t(e)}),h==null||h.addEventListener("change",v=>{ye.positionFilter=v.target.value||"",_t(e)}),y==null||y.addEventListener("change",v=>{ye.activeFilter=v.target.value||"",_t(e)}),f==null||f.addEventListener("click",()=>{ye.searchQuery="",ye.positionFilter="",ye.activeFilter="",m&&(m.value=""),h&&(h.value=""),y&&(y.value=""),_t(e)}),b==null||b.addEventListener("change",()=>{var _,k,x,L;const v=((_=b.files)==null?void 0:_[0])??null;if(!v){const T=((k=e.querySelector("#employee-photo-path"))==null?void 0:k.value)||"";bn(e,T);return}if(!((x=v.type)!=null&&x.startsWith("image/"))){g("Избери валиден файл с изображение.","warning"),b.value="";const T=((L=e.querySelector("#employee-photo-path"))==null?void 0:L.value)||"";bn(e,T);return}bn(e,v)}),w==null||w.addEventListener("click",()=>{const v=e.querySelector("#employee-photo-path");v&&(v.value=""),b&&(b.value=""),bn(e,null)}),fm("employees",[i,o,a]),u==null||u.addEventListener("click",async()=>{const v=e.querySelector("#employee-delete-id").value;await xm(v,e)}),s==null||s.addEventListener("click",async v=>{const _=v.target.closest("button[data-action]");if(!_)return;const k=_.getAttribute("data-action");if(k==="profile"){const x=_.getAttribute("data-id");await ll(e,x);return}if(k==="edit"){Sm(e,{id:_.getAttribute("data-id"),firstName:_.getAttribute("data-first-name"),lastName:_.getAttribute("data-last-name"),positionId:_.getAttribute("data-position-id"),isActive:_.getAttribute("data-active")==="true",psychExpiry:_.getAttribute("data-psych-expiry"),medicalExpiry:_.getAttribute("data-medical-expiry"),licenseExpiry:_.getAttribute("data-license-expiry"),photoUrl:_.getAttribute("data-photo-url")}),Qr(a);return}if(k==="delete"){const x=_.getAttribute("data-id");e.querySelector("#employee-delete-id").value=x,Qr(i)}})}async function ll(e,t){var c;const{data:n,error:r}=await S.from("employees").select("id, first_name, last_name, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, other_certificates, positions(title), user_profiles(id, username)").eq("id",t).maybeSingle();if(r||!n){g((r==null?void 0:r.message)||"Служителят не е намерен.","error");return}const s=Array.isArray(n.user_profiles)?n.user_profiles:n.user_profiles?[n.user_profiles]:[],a=s.length?s.map(u=>{const p=(u==null?void 0:u.username)||(u==null?void 0:u.id)||"";return p||""}).filter(Boolean).join(", "):"-",i=n.other_certificates?JSON.stringify(n.other_certificates,null,2):"-",o=dl(n.photo_url),d=e.querySelector("#employee-profile-photo"),l=e.querySelector("#employee-profile-photo-empty");d&&l&&(o?(d.src=o,d.classList.remove("d-none"),l.classList.add("d-none")):(d.src="",d.classList.add("d-none"),l.classList.remove("d-none"))),e.querySelector("#employee-profile-name").textContent=`${n.first_name??""} ${n.last_name??""}`.trim()||"-",e.querySelector("#employee-profile-position").textContent=((c=n.positions)==null?void 0:c.title)||"-",e.querySelector("#employee-profile-active").textContent=n.is_active?"Да":"Не",e.querySelector("#employee-profile-linked-profiles").textContent=a,e.querySelector("#employee-profile-psych").textContent=n.psychological_assessment_expiry||"-",e.querySelector("#employee-profile-medical").textContent=n.medical_certificate_expiry||"-",e.querySelector("#employee-profile-license").textContent=n.license_expiry||"-",e.querySelector("#employee-profile-certificates").textContent=i,Qr(e.querySelector("#employee-profile-modal"))}function dl(e){if(!e)return null;const t=String(e).trim();if(!t)return null;if(/^https?:\/\//i.test(t))return t;const n=t.replace(/^\/+/,""),r=["employee-photos","employees","employee_photos"],s=[],a=n.split("/");if(a.length>1){const o=a[0],d=a.slice(1).join("/");s.push({bucket:o,objectPath:d})}r.forEach(o=>{s.push({bucket:o,objectPath:n})});const i=new Set;for(const o of s){const d=`${o.bucket}/${o.objectPath}`;if(i.has(d)||!o.bucket||!o.objectPath)continue;i.add(d);const{data:l}=S.storage.from(o.bucket).getPublicUrl(o.objectPath);if(l!=null&&l.publicUrl)return l.publicUrl}return null}async function wm(e){const t=e.querySelector("#employee-position"),{data:n,error:r}=await S.from("positions").select("id, title").order("title",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>`<option value="${a.id}">${Fe(a.title)}</option>`).join("");t.innerHTML='<option value="">Без позиция</option>'+s}async function _m(e){var $,A,C;const t=e.querySelector("#employee-id"),n=e.querySelector("#employee-first-name"),r=e.querySelector("#employee-last-name"),s=e.querySelector("#employee-position"),a=e.querySelector("#employee-active"),i=e.querySelector("#employee-psych-expiry"),o=e.querySelector("#employee-medical-expiry"),d=e.querySelector("#employee-license-expiry"),l=e.querySelector("#employee-photo-file"),c=e.querySelector("#employee-photo-path"),u=e.querySelector("#employee-save-btn"),p=n.value.trim(),m=r.value.trim(),h=s.value||null,y=a.checked,f=i.value||null,b=o.value||null,w=d.value||null,v=(($=l.files)==null?void 0:$[0])??null,_=c.value.trim()||null,k=t.value;if(!p||!m){g("Моля, попълни име и фамилия.","warning");return}const x=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const L={first_name:p,last_name:m,position_id:h,is_active:y,psychological_assessment_expiry:f,medical_certificate_expiry:b,license_expiry:w,updated_at:new Date().toISOString()};if(v&&!((A=v.type)!=null&&A.startsWith("image/"))){u.disabled=!1,u.innerHTML=x,g("Избери валиден файл с изображение.","warning");return}let T,q=k||null,E=_;if(k){if(v){const R=await Gi(v,k);if(!R){u.disabled=!1,u.innerHTML=x;return}E=R}L.photo_url=E,{error:T}=await S.from("employees").update(L).eq("id",k)}else{const{data:R}=await S.auth.getUser(),P=((C=R==null?void 0:R.user)==null?void 0:C.email)??"web_app",{data:K,error:H}=await S.from("employees").insert({...L,created_from:P}).select("id").single();if(T=H,q=(K==null?void 0:K.id)??null,!T&&q&&v){const G=await Gi(v,q);if(!G){u.disabled=!1,u.innerHTML=x;return}const{error:N}=await S.from("employees").update({photo_url:G,updated_at:new Date().toISOString()}).eq("id",q);T=N,E=G}}if(u.disabled=!1,u.innerHTML=x,T){g(T.message,"error");return}g(k?"Служителят е обновен.":"Служителят е създаден.","success"),gt(e.querySelector("#employee-modal")),Da(e),await Pa(e)}function Sm(e,t){e.querySelector("#employee-id").value=t.id,e.querySelector("#employee-first-name").value=t.firstName??"",e.querySelector("#employee-last-name").value=t.lastName??"",e.querySelector("#employee-position").value=t.positionId??"",e.querySelector("#employee-active").checked=!!t.isActive,e.querySelector("#employee-psych-expiry").value=t.psychExpiry??"",e.querySelector("#employee-medical-expiry").value=t.medicalExpiry??"",e.querySelector("#employee-license-expiry").value=t.licenseExpiry??"",e.querySelector("#employee-photo-path").value=t.photoUrl??"",e.querySelector("#employee-photo-file").value="",bn(e,t.photoUrl??null),e.querySelector("#employee-form-title").textContent="Редакция на служител",e.querySelector("#employee-save-btn").textContent="Запази"}function Da(e){e.querySelector("#employee-id").value="",e.querySelector("#employee-first-name").value="",e.querySelector("#employee-last-name").value="",e.querySelector("#employee-position").value="",e.querySelector("#employee-active").checked=!0,e.querySelector("#employee-psych-expiry").value="",e.querySelector("#employee-medical-expiry").value="",e.querySelector("#employee-license-expiry").value="",e.querySelector("#employee-photo-path").value="",e.querySelector("#employee-photo-file").value="",bn(e,null),e.querySelector("#employee-form-title").textContent="Нов служител",e.querySelector("#employee-save-btn").textContent="Създай"}async function xm(e,t){const n=t.querySelector("#employee-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("employees").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,s){g(s.message,"error");return}g("Служителят е изтрит.","success"),gt(t.querySelector("#employee-delete-modal")),Da(t),await Pa(t)}async function Gi(e,t){var o;if(!e||!t)return null;const r=(((o=e.name)==null?void 0:o.split(".").pop())||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg",s=Math.random().toString(36).slice(2,10),a=`${t}/${Date.now()}-${s}.${r}`,{error:i}=await S.storage.from(Vi).upload(a,e,{upsert:!0,contentType:e.type||void 0});return i?(g(i.message,"error"),null):`${Vi}/${a}`}function bn(e,t){const n=e.querySelector("#employee-photo-preview"),r=e.querySelector("#employee-photo-preview-empty");if(!n||!r)return;if(In&&(URL.revokeObjectURL(In),In=null),!t){n.src="",n.classList.add("d-none"),r.classList.remove("d-none");return}if(t instanceof File){In=URL.createObjectURL(t),n.src=In,n.classList.remove("d-none"),r.classList.add("d-none");return}const s=dl(t);if(!s){n.src="",n.classList.add("d-none"),r.classList.remove("d-none");return}n.src=s,n.classList.remove("d-none"),r.classList.add("d-none")}const km=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Отсъствия</h1>\r
      <button id="open-create-employee-absence" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Ново отсъствие</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на отсъствия на служители.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="employee-absences-filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="employee-absences-search" class="form-label">Търсене</label>\r
          <input id="employee-absences-search" type="text" class="form-control" placeholder="Търси по служител, причина, период или бележки" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employee-absences-date-from" class="form-label">От дата</label>\r
          <input id="employee-absences-date-from" type="date" class="form-control" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employee-absences-date-to" class="form-label">До дата</label>\r
          <input id="employee-absences-date-to" type="date" class="form-control" />\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Служител</th>\r
            <th>Причина</th>\r
            <th>От</th>\r
            <th>До</th>\r
            <th>Бележки</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="employee-absences-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="employee-absences-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="employee-absences-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="employee-absences-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="employee-absences-pagination-label" class="text-secondary small"></div>\r
      <button id="employee-absences-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="employee-absence-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="employee-absence-form-title" class="h5 mb-0">Ново отсъствие</h2>\r
          <button id="employee-absence-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="employee-absence-form">\r
          <input type="hidden" id="employee-absence-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="employee-absence-employee" class="form-label">Служител</label>\r
              <select id="employee-absence-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-absence-reason" class="form-label">Причина</label>\r
              <select id="employee-absence-reason" class="form-select" required>\r
                <option value="">Избери причина</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-absence-start-date" class="form-label">От дата</label>\r
              <input id="employee-absence-start-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-absence-end-date" class="form-label">До дата</label>\r
              <input id="employee-absence-end-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-12">\r
              <label for="employee-absence-notes" class="form-label">Бележки</label>\r
              <textarea id="employee-absence-notes" class="form-control" rows="3" maxlength="2000"></textarea>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="employee-absence-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="employee-absence-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="employee-absence-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш това отсъствие?</p>\r
        <input type="hidden" id="employee-absence-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="employee-absence-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="employee-absence-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Is(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ji=new Map;function qm(e,t){const n=Ji.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Sn(a);return}}};Ji.set(e,r),document.addEventListener("keydown",r)}function Sn(e){var t,n;e.classList.add("d-none"),(t=document.querySelector("#employee-absence-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#employee-absence-delete-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function et(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const pe={rows:[],searchQuery:"",dateFrom:"",dateTo:"",page:1,pageSize:20};function Qi(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function Ma(e){const{data:t,error:n}=await S.from("employee_absences").select("id, employee_id, reason_id, start_date, end_date, notes, employees(first_name, last_name), absence_reasons(name)").order("start_date",{ascending:!1}).order("end_date",{ascending:!1});if(n){g(n.message,"error"),pe.rows=[],St(e,"Грешка при зареждане на отсъствията.");return}pe.rows=t||[],St(e)}function St(e,t){const n=e.querySelector("#employee-absences-table-body"),r=e.querySelector("#employee-absences-empty");He(e,{rootSelector:"#employee-absences-pagination",prevSelector:"#employee-absences-pagination-prev",nextSelector:"#employee-absences-pagination-next",onPrev:()=>{pe.page=Math.max(1,(pe.page||1)-1),St(e)},onNext:()=>{pe.page=(pe.page||1)+1,St(e)}});const s=pe.rows.filter(l=>{var w;const c=Qi(l.employees).toLowerCase(),u=(((w=l.absence_reasons)==null?void 0:w.name)||"").toLowerCase(),p=String(l.start_date||"").toLowerCase(),m=String(l.end_date||"").toLowerCase(),h=String(l.notes||"").toLowerCase(),y=!pe.searchQuery||c.includes(pe.searchQuery)||u.includes(pe.searchQuery)||p.includes(pe.searchQuery)||m.includes(pe.searchQuery)||h.includes(pe.searchQuery),f=!pe.dateFrom||String(l.end_date||"")>=pe.dateFrom,b=!pe.dateTo||String(l.start_date||"")<=pe.dateTo;return y&&f&&b}),{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,pe.page,pe.pageSize);if(pe.page=i,ke(e,{rootSelector:"#employee-absences-pagination",prevSelector:"#employee-absences-pagination-prev",nextSelector:"#employee-absences-pagination-next",labelSelector:"#employee-absences-pagination-label",page:i,totalItems:o,totalPages:d}),!s.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма въведени отсъствия.";return}r.classList.add("d-none"),n.innerHTML=a.map(l=>{var c;return`
        <tr>
          <td>${et(Qi(l.employees))}</td>
          <td>${et(((c=l.absence_reasons)==null?void 0:c.name)??"-")}</td>
          <td>${et(l.start_date??"-")}</td>
          <td>${et(l.end_date??"-")}</td>
          <td>${et(l.notes??"")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${l.id}"
                data-employee-id="${l.employee_id??""}"
                data-reason-id="${l.reason_id??""}"
                data-start-date="${et(l.start_date??"")}"
                data-end-date="${et(l.end_date??"")}"
                data-notes="${et(l.notes??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${l.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}async function Lm(e){e.innerHTML=km,Tm(e),await Em(e),await $m(e),await Ma(e)}function Tm(e){const t=e.querySelector("#open-create-employee-absence"),n=e.querySelector("#employee-absence-form"),r=e.querySelector("#employee-absence-cancel-btn"),s=e.querySelector("#employee-absences-table-body"),a=e.querySelector("#employee-absence-modal"),i=e.querySelector("#employee-absence-delete-modal"),o=e.querySelector("#employee-absence-modal-close"),d=e.querySelector("#employee-absence-delete-confirm"),l=e.querySelector("#employee-absence-delete-cancel"),c=e.querySelector("#employee-absences-search"),u=e.querySelector("#employee-absences-date-from"),p=e.querySelector("#employee-absences-date-to"),m=e.querySelector("#employee-absences-filter-reset");t==null||t.addEventListener("click",()=>{Oa(e),Is(a)}),n==null||n.addEventListener("submit",async h=>{h.preventDefault(),await Am(e)}),r==null||r.addEventListener("click",()=>{Sn(a)}),o==null||o.addEventListener("click",()=>{Sn(a)}),l==null||l.addEventListener("click",()=>{Sn(i)}),c==null||c.addEventListener("input",h=>{pe.searchQuery=h.target.value.trim().toLowerCase(),St(e)}),u==null||u.addEventListener("change",h=>{pe.dateFrom=h.target.value||"",St(e)}),p==null||p.addEventListener("change",h=>{pe.dateTo=h.target.value||"",St(e)}),m==null||m.addEventListener("click",()=>{pe.searchQuery="",pe.dateFrom="",pe.dateTo="",c&&(c.value=""),u&&(u.value=""),p&&(p.value=""),St(e)}),qm("employee-absences",[i,a]),d==null||d.addEventListener("click",async()=>{const h=e.querySelector("#employee-absence-delete-id").value;await Rm(h,e)}),s==null||s.addEventListener("click",h=>{const y=h.target.closest("button[data-action]");if(!y)return;const f=y.getAttribute("data-action");if(f==="edit"){Cm(e,{id:y.getAttribute("data-id"),employeeId:y.getAttribute("data-employee-id"),reasonId:y.getAttribute("data-reason-id"),startDate:y.getAttribute("data-start-date"),endDate:y.getAttribute("data-end-date"),notes:y.getAttribute("data-notes")}),Is(a);return}if(f==="delete"){const b=y.getAttribute("data-id");e.querySelector("#employee-absence-delete-id").value=b,Is(i)}})}async function Em(e){const t=e.querySelector("#employee-absence-employee"),{data:n,error:r}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${et(i)}</option>`}).join("");t.innerHTML='<option value="">Избери служител</option>'+s}async function $m(e){const t=e.querySelector("#employee-absence-reason"),{data:n,error:r}=await S.from("absence_reasons").select("id, name").order("name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>`<option value="${a.id}">${et(a.name??"-")}</option>`).join("");t.innerHTML='<option value="">Избери причина</option>'+s}async function Am(e){var b;const t=e.querySelector("#employee-absence-id"),n=e.querySelector("#employee-absence-employee"),r=e.querySelector("#employee-absence-reason"),s=e.querySelector("#employee-absence-start-date"),a=e.querySelector("#employee-absence-end-date"),i=e.querySelector("#employee-absence-notes"),o=e.querySelector("#employee-absence-save-btn"),d=n.value||null,l=r.value||null,c=s.value,u=a.value,p=i.value.trim()||null,m=t.value;if(!d||!l||!c||!u){g("Моля, попълни всички задължителни полета.","warning");return}if(u<c){g('Полето "До дата" трябва да е след или равно на "От дата".',"warning");return}const h=o.innerHTML;o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const y={employee_id:d,reason_id:l,start_date:c,end_date:u,notes:p};let f;if(m)({error:f}=await S.from("employee_absences").update(y).eq("id",m));else{const{data:w}=await S.auth.getUser(),v=((b=w==null?void 0:w.user)==null?void 0:b.email)??"web_app";({error:f}=await S.from("employee_absences").insert({...y,created_from:v}))}if(o.disabled=!1,o.innerHTML=h,f){g(f.message,"error");return}g(m?"Отсъствието е обновено.":"Отсъствието е създадено.","success"),Sn(e.querySelector("#employee-absence-modal")),Oa(e),await Ma(e)}function Cm(e,t){e.querySelector("#employee-absence-id").value=t.id,e.querySelector("#employee-absence-employee").value=t.employeeId??"",e.querySelector("#employee-absence-reason").value=t.reasonId??"",e.querySelector("#employee-absence-start-date").value=t.startDate??"",e.querySelector("#employee-absence-end-date").value=t.endDate??"",e.querySelector("#employee-absence-notes").value=t.notes??"",e.querySelector("#employee-absence-form-title").textContent="Редакция на отсъствие",e.querySelector("#employee-absence-save-btn").textContent="Запази"}function Oa(e){e.querySelector("#employee-absence-id").value="",e.querySelector("#employee-absence-employee").value="",e.querySelector("#employee-absence-reason").value="",e.querySelector("#employee-absence-start-date").value="",e.querySelector("#employee-absence-end-date").value="",e.querySelector("#employee-absence-notes").value="",e.querySelector("#employee-absence-form-title").textContent="Ново отсъствие",e.querySelector("#employee-absence-save-btn").textContent="Създай"}async function Rm(e,t){const n=t.querySelector("#employee-absence-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("employee_absences").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,s){g(s.message,"error");return}g("Отсъствието е изтрито.","success"),Sn(t.querySelector("#employee-absence-delete-modal")),Oa(t),await Ma(t)}const Im=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2 mb-3">\r
      <h1 class="h3 mb-0">Планирани повески</h1>\r
      <div class="d-flex gap-2 page-actions">\r
        <span id="planned-duties-go-to-plan-schedule-hint" class="d-inline-block" title="">\r
          <button id="go-to-plan-schedule" type="button" class="btn btn-outline-secondary" disabled><i class="bi bi-layout-text-sidebar me-1"></i>Към План-График</button>\r
        </span>\r
        <span id="planned-duties-add-to-actual-hint" class="d-inline-block" title="">\r
          <button id="add-selected-to-actual-duty" type="button" class="btn btn-outline-success" disabled><i class="bi bi-clipboard2-check me-1"></i>Към Актуални</button>\r
        </span>\r
        <span id="planned-duties-bulk-delete-hint" class="d-inline-block" title="">\r
          <button id="open-bulk-delete-planned-duty" type="button" class="btn btn-outline-danger" disabled><i class="bi bi-trash me-1"></i>Изтрий избраните</button>\r
        </span>\r
        <button id="open-auto-plan-duty" type="button" class="btn btn-outline-primary"><i class="bi bi-magic me-1"></i>Автоматично планиране</button>\r
        <button id="open-create-planned-duty" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Ново планиране</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary">Планиране на служители по повески за конкретна дата.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="planned-duties-filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-5">\r
          <label for="planned-duties-search" class="form-label">Търсене</label>\r
          <input id="planned-duties-search" type="text" class="form-control" placeholder="Търси по служител, повеска или дата" />\r
        </div>\r
        <div class="col-md-4">\r
          <label for="planned-duties-date-filter" class="form-label">Филтър по дата</label>\r
          <input id="planned-duties-date-filter" type="date" class="form-control" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="planned-duties-role-filter" class="form-label">Роля</label>\r
          <select id="planned-duties-role-filter" class="form-select">\r
            <option value="">Всички</option>\r
            <option value="conductor">Кондуктор</option>\r
            <option value="chief">Началник влак</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle table-mobile-wrap">\r
        <thead>\r
          <tr>\r
            <th style="width: 42px;">\r
              <input id="planned-duties-select-all" class="form-check-input" type="checkbox" aria-label="Избери всички" />\r
            </th>\r
            <th>Дата</th>\r
            <th>Служител</th>\r
            <th>Роля</th>\r
            <th>Повеска</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="planned-duties-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="planned-duties-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="planned-duties-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="planned-duties-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="planned-duties-pagination-label" class="text-secondary small"></div>\r
      <button id="planned-duties-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="planned-duty-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="planned-duty-form-title" class="h5 mb-0">Ново планиране</h2>\r
          <button id="planned-duty-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="planned-duty-form">\r
          <input type="hidden" id="planned-duty-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-4">\r
              <label for="planned-duty-date" class="form-label">Дата</label>\r
              <input id="planned-duty-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-employee" class="form-label">Служител</label>\r
              <select id="planned-duty-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-assignment-role" class="form-label">Роля</label>\r
              <select id="planned-duty-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-schedule-key" class="form-label">Ключ-график</label>\r
              <select id="planned-duty-schedule-key" class="form-select" required>\r
                <option value="">Избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-duty" class="form-label">Повеска</label>\r
              <select id="planned-duty-duty" class="form-select" required>\r
                <option value="">Избери повеска</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="planned-duty-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="planned-duty-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-auto-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Автоматично планиране</h2>\r
          <button id="planned-duty-auto-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="planned-duty-auto-form">\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="planned-duty-auto-employee" class="form-label">Служител</label>\r
              <select id="planned-duty-auto-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="planned-duty-auto-assignment-role" class="form-label">Роля</label>\r
              <select id="planned-duty-auto-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="planned-duty-auto-date-from" class="form-label">От дата</label>\r
              <input id="planned-duty-auto-date-from" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="planned-duty-auto-date-to" class="form-label">До дата</label>\r
              <input id="planned-duty-auto-date-to" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="planned-duty-auto-schedule-key" class="form-label">Ключ-график</label>\r
              <select id="planned-duty-auto-schedule-key" class="form-select" required>\r
                <option value="">Избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="planned-duty-auto-start-duty" class="form-label">Стартова повеска</label>\r
              <select id="planned-duty-auto-start-duty" class="form-select" required>\r
                <option value="">Първо избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-12">\r
              <div class="form-check mt-1">\r
                <input class="form-check-input" type="checkbox" id="planned-duty-auto-overwrite" />\r
                <label class="form-check-label" for="planned-duty-auto-overwrite">\r
                  Презапиши съществуващите планирания за служителя в избрания период\r
                </label>\r
              </div>\r
              <div class="form-text text-danger">\r
                Внимание: при включено презаписване всички съществуващи планирания на избрания служител за периода ще бъдат изтрити и заменени с новите.\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="planned-duty-auto-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="planned-duty-auto-save-btn" type="submit" class="btn btn-primary">Генерирай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш това планиране?</p>\r
        <input type="hidden" id="planned-duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="planned-duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="planned-duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-bulk-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди масово изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш избраните планирания (<span id="planned-duty-bulk-delete-count">0</span>)?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="planned-duty-bulk-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="planned-duty-bulk-delete-confirm" type="button" class="btn btn-danger">Изтрий избраните</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-confirm-actual-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърди прехвърляне</h2>\r
          <button id="planned-duty-confirm-actual-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да прехвърлиш избраните планирания към Актуални (<span id="planned-duty-confirm-actual-count">0</span>)?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="planned-duty-confirm-actual-cancel" type="button" class="btn btn-outline-secondary"><i class="bi bi-x me-1"></i>Отказ</button>\r
          <button id="planned-duty-confirm-actual-confirm" type="button" class="btn btn-success"><i class="bi bi-clipboard2-check me-1"></i>Към Актуални</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function cn(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Yi=new Map;function Pm(e,t){const n=Yi.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Re(a);return}}};Yi.set(e,r),document.addEventListener("keydown",r)}function Re(e){var t,n,r,s,a;e.classList.add("d-none"),(t=document.querySelector("#planned-duty-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#planned-duty-delete-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#planned-duty-auto-modal"))!=null&&r.classList.contains("d-none"))&&((s=document.querySelector("#planned-duty-bulk-delete-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#planned-duty-confirm-actual-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function ot(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function da(e,t){!e||!Array.isArray(t)||t.forEach(n=>{const r=e.querySelector(n.wrapperSelector),s=e.querySelector(n.buttonSelector);if(!r||!s)return;const a=s.disabled?n.disabledTitle:"";r.setAttribute("title",a),r.classList.toggle("cursor-help",!!a)})}const B={rows:[],searchQuery:"",dateFilter:"",roleFilter:"",selectedIds:[],visibleRowIds:[],selectionEnabled:!0,page:1,pageSize:20},Xi=[{wrapperSelector:"#planned-duties-add-to-actual-hint",buttonSelector:"#add-selected-to-actual-duty",disabledTitle:"Избери поне едно планиране от таблицата (чекбокс), за да активираш бутона."},{wrapperSelector:"#planned-duties-bulk-delete-hint",buttonSelector:"#open-bulk-delete-planned-duty",disabledTitle:"Избери поне едно планиране от таблицата (чекбокс), за да активираш бутона."}];function Zi(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function xn(e){const{data:t,error:n}=await S.from("planned_duties").select("id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name, schedule_key_duties(schedule_key_id))").order("date",{ascending:!1});if(n){g(n.message,"error"),B.rows=[],nt(e,"Грешка при зареждане на планираните повески.");return}B.rows=t||[],nt(e)}function nt(e,t){var h,y;const n=e.querySelector("#planned-duties-table-body"),r=e.querySelector("#planned-duties-empty"),s=e.querySelector("#planned-duties-select-all"),a=e.querySelector("#open-bulk-delete-planned-duty"),i=e.querySelector("#add-selected-to-actual-duty");He(e,{rootSelector:"#planned-duties-pagination",prevSelector:"#planned-duties-pagination-prev",nextSelector:"#planned-duties-pagination-next",onPrev:()=>{B.page=Math.max(1,(B.page||1)-1),nt(e)},onNext:()=>{B.page=(B.page||1)+1,nt(e)}});const o=B.selectionEnabled!==!1;o||(B.selectedIds=[]),B.selectedIds=B.selectedIds.filter(f=>B.rows.some(b=>b.id===f));const d=B.rows.filter(f=>{var L;const b=Zi(f.employees).toLowerCase(),w=(((L=f.duties)==null?void 0:L.name)||"").toLowerCase(),v=(f.date||"").toLowerCase(),_=!B.searchQuery||b.includes(B.searchQuery)||w.includes(B.searchQuery)||v.includes(B.searchQuery),k=!B.dateFilter||f.date===B.dateFilter,x=!B.roleFilter||f.assignment_role===B.roleFilter;return _&&k&&x}),{pageItems:l,page:c,totalItems:u,totalPages:p}=Ne(d,B.page,B.pageSize);if(B.page=c,ke(e,{rootSelector:"#planned-duties-pagination",prevSelector:"#planned-duties-pagination-prev",nextSelector:"#planned-duties-pagination-next",labelSelector:"#planned-duties-pagination-label",page:c,totalItems:u,totalPages:p}),!d.length){if(B.visibleRowIds=[],n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма планирани повески.",s&&(s.checked=!1,s.indeterminate=!1,s.disabled=!o,(h=s.closest("th"))==null||h.classList.toggle("d-none",!o)),a){a.disabled=!o||B.selectedIds.length===0;const f=B.selectedIds.length?`Изтрий избраните (${B.selectedIds.length})`:"Изтрий избраните";a.innerHTML=`<i class="bi bi-trash me-1"></i>${f}`}if(i){i.disabled=!o||B.selectedIds.length===0;const f=B.selectedIds.length?`Към Актуални (${B.selectedIds.length})`:"Към Актуални";i.innerHTML=`<i class="bi bi-clipboard2-check me-1"></i>${f}`}da(e,Xi);return}B.visibleRowIds=l.map(f=>f.id),r.classList.add("d-none"),s&&(s.disabled=!o,(y=s.closest("th"))==null||y.classList.toggle("d-none",!o)),n.innerHTML=l.map(f=>{var v;const b=Dm(f),w=o&&B.selectedIds.includes(f.id);return`
        <tr>
          ${o?`
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${f.id}"
              ${w?"checked":""}
              aria-label="Избери планиране"
            />
          </td>
          `:""}
          <td>${ot(f.date??"-")}</td>
          <td>${ot(Zi(f.employees))}</td>
          <td>${ot(Mm(f.assignment_role))}</td>
          <td>${ot(((v=f.duties)==null?void 0:v.name)??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${f.id}"
                data-date="${ot(f.date??"")}"
                data-employee-id="${f.employee_id??""}"
                data-duty-id="${f.duty_id??""}"
                data-assignment-role="${f.assignment_role??"conductor"}"
                data-duty-schedule-key-id="${b}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${f.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("");const m=l.filter(f=>B.selectedIds.includes(f.id)).length;if(s&&(s.disabled=!o,s.checked=o&&l.length>0&&m===l.length,s.indeterminate=o&&m>0&&m<l.length),a){a.disabled=!o||B.selectedIds.length===0;const f=B.selectedIds.length?`Изтрий избраните (${B.selectedIds.length})`:"Изтрий избраните";a.innerHTML=`<i class="bi bi-trash me-1"></i>${f}`}if(i){i.disabled=!o||B.selectedIds.length===0;const f=B.selectedIds.length?`Към Актуални (${B.selectedIds.length})`:"Към Актуални";i.innerHTML=`<i class="bi bi-clipboard2-check me-1"></i>${f}`}da(e,Xi)}function Dm(e){var n,r,s;return((s=(Array.isArray((n=e==null?void 0:e.duties)==null?void 0:n.schedule_key_duties)?e.duties.schedule_key_duties:(r=e==null?void 0:e.duties)!=null&&r.schedule_key_duties?[e.duties.schedule_key_duties]:[]).find(a=>a==null?void 0:a.schedule_key_id))==null?void 0:s.schedule_key_id)||""}function Mm(e){return e==="chief"?"Началник влак":"Кондуктор"}let ja=[];async function Om(e){const t=e.querySelector("#planned-duty-employee"),n=e.querySelector("#planned-duty-auto-employee"),{data:r,error:s}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(s){g(s.message,"error");return}const i='<option value="">Избери служител</option>'+(r||[]).map(o=>{const d=`${o.first_name??""} ${o.last_name??""}`.trim()||"-";return`<option value="${o.id}">${ot(d)}</option>`}).join("");t.innerHTML=i,n.innerHTML=i}async function jm(e){const t=e.querySelector("#planned-duty-schedule-key"),n=e.querySelector("#planned-duty-auto-schedule-key"),{data:r,error:s}=await S.from("schedule_keys").select("id, name, crew_role").order("name",{ascending:!0});if(s){g(s.message,"error");return}const i='<option value="">Избери ключ-график</option>'+(r||[]).map(o=>{const d=Nm(o.crew_role),l=d?`${o.name??"-"} (${d})`:o.name??"-";return`<option value="${o.id}">${ot(l)}</option>`}).join("");t.innerHTML=i,n.innerHTML=i}function Nm(e){return e==="началник влак"?"Началник влак":e==="кондуктор"?"Кондуктор":""}async function Hm(e){const{data:t,error:n}=await S.from("schedule_key_duties").select("schedule_key_id, duty_id, duties(id, name)");if(n){g(n.message,"error");return}const r=new Map;(t||[]).forEach(s=>{const a=s==null?void 0:s.duties;if(!(a!=null&&a.id))return;const i=r.get(a.id)||{id:a.id,name:a.name||"-",scheduleKeyIds:[]};s.schedule_key_id&&!i.scheduleKeyIds.includes(s.schedule_key_id)&&i.scheduleKeyIds.push(s.schedule_key_id),r.set(a.id,i)}),ja=Array.from(r.values()).sort((s,a)=>String(s.name||"").localeCompare(String(a.name||""),"bg")),ys(e,"","")}function ys(e,t,n){const r=e.querySelector("#planned-duty-duty");if(!r)return;if(!t){r.innerHTML='<option value="">Първо избери ключ-график</option>',r.value="";return}const s=ja.filter(a=>{var i;return(i=a.scheduleKeyIds)==null?void 0:i.includes(t)}).map(a=>{const i=a.id===n?"selected":"";return`<option value="${a.id}" ${i}>${ot(a.name??"-")}</option>`}).join("");r.innerHTML='<option value="">Избери повеска</option>'+s,n&&(r.value=n)}function Um(e,t){var r;const n=ja.find(s=>s.id===e);return!!(n&&((r=n.scheduleKeyIds)!=null&&r.includes(t)))}const Ps=new Map;async function eo(e,t,n){const r=e.querySelector("#planned-duty-auto-start-duty");if(!r)return;if(!t){r.innerHTML='<option value="">Първо избери ключ-график</option>',r.value="";return}const s=await ul(t);if(!s.length){r.innerHTML='<option value="">Няма повески за този ключ-график</option>',r.value="";return}const a=s.map(i=>{const o=i.id===n?"selected":"";return`<option value="${i.id}" ${o}>${ot(i.name??"-")}</option>`}).join("");r.innerHTML='<option value="">Избери стартова повеска</option>'+a}function cl(e){e.querySelector("#planned-duty-auto-employee").value="",e.querySelector("#planned-duty-auto-assignment-role").value="conductor",e.querySelector("#planned-duty-auto-date-from").value="",e.querySelector("#planned-duty-auto-date-to").value="",e.querySelector("#planned-duty-auto-schedule-key").value="",e.querySelector("#planned-duty-auto-overwrite").checked=!1,e.querySelector("#planned-duty-auto-start-duty").innerHTML='<option value="">Първо избери ключ-график</option>'}async function Fm(e,t){var T;const n=e.querySelector("#planned-duty-auto-employee").value||null,r=e.querySelector("#planned-duty-auto-assignment-role").value||"",s=e.querySelector("#planned-duty-auto-date-from").value,a=e.querySelector("#planned-duty-auto-date-to").value,i=e.querySelector("#planned-duty-auto-schedule-key").value||null,o=e.querySelector("#planned-duty-auto-start-duty").value||null,d=e.querySelector("#planned-duty-auto-overwrite").checked,l=e.querySelector("#planned-duty-auto-save-btn");if(!n||!r||!s||!a||!i||!o){g("Моля, попълни всички полета за автоматично планиране.","warning");return}if(!["chief","conductor"].includes(r)){g("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}if(a<s){g('Полето "До дата" трябва да е след или равно на "От дата".',"warning");return}const c=await ul(i);if(!c.length){g("Няма повески за избрания ключ-график.","warning");return}const u=c.findIndex(q=>q.id===o);if(u<0){g("Избери валидна стартова повеска.","warning");return}const p=Bm(s,a);if(!p.length){g("Невалиден период.","warning");return}const m=l.innerHTML;l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Генериране...';const{data:h}=await S.auth.getUser(),y=((T=h==null?void 0:h.user)==null?void 0:T.email)??"web_app",{data:f,error:b}=await S.from("planned_duties").select("date").eq("employee_id",n).gte("date",s).lte("date",a);if(b){l.disabled=!1,l.innerHTML=m,g(b.message,"error");return}const w=new Set((f||[]).map(q=>q.date)),v=w.size,_=[];let k=0;if(p.forEach((q,E)=>{if(!d&&w.has(q)){k+=1;return}const $=c[(u+E)%c.length];_.push({date:q,employee_id:n,assignment_role:r,duty_id:$.id,created_from:y})}),!_.length){l.disabled=!1,l.innerHTML=m,g("Няма нови записи за създаване. За периода вече има планиране за служителя.","warning");return}if(d){const{error:q}=await S.from("planned_duties").delete().eq("employee_id",n).gte("date",s).lte("date",a);if(q){l.disabled=!1,l.innerHTML=m,g(q.message,"error");return}}let x=null;for(let q=0;q<_.length;q+=200){const E=_.slice(q,q+200),{error:$}=await S.from("planned_duties").insert(E);if($){x=$;break}}if(l.disabled=!1,l.innerHTML=m,x){g(x.message,"error");return}Re(e.querySelector("#planned-duty-auto-modal")),cl(e),await t();const L=_.length;if(d){g(`Създадени записи: ${L}. Презаписани дати: ${v}.`,"success");return}if(k>0){g(`Създадени: ${L}. Пропуснати (вече съществуват за датата): ${k}.`,"success");return}g(`Създадени записи: ${L}.`,"success")}async function ul(e){if(!e)return[];if(Ps.has(e))return Ps.get(e);const{data:t,error:n}=await S.from("schedule_key_duties").select("duty_id, duties(id, name, display_order)").eq("schedule_key_id",e);if(n)return g(n.message,"error"),[];const r=(t||[]).map(s=>{var a,i,o;return{id:(a=s==null?void 0:s.duties)==null?void 0:a.id,name:((i=s==null?void 0:s.duties)==null?void 0:i.name)||"-",displayOrder:Number((o=s==null?void 0:s.duties)==null?void 0:o.display_order)||0}}).filter(s=>s.id).sort((s,a)=>s.displayOrder!==a.displayOrder?s.displayOrder-a.displayOrder:String(s.name||"").localeCompare(String(a.name||""),"bg"));return Ps.set(e,r),r}function Bm(e,t){const n=[],r=new Date(`${e}T00:00:00`),s=new Date(`${t}T00:00:00`);if(Number.isNaN(r.getTime())||Number.isNaN(s.getTime())||r>s)return n;for(let a=new Date(r);a<=s;a.setDate(a.getDate()+1)){const i=a.getFullYear(),o=String(a.getMonth()+1).padStart(2,"0"),d=String(a.getDate()).padStart(2,"0");n.push(`${i}-${o}-${d}`)}return n}function Km(e){if(!B.selectedIds.length){g("Избери поне едно планиране за изтриване.","warning");return}const t=e.querySelector("#planned-duty-bulk-delete-count");t&&(t.textContent=String(B.selectedIds.length)),cn(e.querySelector("#planned-duty-bulk-delete-modal"))}function zm(e){const t=B.visibleRowIds||[];if(e){const n=new Set(B.selectedIds);t.forEach(r=>n.add(r)),B.selectedIds=Array.from(n);return}B.selectedIds=B.selectedIds.filter(n=>!t.includes(n))}function Wm(e,t){if(e){if(t){B.selectedIds.includes(e)||(B.selectedIds=[...B.selectedIds,e]);return}B.selectedIds=B.selectedIds.filter(n=>n!==e)}}async function Vm(e,t){const n=e.querySelector("#planned-duty-bulk-delete-confirm"),r=[...B.selectedIds];if(!r.length){Re(e.querySelector("#planned-duty-bulk-delete-modal"));return}const s=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';let a=null;for(let o=0;o<r.length;o+=200){const d=r.slice(o,o+200),{error:l}=await S.from("planned_duties").delete().in("id",d);if(l){a=l;break}}if(n.disabled=!1,n.innerHTML=s,a){g(a.message,"error");return}const i=r.length;B.selectedIds=[],Re(e.querySelector("#planned-duty-bulk-delete-modal")),await t(),g(`Изтрити планирания: ${i}.`,"success")}async function Gm(e,t){const n=e.querySelector("#add-selected-to-actual-duty"),r=[...B.selectedIds];if(!r.length)return g("Избери поне едно планиране за прехвърляне към Актуални.","warning"),!1;const s=new Set(r),a=B.rows.filter(c=>s.has(c.id));if(!a.length)return g("Няма валидни избрани планирания за прехвърляне.","warning"),!1;const i=a.filter(c=>(c==null?void 0:c.date)&&(c==null?void 0:c.employee_id)&&(c==null?void 0:c.duty_id)).map(c=>({date:c.date,employee_id:c.employee_id,duty_id:c.duty_id,assignment_role:c.assignment_role||"conductor"}));if(!i.length)return g("Избраните записи са невалидни за прехвърляне.","warning"),!1;const o=(n==null?void 0:n.innerHTML)||"Към Актуални";n&&(n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прехвърляне...');let d=null;for(let c=0;c<i.length;c+=200){const u=i.slice(c,c+200),{error:p}=await S.from("actual_duties").upsert(u,{onConflict:"date,employee_id,duty_id",ignoreDuplicates:!0});if(p){d=p;break}}if(n&&(n.disabled=!1,n.innerHTML=o),d)return g(d.message,"error"),!1;const l=i.length;return B.selectedIds=[],await t(),g(`Прехвърлени към Актуални: ${l}. Съществуващите са пропуснати.`,"success"),!0}let Pn="",sn=null;async function Jm(){var i,o;const{data:e,error:t}=await S.auth.getSession();if(t)return Pn="",sn=[],[];const n=((o=(i=e==null?void 0:e.session)==null?void 0:i.user)==null?void 0:o.id)||"";if(!n)return Pn="",sn=[],[];if(sn&&Pn===n)return sn;const{data:r,error:s}=await S.from("user_roles").select("role").eq("user_id",n);if(s)return Pn=n,sn=[],[];const a=[...new Set((r||[]).map(d=>String((d==null?void 0:d.role)||"").trim()).filter(Boolean))];return Pn=n,sn=a,a}async function bs(){const e=await Jm();return Ea(e)}async function Qm(e){e.innerHTML=Im,B.selectionEnabled=!await bs(),Ym(e),Xm(e),await Om(e),await jm(e),await Hm(e),await xn(e)}function Ym(e){var n,r;if(B.selectionEnabled)return;(n=e.querySelector(".page-actions"))==null||n.classList.add("d-none");const t=e.querySelector("#planned-duties-select-all");(r=t==null?void 0:t.closest("th"))==null||r.classList.add("d-none")}function Xm(e){const t=e.querySelector("#open-create-planned-duty"),n=e.querySelector("#open-bulk-delete-planned-duty"),r=e.querySelector("#add-selected-to-actual-duty"),s=e.querySelector("#go-to-plan-schedule"),a=e.querySelector("#open-auto-plan-duty"),i=e.querySelector("#planned-duty-form"),o=e.querySelector("#planned-duty-auto-form"),d=e.querySelector("#planned-duty-cancel-btn"),l=e.querySelector("#planned-duty-auto-cancel-btn"),c=e.querySelector("#planned-duties-table-body"),u=e.querySelector("#planned-duty-modal"),p=e.querySelector("#planned-duty-auto-modal"),m=e.querySelector("#planned-duty-delete-modal"),h=e.querySelector("#planned-duty-bulk-delete-modal"),y=e.querySelector("#planned-duty-confirm-actual-modal"),f=e.querySelector("#planned-duty-modal-close"),b=e.querySelector("#planned-duty-auto-modal-close"),w=e.querySelector("#planned-duty-delete-confirm"),v=e.querySelector("#planned-duty-delete-cancel"),_=e.querySelector("#planned-duty-bulk-delete-confirm"),k=e.querySelector("#planned-duty-bulk-delete-cancel"),x=e.querySelector("#planned-duty-confirm-actual-close"),L=e.querySelector("#planned-duty-confirm-actual-cancel"),T=e.querySelector("#planned-duty-confirm-actual-confirm"),q=e.querySelector("#planned-duty-confirm-actual-count"),E=e.querySelector("#planned-duties-select-all"),$=e.querySelector("#planned-duties-search"),A=e.querySelector("#planned-duties-date-filter"),C=e.querySelector("#planned-duties-role-filter"),R=e.querySelector("#planned-duties-filter-reset"),P=e.querySelector("#planned-duty-schedule-key"),K=e.querySelector("#planned-duty-auto-schedule-key");t==null||t.addEventListener("click",()=>{Na(e),cn(u)}),n==null||n.addEventListener("click",()=>{B.selectionEnabled&&Km(e)}),r==null||r.addEventListener("click",async()=>{if(B.selectionEnabled){if(!B.selectedIds.length){g("Избери поне едно планиране за прехвърляне към Актуални.","warning");return}q&&(q.textContent=String(B.selectedIds.length)),cn(y)}}),x==null||x.addEventListener("click",()=>{Re(y)}),L==null||L.addEventListener("click",()=>{Re(y)}),T==null||T.addEventListener("click",async()=>{const H=T.innerHTML;T.disabled=!0,T.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прехвърляне...';const G=await Gm(e,async()=>{await xn(e)});T.disabled=!1,T.innerHTML=H,G&&Re(y)}),a==null||a.addEventListener("click",async()=>{cl(e),cn(p),await eo(e,(K==null?void 0:K.value)||"","")}),i==null||i.addEventListener("submit",async H=>{H.preventDefault(),await Zm(e)}),o==null||o.addEventListener("submit",async H=>{H.preventDefault(),await Fm(e,async()=>{await xn(e)})}),d==null||d.addEventListener("click",()=>{Re(u)}),f==null||f.addEventListener("click",()=>{Re(u)}),b==null||b.addEventListener("click",()=>{Re(p)}),l==null||l.addEventListener("click",()=>{Re(p)}),v==null||v.addEventListener("click",()=>{Re(m)}),k==null||k.addEventListener("click",()=>{Re(h)}),$==null||$.addEventListener("input",H=>{B.searchQuery=H.target.value.trim().toLowerCase(),nt(e)}),A==null||A.addEventListener("change",H=>{B.dateFilter=H.target.value||"",Ds(s,B.dateFilter),nt(e)}),C==null||C.addEventListener("change",H=>{B.roleFilter=H.target.value||"",nt(e)}),R==null||R.addEventListener("click",()=>{B.searchQuery="",B.dateFilter="",B.roleFilter="",$&&($.value=""),A&&(A.value=""),C&&(C.value=""),Ds(s,B.dateFilter),nt(e)}),s==null||s.addEventListener("click",()=>{const H=B.dateFilter||(A==null?void 0:A.value)||"";if(!H){g("Избери дата от филтъра, за да отвориш План-График.","warning");return}const G=new URLSearchParams({date:H});window.history.pushState({},"",`/plan-schedule?${G.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),Ds(s,B.dateFilter||(A==null?void 0:A.value)||""),P==null||P.addEventListener("change",()=>{ys(e,P.value||"","")}),K==null||K.addEventListener("change",async()=>{await eo(e,K.value||"","")}),E==null||E.addEventListener("change",()=>{B.selectionEnabled&&(zm(E.checked),nt(e))}),Pm("planned-duties",[y,m,h,p,u]),w==null||w.addEventListener("click",async()=>{const H=e.querySelector("#planned-duty-delete-id").value;await th(H,e)}),_==null||_.addEventListener("click",async()=>{await Vm(e,async()=>{await xn(e)})}),c==null||c.addEventListener("change",H=>{if(!B.selectionEnabled)return;const G=H.target.closest("input[data-select-id]");if(!G)return;const N=G.getAttribute("data-select-id");Wm(N,G.checked),nt(e)}),c==null||c.addEventListener("click",H=>{const G=H.target.closest("button[data-action]");if(!G)return;const N=G.getAttribute("data-action");if(N==="edit"){eh(e,{id:G.getAttribute("data-id"),date:G.getAttribute("data-date"),employeeId:G.getAttribute("data-employee-id"),assignmentRole:G.getAttribute("data-assignment-role")||"conductor",dutyId:G.getAttribute("data-duty-id"),dutyScheduleKeyId:G.getAttribute("data-duty-schedule-key-id")}),cn(u);return}if(N==="delete"){const W=G.getAttribute("data-id");e.querySelector("#planned-duty-delete-id").value=W,cn(m)}})}async function Zm(e){var b;const t=e.querySelector("#planned-duty-id"),n=e.querySelector("#planned-duty-date"),r=e.querySelector("#planned-duty-employee"),s=e.querySelector("#planned-duty-assignment-role"),a=e.querySelector("#planned-duty-schedule-key"),i=e.querySelector("#planned-duty-duty"),o=e.querySelector("#planned-duty-save-btn"),d=n.value,l=r.value||null,c=s.value||"",u=a.value||null,p=i.value||null,m=t.value;if(!d||!l||!c||!u||!p){g("Моля, попълни всички полета.","warning");return}if(!["chief","conductor"].includes(c)){g("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}if(!Um(p,u)){g("Избери повеска от посочения ключ-график.","warning");return}const h=o.innerHTML;o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const y={date:d,employee_id:l,assignment_role:c,duty_id:p};let f;if(m)({error:f}=await S.from("planned_duties").update(y).eq("id",m));else{const{data:w}=await S.auth.getUser(),v=((b=w==null?void 0:w.user)==null?void 0:b.email)??"web_app";({error:f}=await S.from("planned_duties").insert({...y,created_from:v}))}if(o.disabled=!1,o.innerHTML=h,f){if(f.code==="23505"){g("Това планиране вече съществува за тази дата.","warning");return}g(f.message,"error");return}g(m?"Планирането е обновено.":"Планирането е създадено.","success"),Re(e.querySelector("#planned-duty-modal")),Na(e),await xn(e)}function eh(e,t){e.querySelector("#planned-duty-id").value=t.id,e.querySelector("#planned-duty-date").value=t.date??"",e.querySelector("#planned-duty-employee").value=t.employeeId??"",e.querySelector("#planned-duty-assignment-role").value=t.assignmentRole??"conductor",e.querySelector("#planned-duty-schedule-key").value=t.dutyScheduleKeyId??"",ys(e,t.dutyScheduleKeyId??"",t.dutyId??""),e.querySelector("#planned-duty-form-title").textContent="Редакция на планиране",e.querySelector("#planned-duty-save-btn").textContent="Запази"}function Na(e){e.querySelector("#planned-duty-id").value="",e.querySelector("#planned-duty-date").value="",e.querySelector("#planned-duty-employee").value="",e.querySelector("#planned-duty-assignment-role").value="conductor",e.querySelector("#planned-duty-schedule-key").value="",ys(e,"",""),e.querySelector("#planned-duty-form-title").textContent="Ново планиране",e.querySelector("#planned-duty-save-btn").textContent="Създай"}async function th(e,t){const n=t.querySelector("#planned-duty-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("planned_duties").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,s){g(s.message,"error");return}g("Планирането е изтрито.","success"),B.selectedIds=B.selectedIds.filter(a=>a!==e),Re(t.querySelector("#planned-duty-delete-modal")),Na(t),await xn(t)}function Ds(e,t){e&&(e.disabled=!t,da(document,[{wrapperSelector:"#planned-duties-go-to-plan-schedule-hint",buttonSelector:"#go-to-plan-schedule",disabledTitle:"Избери дата от филтъра „Филтър по дата“, за да активираш бутона."}]))}const nh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2 mb-3">\r
      <h1 class="h3 mb-0">Реално изпълнение</h1>\r
      <div class="d-flex gap-2 page-actions">\r
        <span id="actual-duties-go-to-schedule-hint" class="d-inline-block" title="">\r
          <button id="go-to-schedule" type="button" class="btn btn-outline-secondary" disabled><i class="bi bi-calendar-check me-1"></i>Към График</button>\r
        </span>\r
        <span id="actual-duties-bulk-delete-hint" class="d-inline-block" title="">\r
          <button id="open-bulk-delete-actual-duty" type="button" class="btn btn-outline-danger" disabled><i class="bi bi-trash me-1"></i>Изтрий избраните</button>\r
        </span>\r
        <button id="open-create-actual-duty" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Нов запис</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary">Служители по повески - реално изпълнение.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="actual-duties-filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-5">\r
          <label for="actual-duties-search" class="form-label">Търсене</label>\r
          <input id="actual-duties-search" type="text" class="form-control" placeholder="Търси по служител, повеска или дата" />\r
        </div>\r
        <div class="col-md-4">\r
          <label for="actual-duties-date-filter" class="form-label">Филтър по дата</label>\r
          <input id="actual-duties-date-filter" type="date" class="form-control" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="actual-duties-role-filter" class="form-label">Роля</label>\r
          <select id="actual-duties-role-filter" class="form-select">\r
            <option value="">Всички</option>\r
            <option value="conductor">Кондуктор</option>\r
            <option value="chief">Началник влак</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle table-mobile-wrap">\r
        <thead>\r
          <tr>\r
            <th style="width: 42px;">\r
              <input id="actual-duties-select-all" class="form-check-input" type="checkbox" aria-label="Избери всички" />\r
            </th>\r
            <th>Дата</th>\r
            <th>Служител</th>\r
            <th>Роля</th>\r
            <th>Повеска</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="actual-duties-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="actual-duties-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="actual-duties-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="actual-duties-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="actual-duties-pagination-label" class="text-secondary small"></div>\r
      <button id="actual-duties-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="actual-duty-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="actual-duty-form-title" class="h5 mb-0">Нов запис</h2>\r
          <button id="actual-duty-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="actual-duty-form">\r
          <input type="hidden" id="actual-duty-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-4">\r
              <label for="actual-duty-date" class="form-label">Дата</label>\r
              <input id="actual-duty-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-employee" class="form-label">Служител</label>\r
              <select id="actual-duty-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-schedule-key" class="form-label">Ключ-график</label>\r
              <select id="actual-duty-schedule-key" class="form-select" required>\r
                <option value="">Избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-duty" class="form-label">Повеска</label>\r
              <select id="actual-duty-duty" class="form-select" required>\r
                <option value="">Избери повеска</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-assignment-role" class="form-label">Роля</label>\r
              <select id="actual-duty-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-start-time" class="form-label">Начало</label>\r
              <input id="actual-duty-start-time" class="form-control" type="time" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-end-time" class="form-label">Край</label>\r
              <input id="actual-duty-end-time" class="form-control" type="time" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-break-start-time" class="form-label">Начало на прекъсване</label>\r
              <input id="actual-duty-break-start-time" class="form-control" type="time" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-break-end-time" class="form-label">Край на прекъсване</label>\r
              <input id="actual-duty-break-end-time" class="form-control" type="time" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="actual-duty-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="actual-duty-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Профил на реална повеска</h2>\r
          <button id="actual-duty-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div id="actual-duty-profile-content"></div>\r
\r
        <div class="d-flex justify-content-end mt-4">\r
          <button id="actual-duty-profile-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този запис?</p>\r
        <input type="hidden" id="actual-duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="actual-duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="actual-duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-bulk-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди масово изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш избраните записи (<span id="actual-duty-bulk-delete-count">0</span>)?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="actual-duty-bulk-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="actual-duty-bulk-delete-confirm" type="button" class="btn btn-danger">Изтрий избраните</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-bulk-add-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 960px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Добави от планирани повески</h2>\r
          <button id="actual-duty-bulk-add-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <section class="search-panel mb-3" aria-label="Панел за търсене">\r
          <div class="search-panel-header">\r
            <h2 class="h6 mb-0">Панел за търсене</h2>\r
            <button id="actual-duty-bulk-add-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
          </div>\r
\r
          <div class="row g-3 align-items-end">\r
            <div class="col-md-7">\r
              <label for="actual-duty-bulk-add-search" class="form-label">Търсене</label>\r
              <input id="actual-duty-bulk-add-search" type="text" class="form-control" placeholder="Търси по служител, повеска или дата" />\r
            </div>\r
            <div class="col-md-5">\r
              <label for="actual-duty-bulk-add-date-filter" class="form-label">Филтър по дата</label>\r
              <input id="actual-duty-bulk-add-date-filter" type="date" class="form-control" />\r
            </div>\r
          </div>\r
        </section>\r
\r
        <div class="table-responsive">\r
          <table class="table align-middle">\r
            <thead>\r
              <tr>\r
                <th style="width: 42px;">\r
                  <input id="actual-duty-bulk-add-select-all" class="form-check-input" type="checkbox" aria-label="Избери всички" />\r
                </th>\r
                <th>Дата</th>\r
                <th>Служител</th>\r
                <th>Роля</th>\r
                <th>Повеска</th>\r
              </tr>\r
            </thead>\r
            <tbody id="actual-duty-bulk-add-table-body"></tbody>\r
          </table>\r
        </div>\r
\r
        <p id="actual-duty-bulk-add-empty" class="text-secondary d-none mb-0"></p>\r
\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="actual-duty-bulk-add-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="actual-duty-bulk-add-confirm" type="button" class="btn btn-primary" disabled>Добави избраните</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Ut(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const to=new Map;function rh(e,t){const n=to.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Oe(a);return}}};to.set(e,r),document.addEventListener("keydown",r)}function Oe(e){var t,n,r,s,a;e.classList.add("d-none"),(t=document.querySelector("#actual-duty-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#actual-duty-delete-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#actual-duty-bulk-delete-modal"))!=null&&r.classList.contains("d-none"))&&((s=document.querySelector("#actual-duty-bulk-add-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#actual-duty-profile-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function oe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const I={rows:[],searchQuery:"",dateFilter:"",roleFilter:"",selectedIds:[],visibleRowIds:[],selectionEnabled:!0,crewEditTimeOnly:!1,page:1,pageSize:20,plannedRows:[],plannedSearchQuery:"",plannedDateFilter:"",plannedSelectedIds:[],plannedVisibleRowIds:[]};function no(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function qr(e){const{data:t,error:n}=await S.from("actual_duties").select("id, date, employee_id, duty_id, assignment_role, start_time_override, end_time_override, break_start_time_override, break_end_time_override, employees(first_name, last_name), duties(name, start_time, end_time, break_start_time, break_end_time, schedule_key_duties(schedule_key_id))").order("date",{ascending:!1});if(n){g(n.message,"error"),I.rows=[],rt(e,"Грешка при зареждане на реалните повески.");return}I.rows=t||[],rt(e)}function rt(e,t){var h,y;const n=e.querySelector("#actual-duties-table-body"),r=e.querySelector("#actual-duties-empty"),s=e.querySelector("#actual-duties-select-all"),a=e.querySelector("#open-bulk-delete-actual-duty"),i=e.querySelector("#actual-duties-bulk-delete-hint");He(e,{rootSelector:"#actual-duties-pagination",prevSelector:"#actual-duties-pagination-prev",nextSelector:"#actual-duties-pagination-next",onPrev:()=>{I.page=Math.max(1,(I.page||1)-1),rt(e)},onNext:()=>{I.page=(I.page||1)+1,rt(e)}});const o=I.selectionEnabled!==!1;o||(I.selectedIds=[]),I.selectedIds=I.selectedIds.filter(f=>I.rows.some(b=>b.id===f));const d=I.rows.filter(f=>{var L;const b=no(f.employees).toLowerCase(),w=(((L=f.duties)==null?void 0:L.name)||"").toLowerCase(),v=(f.date||"").toLowerCase(),_=!I.searchQuery||b.includes(I.searchQuery)||w.includes(I.searchQuery)||v.includes(I.searchQuery),k=!I.dateFilter||f.date===I.dateFilter,x=!I.roleFilter||f.assignment_role===I.roleFilter;return _&&k&&x}),{pageItems:l,page:c,totalItems:u,totalPages:p}=Ne(d,I.page,I.pageSize);if(I.page=c,ke(e,{rootSelector:"#actual-duties-pagination",prevSelector:"#actual-duties-pagination-prev",nextSelector:"#actual-duties-pagination-next",labelSelector:"#actual-duties-pagination-label",page:c,totalItems:u,totalPages:p}),!d.length){if(I.visibleRowIds=[],n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма записи за реално изпълнение.",s&&(s.checked=!1,s.indeterminate=!1,s.disabled=!o,(h=s.closest("th"))==null||h.classList.toggle("d-none",!o)),a){a.disabled=!o||I.selectedIds.length===0;const f=I.selectedIds.length?`Изтрий избраните (${I.selectedIds.length})`:"Изтрий избраните";a.innerHTML=`<i class="bi bi-trash me-1"></i>${f}`}if(i&&a){const f=a.disabled?"Избери поне един запис от таблицата (чекбокс), за да активираш бутона.":"";i.setAttribute("title",f),i.classList.toggle("cursor-help",!!f)}return}I.visibleRowIds=l.map(f=>f.id),r.classList.add("d-none"),s&&(s.disabled=!o,(y=s.closest("th"))==null||y.classList.toggle("d-none",!o)),n.innerHTML=l.map(f=>{var v,_,k,x,L;const b=sh(f),w=o&&I.selectedIds.includes(f.id);return`
        <tr>
          ${o?`
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${f.id}"
              ${w?"checked":""}
              aria-label="Избери запис"
            />
          </td>
          `:""}
          <td>${oe(f.date??"-")}</td>
          <td>${oe(no(f.employees))}</td>
          <td>${oe(ah(f.assignment_role))}</td>
          <td>${oe(((v=f.duties)==null?void 0:v.name)??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${f.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${f.id}"
                data-date="${oe(f.date??"")}"
                data-employee-id="${f.employee_id??""}"
                data-duty-id="${f.duty_id??""}"
                data-assignment-role="${f.assignment_role??"conductor"}"
                data-duty-schedule-key-id="${b}"
                data-start-time-override="${oe((f.start_time_override||"").slice(0,5))}"
                data-end-time-override="${oe((f.end_time_override||"").slice(0,5))}"
                data-break-start-time-override="${oe((f.break_start_time_override||"").slice(0,5))}"
                data-break-end-time-override="${oe((f.break_end_time_override||"").slice(0,5))}"
                data-duty-start-time="${oe((((_=f.duties)==null?void 0:_.start_time)||"").slice(0,5))}"
                data-duty-end-time="${oe((((k=f.duties)==null?void 0:k.end_time)||"").slice(0,5))}"
                data-duty-break-start-time="${oe((((x=f.duties)==null?void 0:x.break_start_time)||"").slice(0,5))}"
                data-duty-break-end-time="${oe((((L=f.duties)==null?void 0:L.break_end_time)||"").slice(0,5))}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${f.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("");const m=l.filter(f=>I.selectedIds.includes(f.id)).length;if(s&&(s.disabled=!o,s.checked=o&&l.length>0&&m===l.length,s.indeterminate=o&&m>0&&m<l.length),a){a.disabled=!o||I.selectedIds.length===0;const f=I.selectedIds.length?`Изтрий избраните (${I.selectedIds.length})`:"Изтрий избраните";a.innerHTML=`<i class="bi bi-trash me-1"></i>${f}`}if(i&&a){const f=a.disabled?"Избери поне един запис от таблицата (чекбокс), за да активираш бутона.":"";i.setAttribute("title",f),i.classList.toggle("cursor-help",!!f)}}function sh(e){var n,r,s;return((s=(Array.isArray((n=e==null?void 0:e.duties)==null?void 0:n.schedule_key_duties)?e.duties.schedule_key_duties:(r=e==null?void 0:e.duties)!=null&&r.schedule_key_duties?[e.duties.schedule_key_duties]:[]).find(a=>a==null?void 0:a.schedule_key_id))==null?void 0:s.schedule_key_id)||""}function ah(e){return e==="chief"?"Началник влак":"Кондуктор"}let vs=[];async function ih(e){e.innerHTML=nh;const t=await bs();I.selectionEnabled=!t,I.crewEditTimeOnly=t,oh(e);const n=_h(),r=e.querySelector("#actual-duties-date-filter");n&&r&&(r.value=n,I.dateFilter=n),lh(e),await dh(e),await ch(e),await uh(e),await qr(e)}function oh(e){var t,n,r;I.selectionEnabled||((t=e.querySelector("#open-bulk-delete-actual-duty"))==null||t.classList.add("d-none"),(r=(n=e.querySelector("#actual-duties-select-all"))==null?void 0:n.closest("th"))==null||r.classList.add("d-none"))}function Ms(e,t){["actual-duty-date","actual-duty-employee","actual-duty-schedule-key","actual-duty-duty","actual-duty-assignment-role"].forEach(r=>{const s=e.querySelector(`#${r}`),a=(s==null?void 0:s.closest(".col-md-4"))||(s==null?void 0:s.closest(".col-md-3"))||(s==null?void 0:s.closest(".col-12"));a&&a.classList.toggle("d-none",t),s&&(s.disabled=t)})}function lh(e){const t=e.querySelector("#open-create-actual-duty"),n=e.querySelector("#go-to-schedule"),r=e.querySelector("#open-bulk-delete-actual-duty"),s=e.querySelector("#open-bulk-add-actual-duty"),a=e.querySelector("#actual-duty-form"),i=e.querySelector("#actual-duties-table-body"),o=e.querySelector("#actual-duty-modal"),d=e.querySelector("#actual-duty-delete-modal"),l=e.querySelector("#actual-duty-bulk-delete-modal"),c=e.querySelector("#actual-duty-bulk-add-modal"),u=e.querySelector("#actual-duty-profile-modal"),p=e.querySelector("#actual-duty-modal-close"),m=e.querySelector("#actual-duty-cancel-btn"),h=e.querySelector("#actual-duty-profile-close"),y=e.querySelector("#actual-duty-profile-close-secondary"),f=e.querySelector("#actual-duty-delete-confirm"),b=e.querySelector("#actual-duty-delete-cancel"),w=e.querySelector("#actual-duty-bulk-delete-confirm"),v=e.querySelector("#actual-duty-bulk-delete-cancel"),_=e.querySelector("#actual-duty-bulk-add-modal-close"),k=e.querySelector("#actual-duty-bulk-add-cancel"),x=e.querySelector("#actual-duty-bulk-add-confirm"),L=e.querySelector("#actual-duty-bulk-add-search"),T=e.querySelector("#actual-duty-bulk-add-date-filter"),q=e.querySelector("#actual-duty-bulk-add-filter-reset"),E=e.querySelector("#actual-duty-bulk-add-select-all"),$=e.querySelector("#actual-duty-bulk-add-table-body"),A=e.querySelector("#actual-duties-search"),C=e.querySelector("#actual-duties-date-filter"),R=e.querySelector("#actual-duties-role-filter"),P=e.querySelector("#actual-duties-filter-reset"),K=e.querySelector("#actual-duty-schedule-key"),H=e.querySelector("#actual-duties-select-all");t==null||t.addEventListener("click",()=>{pl(e),Ms(e,!1),Ut(o)}),r==null||r.addEventListener("click",()=>{if(!I.selectionEnabled)return;if(!I.selectedIds.length){g("Избери поне един запис за изтриване.","warning");return}const N=e.querySelector("#actual-duty-bulk-delete-count");N&&(N.textContent=String(I.selectedIds.length)),Ut(l)}),s==null||s.addEventListener("click",async()=>{ao(e),await gh(e),Ut(c)}),a==null||a.addEventListener("submit",async N=>{N.preventDefault(),await fh(e)}),p==null||p.addEventListener("click",()=>{Oe(o)}),m==null||m.addEventListener("click",()=>{Oe(o)}),h==null||h.addEventListener("click",()=>{Oe(u)}),y==null||y.addEventListener("click",()=>{Oe(u)}),b==null||b.addEventListener("click",()=>{Oe(d)}),v==null||v.addEventListener("click",()=>{Oe(l)}),_==null||_.addEventListener("click",()=>{Oe(c)}),k==null||k.addEventListener("click",()=>{Oe(c)}),A==null||A.addEventListener("input",N=>{I.searchQuery=N.target.value.trim().toLowerCase(),rt(e)}),C==null||C.addEventListener("change",N=>{I.dateFilter=N.target.value||"",Os(n,I.dateFilter),rt(e)}),R==null||R.addEventListener("change",N=>{I.roleFilter=N.target.value||"",rt(e)}),P==null||P.addEventListener("click",()=>{I.searchQuery="",I.dateFilter="",I.roleFilter="",A&&(A.value=""),C&&(C.value=""),R&&(R.value=""),Os(n,I.dateFilter),rt(e)}),n==null||n.addEventListener("click",()=>{const N=I.dateFilter||(C==null?void 0:C.value)||"";if(!N){g("Избери дата от филтъра, за да отвориш График.","warning");return}const W=new URLSearchParams({date:N});window.history.pushState({},"",`/schedule?${W.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),Os(n,I.dateFilter||(C==null?void 0:C.value)||""),K==null||K.addEventListener("change",()=>{gs(e,K.value||"",""),so(e)});const G=e.querySelector("#actual-duty-duty");G==null||G.addEventListener("change",()=>{so(e)}),H==null||H.addEventListener("change",()=>{if(!I.selectionEnabled)return;const N=I.visibleRowIds||[];if(H.checked){const W=new Set(I.selectedIds);N.forEach(ee=>W.add(ee)),I.selectedIds=Array.from(W)}else I.selectedIds=I.selectedIds.filter(W=>!N.includes(W));rt(e)}),f==null||f.addEventListener("click",async()=>{const N=e.querySelector("#actual-duty-delete-id").value;await bh(N,e)}),w==null||w.addEventListener("click",async()=>{await vh(e)}),x==null||x.addEventListener("click",async()=>{await wh(e)}),L==null||L.addEventListener("input",N=>{I.plannedSearchQuery=N.target.value.trim().toLowerCase(),Ft(e)}),T==null||T.addEventListener("change",N=>{I.plannedDateFilter=N.target.value||"",Ft(e)}),q==null||q.addEventListener("click",()=>{ao(e),Ft(e)}),E==null||E.addEventListener("change",()=>{const N=I.plannedVisibleRowIds||[];if(E.checked){const W=new Set(I.plannedSelectedIds);N.forEach(ee=>W.add(ee)),I.plannedSelectedIds=Array.from(W)}else I.plannedSelectedIds=I.plannedSelectedIds.filter(W=>!N.includes(W));Ft(e)}),$==null||$.addEventListener("change",N=>{const W=N.target.closest("input[data-planned-select-id]");if(!W)return;const ee=W.getAttribute("data-planned-select-id");ee&&(W.checked?I.plannedSelectedIds.includes(ee)||(I.plannedSelectedIds=[...I.plannedSelectedIds,ee]):I.plannedSelectedIds=I.plannedSelectedIds.filter(de=>de!==ee),Ft(e))}),i==null||i.addEventListener("change",N=>{if(!I.selectionEnabled)return;const W=N.target.closest("input[data-select-id]");if(!W)return;const ee=W.getAttribute("data-select-id");ee&&(W.checked?I.selectedIds.includes(ee)||(I.selectedIds=[...I.selectedIds,ee]):I.selectedIds=I.selectedIds.filter(de=>de!==ee),rt(e))}),i==null||i.addEventListener("click",N=>{const W=N.target.closest("button[data-action]");if(!W)return;const ee=W.getAttribute("data-action");if(ee==="profile"){const de=W.getAttribute("data-id");Sh(e,de);return}if(ee==="edit"){yh(e,{id:W.getAttribute("data-id"),date:W.getAttribute("data-date"),employeeId:W.getAttribute("data-employee-id"),assignmentRole:W.getAttribute("data-assignment-role")||"conductor",dutyId:W.getAttribute("data-duty-id"),dutyScheduleKeyId:W.getAttribute("data-duty-schedule-key-id"),startTimeOverride:W.getAttribute("data-start-time-override")||"",endTimeOverride:W.getAttribute("data-end-time-override")||"",breakStartTimeOverride:W.getAttribute("data-break-start-time-override")||"",breakEndTimeOverride:W.getAttribute("data-break-end-time-override")||"",dutyStartTime:W.getAttribute("data-duty-start-time")||"",dutyEndTime:W.getAttribute("data-duty-end-time")||"",dutyBreakStartTime:W.getAttribute("data-duty-break-start-time")||"",dutyBreakEndTime:W.getAttribute("data-duty-break-end-time")||""}),I.crewEditTimeOnly?Ms(e,!0):Ms(e,!1),Ut(o);return}if(ee==="delete"){const de=W.getAttribute("data-id");e.querySelector("#actual-duty-delete-id").value=de,Ut(d)}}),rh("actual-duties",[u,d,l,c,o])}async function dh(e){const t=e.querySelector("#actual-duty-employee"),{data:n,error:r}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${oe(i)}</option>`}).join("");t.innerHTML='<option value="">Избери служител</option>'+s}async function ch(e){const t=e.querySelector("#actual-duty-schedule-key"),{data:n,error:r}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>`<option value="${a.id}">${oe(a.name??"-")}</option>`).join("");t.innerHTML='<option value="">Избери ключ-график</option>'+s}async function uh(e){const{data:t,error:n}=await S.from("schedule_key_duties").select("schedule_key_id, duty_id, duties(id, name, start_time, end_time, break_start_time, break_end_time)");if(n){g(n.message,"error");return}const r=new Map;(t||[]).forEach(s=>{const a=s==null?void 0:s.duties;if(!(a!=null&&a.id))return;const i=r.get(a.id)||{id:a.id,name:a.name||"-",scheduleKeyIds:[],startTime:xt(a.start_time),endTime:xt(a.end_time),breakStartTime:xt(a.break_start_time),breakEndTime:xt(a.break_end_time)};s.schedule_key_id&&!i.scheduleKeyIds.includes(s.schedule_key_id)&&i.scheduleKeyIds.push(s.schedule_key_id),r.set(a.id,i)}),vs=Array.from(r.values()).sort((s,a)=>String(s.name||"").localeCompare(String(a.name||""),"bg")),gs(e,"","")}function gs(e,t,n){const r=e.querySelector("#actual-duty-duty");if(!r)return;if(!t){r.innerHTML='<option value="">Първо избери ключ-график</option>',r.value="";return}const s=vs.filter(a=>{var i;return(i=a.scheduleKeyIds)==null?void 0:i.includes(t)}).map(a=>{const i=a.id===n?"selected":"";return`<option value="${a.id}" ${i}>${oe(a.name??"-")}</option>`}).join("");r.innerHTML='<option value="">Избери повеска</option>'+s,n&&(r.value=n)}function ph(e,t){var r;const n=vs.find(s=>s.id===e);return!!(n&&((r=n.scheduleKeyIds)!=null&&r.includes(t)))}function mh(e){return vs.find(t=>t.id===e)||null}function xt(e){return e?String(e).slice(0,5):""}function Te(e,t=""){const n=String(e||"").slice(0,5);return/^\d{2}:\d{2}$/.test(n)?n:t}function ut(e){const t=Te(e,"");return t?`${t}:00`:null}function ro(e){const t=Number(e);if(!Number.isFinite(t)||t<0)return"-";const n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function hh(e,t,n,r){const s=Te(e,""),a=Te(t,""),i=Te(n,"00:00"),o=Te(r,"00:00"),d=s&&a?je(s,a):null,l=je(i,o),c=Number.isFinite(d)?Math.max(0,d-l):null;return{startTime:s||"-",endTime:a||"-",breakStartTime:i||"-",breakEndTime:o||"-",breakDuration:ro(l),duration:c===null?"-":ro(c)}}function so(e){var o;const t=((o=e.querySelector("#actual-duty-duty"))==null?void 0:o.value)||"",n=mh(t);if(!n)return;const r=e.querySelector("#actual-duty-start-time"),s=e.querySelector("#actual-duty-end-time"),a=e.querySelector("#actual-duty-break-start-time"),i=e.querySelector("#actual-duty-break-end-time");r&&(r.value=n.startTime||""),s&&(s.value=n.endTime||""),a&&(a.value=n.breakStartTime||"00:00"),i&&(i.value=n.breakEndTime||"00:00")}async function fh(e){const t=e.querySelector("#actual-duty-id"),n=e.querySelector("#actual-duty-date"),r=e.querySelector("#actual-duty-employee"),s=e.querySelector("#actual-duty-schedule-key"),a=e.querySelector("#actual-duty-duty"),i=e.querySelector("#actual-duty-assignment-role"),o=e.querySelector("#actual-duty-start-time"),d=e.querySelector("#actual-duty-end-time"),l=e.querySelector("#actual-duty-break-start-time"),c=e.querySelector("#actual-duty-break-end-time"),u=e.querySelector("#actual-duty-save-btn"),p=n.value,m=r.value||null,h=s.value||null,y=a.value||null,f=i.value||"conductor",b=Te((o==null?void 0:o.value)||"",""),w=Te((d==null?void 0:d.value)||"",""),v=Te((l==null?void 0:l.value)||"","00:00"),_=Te((c==null?void 0:c.value)||"","00:00"),k=t.value,x=!!k&&I.crewEditTimeOnly;if(x){if(!b||!w){g("Моля, попълни Начало и Край.","warning");return}}else{if(!p||!m||!h||!y||!b||!w){g("Моля, попълни всички полета.","warning");return}if(!ph(y,h)){g("Избери повеска от посочения ключ-график.","warning");return}if(!["chief","conductor"].includes(f)){g("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}}const L=je(b,w);if(je(v,_)>L){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const q=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const E=x?{start_time_override:ut(b),end_time_override:ut(w),break_start_time_override:ut(v),break_end_time_override:ut(_)}:{date:p,employee_id:m,duty_id:y,assignment_role:f,start_time_override:ut(b),end_time_override:ut(w),break_start_time_override:ut(v),break_end_time_override:ut(_)};let $;if(k?{error:$}=await S.from("actual_duties").update(E).eq("id",k):{error:$}=await S.from("actual_duties").insert(E),u.disabled=!1,u.innerHTML=q,$){if($.code==="23505"){g("Този запис вече съществува за тази дата.","warning");return}g($.message,"error");return}g(k?"Записът е обновен.":"Записът е създаден.","success"),Oe(e.querySelector("#actual-duty-modal")),pl(e),await qr(e)}function yh(e,t){e.querySelector("#actual-duty-id").value=t.id,e.querySelector("#actual-duty-date").value=t.date??"",e.querySelector("#actual-duty-employee").value=t.employeeId??"",e.querySelector("#actual-duty-assignment-role").value=t.assignmentRole??"conductor",e.querySelector("#actual-duty-schedule-key").value=t.dutyScheduleKeyId??"",gs(e,t.dutyScheduleKeyId??"",t.dutyId??""),e.querySelector("#actual-duty-start-time").value=Te(t.startTimeOverride,t.dutyStartTime||""),e.querySelector("#actual-duty-end-time").value=Te(t.endTimeOverride,t.dutyEndTime||""),e.querySelector("#actual-duty-break-start-time").value=Te(t.breakStartTimeOverride,t.dutyBreakStartTime||"00:00"),e.querySelector("#actual-duty-break-end-time").value=Te(t.breakEndTimeOverride,t.dutyBreakEndTime||"00:00"),e.querySelector("#actual-duty-form-title").textContent="Редакция на запис",e.querySelector("#actual-duty-save-btn").textContent="Запази"}function pl(e){e.querySelector("#actual-duty-id").value="",e.querySelector("#actual-duty-date").value="",e.querySelector("#actual-duty-employee").value="",e.querySelector("#actual-duty-assignment-role").value="conductor",e.querySelector("#actual-duty-schedule-key").value="",gs(e,"",""),e.querySelector("#actual-duty-start-time").value="",e.querySelector("#actual-duty-end-time").value="",e.querySelector("#actual-duty-break-start-time").value="00:00",e.querySelector("#actual-duty-break-end-time").value="00:00",e.querySelector("#actual-duty-form-title").textContent="Нов запис",e.querySelector("#actual-duty-save-btn").textContent="Създай"}async function bh(e,t){const n=t.querySelector("#actual-duty-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("actual_duties").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,s){g(s.message,"error");return}I.selectedIds=I.selectedIds.filter(a=>a!==e),Oe(t.querySelector("#actual-duty-delete-modal")),await qr(t),g("Записът е изтрит.","success")}async function vh(e){const t=e.querySelector("#actual-duty-bulk-delete-confirm"),n=[...I.selectedIds];if(!n.length){Oe(e.querySelector("#actual-duty-bulk-delete-modal"));return}const r=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';let s=null;for(let i=0;i<n.length;i+=200){const o=n.slice(i,i+200),{error:d}=await S.from("actual_duties").delete().in("id",o);if(d){s=d;break}}if(t.disabled=!1,t.innerHTML=r,s){g(s.message,"error");return}const a=n.length;I.selectedIds=[],Oe(e.querySelector("#actual-duty-bulk-delete-modal")),await qr(e),g(`Изтрити записи: ${a}.`,"success")}async function gh(e){const{data:t,error:n}=await S.from("planned_duties").select("id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name)").order("date",{ascending:!1});if(n){g(n.message,"error"),I.plannedRows=[],Ft(e,"Грешка при зареждане на планираните повески.");return}I.plannedRows=t||[],I.plannedSelectedIds=[],Ft(e)}function Ft(e,t){const n=e.querySelector("#actual-duty-bulk-add-table-body"),r=e.querySelector("#actual-duty-bulk-add-empty"),s=e.querySelector("#actual-duty-bulk-add-select-all"),a=e.querySelector("#actual-duty-bulk-add-confirm");I.plannedSelectedIds=I.plannedSelectedIds.filter(d=>I.plannedRows.some(l=>l.id===d));const i=I.plannedRows.filter(d=>{var h,y,f;const l=`${((h=d.employees)==null?void 0:h.first_name)??""} ${((y=d.employees)==null?void 0:y.last_name)??""}`.trim().toLowerCase(),c=(((f=d.duties)==null?void 0:f.name)||"").toLowerCase(),u=(d.date||"").toLowerCase(),p=!I.plannedSearchQuery||l.includes(I.plannedSearchQuery)||c.includes(I.plannedSearchQuery)||u.includes(I.plannedSearchQuery),m=!I.plannedDateFilter||d.date===I.plannedDateFilter;return p&&m});if(!i.length){I.plannedVisibleRowIds=[],n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма записи за добавяне.",s.checked=!1,s.indeterminate=!1,s.disabled=!0,a.disabled=I.plannedSelectedIds.length===0,a.textContent=I.plannedSelectedIds.length?`Добави избраните (${I.plannedSelectedIds.length})`:"Добави избраните";return}I.plannedVisibleRowIds=i.map(d=>d.id),r.classList.add("d-none"),n.innerHTML=i.map(d=>{var u,p,m;const l=I.plannedSelectedIds.includes(d.id),c=`${((u=d.employees)==null?void 0:u.first_name)??""} ${((p=d.employees)==null?void 0:p.last_name)??""}`.trim()||"-";return`
        <tr>
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-planned-select-id="${d.id}"
              ${l?"checked":""}
              aria-label="Избери планиране"
            />
          </td>
          <td>${oe(d.date??"-")}</td>
          <td>${oe(c)}</td>
          <td>${oe(ml(d.assignment_role))}</td>
          <td>${oe(((m=d.duties)==null?void 0:m.name)??"-")}</td>
        </tr>
      `}).join("");const o=i.filter(d=>I.plannedSelectedIds.includes(d.id)).length;s.disabled=!1,s.checked=o>0&&o===i.length,s.indeterminate=o>0&&o<i.length,a.disabled=I.plannedSelectedIds.length===0,a.textContent=I.plannedSelectedIds.length?`Добави избраните (${I.plannedSelectedIds.length})`:"Добави избраните"}function ao(e){I.plannedSearchQuery="",I.plannedDateFilter="";const t=e.querySelector("#actual-duty-bulk-add-search"),n=e.querySelector("#actual-duty-bulk-add-date-filter");t&&(t.value=""),n&&(n.value="")}async function wh(e){const t=e.querySelector("#actual-duty-bulk-add-confirm"),n=[...I.plannedSelectedIds];if(!n.length){g("Избери поне един запис от планирани повески.","warning");return}const r=new Set(n),s=I.plannedRows.filter(l=>r.has(l.id));if(!s.length){g("Няма валидни записи за добавяне.","warning");return}const a=s.map(l=>({date:l.date,employee_id:l.employee_id,duty_id:l.duty_id,assignment_role:l.assignment_role||"conductor"})),i=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';let o=null;for(let l=0;l<a.length;l+=200){const c=a.slice(l,l+200),{error:u}=await S.from("actual_duties").upsert(c,{onConflict:"date,employee_id,duty_id",ignoreDuplicates:!0});if(u){o=u;break}}if(t.disabled=!1,t.innerHTML=i,o){g(o.message,"error");return}const d=a.length;Oe(e.querySelector("#actual-duty-bulk-add-modal")),await qr(e),g(`Обработени записи: ${d}. Съществуващите са пропуснати.`,"success")}function Os(e,t){if(!e)return;e.disabled=!t;const n=document.querySelector("#actual-duties-go-to-schedule-hint");if(n){const r=e.disabled?"Избери дата от филтъра „Филтър по дата“, за да активираш бутона.":"";n.setAttribute("title",r),n.classList.toggle("cursor-help",!!r)}}function _h(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function ml(e){return e==="chief"?"Началник влак":"Кондуктор"}function Sh(e,t){var m,h,y,f,b,w,v;const n=e.querySelector("#actual-duty-profile-modal"),r=e.querySelector("#actual-duty-profile-content");if(!n||!r)return;const s=(I.rows||[]).find(_=>_.id===t);if(!s){r.innerHTML='<p class="text-secondary mb-0">Няма данни за този запис.</p>',Ut(n);return}const a=`${((m=s.employees)==null?void 0:m.first_name)??""} ${((h=s.employees)==null?void 0:h.last_name)??""}`.trim()||"-",i=((y=s.duties)==null?void 0:y.name)||"-",o=ml(s.assignment_role),d=Te(s.start_time_override,xt((f=s.duties)==null?void 0:f.start_time)),l=Te(s.end_time_override,xt((b=s.duties)==null?void 0:b.end_time)),c=Te(s.break_start_time_override,xt((w=s.duties)==null?void 0:w.break_start_time)||"00:00"),u=Te(s.break_end_time_override,xt((v=s.duties)==null?void 0:v.break_end_time)||"00:00"),p=hh(d,l,c,u);r.innerHTML=`
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Дата</div>
          <div class="fw-semibold">${oe(s.date||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Служител</div>
          <div class="fw-semibold">${oe(a)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Роля</div>
          <div class="fw-semibold">${oe(o)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Повеска</div>
          <div class="fw-semibold">${oe(i)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${oe(p.startTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${oe(p.endTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${oe(p.breakDuration)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${oe(p.breakStartTime)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${oe(p.breakEndTime)}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${oe(p.duration)}</div>
        </div>
      </div>
    </div>
  `,Ut(n)}const xh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3 no-print">\r
      <h1 class="h3 mb-0">План График</h1>\r
      <div class="d-flex gap-2">\r
        <button id="plan-schedule-print" type="button" class="btn btn-outline-secondary"><i class="bi bi-printer me-1"></i>Печат</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary no-print">Разпределение по формат, близък до хартиения образец.</p>\r
\r
    <div class="row g-3 align-items-end mb-4 no-print">\r
      <div class="col-md-4">\r
        <label for="plan-schedule-date" class="form-label">Дата</label>\r
        <input id="plan-schedule-date" type="date" class="form-control" />\r
      </div>\r
      <div class="col-md-3">\r
        <label for="plan-schedule-print-orientation" class="form-label">Ориентация за печат</label>\r
        <select id="plan-schedule-print-orientation" class="form-select">\r
          <option value="landscape" selected>Landscape</option>\r
          <option value="portrait">Portrait</option>\r
        </select>\r
      </div>\r
      <div class="col-md-2">\r
        <div class="form-check mt-4 pt-2">\r
          <input class="form-check-input" type="checkbox" id="plan-schedule-print-compact" checked />\r
          <label class="form-check-label" for="plan-schedule-print-compact">Компактен</label>\r
        </div>\r
      </div>\r
      <div class="col-md-3">\r
        <div class="form-check mt-4 pt-2">\r
          <input class="form-check-input" type="checkbox" id="plan-schedule-print-fit-one-page" checked />\r
          <label class="form-check-label" for="plan-schedule-print-fit-one-page">Събери на 1 страница</label>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <p class="small text-secondary no-print">Избери ориентация и включи „Събери на 1 страница“ за автоматично мащабиране при печат.</p>\r
\r
    <article class="border rounded p-3 p-md-4 plan-schedule-sheet">\r
      <header class="schedule-sheet-header text-center mb-3">\r
        <div id="plan-schedule-print-left-label" class="schedule-print-left-label">ПС - Стара Загора</div>\r
        <div class="schedule-sheet-title-wrap">\r
          <h2 class="h3 mb-1">ПЛАН ГРАФИК</h2>\r
          <p id="plan-schedule-sheet-date" class="mb-0 text-secondary"></p>\r
        </div>\r
      </header>\r
\r
      <section class="mb-4">\r
        <div id="plan-schedule-train" class="table-responsive"></div>\r
      </section>\r
\r
      <section class="mb-4">\r
        <div id="plan-schedule-business-trip" class="table-responsive"></div>\r
      </section>\r
\r
      <section>\r
        <div id="plan-schedule-day-off" class="table-responsive"></div>\r
      </section>\r
\r
      <section id="plan-schedule-absence-section" class="mt-4">\r
        <h3 class="h6 text-uppercase text-center mb-2">Разход</h3>\r
        <div id="plan-schedule-absence" class="table-responsive"></div>\r
      </section>\r
\r
      <footer class="row g-3 mt-3">\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Одобрил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Изготвил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Проверил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
      </footer>\r
    </article>\r
\r
    <div id="plan-schedule-empty" class="text-secondary mt-3 d-none"></div>\r
    <div id="plan-schedule-error" class="text-danger mt-3 d-none"></div>\r
    <div id="plan-schedule-hint" class="text-secondary mt-3 d-none"></div>\r
  </div>\r
</section>\r
`,kh="ПС - Стара Загора";function hl(e,t){const n=e==null?void 0:e.querySelector(t);n&&(n.textContent=kh)}const io="id, name, notes, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name)";async function fl(e){const{data:t,error:n}=await S.from("schedule_keys").select("id").lte("valid_from",e).gte("valid_to",e);if(n)return{data:[],error:n};const r=(t||[]).map(p=>p==null?void 0:p.id).filter(Boolean);if(!r.length)return{data:[],error:null};const{data:s,error:a}=await S.from("duties").select(io).in("schedule_key_id",r);if(a)return{data:[],error:a};const{data:i,error:o}=await S.from("schedule_key_duties").select("duty_id").in("schedule_key_id",r);if(o)return{data:[],error:o};const d=new Set((s||[]).map(p=>p==null?void 0:p.id).filter(Boolean)),l=[...new Set((i||[]).map(p=>p==null?void 0:p.duty_id).filter(Boolean))].filter(p=>!d.has(p));if(!l.length)return{data:s||[],error:null};const{data:c,error:u}=await S.from("duties").select(io).in("id",l);return u?{data:[],error:u}:{data:[...s||[],...c||[]],error:null}}function qh(e){const t=String(e||"").trim().toLowerCase();return t==="chief"||t==="conductor"?t:""}function yl(e){const t=(e==null?void 0:e.first_name)??"",n=(e==null?void 0:e.last_name)??"";return`${t} ${n}`.trim()}function Lh(e){var n;const t=e==null?void 0:e.positions;return Array.isArray(t)?((n=t[0])==null?void 0:n.title)??"":t&&typeof t=="object"?t.title??"":""}function Th(e){var n;const t=e==null?void 0:e.duty_types;return Array.isArray(t)?((n=t[0])==null?void 0:n.name)??"":t&&typeof t=="object"?t.name??"":""}function Eh(e){var n;const t=Array.isArray(e)?(n=e[0])==null?void 0:n.name:e&&typeof e=="object"?e.name:"";return String(t||"").trim()}function $h(e){const t=e==null?void 0:e.duties;return Array.isArray(t)?t[0]||null:t&&typeof t=="object"?t:null}function oo(e){const t=String(e||"").trim();if(!t)return"99:99:99";const n=t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);if(!n)return"99:99:99";const r=String(Number(n[1])).padStart(2,"0"),s=n[2],a=n[3]||"00";return`${r}:${s}:${a}`}function Ah(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function Ie(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const lo=96/25.4;function Ch(e,{orientation:t,compact:n,fitOnePage:r}){const s=document.documentElement,a=e.querySelector(".plan-schedule-sheet");if(s.classList.add("print-preparing"),s.classList.toggle("print-compact",n),s.classList.toggle("print-fit-one-page",r),a&&(a.classList.toggle("print-landscape-page",t==="landscape"),a.classList.toggle("print-portrait-page",t==="portrait")),!r||!a){s.style.setProperty("--plan-print-scale","1");return}s.style.setProperty("--plan-print-scale","1");const i=a.getBoundingClientRect(),o=t==="portrait"?210:297,d=t==="portrait"?297:210,l=(o-20)*lo,c=(d-20)*lo,u=l/Math.max(i.width,1),p=c/Math.max(i.height,1),m=Math.min(u,p,1);s.style.setProperty("--plan-print-scale",String(Math.max(.6,m)))}function Rh(){const e=document.documentElement;e.classList.remove("print-preparing","print-compact","print-fit-one-page","print-hide-second-day"),e.style.setProperty("--plan-print-scale","1"),document.querySelectorAll(".plan-schedule-sheet").forEach(t=>{t.classList.remove("print-landscape-page","print-portrait-page")})}function Ih(e){const t=new Map;return(e||[]).forEach(n=>{const r=n==null?void 0:n.employee_id;if(!r)return;const s=t.get(r)||{employeeId:r,employeeName:yl(n.employees),reasons:[]},a=Eh(n.absence_reasons);a&&!s.reasons.includes(a)&&s.reasons.push(a),t.set(r,s)}),t}function Ph(e){const t={train:[],businessTrip:[],dayOff:[]},n=new Map;return(e||[]).forEach(r=>{const s=$h(r);s!=null&&s.id&&(n.has(s.id)||n.set(s.id,s))}),Array.from(n.values()).forEach(r=>{const s=Th(r).toLowerCase();if(s.includes("на влак")){t.train.push(r);return}if(s.includes("командировка")){t.businessTrip.push(r);return}s.includes("свободен ден")&&t.dayOff.push(r)}),t.train.sort(Nh),t.businessTrip.sort(ca),t.dayOff.sort(ca),t}function Dh(e,t){const n=new Map,r=new Map;return e.forEach(s=>{if(!(s!=null&&s.duty_id)||!(s!=null&&s.employees))return;if(s!=null&&s.employee_id&&(t!=null&&t.has(s.employee_id))){const d=t.get(s.employee_id);d&&!r.has(s.employee_id)&&r.set(s.employee_id,{employeeId:d.employeeId,employeeName:d.employeeName,reason:d.reasons.join(", ")});return}const a=n.get(s.duty_id)||{chiefs:[],conductors:[]},i=yl(s.employees),o=qh(s.assignment_role);if(o==="chief"&&i&&!a.chiefs.includes(i)&&a.chiefs.push(i),o==="conductor"&&i&&!a.conductors.includes(i)&&a.conductors.push(i),!o){const d=Lh(s.employees).toLowerCase();d.includes("началник")&&d.includes("влак")&&i&&!a.chiefs.includes(i)&&a.chiefs.push(i),d.includes("кондуктор")&&i&&!a.conductors.includes(i)&&a.conductors.push(i)}n.set(s.duty_id,a)}),{assignmentsByDuty:n,absentAssignments:Array.from(r.values()).sort((s,a)=>String((s==null?void 0:s.employeeName)||"").localeCompare(String((a==null?void 0:a.employeeName)||""),"bg"))}}function Dn(e,t,n){js(e.querySelector("#plan-schedule-train"),t.train,n,{conductorRows:2,showHours:!0,separateSecondDay:!0,minPanels:2,printAsCards:!0}),js(e.querySelector("#plan-schedule-business-trip"),t.businessTrip,n,{conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0,printAsCards:!0}),js(e.querySelector("#plan-schedule-day-off"),t.dayOff,n,{conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0,printAsCards:!0})}function Mn(e,t){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма служители в разход.</p>';return}const n=t.map(r=>`
      <tr>
        <td>${Ie(r.employeeName||"")}</td>
        <td>${Ie(r.reason||"")}</td>
      </tr>
    `).join("");e.innerHTML=`
    <table class="table table-bordered align-middle mb-0 plan-schedule-table">
      <thead>
        <tr>
          <th scope="col">Служител</th>
          <th scope="col">Причина</th>
        </tr>
      </thead>
      <tbody>
        ${n}
      </tbody>
    </table>
  `}function On(e,{hint:t,error:n,empty:r}){const s=e.querySelector("#plan-schedule-hint"),a=e.querySelector("#plan-schedule-error"),i=e.querySelector("#plan-schedule-empty");s&&(s.textContent=t||"",s.classList.toggle("d-none",!t)),a&&(a.textContent=n||"",a.classList.toggle("d-none",!n)),i&&(i.textContent=r||"",i.classList.toggle("d-none",!r))}function Mh(e){const t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("bg-BG",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function js(e,t,n,r={}){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма повески от този тип.</p>';return}const s=r.separateSecondDay?Hh(t):t,a=Number.isInteger(r.conductorRows)&&r.conductorRows>=0?r.conductorRows:3,i=5,o=jh(s,i),d=Number.isInteger(r.minPanels)&&r.minPanels>0?r.minPanels:1;for(;o.length<d;)o.push([]);e.innerHTML=o.map(l=>{const c=[...l];for(;c.length<i;)c.push(null);const u=c.map(v=>{const _=Br(v,"text-center"),k=ht(v)?"":(v==null?void 0:v.name)??"";if(!k)return`<th scope="col"${_}></th>`;const x=String((v==null?void 0:v.notes)||"").trim(),L=x?`<div class="schedule-duty-note" title="${Ie(x)}">${Ie(x)}</div>`:"";return`<th scope="col"${_}><span class="schedule-duty-name-wrap">${Fr("Влак","train")}<span class="schedule-duty-name-ellipsis" title="${Ie(k)}">${Ie(k)}</span></span>${L}</th>`}).join(""),p=c.map(v=>{const _=Br(v),k=v&&!ht(v)?bl(v):"";return!v||ht(v)?`<td${_}></td>`:`<td${_}>${Fr("Час","hours")}${Ie(k)}</td>`}).join(""),m=c.map(v=>{if(!v)return"<td></td>";const _=Br(v);if(ht(v))return`<td${_}></td>`;const k=n.get(v.id)||{chiefs:[]},x=k.chiefs.length?k.chiefs.join(", "):"";return`<td${_}>${Fr("НВ","chief")}${Ie(x)}</td>`}).join("");let h=a;if(r.hideEmptyConductorRows){const v=c.reduce((_,k)=>{if(!k||ht(k))return _;const x=n.get(k.id)||{conductors:[]},L=Array.isArray(x.conductors)?x.conductors.length:0;return Math.max(_,L)},0);h=Math.min(a,v)}const y=h>0?Array.from({length:h},(v,_)=>`
            <tr>
              ${c.map(x=>{if(!x)return"<td></td>";const L=Br(x);if(ht(x))return`<td${L}></td>`;const q=(n.get(x.id)||{conductors:[]}).conductors[_]||"";return`<td${L}>${Fr("К-р","conductor")}${Ie(q)}</td>`}).join("")}
            </tr>
          `).join(""):"",f=r.showHours===!1?"":`
            <tr>
              ${p}
            </tr>
          `,b=`
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${u}
            </tr>
          </thead>
          <tbody>
            ${f}
            <tr>
              ${m}
            </tr>
            ${y}
          </tbody>
        </table>
      `;if(!r.printAsCards)return b;const w=Oh(c,n,h,r);return`
        <div class="print-as-cards">
          ${b}
          <div class="print-only-duty-cards mb-3">${w}</div>
        </div>
      `}).join("")}function Oh(e,t,n,r={}){return`<div class="print-duty-cards-grid">${e.map(a=>{const i=r.showHours!==!1,o=i?`
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
          `:"";if(!a||ht(a)){const u=Array.from({length:n},()=>`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value"></span>
          </div>
        `).join("");return`
          <article class="print-duty-card">
            <div class="print-duty-card-title"></div>
            <div class="print-duty-card-note"></div>
            ${o}
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">НВ</span>
              <span class="print-duty-card-value"></span>
            </div>
            ${u}
          </article>
        `}const d=t.get(a.id)||{chiefs:[],conductors:[]},l=Array.isArray(d.chiefs)?d.chiefs.join(", "):"",c=Array.from({length:n},(u,p)=>{const m=Array.isArray(d.conductors)&&d.conductors[p]||"";return`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${Ie(m)}</span>
          </div>
        `}).join("");return`
        <article class="print-duty-card">
          <div class="print-duty-card-title">${Ie(a.name||"")}</div>
          <div class="print-duty-card-note">${Ie(String(a.notes||"").trim())}</div>
          ${i?`
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value">${Ie(bl(a))}</span>
            </div>
          `:""}
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${Ie(l)}</span>
          </div>
          ${c}
        </article>
      `}).join("")}</div>`}function jh(e,t){const n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}function bl(e){const t=((e==null?void 0:e.start_time)||"").slice(0,5),n=((e==null?void 0:e.end_time)||"").slice(0,5);return!t&&!n?"":t&&n?`${t} - ${n}`:t||n}function Fr(e,t){return`<span class="${t?`schedule-cell-key-badge schedule-cell-key-badge-${t}`:"schedule-cell-key-badge"}">${Ie(e)}</span>`}function ca(e,t){const n=(e==null?void 0:e.schedule_key_id)||"",r=(t==null?void 0:t.schedule_key_id)||"";if(n!==r)return String(n).localeCompare(String(r),"bg");const s=Number.isFinite(Number(e==null?void 0:e.display_order))?Number(e.display_order):Number.MAX_SAFE_INTEGER,a=Number.isFinite(Number(t==null?void 0:t.display_order))?Number(t.display_order):Number.MAX_SAFE_INTEGER;return s!==a?s-a:String((e==null?void 0:e.name)||"").localeCompare(String((t==null?void 0:t.name)||""),"bg")}function Nh(e,t){const n=!!(e!=null&&e.second_day),r=!!(t!=null&&t.second_day);if(n!==r)return n?1:-1;const s=oo(e==null?void 0:e.start_time),a=oo(t==null?void 0:t.start_time);return s!==a?s.localeCompare(a,"bg"):ca(e,t)}function Hh(e){const t=[],n=[];return e.forEach(a=>{if(a!=null&&a.second_day){n.push(a);return}t.push(a)}),!t.length||!n.length?e:t.length%5!==0?[...t,{__separator:!0},...n]:[...t,...n]}function ht(e){return!!(e&&e.__separator)}function Br(e,t=""){const n=[];return t&&n.push(t),ht(e)?n.push("separator-col"):e!=null&&e.second_day&&n.push("second-day-col"),n.length?` class="${n.join(" ")}"`:""}async function Uh(e){e.innerHTML=xh,hl(e,"#plan-schedule-print-left-label");const t=e.querySelector("#plan-schedule-date"),n=e.querySelector("#plan-schedule-print"),r=e.querySelector("#plan-schedule-print-orientation"),s=e.querySelector("#plan-schedule-print-compact"),a=e.querySelector("#plan-schedule-print-fit-one-page"),i=Ah();t&&i?t.value=i:t&&!t.value&&(t.value=new Date().toISOString().split("T")[0]),t==null||t.addEventListener("change",async()=>{await co(e)}),n==null||n.addEventListener("click",()=>{const o=(r==null?void 0:r.value)==="portrait"?"portrait":"landscape",d=(s==null?void 0:s.checked)??!0,l=(a==null?void 0:a.checked)??!0;Ch(e,{orientation:o,compact:d,fitOnePage:l}),window.addEventListener("afterprint",Rh,{once:!0}),window.print()}),await co(e)}async function co(e){const t=e.querySelector("#plan-schedule-date"),n=t==null?void 0:t.value,r=e.querySelector("#plan-schedule-sheet-date");if(r&&(r.textContent=n?Mh(n):""),!n){Dn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Mn(e.querySelector("#plan-schedule-absence"),[]),On(e,{hint:"Избери дата.",error:"",empty:""});return}const{data:s,error:a}=await S.from("planned_duties").select("employee_id, duty_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))").eq("date",n);if(a){g(a.message,"error"),Dn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Mn(e.querySelector("#plan-schedule-absence"),[]),On(e,{hint:"",error:"Грешка при зареждане на планираните записи.",empty:""});return}const{data:i,error:o}=await fl(n);if(o){g(o.message,"error"),Dn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Mn(e.querySelector("#plan-schedule-absence"),[]),On(e,{hint:"",error:"Грешка при зареждане на повеските.",empty:""});return}const{data:d,error:l}=await S.from("employee_absences").select("employee_id, start_date, end_date, employees(first_name, last_name), absence_reasons(name)").lte("start_date",n).gte("end_date",n);if(l){g(l.message,"error"),Dn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Mn(e.querySelector("#plan-schedule-absence"),[]),On(e,{hint:"",error:"Грешка при зареждане на отсъствията.",empty:""});return}const c=Ih(d||[]),u=Ph((i||[]).map(y=>({duties:y}))),{assignmentsByDuty:p,absentAssignments:m}=Dh(s||[],c);Dn(e,u,p),Mn(e.querySelector("#plan-schedule-absence"),m);const h=u.train.length+u.businessTrip.length+u.dayOff.length;On(e,{hint:"",error:"",empty:h||m.length?"":"Няма повески за показване по избраните типове."})}const Fh=`<section class="card border-0 shadow-sm schedule-page-root">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2 mb-3 no-print">\r
      <h1 class="h3 mb-0">Разпределение</h1>\r
      <div class="d-flex gap-2 page-actions">\r
        <button id="schedule-confirm-from-timetable" type="button" class="btn btn-primary">\r
          <i class="bi bi-check-circle me-1"></i>Потвърди от разписание\r
          <span id="schedule-confirm-required-badge" class="badge text-bg-warning ms-2 d-none">Нужно е повторно потвърждение</span>\r
        </button>\r
        <button id="schedule-go-to-actual" type="button" class="btn btn-outline-secondary"><i class="bi bi-arrow-right me-1"></i>Към Реални повески</button>\r
        <button id="schedule-print" type="button" class="btn btn-outline-secondary"><i class="bi bi-printer me-1"></i>Печат</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary no-print">Разпределение по реални повески с възможност за редакция на служителите.</p>\r
\r
    <div class="row g-3 align-items-end mb-4 no-print">\r
      <div class="col-md-4">\r
        <label for="schedule-date" class="form-label">Дата</label>\r
        <input id="schedule-date" type="date" class="form-control" />\r
        <div id="schedule-publication-status" class="form-text mt-2">Статус: непотвърдено</div>\r
        <div class="form-text">Повторно потвърждение е нужно само при смяна на служителя в реална повеска.</div>\r
      </div>\r
      <div class="col-md-3">\r
        <label for="schedule-print-orientation" class="form-label">Ориентация за печат</label>\r
        <select id="schedule-print-orientation" class="form-select">\r
          <option value="landscape" selected>Landscape</option>\r
          <option value="portrait">Portrait</option>\r
        </select>\r
      </div>\r
      <div class="col-md-2">\r
        <div class="form-check mt-2 mt-md-4 pt-0 pt-md-2">\r
          <input class="form-check-input" type="checkbox" id="schedule-print-compact" checked />\r
          <label class="form-check-label" for="schedule-print-compact">Компактен</label>\r
        </div>\r
      </div>\r
      <div class="col-md-3">\r
        <div class="form-check mt-2 mt-md-4 pt-0 pt-md-2">\r
          <input class="form-check-input" type="checkbox" id="schedule-print-fit-one-page" checked />\r
          <label class="form-check-label" for="schedule-print-fit-one-page">Събери на 1 страница</label>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <p class="small text-secondary no-print mb-1">Кликни върху име в таблицата, за да редактираш реалния запис.</p>\r
    <p class="small text-secondary no-print">Плъзни име на служител и пусни в желана клетка за бързо преразпределение.</p>\r
\r
    <article class="border rounded p-3 p-md-4 plan-schedule-sheet">\r
      <header class="schedule-sheet-header text-center mb-3">\r
        <div id="schedule-print-left-label" class="schedule-print-left-label">ПС - Стара Загора</div>\r
        <div class="schedule-sheet-title-wrap">\r
          <h2 class="h3 mb-1">РАЗПРЕДЕЛЕНИЕ</h2>\r
          <p id="schedule-sheet-date" class="mb-0 text-secondary"></p>\r
        </div>\r
      </header>\r
\r
      <section class="mb-4">\r
        <div id="schedule-train" class="table-responsive"></div>\r
      </section>\r
\r
      <section class="mb-4 print-hide-train-only">\r
        <div id="schedule-business-trip" class="table-responsive"></div>\r
      </section>\r
\r
      <section class="print-hide-train-only">\r
        <div id="schedule-day-off" class="table-responsive"></div>\r
      </section>\r
\r
      <footer class="row g-3 mt-3">\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Одобрил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Изготвил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Проверил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
      </footer>\r
    </article>\r
\r
    <div id="schedule-empty" class="text-secondary mt-3 d-none"></div>\r
    <div id="schedule-error" class="text-danger mt-3 d-none"></div>\r
    <div id="schedule-hint" class="text-secondary mt-3 d-none"></div>\r
  </div>\r
</section>\r
\r
<div id="schedule-actual-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 640px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="schedule-actual-edit-title" class="h5 mb-0">Редакция на актуална повеска</h2>\r
          <button id="schedule-actual-edit-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-actual-edit-form">\r
          <input type="hidden" id="schedule-actual-edit-id" />\r
          <input type="hidden" id="schedule-actual-edit-duty-id" />\r
          <input type="hidden" id="schedule-actual-edit-date-value" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label class="form-label">Дата</label>\r
              <input id="schedule-actual-edit-date" class="form-control" type="text" disabled />\r
            </div>\r
            <div class="col-md-6">\r
              <label class="form-label">Повеска</label>\r
              <input id="schedule-actual-edit-duty" class="form-control" type="text" disabled />\r
            </div>\r
            <div class="col-md-12">\r
              <label for="schedule-actual-edit-employee" class="form-label">Служител</label>\r
              <select id="schedule-actual-edit-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
            <div class="col-md-12">\r
              <label for="schedule-actual-edit-assignment-role" class="form-label">Роля</label>\r
              <select id="schedule-actual-edit-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-actual-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-actual-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-confirm-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 500px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърждение</h2>\r
          <button id="schedule-confirm-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <p class="text-secondary mb-4">\r
          Сигурен ли си, че искаш да потвърдиш разпределението от разписание? Това действие ще актуализира разпределението на служителите.\r
        </p>\r
\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="schedule-confirm-modal-cancel" type="button" class="btn btn-outline-secondary"><i class="bi bi-x me-1"></i>Отказ</button>\r
          <button id="schedule-confirm-modal-confirm" type="button" class="btn btn-primary"><i class="bi bi-check-circle me-1"></i>Потвърди</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,uo=new Map;function po(e){const t=String(e||"").trim();if(!t)return"99:99:99";const n=t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);if(!n)return"99:99:99";const r=String(Number(n[1])).padStart(2,"0"),s=n[2],a=n[3]||"00";return`${r}:${s}:${a}`}function Bh(e){const t=(e==null?void 0:e.first_name)??"",n=(e==null?void 0:e.last_name)??"";return`${t} ${n}`.trim()}function Kh(e){var n;const t=e==null?void 0:e.positions;return Array.isArray(t)?((n=t[0])==null?void 0:n.title)??"":t&&typeof t=="object"?t.title??"":""}function ua(e){const t=String((e==null?void 0:e.assignment_role)||"").trim().toLowerCase();if(t==="chief"||t==="conductor")return t;const n=Kh(e==null?void 0:e.employees).toLowerCase();return n.includes("началник")&&n.includes("влак")?"chief":"conductor"}function zt(e){var n;const t=e==null?void 0:e.duty_types;return Array.isArray(t)?((n=t[0])==null?void 0:n.name)??"":t&&typeof t=="object"?t.name??"":""}function is(e){const t=e==null?void 0:e.duties;return Array.isArray(t)?t[0]||null:t&&typeof t=="object"?t:null}function zh(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function xe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function vl(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}function Xn(e){e==null||e.classList.add("d-none"),!!(document.querySelector("#schedule-actual-edit-modal:not(.d-none)")||document.querySelector("#schedule-confirm-modal:not(.d-none)"))||document.body.classList.remove("overflow-hidden")}function Wh(e,t){const n=uo.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Xn(a);return}}};uo.set(e,r),document.addEventListener("keydown",r)}const mo=96/25.4;function Vh(e,{orientation:t,compact:n,fitOnePage:r}){const s=document.documentElement,a=e.querySelector(".plan-schedule-sheet");if(s.classList.add("print-preparing"),s.classList.add("print-hide-second-day"),s.classList.toggle("print-compact",n),s.classList.toggle("print-fit-one-page",r),a&&(a.classList.toggle("print-landscape-page",t==="landscape"),a.classList.toggle("print-portrait-page",t==="portrait")),!r||!a){s.style.setProperty("--plan-print-scale","1");return}s.style.setProperty("--plan-print-scale","1");const i=a.getBoundingClientRect(),o=t==="portrait"?210:297,d=t==="portrait"?297:210,l=(o-20)*mo,c=(d-20)*mo,u=l/Math.max(i.width,1),p=c/Math.max(i.height,1),m=Math.min(u,p,1);s.style.setProperty("--plan-print-scale",String(Math.max(.6,m)))}function Gh(){const e=document.documentElement;e.classList.remove("print-preparing","print-compact","print-fit-one-page","print-hide-second-day"),e.style.setProperty("--plan-print-scale","1"),document.querySelectorAll(".plan-schedule-sheet").forEach(t=>{t.classList.remove("print-landscape-page","print-portrait-page")})}function Jh(e,t){const n=new Map;return e.forEach(r=>{var d;if(!(r!=null&&r.duty_id)||!(r!=null&&r.employees)||!(r!=null&&r.id)||r!=null&&r.employee_id&&(t!=null&&t.has(r.employee_id)))return;const s=n.get(r.duty_id)||{chiefs:[],conductors:[]},a=Bh(r.employees),i=ua(r),o={id:r.id,employeeId:r.employee_id,role:i,name:a,dutyName:((d=is(r))==null?void 0:d.name)||"",date:r.date||""};i==="chief"?a&&!s.chiefs.some(l=>l.id===o.id)&&s.chiefs.push(o):i==="conductor"&&a&&!s.conductors.some(l=>l.id===o.id)&&s.conductors.push(o),n.set(r.duty_id,s)}),n}function jn(e,t,n,r){Ns(e.querySelector("#schedule-train"),t.train,n,r,{allowAdd:!0,allowEdit:!0,conductorRows:2,printConductorRows:3,printExtraCardRows:1,showHours:!0,separateSecondDay:!0,minPanels:2,printAsCards:!0,printHideSecondDay:!0}),Ns(e.querySelector("#schedule-business-trip"),t.businessTrip,n,r,{allowAdd:!0,allowEdit:!0,conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0}),Ns(e.querySelector("#schedule-day-off"),t.dayOff,n,r,{allowAdd:!0,allowEdit:!0,conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0})}function Nn(e,{hint:t,error:n,empty:r}){const s=e.querySelector("#schedule-hint"),a=e.querySelector("#schedule-error"),i=e.querySelector("#schedule-empty");s&&(s.textContent=t||"",s.classList.toggle("d-none",!t)),a&&(a.textContent=n||"",a.classList.toggle("d-none",!n)),i&&(i.textContent=r||"",i.classList.toggle("d-none",!r))}function Qh(e){const t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("bg-BG",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function pa(e,t){const n=(e==null?void 0:e.schedule_key_id)||"",r=(t==null?void 0:t.schedule_key_id)||"";if(n!==r)return String(n).localeCompare(String(r),"bg");const s=Number.isFinite(Number(e==null?void 0:e.display_order))?Number(e.display_order):Number.MAX_SAFE_INTEGER,a=Number.isFinite(Number(t==null?void 0:t.display_order))?Number(t.display_order):Number.MAX_SAFE_INTEGER;return s!==a?s-a:String((e==null?void 0:e.name)||"").localeCompare(String((t==null?void 0:t.name)||""),"bg")}function Yh(e,t){const n=!!(e!=null&&e.second_day),r=!!(t!=null&&t.second_day);if(n!==r)return n?1:-1;const s=po(e==null?void 0:e.start_time),a=po(t==null?void 0:t.start_time);return s!==a?s.localeCompare(a,"bg"):pa(e,t)}function Ns(e,t,n,r,s={}){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма повески от този тип.</p>';return}const a=s.separateSecondDay?Zh(t):t,i=Number.isInteger(s.conductorRows)&&s.conductorRows>=0?s.conductorRows:3,o=5,d=ef(a,o),l=Number.isInteger(s.minPanels)&&s.minPanels>0?s.minPanels:1,c=Number.isInteger(s.printConductorRows)&&s.printConductorRows>0?s.printConductorRows:i;for(;d.length<l;)d.push([]);const u=d.map(h=>{const y=[...h];for(;y.length<o;)y.push(null);const f=y.map(T=>{const q=zr(T,"text-center"),E=ft(T)?"":(T==null?void 0:T.name)??"";if(!E)return`<th scope="col"${q}></th>`;const $=String((T==null?void 0:T.notes)||"").trim(),A=$?`<div class="schedule-duty-note" title="${xe($)}">${xe($)}</div>`:"";return`<th scope="col"${q}><span class="schedule-duty-name-wrap">${Kr("Влак","train")}<span class="schedule-duty-name-ellipsis" title="${xe(E)}">${xe(E)}</span></span>${A}</th>`}).join(""),b=y.map(T=>{const q=zr(T),E=T&&!ft(T)?_l(T):"";return!T||ft(T)?`<td${q}></td>`:`<td${q}>${Kr("Час","hours")}${xe(E)}</td>`}).join(""),w=y.map(T=>{if(!T)return"<td></td>";const q=zr(T);if(ft(T))return`<td${q}></td>`;const E=n.get(T.id)||{chiefs:[]},$=zt(T).toLowerCase();return`<td${q} data-drop-duty-id="${T.id}" data-drop-duty-name="${xe((T==null?void 0:T.name)||"")}" data-drop-date="${r}" data-drop-role="chief" data-drop-duty-type="${xe($)}">${Kr("НВ","chief")}${Xh(E.chiefs,T,r,s)}</td>`}).join("");let v=i;if(s.hideEmptyConductorRows){const T=y.reduce((q,E)=>{if(!E||ft(E))return q;const $=n.get(E.id)||{conductors:[]},A=Array.isArray($.conductors)?$.conductors.length:0;return Math.max(q,A)},0);v=Math.min(i,T)}const _=v>0?Array.from({length:v},(T,q)=>`
          <tr>
            ${y.map($=>{if(!$)return"<td></td>";const A=zr($);if(ft($))return`<td${A}></td>`;const C=n.get($.id)||{conductors:[]},R=Number.isInteger(s.conductorRowOffset)&&s.conductorRowOffset>0?s.conductorRowOffset:0,P=q-R,K=P>=0&&Array.isArray(C.conductors)?C.conductors[P]:void 0,H=zt($).toLowerCase();return`<td${A} data-drop-duty-id="${$.id}" data-drop-duty-name="${xe(($==null?void 0:$.name)||"")}" data-drop-date="${r}" data-drop-role="conductor" data-drop-duty-type="${xe(H)}">${Kr("К-р","conductor")}${gl(K,$,r,s)}</td>`}).join("")}
          </tr>
        `).join(""):"",k=s.showHours===!1?"":`
            <tr>
              ${b}
            </tr>
          `,x=`
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${f}
            </tr>
          </thead>
          <tbody>
            ${k}
            <tr>
              ${w}
            </tr>
            ${_}
          </tbody>
        </table>
      `;if(!s.printAsCards)return x;const L=ho(y,n,c,s);return`
        <div class="print-as-cards">
          ${x}
          <div class="print-only-duty-cards mb-3">${L}</div>
        </div>
      `}).join(""),p=Number.isInteger(s.printExtraCardRows)&&s.printExtraCardRows>0?s.printExtraCardRows:0,m=s.printAsCards&&p>0?Array.from({length:p},()=>`
        <div class="print-as-cards">
          <div class="print-only-duty-cards mb-3">${ho(Array.from({length:o},()=>null),new Map,c,s)}</div>
        </div>
      `).join(""):"";e.innerHTML=u+m}function ho(e,t,n,r={}){return`<div class="print-duty-cards-grid">${e.map(a=>{const i=r.printHideSecondDay&&(a!=null&&a.second_day)?null:a;if(!i||ft(i))return`
          <article class="print-duty-card">
            <div class="print-duty-card-title"></div>
            <div class="print-duty-card-note"></div>
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">НВ</span>
              <span class="print-duty-card-value"></span>
            </div>
            ${Array.from({length:n},()=>`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value"></span>
          </div>
        `).join("")}
          </article>
        `;const o=t.get(i.id)||{chiefs:[],conductors:[]},d=Array.isArray(o.chiefs)?o.chiefs.map(c=>(c==null?void 0:c.name)||"").filter(Boolean).join(", "):"",l=Array.from({length:n},(c,u)=>{var y;const p=Number.isInteger(r.conductorRowOffset)&&r.conductorRowOffset>0?r.conductorRowOffset:0,m=u-p,h=Array.isArray(o.conductors)&&m>=0&&((y=o.conductors[m])==null?void 0:y.name)||"";return`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${xe(h)}</span>
          </div>
        `}).join("");return`
        <article class="print-duty-card">
          <div class="print-duty-card-title">${xe(i.name||"")}</div>
          <div class="print-duty-card-note">${xe(String(i.notes||"").trim())}</div>
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">Час</span>
            <span class="print-duty-card-value">${xe(_l(i))}</span>
          </div>
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${xe(d)}</span>
          </div>
          ${l}
        </article>
      `}).join("")}</div>`}function Xh(e,t,n,r={}){return e!=null&&e.length?e.map(s=>gl(s,t,n,r)).join("<br>"):wl(t,n,r)}function gl(e,t,n,r={}){return e!=null&&e.id?r.allowEdit!==!1?`<button type="button" class="btn btn-link p-0 text-decoration-none align-baseline" draggable="true" data-actual-edit-id="${e.id}" data-actual-drag-id="${e.id}">${xe(e.name||"")}</button>`:xe(e.name||""):wl(t,n,r)}function wl(e,t,n={}){return!(n.allowAdd!==!1)||!(e!=null&&e.id)||!t?"":`<button type="button" class="btn btn-link p-0 text-decoration-none no-print" data-actual-add-duty-id="${e.id}" data-actual-add-date="${t}" data-actual-add-duty-name="${xe(e.name||"")}">Добави</button>`}function Kr(e,t){return`<span class="${t?`schedule-cell-key-badge schedule-cell-key-badge-${t}`:"schedule-cell-key-badge"}">${xe(e)}</span>`}function _l(e){const t=((e==null?void 0:e.start_time)||"").slice(0,5),n=((e==null?void 0:e.end_time)||"").slice(0,5);return!t&&!n?"":t&&n?`${t} - ${n}`:t||n}function Zh(e){const t=[],n=[];return e.forEach(a=>{if(a!=null&&a.second_day){n.push(a);return}t.push(a)}),!t.length||!n.length?e:t.length%5!==0?[...t,{__separator:!0},...n]:[...t,...n]}function ft(e){return!!(e&&e.__separator)}function zr(e,t=""){const n=[];return t&&n.push(t),ft(e)?n.push("separator-col"):e!=null&&e.second_day&&n.push("second-day-col"),n.length?` class="${n.join(" ")}"`:""}function ef(e,t){const n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}function tf({actualRowsById:e,supabase:t,showToast:n,getDutyFromRow:r,resolveActualDutyRole:s,openModal:a,closeModal:i,loadScheduleData:o,removeEmployeeTripAndDayOffEntries:d}){function l(b){return b==="chief"?"Началник влак":"Кондуктор"}function c(b){var _,k;const w=((_=b==null?void 0:b.employees)==null?void 0:_.first_name)??"",v=((k=b==null?void 0:b.employees)==null?void 0:k.last_name)??"";return`${w} ${v}`.trim()||"-"}function u(b,w){const v=b.querySelector("#schedule-actual-edit-employee");if(!v||!w)return"-";const _=Array.from(v.options||[]).find(k=>(k==null?void 0:k.value)===w);return String((_==null?void 0:_.textContent)||"").trim()||"-"}function p({employeeName:b,dutyName:w,date:v,role:_}){return`${b||"-"} | ${w||"-"} | ${v||"-"} | ${l(_)}`}function m(b){if(!Array.isArray(b)||!b.length)return"";const w=b.map(v=>String((v==null?void 0:v.dutyName)||(v==null?void 0:v.dutyTypeName)||"").trim()).filter(Boolean);return w.length?` Премахнати: ${w.join(", ")}.`:" Премахнати са автоматично конфликтни записи."}function h(b,w){const v=e.get(w);if(!v){n("Записът не е намерен.","warning");return}const _=r(v);b.querySelector("#schedule-actual-edit-title").textContent="Редакция на актуална повеска",b.querySelector("#schedule-actual-edit-id").value=v.id,b.querySelector("#schedule-actual-edit-duty-id").value=v.duty_id||(_==null?void 0:_.id)||"",b.querySelector("#schedule-actual-edit-date-value").value=v.date||"",b.querySelector("#schedule-actual-edit-date").value=v.date||"",b.querySelector("#schedule-actual-edit-duty").value=(_==null?void 0:_.name)||"",b.querySelector("#schedule-actual-edit-employee").value=v.employee_id||"",b.querySelector("#schedule-actual-edit-assignment-role").value=s(v),b.querySelector("#schedule-actual-edit-save").textContent="Запази",a(b.querySelector("#schedule-actual-edit-modal"))}function y(b,{dutyId:w,date:v,dutyName:_}){b.querySelector("#schedule-actual-edit-title").textContent="Нов актуален запис",b.querySelector("#schedule-actual-edit-id").value="",b.querySelector("#schedule-actual-edit-duty-id").value=w,b.querySelector("#schedule-actual-edit-date-value").value=v,b.querySelector("#schedule-actual-edit-date").value=v,b.querySelector("#schedule-actual-edit-duty").value=_||"",b.querySelector("#schedule-actual-edit-employee").value="",b.querySelector("#schedule-actual-edit-assignment-role").value="conductor",b.querySelector("#schedule-actual-edit-save").textContent="Създай",a(b.querySelector("#schedule-actual-edit-modal"))}async function f(b){var O;const w=b.querySelector("#schedule-actual-edit-id"),v=b.querySelector("#schedule-actual-edit-duty-id"),_=b.querySelector("#schedule-actual-edit-date-value"),k=b.querySelector("#schedule-actual-edit-employee"),x=b.querySelector("#schedule-actual-edit-assignment-role"),L=b.querySelector("#schedule-actual-edit-save"),T=(w==null?void 0:w.value)||"",q=(v==null?void 0:v.value)||"",E=(_==null?void 0:_.value)||"",$=(k==null?void 0:k.value)||"",A=(x==null?void 0:x.value)||"conductor";if(!$){n("Избери служител.","warning");return}if(!T&&(!q||!E)){n("Липсват дата или повеска за новия запис.","warning");return}if(!["chief","conductor"].includes(A)){n("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}const C=L.innerHTML;L.disabled=!0,L.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let R,P=T;const K=T?e.get(T):null,H=r(K),G=K?{employeeName:c(K),dutyName:(H==null?void 0:H.name)||"",date:(K==null?void 0:K.date)||E,role:s(K)}:null;if(T)({error:R}=await t.from("actual_duties").update({employee_id:$,assignment_role:A}).eq("id",T));else{const{data:D,error:U}=await t.from("actual_duties").insert({date:E,duty_id:q,employee_id:$,assignment_role:A}).select("id").single();R=U,P=(D==null?void 0:D.id)||""}if(L.disabled=!1,L.innerHTML=C,R){if(R.code==="23505"){n("Този запис вече съществува за служителя и повеската.","warning");return}n(R.message,"error");return}const N=await d($,E,q,P);if(N!=null&&N.error){n(N.error.message,"error");return}const W=(H==null?void 0:H.name)||((O=b.querySelector("#schedule-actual-edit-duty"))==null?void 0:O.value)||"",ee={employeeName:u(b,$),dutyName:W,date:E,role:A},de=m((N==null?void 0:N.removedEntries)||[]);if(i(b.querySelector("#schedule-actual-edit-modal")),T&&G){const D=p(G),U=p(ee);n(`Промяна: ${D} → ${U}.${de}`,"success")}else{const D=p(ee);n(`Ново назначение: ${D}.${de}`,"success")}await o(b)}return{openEditActualDutyModal:h,openCreateActualDutyModal:y,saveEditedActualDuty:f}}let at=null;function nf({actualRowsById:e,supabase:t,showToast:n,resolveActualDutyRole:r,getDutyFromRow:s,getDutyTypeName:a,loadScheduleData:i,removeEmployeeTripAndDayOffEntries:o}){function d(b){return b==="chief"?"Началник влак":"Кондуктор"}function l(b){var _,k;const w=((_=b==null?void 0:b.employees)==null?void 0:_.first_name)??"",v=((k=b==null?void 0:b.employees)==null?void 0:k.last_name)??"";return`${w} ${v}`.trim()||"-"}function c({employeeName:b,dutyName:w,date:v,role:_}){return`${b||"-"} | ${w||"-"} | ${v||"-"} | ${d(_)}`}function u(b){if(!Array.isArray(b)||!b.length)return"";const w=b.map(v=>String((v==null?void 0:v.dutyName)||(v==null?void 0:v.dutyTypeName)||"").trim()).filter(Boolean);return w.length?` Премахнати: ${w.join(", ")}.`:" Премахнати са автоматично конфликтни записи."}function p(b){const w=String(b||"").toLowerCase();return w.includes("на влак")?"train":w.includes("командировка")?"business-trip":w.includes("свободен ден")?"day-off":""}function m(b){b.querySelectorAll(".schedule-drop-target, .schedule-drop-target-business-trip, .schedule-drop-target-preferred, .schedule-drop-target-hover").forEach(w=>{w.classList.remove("schedule-drop-target","schedule-drop-target-business-trip","schedule-drop-target-preferred","schedule-drop-target-hover")}),at=null}function h(b,w){if(m(b),!w)return;const v=e.get(w),_=s(v),k=p(a(_));b.querySelectorAll("td[data-drop-duty-id]").forEach(x=>{const L=p(x.getAttribute("data-drop-duty-type")||"");x.classList.add("schedule-drop-target"),L==="business-trip"&&x.classList.add("schedule-drop-target-business-trip"),k&&L===k&&x.classList.add("schedule-drop-target-preferred")})}function y(b){const w=b.target.closest("td[data-drop-duty-id]");if(!w){at&&(at.classList.remove("schedule-drop-target-hover"),at=null);return}b.preventDefault(),at&&at!==w&&at.classList.remove("schedule-drop-target-hover"),at=w,at.classList.add("schedule-drop-target-hover"),b.dataTransfer&&(b.dataTransfer.dropEffect="move")}async function f(b,w,v,_,k,x=""){var W;const L=e.get(w);if(!L)return;const T=L.duty_id===v,q=L.date===_,E=k==="chief"||k==="conductor"?k:"",$=r(L);if(T&&q&&(!E||$===E))return;const C={duty_id:v,date:_},R=((W=s(L))==null?void 0:W.name)||"",P={employeeName:l(L),dutyName:R,date:L.date||"",role:$};E&&(C.assignment_role=E);const{error:K}=await t.from("actual_duties").update(C).eq("id",w);if(K){if(K.code==="23505"){n("Този запис вече съществува за служителя и повеската.","warning");return}n(K.message,"error");return}const H=await o(L.employee_id,_,v,w);if(H!=null&&H.error){n(H.error.message,"error");return}const G={employeeName:l(L),dutyName:x||R,date:_,role:E||$},N=u((H==null?void 0:H.removedEntries)||[]);await i(b),n(`Промяна: ${c(P)} → ${c(G)}.${N}`,"success")}return{applyDropTargetHighlights:h,clearDropTargetHighlights:m,handleDragOver:y,moveDraggedActualDuty:f}}const yt=new Map;let an="";function rf(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium",timeStyle:"short"}).format(t)}function Hs(e,t){const n=e.querySelector("#schedule-publication-status"),r=e.querySelector("#schedule-confirm-required-badge");if(!n)return;if(!!!(t!=null&&t.is_confirmed)){const d=!!t;r==null||r.classList.toggle("d-none",!d),t?n.textContent="Статус: има смяна на служител, нужно е повторно потвърждение от разписание":n.textContent="Статус: непотвърдено от разписание",n.classList.remove("text-success"),n.classList.add("text-warning");return}r==null||r.classList.add("d-none");const a=String((t==null?void 0:t.source)||"timetable").trim(),i=a==="timetable"?"разписание":a,o=rf(t==null?void 0:t.confirmed_at);n.textContent=o?`Статус: потвърдено от ${i} (${o})`:`Статус: потвърдено от ${i}`,n.classList.remove("text-warning"),n.classList.add("text-success")}async function un(e,t){if(!t)return Hs(e,null),null;const{data:n,error:r}=await S.from("schedule_publications").select("schedule_date, is_confirmed, source, confirmed_at").eq("schedule_date",t).maybeSingle();return r?(Hs(e,null),null):(Hs(e,n||null),n||null)}async function sf(e,t){var i;if(!t){g("Избери дата за потвърждение.","warning");return}const{data:n}=await S.auth.getUser(),r=((i=n==null?void 0:n.user)==null?void 0:i.id)||null,s=new Date().toISOString(),{error:a}=await S.from("schedule_publications").upsert({schedule_date:t,is_confirmed:!0,source:"timetable",confirmed_at:s,confirmed_by:r,created_from:r},{onConflict:"schedule_date"});if(a){g(a.message,"error");return}await un(e,t),g("Графикът е потвърден от разписание.","success")}function af(e){const t=e.querySelector("#schedule-confirm-modal");vl(t)}function Us(e){const t=e.querySelector("#schedule-confirm-modal");(t==null?void 0:t.classList.contains("d-none"))===!1&&Xn(t)}async function of(e){e.innerHTML=Fh,hl(e,"#schedule-print-left-label");const t=e.querySelector("#schedule-date"),n=e.querySelector("#schedule-confirm-from-timetable"),r=e.querySelector("#schedule-go-to-actual"),s=e.querySelector("#schedule-print"),a=e.querySelector("#schedule-print-orientation"),i=e.querySelector("#schedule-print-compact"),o=e.querySelector("#schedule-print-fit-one-page"),d=e.querySelector("#schedule-confirm-modal-close"),l=e.querySelector("#schedule-confirm-modal-cancel"),c=e.querySelector("#schedule-confirm-modal-confirm"),u=zh();t&&u?t.value=u:t&&!t.value&&(t.value=new Date().toISOString().split("T")[0]),lf(e),await df(e),t==null||t.addEventListener("change",async()=>{await os(e)}),n==null||n.addEventListener("click",()=>{af(e)}),r==null||r.addEventListener("click",()=>{const p=(t==null?void 0:t.value)||"";if(!p){g("Избери дата, за да отвориш Реални повески.","warning");return}const m=new URLSearchParams({date:p});window.history.pushState({},"",`/actual-duties?${m.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),s==null||s.addEventListener("click",()=>{const p=(a==null?void 0:a.value)==="portrait"?"portrait":"landscape",m=(i==null?void 0:i.checked)??!0,h=(o==null?void 0:o.checked)??!0;Vh(e,{orientation:p,compact:m,fitOnePage:h}),window.addEventListener("afterprint",Gh,{once:!0}),window.print()}),d==null||d.addEventListener("click",()=>{Us(e)}),l==null||l.addEventListener("click",()=>{Us(e)}),c==null||c.addEventListener("click",async()=>{Us(e);const p=(t==null?void 0:t.value)||"";n.disabled=!0,await sf(e,p),n.disabled=!1}),await os(e)}function lf(e){const t=e.querySelector("#schedule-actual-edit-modal"),n=e.querySelector("#schedule-actual-edit-modal-close"),r=e.querySelector("#schedule-actual-edit-cancel"),s=e.querySelector("#schedule-actual-edit-form"),a=tf({actualRowsById:yt,supabase:S,showToast:g,getDutyFromRow:is,resolveActualDutyRole:ua,openModal:vl,closeModal:Xn,loadScheduleData:os,removeEmployeeTripAndDayOffEntries:fo}),i=nf({actualRowsById:yt,supabase:S,showToast:g,resolveActualDutyRole:ua,getDutyFromRow:is,getDutyTypeName:zt,loadScheduleData:os,removeEmployeeTripAndDayOffEntries:fo});n==null||n.addEventListener("click",()=>Xn(t)),r==null||r.addEventListener("click",()=>Xn(t)),s==null||s.addEventListener("submit",async o=>{o.preventDefault(),await a.saveEditedActualDuty(e)}),e.addEventListener("click",o=>{const d=o.target.closest("button[data-actual-edit-id]");if(d){const m=d.getAttribute("data-actual-edit-id")||"";if(!m)return;a.openEditActualDutyModal(e,m);return}const l=o.target.closest("button[data-actual-add-duty-id]");if(!l)return;const c=l.getAttribute("data-actual-add-duty-id")||"",u=l.getAttribute("data-actual-add-date")||"",p=l.getAttribute("data-actual-add-duty-name")||"";!c||!u||a.openCreateActualDutyModal(e,{dutyId:c,date:u,dutyName:p})}),e.addEventListener("dragstart",o=>{const d=o.target.closest("button[data-actual-drag-id]");d&&(an=d.getAttribute("data-actual-drag-id")||"",an&&(Hn(!0),d.classList.add("opacity-50"),o.dataTransfer&&(o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",an)),i.applyDropTargetHighlights(e,an)))}),e.addEventListener("dragend",o=>{const d=o.target.closest("button[data-actual-drag-id]");d==null||d.classList.remove("opacity-50"),i.clearDropTargetHighlights(e),an="",Hn(!1)}),e.addEventListener("dragover",o=>{i.handleDragOver(o)}),e.addEventListener("drop",async o=>{var y;const d=o.target.closest("td[data-drop-duty-id]");if(!d){i.clearDropTargetHighlights(e),Hn(!1);return}o.preventDefault();const l=d.getAttribute("data-drop-duty-id")||"",c=d.getAttribute("data-drop-duty-name")||"",u=d.getAttribute("data-drop-date")||"",p=d.getAttribute("data-drop-role")||"",h=((y=o.dataTransfer)==null?void 0:y.getData("text/plain"))||""||an;if(!l||!u||!h){i.clearDropTargetHighlights(e),Hn(!1);return}i.clearDropTargetHighlights(e),await i.moveDraggedActualDuty(e,h,l,u,p,c),Hn(!1)}),Wh("schedule",[t])}async function df(e){const t=e.querySelector("#schedule-actual-edit-employee"),{data:n,error:r}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(r){g(r.message,"error");return}const s=(n||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${xe(i)}</option>`}).join("");t&&(t.innerHTML='<option value="">Избери служител</option>'+s)}async function os(e){const t=e.querySelector("#schedule-date"),n=t==null?void 0:t.value,r=e.querySelector("#schedule-sheet-date");if(r&&(r.textContent=n?Qh(n):""),!n){yt.clear(),jn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Nn(e,{hint:"Избери дата.",error:"",empty:""}),await un(e,"");return}const{data:s,error:a}=await S.from("actual_duties").select("id, date, duty_id, employee_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))").eq("date",n);if(a){g(a.message,"error"),yt.clear(),jn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Nn(e,{hint:"",error:"Грешка при зареждане на актуалните записи.",empty:""}),await un(e,n);return}const{data:i,error:o}=await S.from("employee_absences").select("employee_id").lte("start_date",n).gte("end_date",n);if(o){g(o.message,"error"),yt.clear(),jn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Nn(e,{hint:"",error:"Грешка при зареждане на отсъствията.",empty:""}),await un(e,n);return}const{data:d,error:l}=await fl(n);if(l){g(l.message,"error"),yt.clear(),jn(e,{train:[],businessTrip:[],dayOff:[]},new Map),Nn(e,{hint:"",error:"Грешка при зареждане на повеските.",empty:""}),await un(e,n);return}const c=new Set((i||[]).map(h=>h==null?void 0:h.employee_id).filter(Boolean));yt.clear(),(s||[]).forEach(h=>{h!=null&&h.id&&yt.set(h.id,h)});const u={train:[],businessTrip:[],dayOff:[]};(d||[]).forEach(h=>{const y=zt(h).toLowerCase();if(y.includes("на влак")){u.train.push(h);return}if(y.includes("командировка")){u.businessTrip.push(h);return}y.includes("свободен ден")&&u.dayOff.push(h)}),u.train.sort(Yh),u.businessTrip.sort(pa),u.dayOff.sort(pa);const p=Jh(s||[],c);jn(e,u,p,n);const m=u.train.length+u.businessTrip.length+u.dayOff.length;Nn(e,{hint:"",error:"",empty:m?"":"Няма повески за показване по избраните типове."}),await un(e,n)}async function fo(e,t,n,r){const s={error:null,removedEntries:[]};if(!e||!t||!n)return s;const{data:a,error:i}=await S.from("duties").select("id, duty_types(name)").eq("id",n).single();if(i)return{error:i,removedEntries:[]};if(!zt(a).toLowerCase().includes("на влак"))return s;const{data:d,error:l}=await S.from("duties").select("id, duty_types(name)");if(l)return{error:l,removedEntries:[]};const c=(d||[]).filter(b=>{const w=zt(b).toLowerCase();return w.includes("командировка")||w.includes("свободен ден")}).map(b=>b.id).filter(Boolean);if(!c.length)return s;let u=S.from("actual_duties").select("id, date, duties(name, duty_types(name))").eq("employee_id",e).eq("date",t).in("duty_id",c);r&&(u=u.neq("id",r));const{data:p,error:m}=await u;if(m)return{error:m,removedEntries:[]};const h=(p||[]).map(b=>b==null?void 0:b.id).filter(Boolean);if(!h.length)return s;const{error:y}=await S.from("actual_duties").delete().in("id",h);return y?{error:y,removedEntries:[]}:{error:null,removedEntries:(p||[]).map(b=>{const w=is(b);return{dutyName:String((w==null?void 0:w.name)||"").trim(),dutyTypeName:String(zt(w)||"").trim(),date:String((b==null?void 0:b.date)||"").trim()}})}}function Hn(e){document.body.classList.toggle("schedule-dragging",!!e)}const cf=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Типове повески</h1>\r
      <button id="open-create-duty-type" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Нов тип</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на типовете за повески.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="duty-types-search" class="form-label">Търсене</label>\r
          <input id="duty-types-search" type="text" class="form-control" placeholder="Търси по наименование" />\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Наименование</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="duty-types-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="duty-types-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="duty-types-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="duty-types-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="duty-types-pagination-label" class="text-secondary small"></div>\r
      <button id="duty-types-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="duty-type-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 640px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="duty-type-form-title" class="h5 mb-0">Нов тип</h2>\r
          <button id="duty-type-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="duty-type-form">\r
          <input type="hidden" id="duty-type-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label for="duty-type-name" class="form-label">Наименование</label>\r
              <input id="duty-type-name" class="form-control" type="text" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="duty-type-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="duty-type-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-type-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този тип?</p>\r
        <input type="hidden" id="duty-type-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="duty-type-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="duty-type-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Fs(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const yo=new Map;function uf(e,t){const n=yo.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){kn(a);return}}};yo.set(e,r),document.addEventListener("keydown",r)}function kn(e){var t,n;e.classList.add("d-none"),(t=document.querySelector("#duty-type-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#duty-type-delete-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function bo(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Ee={rows:[],searchQuery:"",page:1,pageSize:20,actionsEnabled:!0};async function Ha(e){const{data:t,error:n}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(n){g(n.message,"error"),Ee.rows=[],pr(e,"Грешка при зареждане на типовете повески.");return}Ee.rows=t||[],pr(e)}function pr(e,t){var c;const n=e.querySelector("#duty-types-table-body"),r=e.querySelector("#duty-types-empty"),s=Ee.actionsEnabled!==!1;He(e,{rootSelector:"#duty-types-pagination",prevSelector:"#duty-types-pagination-prev",nextSelector:"#duty-types-pagination-next",onPrev:()=>{Ee.page=Math.max(1,(Ee.page||1)-1),pr(e)},onNext:()=>{Ee.page=(Ee.page||1)+1,pr(e)}}),(c=e.querySelector("thead th.text-end"))==null||c.classList.toggle("d-none",!s);const a=Ee.rows.filter(u=>Ee.searchQuery?(u.name||"").toLowerCase().includes(Ee.searchQuery):!0),{pageItems:i,page:o,totalItems:d,totalPages:l}=Ne(a,Ee.page,Ee.pageSize);if(Ee.page=o,ke(e,{rootSelector:"#duty-types-pagination",prevSelector:"#duty-types-pagination-prev",nextSelector:"#duty-types-pagination-next",labelSelector:"#duty-types-pagination-label",page:o,totalItems:d,totalPages:l}),!a.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма въведени типове повески.";return}r.classList.add("d-none"),n.innerHTML=i.map(u=>`
        <tr>
          <td>${bo(u.name??"-")}</td>
          ${s?`
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${u.id}"
                data-name="${bo(u.name??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${u.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
          `:""}
        </tr>
      `).join("")}async function pf(e){e.innerHTML=cf,Ee.actionsEnabled=!await bs(),mf(e),hf(e),await Ha(e)}function mf(e){var t,n;Ee.actionsEnabled||((t=e.querySelector("#open-create-duty-type"))==null||t.classList.add("d-none"),(n=e.querySelector("thead th.text-end"))==null||n.classList.add("d-none"))}function hf(e){const t=e.querySelector("#open-create-duty-type"),n=e.querySelector("#duty-type-form"),r=e.querySelector("#duty-type-cancel-btn"),s=e.querySelector("#duty-types-table-body"),a=e.querySelector("#duty-type-modal"),i=e.querySelector("#duty-type-delete-modal"),o=e.querySelector("#duty-type-modal-close"),d=e.querySelector("#duty-type-delete-confirm"),l=e.querySelector("#duty-type-delete-cancel"),c=e.querySelector("#duty-types-search");t==null||t.addEventListener("click",()=>{Ua(e),Fs(a)}),n==null||n.addEventListener("submit",async u=>{u.preventDefault(),await ff(e)}),r==null||r.addEventListener("click",()=>{kn(a)}),o==null||o.addEventListener("click",()=>{kn(a)}),l==null||l.addEventListener("click",()=>{kn(i)}),c==null||c.addEventListener("input",u=>{Ee.searchQuery=u.target.value.trim().toLowerCase(),pr(e)}),uf("duty-types",[i,a]),d==null||d.addEventListener("click",async()=>{const u=e.querySelector("#duty-type-delete-id").value;await bf(u,e)}),s==null||s.addEventListener("click",u=>{const p=u.target.closest("button[data-action]");if(!p)return;const m=p.getAttribute("data-action");if(m==="edit"){yf(e,{id:p.getAttribute("data-id"),name:p.getAttribute("data-name")}),Fs(a);return}if(m==="delete"){const h=p.getAttribute("data-id");e.querySelector("#duty-type-delete-id").value=h,Fs(i)}})}async function ff(e){var d;const t=e.querySelector("#duty-type-id"),n=e.querySelector("#duty-type-name"),r=e.querySelector("#duty-type-save-btn"),s=n.value.trim(),a=t.value;if(!s){g("Моля, попълни наименование.","warning");return}const i=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let o;if(a)({error:o}=await S.from("duty_types").update({name:s}).eq("id",a));else{const{data:l}=await S.auth.getUser(),c=((d=l==null?void 0:l.user)==null?void 0:d.email)??"web_app";({error:o}=await S.from("duty_types").insert({name:s,created_from:c}))}if(r.disabled=!1,r.innerHTML=i,o){if(o.code==="23505"){g("Такъв тип вече съществува.","warning");return}g(o.message,"error");return}g(a?"Типът е обновен.":"Типът е създаден.","success"),kn(e.querySelector("#duty-type-modal")),Ua(e),await Ha(e)}function yf(e,t){e.querySelector("#duty-type-id").value=t.id,e.querySelector("#duty-type-name").value=t.name??"",e.querySelector("#duty-type-form-title").textContent="Редакция на тип",e.querySelector("#duty-type-save-btn").textContent="Запази"}function Ua(e){e.querySelector("#duty-type-id").value="",e.querySelector("#duty-type-name").value="",e.querySelector("#duty-type-form-title").textContent="Нов тип",e.querySelector("#duty-type-save-btn").textContent="Създай"}async function bf(e,t){const n=t.querySelector("#duty-type-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("duties").select("id",{count:"exact",head:!0}).eq("duty_type_id",e);if(a){n.disabled=!1,n.innerHTML=r,g(a.message,"error");return}if((s||0)>0){n.disabled=!1,n.innerHTML=r,g("Типът не може да се изтрие, защото се използва от повески.","warning");return}const{error:i}=await S.from("duty_types").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,i){if(i.code==="23503"){g("Типът не може да се изтрие, защото се използва от повески.","warning");return}g(i.message,"error");return}g("Типът е изтрит.","success"),kn(t.querySelector("#duty-type-delete-modal")),Ua(t),await Ha(t)}const vf=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Повески към Ключ-График</h1>\r
      <div class="d-flex gap-2">\r
        <button id="open-create-schedule-key-duty" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Нова повеска</button>\r
        <button id="open-attach-schedule-key-duty" type="button" class="btn btn-outline-primary"><i class="bi bi-link-45deg me-1"></i>Прикачи съществуваща</button>\r
        <a href="/schedule-keys" data-link class="btn btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i>Назад към Ключ-График</a>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary mb-4">Ключ-график: <strong id="schedule-key-duties-title">-</strong></p>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle mb-0">\r
        <thead>\r
          <tr>\r
            <th style="width: 44px;">↕</th>\r
            <th>Наименование</th>\r
            <th>Начало</th>\r
            <th>Край</th>\r
            <th>Втори ден</th>\r
            <th>Прекъсване</th>\r
            <th>Времетраене</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="schedule-key-duties-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="schedule-key-duties-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
    <nav id="schedule-key-duties-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="schedule-key-duties-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="schedule-key-duties-pagination-label" class="text-secondary small"></div>\r
      <button id="schedule-key-duties-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="schedule-key-duty-create-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Нова повеска</h2>\r
          <button id="schedule-key-duty-create-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-key-duty-create-form">\r
          <div id="schedule-key-duty-create-form-fields" class="row g-3"></div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-key-duty-create-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-key-duty-create-save" type="submit" class="btn btn-primary">Добави</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Редакция на повеска</h2>\r
          <button id="schedule-key-duty-edit-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-key-duty-edit-form">\r
          <input type="hidden" id="schedule-key-duty-edit-id" />\r
          <div id="schedule-key-duty-edit-form-fields" class="row g-3"></div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-key-duty-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-key-duty-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 id="schedule-key-duty-delete-title" class="h5 mb-3">Потвърди</h2>\r
        <p id="schedule-key-duty-delete-message" class="text-secondary mb-4">Сигурен ли си?</p>\r
        <input type="hidden" id="schedule-key-duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="schedule-key-duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="schedule-key-duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 960px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Профил на повеска</h2>\r
          <button id="schedule-key-duty-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <div id="schedule-key-duty-profile-content"></div>\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="schedule-key-duty-profile-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
          <button id="schedule-key-duty-profile-edit" type="button" class="btn btn-primary">Редакция</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-attach-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 720px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Прикачи съществуваща повеска</h2>\r
          <button id="schedule-key-duty-attach-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div class="search-panel p-3 rounded-3 mb-3">\r
          <div class="row g-2">\r
            <div class="col-12 col-md-7">\r
              <label for="schedule-key-duty-attach-search" class="form-label">Търсене</label>\r
              <input id="schedule-key-duty-attach-search" type="text" class="form-control" placeholder="Търси по име" />\r
            </div>\r
            <div class="col-12 col-md-5">\r
              <label for="schedule-key-duty-attach-type" class="form-label">Тип</label>\r
              <select id="schedule-key-duty-attach-type" class="form-select">\r
                <option value="">Всички типове</option>\r
              </select>\r
            </div>\r
          </div>\r
          <div class="form-text mt-2">Показват се само повески, които още не са прикачени към този ключ-график.</div>\r
        </div>\r
\r
        <div id="schedule-key-duty-attach-list" class="list-group"></div>\r
        <p id="schedule-key-duty-attach-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="schedule-key-duty-attach-cancel" type="button" class="btn btn-outline-secondary"><i class="bi bi-x me-1"></i>Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;function Pe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function vo(e){return e?typeof e=="string"?e.replace(".000000",""):String(e):"-"}function gf(){return new URLSearchParams(window.location.search).get("scheduleKeyId")||""}function wf(){return new URLSearchParams(window.location.search).get("scheduleKeyName")||""}function qn(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const go=new Map;function _f(e,t){const n=go.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Me(a);return}}};go.set(e,r),document.addEventListener("keydown",r)}function Me(e){var i,o,d,l,c;e==null||e.classList.add("d-none");const t=(i=document.querySelector("#schedule-key-duty-create-modal"))==null?void 0:i.classList.contains("d-none"),n=(o=document.querySelector("#schedule-key-duty-attach-modal"))==null?void 0:o.classList.contains("d-none"),r=(d=document.querySelector("#schedule-key-duty-edit-modal"))==null?void 0:d.classList.contains("d-none"),s=(l=document.querySelector("#schedule-key-duty-delete-modal"))==null?void 0:l.classList.contains("d-none"),a=(c=document.querySelector("#schedule-key-duty-profile-modal"))==null?void 0:c.classList.contains("d-none");t&&n&&r&&s&&a&&document.body.classList.remove("overflow-hidden")}const V={scheduleKeyId:"",scheduleKeyName:"",duties:[],attachCatalog:[],draggedDutyId:null,reorderEnabled:!0,lastCreatedDutyTypeId:"",lastCreatedScheduleKeyIds:[],page:1,pageSize:20},wo="id, name, notes, duty_type_id, schedule_key_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))";async function $n(e){const t=V.scheduleKeyId,{data:n,error:r}=await S.from("duties").select(wo).eq("schedule_key_id",t).order("display_order",{ascending:!0}).order("name",{ascending:!0});if(r){V.duties=[],kt(e,"Грешка при зареждане на повеските."),g(r.message,"error");return}const{data:s,error:a}=await S.from("schedule_key_duties").select("duty_id").eq("schedule_key_id",t);if(a){V.duties=[],kt(e,"Грешка при зареждане на повеските."),g(a.message,"error");return}const i=n||[],o=new Set(i.map(c=>c==null?void 0:c.id).filter(Boolean)),d=[...new Set((s||[]).map(c=>c==null?void 0:c.duty_id).filter(Boolean))].filter(c=>!o.has(c));let l=[];if(d.length){const{data:c,error:u}=await S.from("duties").select(wo).in("id",d);if(u){V.duties=[],kt(e,"Грешка при зареждане на повеските."),g(u.message,"error");return}l=c||[]}V.duties=[...i,...l].sort((c,u)=>{const p=Number.isFinite(Number(c==null?void 0:c.display_order))?Number(c.display_order):Number.MAX_SAFE_INTEGER,m=Number.isFinite(Number(u==null?void 0:u.display_order))?Number(u.display_order):Number.MAX_SAFE_INTEGER;return p!==m?p-m:String((c==null?void 0:c.name)||"").localeCompare(String((u==null?void 0:u.name)||""),"bg")}),kt(e)}function kt(e,t){const n=e.querySelector("#schedule-key-duties-body"),r=e.querySelector("#schedule-key-duties-empty");He(e,{rootSelector:"#schedule-key-duties-pagination",prevSelector:"#schedule-key-duties-pagination-prev",nextSelector:"#schedule-key-duties-pagination-next",onPrev:()=>{V.page=Math.max(1,(V.page||1)-1),kt(e)},onNext:()=>{V.page=(V.page||1)+1,kt(e)}});const s=V.duties||[],{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,V.page,V.pageSize);if(V.page=i,ke(e,{rootSelector:"#schedule-key-duties-pagination",prevSelector:"#schedule-key-duties-pagination-prev",nextSelector:"#schedule-key-duties-pagination-next",labelSelector:"#schedule-key-duties-pagination-label",page:i,totalItems:o,totalPages:d}),!s.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма повески към този Ключ-График.";return}const l=V.reorderEnabled!==!1;r.classList.add("d-none"),n.innerHTML=a.map(c=>{const u=xf(c),p=kf(c),m=`<span class="badge text-bg-info" title="${Pe(p.join(", "))}">${u.length} кл-гр</span>`;return`
        <tr data-duty-id="${c.id}" draggable="${l?"true":"false"}">
          <td class="text-secondary">${l?"↕":""}</td>
          <td>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${m}
              <span>${Pe(c.name??"-")}</span>           
            </div>
          </td>
          <td>${Pe(c.start_time??"-")}</td>
          <td>${Pe(c.end_time??"-")}</td>
          <td>${c.second_day?"Да":"Не"}</td>
          <td>${Pe(vo(c.break_duration_interval))}</td>
          <td>${Pe(vo(c.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-duty-action="profile"
                data-id="${c.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-duty-action="edit"
                data-id="${c.id}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-duty-action="delete"
                data-id="${c.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}async function Sf(){const e=V.duties.map((r,s)=>S.from("duties").update({display_order:s+1}).eq("id",r.id)),n=(await Promise.all(e)).find(r=>r.error);return n!=null&&n.error?(g(n.error.message,"error"),!1):(V.duties=V.duties.map((r,s)=>({...r,display_order:s+1})),!0)}function Sl(e){return Array.isArray(e.schedule_key_duties)?e.schedule_key_duties:e.schedule_key_duties?[e.schedule_key_duties]:[]}function xf(e){const t=Sl(e).map(r=>r==null?void 0:r.schedule_key_id).filter(Boolean),n=t.length?t:e.schedule_key_id?[e.schedule_key_id]:[];return[...new Set(n)]}function kf(e){const t=Sl(e).map(n=>{var r;return(r=n==null?void 0:n.schedule_keys)==null?void 0:r.name}).filter(Boolean);return[...new Set(t)]}async function qf(e){e.innerHTML=vf,V.reorderEnabled=!await bs(),Lf(e),Tf(e),await $f(e),await Rf(e),await If(e),await Ef(e)}function Lf(e){const t=e.querySelector("#schedule-key-duty-create-form-fields");t&&(t.innerHTML=aa({idPrefix:"schedule-key-duty-create"}));const n=e.querySelector("#schedule-key-duty-edit-form-fields");n&&(n.innerHTML=aa({idPrefix:"schedule-key-duty-edit"}))}function Tf(e){const t=e.querySelector("#open-create-schedule-key-duty"),n=e.querySelector("#open-attach-schedule-key-duty"),r=e.querySelector("#schedule-key-duty-create-modal"),s=e.querySelector("#schedule-key-duty-attach-modal"),a=e.querySelector("#schedule-key-duty-create-form"),i=e.querySelector("#schedule-key-duty-create-modal-close"),o=e.querySelector("#schedule-key-duty-attach-modal-close"),d=e.querySelector("#schedule-key-duty-create-cancel"),l=e.querySelector("#schedule-key-duty-attach-cancel"),c=e.querySelector("#schedule-key-duty-attach-search"),u=e.querySelector("#schedule-key-duty-attach-type"),p=e.querySelector("#schedule-key-duty-attach-list"),m=e.querySelector("#schedule-key-duties-body"),h=e.querySelector("#schedule-key-duty-edit-modal"),y=e.querySelector("#schedule-key-duty-delete-modal"),f=e.querySelector("#schedule-key-duty-edit-form"),b=e.querySelector("#schedule-key-duty-edit-modal-close"),w=e.querySelector("#schedule-key-duty-edit-cancel"),v=e.querySelector("#schedule-key-duty-delete-cancel"),_=e.querySelector("#schedule-key-duty-delete-confirm"),k=e.querySelector("#schedule-key-duty-profile-modal"),x=e.querySelector("#schedule-key-duty-profile-close"),L=e.querySelector("#schedule-key-duty-profile-close-secondary"),T=e.querySelector("#schedule-key-duty-profile-edit");t==null||t.addEventListener("click",()=>{Fa(e),qn(r)}),n==null||n.addEventListener("click",async()=>{await Af(e),Yr(e),qn(s)}),i==null||i.addEventListener("click",()=>{Me(r)}),o==null||o.addEventListener("click",()=>{Me(s)}),d==null||d.addEventListener("click",()=>{Me(r)}),l==null||l.addEventListener("click",()=>{Me(s)}),a==null||a.addEventListener("submit",async q=>{q.preventDefault(),await Pf(e)}),c==null||c.addEventListener("input",()=>{Yr(e)}),u==null||u.addEventListener("change",()=>{Yr(e)}),p==null||p.addEventListener("click",async q=>{const E=q.target.closest("button[data-attach-duty-id]");if(!E)return;const $=E.getAttribute("data-attach-duty-id")||"";$&&await Cf(e,$,E)}),f==null||f.addEventListener("submit",async q=>{q.preventDefault(),await Df(e)}),b==null||b.addEventListener("click",()=>{Me(h)}),w==null||w.addEventListener("click",()=>{Me(h)}),v==null||v.addEventListener("click",()=>{Me(y)}),_==null||_.addEventListener("click",async()=>{const q=e.querySelector("#schedule-key-duty-delete-id").value;await Ff(e,q)}),x==null||x.addEventListener("click",()=>{Me(k)}),L==null||L.addEventListener("click",()=>{Me(k)}),T==null||T.addEventListener("click",()=>{var E;const q=((E=k==null?void 0:k.dataset)==null?void 0:E.dutyId)||"";q&&(Me(k),_o(e,q))}),_f("schedule-key-duties",[k,y,h,s,r]),m==null||m.addEventListener("dragstart",q=>{if(!V.reorderEnabled)return;const E=q.target.closest("tr[data-duty-id]");E&&(V.draggedDutyId=E.getAttribute("data-duty-id"),E.classList.add("table-active"))}),m==null||m.addEventListener("dragend",q=>{if(!V.reorderEnabled)return;const E=q.target.closest("tr[data-duty-id]");E&&E.classList.remove("table-active"),V.draggedDutyId=null}),m==null||m.addEventListener("dragover",q=>{V.reorderEnabled&&q.preventDefault()}),m==null||m.addEventListener("drop",async q=>{if(!V.reorderEnabled)return;q.preventDefault();const E=q.target.closest("tr[data-duty-id]"),$=V.draggedDutyId;if(!E||!$)return;const A=E.getAttribute("data-duty-id");if(!A||A===$)return;const C=V.duties.findIndex(H=>H.id===$),R=V.duties.findIndex(H=>H.id===A);if(C<0||R<0)return;const[P]=V.duties.splice(C,1);if(V.duties.splice(R,0,P),kt(e),!await Sf()){await $n(e);return}g("Редът на повеските е запазен.","success")}),m==null||m.addEventListener("click",async q=>{const E=q.target.closest("button[data-duty-action]");if(!E)return;const $=E.getAttribute("data-duty-action");if($==="profile"){const A=E.getAttribute("data-id");Mf(e,A);return}if($==="edit"){const A=E.getAttribute("data-id");_o(e,A);return}if($==="delete"){const A=E.getAttribute("data-id");Uf(e,A)}})}async function Ef(e){if(V.scheduleKeyId=gf(),V.scheduleKeyName=wf(),!V.scheduleKeyId){kt(e,"Няма избран Ключ-График. Върни се и избери запис."),e.querySelector("#open-create-schedule-key-duty").classList.add("d-none"),e.querySelector("#open-attach-schedule-key-duty").classList.add("d-none");return}if(!V.scheduleKeyName){const{data:t,error:n}=await S.from("schedule_keys").select("name").eq("id",V.scheduleKeyId).single();n&&g(n.message,"error"),V.scheduleKeyName=(t==null?void 0:t.name)||V.scheduleKeyId}e.querySelector("#schedule-key-duties-title").textContent=V.scheduleKeyName,Fa(e),await $n(e)}async function $f(e){const t=e.querySelector("#schedule-key-duty-create-type"),n=e.querySelector("#schedule-key-duty-edit-type"),r=e.querySelector("#schedule-key-duty-attach-type"),{data:s,error:a}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(a){g(a.message,"error");return}const i=(s||[]).map(o=>`<option value="${o.id}">${Pe(o.name)}</option>`).join("");t.innerHTML='<option value="">Избери тип</option>'+i,n.innerHTML='<option value="">Избери тип</option>'+i,r&&(r.innerHTML='<option value="">Всички типове</option>'+i)}async function Af(e){const t=e.querySelector("#schedule-key-duty-attach-list"),n=e.querySelector("#schedule-key-duty-attach-empty");if(!V.scheduleKeyId){V.attachCatalog=[],t&&(t.innerHTML=""),n&&(n.textContent="Няма избран ключ-график.",n.classList.remove("d-none"));return}t&&(t.innerHTML='<div class="list-group-item text-secondary">Зареждане...</div>'),n&&n.classList.add("d-none");const r=new Set((V.duties||[]).map(i=>i==null?void 0:i.id).filter(Boolean)),{data:s,error:a}=await S.from("duties").select("id, name, start_time, end_time, duty_type_id, duty_types(name)").order("name",{ascending:!0});if(a){V.attachCatalog=[],t&&(t.innerHTML=""),n&&(n.textContent="Грешка при зареждане на повеските.",n.classList.remove("d-none")),g(a.message,"error");return}V.attachCatalog=(s||[]).filter(i=>(i==null?void 0:i.id)&&!r.has(i.id))}function Yr(e){const t=e.querySelector("#schedule-key-duty-attach-list"),n=e.querySelector("#schedule-key-duty-attach-empty"),r=e.querySelector("#schedule-key-duty-attach-search"),s=e.querySelector("#schedule-key-duty-attach-type");if(!t||!n)return;const a=((r==null?void 0:r.value)||"").trim().toLowerCase(),i=(s==null?void 0:s.value)||"",o=Array.isArray(V.attachCatalog)?V.attachCatalog:[],d=o.filter(l=>i&&(l==null?void 0:l.duty_type_id)!==i?!1:a?String((l==null?void 0:l.name)||"").toLowerCase().includes(a):!0);if(!o.length){t.innerHTML="",n.textContent="Няма свободни повески за прикачване.",n.classList.remove("d-none");return}if(!d.length){t.innerHTML="",n.textContent="Няма резултати по зададените филтри.",n.classList.remove("d-none");return}n.classList.add("d-none"),t.innerHTML=d.map(l=>{var m;const c=(l.start_time||"").slice(0,5)||"--:--",u=(l.end_time||"").slice(0,5)||"--:--",p=((m=l==null?void 0:l.duty_types)==null?void 0:m.name)||"";return`
        <div class="list-group-item d-flex justify-content-between align-items-start gap-3 flex-wrap">
          <div class="flex-grow-1">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <strong>${Pe(l.name||"-")}</strong>
              ${p?`<span class="badge text-bg-light">${Pe(p)}</span>`:""}
            </div>
            <div class="text-secondary small">${Pe(c)} - ${Pe(u)}</div>
          </div>
          <div>
            <button type="button" class="btn btn-sm btn-primary" data-attach-duty-id="${l.id}"><i class="bi bi-link-45deg me-1"></i>Прикачи</button>
          </div>
        </div>
      `}).join("")}async function Cf(e,t,n){if(!V.scheduleKeyId||!t){g("Избери повеска за прикачване.","warning");return}const r=n,s=(r==null?void 0:r.innerHTML)||"";r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прикачане...');const{error:a}=await S.from("schedule_key_duties").insert({duty_id:t,schedule_key_id:V.scheduleKeyId});if(r&&(r.disabled=!1,r.innerHTML=s),a){g(a.message,"error");return}V.attachCatalog=(V.attachCatalog||[]).filter(i=>(i==null?void 0:i.id)!==t),Yr(e),g("Повеската е прикачена към ключ-графика.","success"),await $n(e)}async function Rf(e){const t=e.querySelector("#schedule-key-duty-create-schedule-keys"),n=e.querySelector("#schedule-key-duty-edit-schedule-keys"),{data:r,error:s}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(s){g(s.message,"error");return}const a=(r||[]).map(i=>`<option value="${i.id}">${Pe(i.name)}</option>`).join("");t.innerHTML=a,n.innerHTML=a}async function If(e){const t=e.querySelector("#schedule-key-duty-create-trains"),n=e.querySelector("#schedule-key-duty-edit-trains"),{data:r,error:s}=await S.from("trains").select("id, number, origin_station, destination_station").order("number",{ascending:!0});if(s){g(s.message,"error");return}const a=(r||[]).map(i=>{const o=`${i.origin_station||"-"} - ${i.destination_station||"-"}`;return`<option value="${i.id}">${Pe(i.number||"-")} (${Pe(o)})</option>`}).join("");t&&(t.innerHTML=a),n&&(n.innerHTML=a)}async function Pf(e){var K,H;const t=e.querySelector("#schedule-key-duty-create-name"),n=e.querySelector("#schedule-key-duty-create-type"),r=e.querySelector("#schedule-key-duty-create-schedule-keys"),s=lt(e,"#schedule-key-duty-create-start","#schedule-key-duty-create-start-time"),a=lt(e,"#schedule-key-duty-create-end","#schedule-key-duty-create-end-time"),i=e.querySelector("#schedule-key-duty-create-second-day"),o=lt(e,"#schedule-key-duty-create-break-start","#schedule-key-duty-create-break-start-time"),d=lt(e,"#schedule-key-duty-create-break-end","#schedule-key-duty-create-break-end-time"),l=e.querySelector("#schedule-key-duty-create-trains"),c=e.querySelector("#schedule-key-duty-create-save"),u=t.value.trim(),p=n.value||null,m=Array.from(r.selectedOptions||[]).map(G=>G.value).filter(Boolean),h=m[0]||null,y=(s==null?void 0:s.value)||"",f=(a==null?void 0:a.value)||"",b=i.checked,w=(o==null?void 0:o.value)||"00:00",v=(d==null?void 0:d.value)||"00:00",_=e.querySelector("#schedule-key-duty-create-notes").value.trim()||null,k=Array.from(l.selectedOptions||[]).map(G=>G.value).filter(Boolean);if(!V.scheduleKeyId||!u||!p||!y||!f){g("Моля, попълни всички полета за повеската.","warning");return}if(!m.length){g("Избери поне един ключ-график.","warning");return}const x=je(y,f);if(je(w,v)>x){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const T=c.innerHTML;c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';const{data:q}=await S.auth.getUser(),E=((K=q==null?void 0:q.user)==null?void 0:K.id)??((H=q==null?void 0:q.user)==null?void 0:H.email)??"web_app",$=V.duties.reduce((G,N)=>Math.max(G,Number(N.display_order)||0),0),{data:A,error:C}=await S.from("duties").insert({schedule_key_id:h,duty_type_id:p,name:u,start_time:y,end_time:f,second_day:b,break_start_time:w,break_end_time:v,notes:_,created_from:E,display_order:$+1}).select("id").single(),R=C?null:await xl(A==null?void 0:A.id,m),P=C||R?null:await kl(A==null?void 0:A.id,k);if(c.disabled=!1,c.innerHTML=T,C||R||P){g((C||R||P).message,"error");return}V.lastCreatedDutyTypeId=p,V.lastCreatedScheduleKeyIds=[...m],Me(e.querySelector("#schedule-key-duty-create-modal")),Fa(e),g("Повеската е добавена към Ключ-График.","success"),await $n(e)}function _o(e,t){const n=V.duties.find(o=>o.id===t);if(!n){g("Повеската не е намерена.","warning");return}e.querySelector("#schedule-key-duty-edit-id").value=n.id,e.querySelector("#schedule-key-duty-edit-name").value=n.name??"",e.querySelector("#schedule-key-duty-edit-type").value=n.duty_type_id??"";const r=e.querySelector("#schedule-key-duty-edit-schedule-keys"),s=Ll(n);Array.from(r.options).forEach(o=>{o.selected=s.includes(o.value)});const a=e.querySelector("#schedule-key-duty-edit-trains"),i=Nf(n);Array.from(a.options).forEach(o=>{o.selected=i.includes(o.value)}),qt(e,(n.start_time||"").slice(0,5),"#schedule-key-duty-edit-start","#schedule-key-duty-edit-start-time"),qt(e,(n.end_time||"").slice(0,5),"#schedule-key-duty-edit-end","#schedule-key-duty-edit-end-time"),e.querySelector("#schedule-key-duty-edit-second-day").checked=!!n.second_day,qt(e,Vt(n.break_start_time),"#schedule-key-duty-edit-break-start","#schedule-key-duty-edit-break-start-time"),qt(e,Vt(n.break_end_time),"#schedule-key-duty-edit-break-end","#schedule-key-duty-edit-break-end-time"),e.querySelector("#schedule-key-duty-edit-notes").value=n.notes??"",qn(e.querySelector("#schedule-key-duty-edit-modal"))}function Fa(e){var s;e.querySelector("#schedule-key-duty-create-name").value="",e.querySelector("#schedule-key-duty-create-type").value=V.lastCreatedDutyTypeId||"";const t=(s=V.lastCreatedScheduleKeyIds)!=null&&s.length?V.lastCreatedScheduleKeyIds:[V.scheduleKeyId],n=e.querySelector("#schedule-key-duty-create-schedule-keys");Array.from(n.options).forEach(a=>{a.selected=t.includes(a.value)}),qt(e,"","#schedule-key-duty-create-start","#schedule-key-duty-create-start-time"),qt(e,"","#schedule-key-duty-create-end","#schedule-key-duty-create-end-time"),e.querySelector("#schedule-key-duty-create-second-day").checked=!1,qt(e,"00:00","#schedule-key-duty-create-break-start","#schedule-key-duty-create-break-start-time"),qt(e,"00:00","#schedule-key-duty-create-break-end","#schedule-key-duty-create-break-end-time"),e.querySelector("#schedule-key-duty-create-notes").value="";const r=e.querySelector("#schedule-key-duty-create-trains");Array.from(r.options).forEach(a=>{a.selected=!1})}async function Df(e){var _,k,x,L;const t=e.querySelector("#schedule-key-duty-edit-id").value,n=e.querySelector("#schedule-key-duty-edit-name").value.trim(),r=e.querySelector("#schedule-key-duty-edit-type").value||null,s=Array.from(e.querySelector("#schedule-key-duty-edit-schedule-keys").selectedOptions||[]).map(T=>T.value).filter(Boolean),a=s[0]||null,i=((_=lt(e,"#schedule-key-duty-edit-start","#schedule-key-duty-edit-start-time"))==null?void 0:_.value)||"",o=((k=lt(e,"#schedule-key-duty-edit-end","#schedule-key-duty-edit-end-time"))==null?void 0:k.value)||"",d=e.querySelector("#schedule-key-duty-edit-second-day").checked,l=((x=lt(e,"#schedule-key-duty-edit-break-start","#schedule-key-duty-edit-break-start-time"))==null?void 0:x.value)||"00:00",c=((L=lt(e,"#schedule-key-duty-edit-break-end","#schedule-key-duty-edit-break-end-time"))==null?void 0:L.value)||"00:00",u=e.querySelector("#schedule-key-duty-edit-notes").value.trim()||null,p=Array.from(e.querySelector("#schedule-key-duty-edit-trains").selectedOptions||[]).map(T=>T.value).filter(Boolean),m=e.querySelector("#schedule-key-duty-edit-save");if(!t||!n||!r||!i||!o){g("Моля, попълни всички полета за повеската.","warning");return}if(!s.length){g("Избери поне един ключ-график.","warning");return}const h=je(i,o);if(je(l,c)>h){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const f=m.innerHTML;m.disabled=!0,m.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const{error:b}=await S.from("duties").update({name:n,duty_type_id:r,schedule_key_id:a,start_time:i,end_time:o,second_day:d,break_start_time:l,break_end_time:c,notes:u}).eq("id",t),w=b?null:await xl(t,s),v=b||w?null:await kl(t,p);if(m.disabled=!1,m.innerHTML=f,b||w||v){g((b||w||v).message,"error");return}Me(e.querySelector("#schedule-key-duty-edit-modal")),g("Повеската е обновена.","success"),await $n(e)}async function xl(e,t){if(!e)return{message:"Липсва идентификатор на повеска за запис на ключ-графици."};const{error:n}=await S.from("schedule_key_duties").delete().eq("duty_id",e);if(n)return n;const r=t.map(a=>({duty_id:e,schedule_key_id:a})),{error:s}=await S.from("schedule_key_duties").insert(r);return s}async function kl(e,t){if(!e)return{message:"Липсва идентификатор на повеска за запис на влакове."};const{error:n}=await S.from("duty_trains").delete().eq("duty_id",e);if(n)return n;if(!t.length)return null;const r=t.map((a,i)=>({duty_id:e,train_id:a,sequence_order:i+1})),{error:s}=await S.from("duty_trains").insert(r);return s}function Mf(e,t){const n=V.duties.find(d=>d.id===t),r=e.querySelector("#schedule-key-duty-profile-content"),s=e.querySelector("#schedule-key-duty-profile-modal"),a=e.querySelector("#schedule-key-duty-profile-edit");if(!r||!s)return;if(!n){s.dataset.dutyId="",a&&(a.disabled=!0),r.innerHTML='<p class="text-secondary mb-0">Няма данни за тази повеска.</p>',qn(s);return}s.dataset.dutyId=n.id,a&&(a.disabled=!1);const i=jf(n),o=Hf(n);r.innerHTML=nl({duty:n,scheduleKeyNames:i,trainNumbers:o,escapeHtml:Pe,intervalToTimeInput:Vt,formatInterval:Of}),qn(s)}function Of(e){return e?String(e).replace(".000000",""):"-"}function lt(e,...t){for(const n of t){const r=e.querySelector(n);if(r)return r}return null}function qt(e,t,...n){const r=lt(e,...n);r&&(r.value=t)}function ql(e){return Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]}function Ll(e){const t=ql(e).map(r=>r==null?void 0:r.schedule_key_id).filter(Boolean),n=t.length?t:e!=null&&e.schedule_key_id?[e.schedule_key_id]:[];return[...new Set(n)]}function jf(e){const t=ql(e).map(n=>{var r;return(r=n==null?void 0:n.schedule_keys)==null?void 0:r.name}).filter(Boolean);return[...new Set(t)]}function Tl(e){return Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]}function Nf(e){return Tl(e).map(t=>({id:t==null?void 0:t.train_id,sequenceOrder:Number.isFinite(Number(t==null?void 0:t.sequence_order))?Number(t.sequence_order):Number.MAX_SAFE_INTEGER})).filter(t=>!!t.id).sort((t,n)=>t.sequenceOrder-n.sequenceOrder).map(t=>t.id).filter((t,n,r)=>r.indexOf(t)===n)}function Hf(e){return Tl(e).map(t=>{var n;return{number:(n=t==null?void 0:t.trains)==null?void 0:n.number,sequenceOrder:Number.isFinite(Number(t==null?void 0:t.sequence_order))?Number(t.sequence_order):Number.MAX_SAFE_INTEGER}}).filter(t=>!!t.number).sort((t,n)=>t.sequenceOrder-n.sequenceOrder).map(t=>t.number).filter((t,n,r)=>r.indexOf(t)===n)}function Uf(e,t){const n=e.querySelector("#schedule-key-duty-delete-modal"),r=e.querySelector("#schedule-key-duty-delete-title"),s=e.querySelector("#schedule-key-duty-delete-message"),a=e.querySelector("#schedule-key-duty-delete-confirm"),i=V.duties.find(p=>p.id===t),o=V.scheduleKeyId,l=(i?Ll(i):[]).filter(p=>p!==o),c=(i==null?void 0:i.schedule_key_id)===o&&l.length===0,u=(i==null?void 0:i.schedule_key_id)===o&&l[0]||"";n&&(n.dataset.action=c?"delete":"detach",n.dataset.newPrimaryScheduleKeyId=u),r&&(r.textContent=c?"Потвърди изтриване":"Потвърди разкачане"),s&&(s.textContent=c?"Сигурен ли си, че искаш да изтриеш тази повеска?":"Сигурен ли си, че искаш да разкачиш тази повеска от текущия ключ-график?"),a&&(a.textContent=c?"Изтрий":"Разкачи",a.classList.toggle("btn-danger",c),a.classList.toggle("btn-warning",!c)),e.querySelector("#schedule-key-duty-delete-id").value=t,qn(n)}async function Ff(e,t){var c,u;const n=e.querySelector("#schedule-key-duty-delete-confirm"),r=e.querySelector("#schedule-key-duty-delete-modal"),s=n.innerHTML,a=((c=r==null?void 0:r.dataset)==null?void 0:c.action)||"detach",i=((u=r==null?void 0:r.dataset)==null?void 0:u.newPrimaryScheduleKeyId)||"",o=V.duties.find(p=>p.id===t),d=V.scheduleKeyId;n.disabled=!0,n.innerHTML=a==="delete"?'<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...':'<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Разкачане...';let l=null;if(a==="delete"){const{error:p}=await S.from("schedule_key_duties").delete().eq("duty_id",t);p&&(l=p),l||(l=(await S.from("duties").delete().eq("id",t).eq("schedule_key_id",d)).error)}else{const{error:p}=await S.from("schedule_key_duties").delete().eq("duty_id",t).eq("schedule_key_id",d);p&&(l=p),!l&&(o==null?void 0:o.schedule_key_id)===d&&(i?l=(await S.from("duties").update({schedule_key_id:i}).eq("id",t)).error:l={message:"Не е намерен друг ключ-график за прехвърляне на повеската."})}if(n.disabled=!1,n.innerHTML=s,n&&(n.classList.remove("btn-warning"),n.classList.add("btn-danger")),l){g(l.message,"error");return}Me(e.querySelector("#schedule-key-duty-delete-modal")),g(a==="delete"?"Повеската е изтрита.":"Повеската е разкачена от ключ-графика.","success"),await $n(e)}const Bf=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Влакове</h1>\r
      <button id="open-create-train" type="button" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>Нов влак</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на влаковете, използвани в повеските.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="trains-filter-reset" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-x-circle me-1"></i>Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="trains-search" class="form-label">Търсене</label>\r
          <input id="trains-search" type="text" class="form-control" placeholder="Търси по номер, начална или крайна гара" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="trains-origin-filter" class="form-label">Начална гара</label>\r
          <select id="trains-origin-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
        <div class="col-md-3">\r
          <label for="trains-destination-filter" class="form-label">Крайна гара</label>\r
          <select id="trains-destination-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Номер</th>\r
            <th>Начална гара</th>\r
            <th>Крайна гара</th>\r
            <th>Отпътуване</th>\r
            <th>Пристигане</th>\r
            <th>Разписание</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="trains-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="trains-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <nav id="trains-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="trains-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="trains-pagination-label" class="text-secondary small"></div>\r
      <button id="trains-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="train-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow-y: auto;">\r
    <div class="card w-100" style="max-width: 900px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow-y: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="train-form-title" class="h5 mb-0">Нов влак</h2>\r
          <button id="train-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="train-form">\r
          <input type="hidden" id="train-id" />\r
          <input type="hidden" id="train-existing-timetable-url" />\r
          <input type="hidden" id="train-draft-timetable-url" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-4">\r
              <label for="train-number" class="form-label">Номер</label>\r
              <input id="train-number" class="form-control" type="text" required />\r
            </div>\r
            <div class="col-md-4">\r
              <label for="train-origin-station" class="form-label">Начална гара</label>\r
              <input id="train-origin-station" class="form-control" type="text" required />\r
            </div>\r
            <div class="col-md-4">\r
              <label for="train-destination-station" class="form-label">Крайна гара</label>\r
              <input id="train-destination-station" class="form-control" type="text" required />\r
            </div>\r
            <div class="col-md-3">\r
              <label for="train-departure-time" class="form-label">Отпътуване</label>\r
              <input id="train-departure-time" class="form-control" type="time" required />\r
            </div>\r
            <div class="col-md-3">\r
              <label for="train-arrival-time" class="form-label">Пристигане</label>\r
              <input id="train-arrival-time" class="form-control" type="time" required />\r
            </div>\r
            <div class="col-12">\r
              <label for="train-timetable-file" class="form-label">Файл с разписание</label>\r
              <input id="train-timetable-file" class="form-control" type="file" multiple accept=".pdf,.csv,.xlsx,.xls,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp" />\r
              <div class="form-text">Можеш да избереш един или повече файлове (до 5 общо за влак); всички се качват в Storage.</div>\r
              <div id="train-current-timetable-wrap" class="form-text mt-2 d-none">\r
                <span class="d-block mb-1">Текущи файлове/линкове:</span>\r
                <div id="train-current-timetable-links" class="d-flex flex-wrap gap-2"></div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="train-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="train-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="train-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този влак?</p>\r
        <input type="hidden" id="train-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="train-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="train-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="train-timetable-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="train-timetable-preview-title" class="h5 mb-0">Преглед на разписание</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="train-timetable-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="train-timetable-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="train-timetable-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <div id="train-timetable-preview-text-wrap" class="d-none">\r
          <pre id="train-timetable-preview-text" class="border rounded p-3 bg-light mb-0" style="height: min(72vh, 760px); overflow: auto; white-space: pre-wrap; word-break: break-word;"></pre>\r
        </div>\r
        <div id="train-timetable-preview-csv-wrap" class="d-none">\r
          <p id="train-timetable-preview-csv-note" class="text-secondary small mb-2"></p>\r
          <div class="table-responsive border rounded" style="height: min(72vh, 760px); overflow: auto;">\r
            <table class="table table-sm table-striped table-bordered mb-0">\r
              <thead id="train-timetable-preview-csv-head"></thead>\r
              <tbody id="train-timetable-preview-csv-body"></tbody>\r
            </table>\r
          </div>\r
        </div>\r
        <iframe\r
          id="train-timetable-preview-frame"\r
          title="Преглед на разписание"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Xr(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const So=new Map;function Kf(e,t){const n=So.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Wt(a);return}}};So.set(e,r),document.addEventListener("keydown",r)}function Wt(e){var t,n,r;e.classList.add("d-none"),(t=document.querySelector("#train-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#train-delete-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#train-timetable-preview-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Se(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function xo(e){const t=String(e||"").trim();if(!t)return"";const n=t.match(/^(\d{1,2}:\d{2})/);return n?n[1]:t.slice(0,5)}const me={rows:[],searchQuery:"",originFilter:"",destinationFilter:"",page:1,pageSize:20};async function Ba(e){const{data:t,error:n}=await S.from("trains").select("id, number, origin_station, destination_station, departure_time, arrival_time, timetable_url").order("number",{ascending:!0});if(n){g(n.message,"error"),me.rows=[],Lt(e,"Грешка при зареждане на влаковете.");return}me.rows=t||[],Lt(e)}function Lt(e,t){const n=e.querySelector("#trains-table-body"),r=e.querySelector("#trains-empty");Wf(e),He(e,{rootSelector:"#trains-pagination",prevSelector:"#trains-pagination-prev",nextSelector:"#trains-pagination-next",onPrev:()=>{me.page=Math.max(1,(me.page||1)-1),Lt(e)},onNext:()=>{me.page=(me.page||1)+1,Lt(e)}});const s=me.rows.filter(l=>{const c=`${l.number||""} ${l.origin_station||""} ${l.destination_station||""}`.toLowerCase(),u=String(l.origin_station||"").trim().toLowerCase(),p=String(l.destination_station||"").trim().toLowerCase(),m=!me.searchQuery||c.includes(me.searchQuery),h=!me.originFilter||u===me.originFilter,y=!me.destinationFilter||p===me.destinationFilter;return m&&h&&y}),{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,me.page,me.pageSize);if(me.page=i,ke(e,{rootSelector:"#trains-pagination",prevSelector:"#trains-pagination-prev",nextSelector:"#trains-pagination-next",labelSelector:"#trains-pagination-label",page:i,totalItems:o,totalPages:d}),!s.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма въведени влакове.";return}r.classList.add("d-none"),n.innerHTML=a.map(l=>{const c=zf(l.timetable_url),u=c.length?`<div class="d-flex flex-column gap-0">${c.map((p,m)=>{const h=p.label||`Файл ${m+1}`,y=encodeURIComponent(p.url),f=encodeURIComponent(h);return`
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <a class="text-decoration-none" href="${Se(p.url)}" target="_blank" rel="noopener noreferrer">${Se(h)}</a>
                <button
                  type="button"
                  class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                  data-action="preview-timetable"
                  data-preview-url="${Se(y)}"
                  data-preview-label="${Se(f)}"
                  title="Преглед"
                  aria-label="Преглед"
                >
                  👁
                </button>
              </div>
            `}).join("")}</div>`:'<span class="text-secondary">-</span>';return`
        <tr>
          <td>${Se(l.number??"-")}</td>
          <td>${Se(l.origin_station??"-")}</td>
          <td>${Se(l.destination_station??"-")}</td>
          <td>${Se((l.departure_time||"").slice(0,5)||"-")}</td>
          <td>${Se((l.arrival_time||"").slice(0,5)||"-")}</td>
          <td>${u}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${l.id}"
                data-number="${Se(l.number??"")}"
                data-origin-station="${Se(l.origin_station??"")}"
                data-destination-station="${Se(l.destination_station??"")}"
                data-departure-time="${Se(l.departure_time??"")}"
                data-arrival-time="${Se(l.arrival_time??"")}"
                data-timetable-url="${Se(encodeURIComponent(l.timetable_url??""))}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${l.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function zf(e){if(Array.isArray(e))return e.map((n,r)=>Bs(n,r)).filter(n=>n.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const n=JSON.parse(t);if(Array.isArray(n))return n.map((r,s)=>Bs(r,s)).filter(r=>r.url)}catch{return[{url:t,label:ma(t,0)}]}return t.split(`
`).map((n,r)=>Bs(n,r)).filter(n=>n.url)}function Wf(e){const t=e.querySelector("#trains-origin-filter"),n=e.querySelector("#trains-destination-filter");if(!t||!n)return;const r=me.originFilter||"",s=me.destinationFilter||"",a=[...new Set(me.rows.map(o=>String((o==null?void 0:o.origin_station)||"").trim()).filter(Boolean))].sort((o,d)=>o.localeCompare(d,"bg")),i=[...new Set(me.rows.map(o=>String((o==null?void 0:o.destination_station)||"").trim()).filter(Boolean))].sort((o,d)=>o.localeCompare(d,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${a.map(o=>`<option value="${Se(o.toLowerCase())}">${Se(o)}</option>`).join("")}
  `,n.innerHTML=`
    <option value="">Всички</option>
    ${i.map(o=>`<option value="${Se(o.toLowerCase())}">${Se(o)}</option>`).join("")}
  `,t.value=r,n.value=s}function Bs(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const r=String(e.url||"").trim(),s=String(e.label||"").trim()||ma(r,t);return{url:r,label:s}}const n=String(e||"").trim();return{url:n,label:ma(n,t)}}function ma(e,t){const n=String(e||"").trim();if(!n)return`Файл ${t+1}`;try{const s=new URL(n).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}const mr="train-timetables",ls=5;async function Vf(e){e.innerHTML=Bf,Gf(e),await Ba(e)}function Gf(e){const t=e.querySelector("#open-create-train"),n=e.querySelector("#train-form"),r=e.querySelector("#train-cancel-btn"),s=e.querySelector("#trains-table-body"),a=e.querySelector("#train-modal"),i=e.querySelector("#train-delete-modal"),o=e.querySelector("#train-timetable-preview-modal"),d=e.querySelector("#train-modal-close"),l=e.querySelector("#train-delete-confirm"),c=e.querySelector("#train-delete-cancel"),u=e.querySelector("#train-timetable-preview-close"),p=e.querySelector("#trains-search"),m=e.querySelector("#trains-origin-filter"),h=e.querySelector("#trains-destination-filter"),y=e.querySelector("#trains-filter-reset"),f=e.querySelector("#train-timetable-file"),b=e.querySelector("#train-current-timetable-links");t==null||t.addEventListener("click",()=>{Ka(e),Xr(a)}),n==null||n.addEventListener("submit",async w=>{w.preventDefault(),await Jf(e)}),r==null||r.addEventListener("click",()=>{Wt(a)}),d==null||d.addEventListener("click",()=>{Wt(a)}),c==null||c.addEventListener("click",()=>{Wt(i)}),u==null||u.addEventListener("click",()=>{Zf(e)}),p==null||p.addEventListener("input",w=>{me.searchQuery=w.target.value.trim().toLowerCase(),Lt(e)}),m==null||m.addEventListener("change",w=>{me.originFilter=w.target.value||"",Lt(e)}),h==null||h.addEventListener("change",w=>{me.destinationFilter=w.target.value||"",Lt(e)}),y==null||y.addEventListener("click",()=>{me.searchQuery="",me.originFilter="",me.destinationFilter="",p&&(p.value=""),m&&(m.value=""),h&&(h.value=""),Lt(e)}),f==null||f.addEventListener("change",()=>{var w;if((w=f.files)!=null&&w.length&&f.files.length>ls){g(`Може да избереш до ${ls} файла наведнъж.`,"warning"),f.value="";return}}),b==null||b.addEventListener("input",w=>{const v=w.target.closest(".train-existing-timetable-label");if(!v)return;const _=Number(v.getAttribute("data-index"));if(!Number.isInteger(_)||_<0)return;const k=e.querySelector("#train-draft-timetable-url"),x=Ln((k==null?void 0:k.value)||"");x[_]&&(x[_].label=v.value,k&&(k.value=fr(x)||""))}),b==null||b.addEventListener("click",w=>{const v=w.target.closest(".train-existing-timetable-preview");if(v){const T=String(v.getAttribute("data-url")||"").trim(),q=String(v.getAttribute("data-label")||"").trim();ko(e,T,q);return}const _=w.target.closest(".train-existing-timetable-remove");if(!_)return;const k=Number(_.getAttribute("data-index"));if(!Number.isInteger(k)||k<0)return;const x=e.querySelector("#train-draft-timetable-url"),L=Ln((x==null?void 0:x.value)||"");L[k]&&(L.splice(k,1),za(e,L))}),Kf("trains",[o,i,a]),l==null||l.addEventListener("click",async()=>{const w=e.querySelector("#train-delete-id").value;await Xf(w,e)}),s==null||s.addEventListener("click",w=>{const v=w.target.closest("button[data-action]");if(!v)return;const _=v.getAttribute("data-action");if(_==="edit"){Qf(e,{id:v.getAttribute("data-id"),number:v.getAttribute("data-number"),originStation:v.getAttribute("data-origin-station"),destinationStation:v.getAttribute("data-destination-station"),departureTime:v.getAttribute("data-departure-time"),arrivalTime:v.getAttribute("data-arrival-time"),timetableUrl:decodeURIComponent(v.getAttribute("data-timetable-url")||"")}),Xr(a);return}if(_==="delete"){const k=v.getAttribute("data-id");e.querySelector("#train-delete-id").value=k,Xr(i);return}if(_==="preview-timetable"){const k=decodeURIComponent(v.getAttribute("data-preview-url")||""),x=decodeURIComponent(v.getAttribute("data-preview-label")||"");ko(e,k,x)}})}async function Jf(e){var A;const t=e.querySelector("#train-id"),n=e.querySelector("#train-number"),r=e.querySelector("#train-origin-station"),s=e.querySelector("#train-destination-station"),a=e.querySelector("#train-departure-time"),i=e.querySelector("#train-arrival-time"),o=e.querySelector("#train-timetable-file"),d=e.querySelector("#train-existing-timetable-url"),l=e.querySelector("#train-draft-timetable-url"),c=e.querySelector("#train-save-btn"),u=n.value.trim(),p=r.value.trim(),m=s.value.trim(),h=a.value,y=i.value,f=Ln(d.value),b=Ln(l.value),w=Array.from((o==null?void 0:o.files)||[]),v=t.value;if(!u||!p||!m||!h||!y){g("Моля, попълни всички задължителни полета.","warning");return}const _=c.innerHTML;c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const k=v||crypto.randomUUID(),x=ds(b),L=[];if(x.length+w.length>ls){c.disabled=!1,c.innerHTML=_,g(`Максимум ${ls} файла/линка за един влак.`,"warning");return}if(w.length){const C=await Yf(w,k);if(!C){c.disabled=!1,c.innerHTML=_;return}C.forEach(R=>{R!=null&&R.url&&x.push({url:R.url,label:R.label||yr(R.url,x.length)}),R!=null&&R.objectPath&&L.push(R.objectPath)})}const q=ds(x),E={number:u,origin_station:p,destination_station:m,departure_time:h,arrival_time:y,timetable_url:fr(q)};let $;if(v)({error:$}=await S.from("trains").update(E).eq("id",v));else{const{data:C}=await S.auth.getUser(),R=((A=C==null?void 0:C.user)==null?void 0:A.email)??"web_app";({error:$}=await S.from("trains").insert({...E,id:k,created_from:R}))}if(c.disabled=!1,c.innerHTML=_,$){L.length&&await hr(L),g($.message,"error");return}if(v){const C=f.map(H=>ha(H.url)).filter(Boolean),R=q.map(H=>ha(H.url)).filter(Boolean),P=new Set(R),K=C.filter(H=>!P.has(H));K.length&&await hr(K)}g(v?"Влакът е обновен.":"Влакът е създаден.","success"),Wt(e.querySelector("#train-modal")),Ka(e),await Ba(e)}function Qf(e,t){const n=Ln(t.timetableUrl);e.querySelector("#train-id").value=t.id,e.querySelector("#train-existing-timetable-url").value=fr(n)||"",e.querySelector("#train-draft-timetable-url").value=fr(n)||"",e.querySelector("#train-number").value=t.number??"",e.querySelector("#train-origin-station").value=t.originStation??"",e.querySelector("#train-destination-station").value=t.destinationStation??"",e.querySelector("#train-departure-time").value=xo(t.departureTime),e.querySelector("#train-arrival-time").value=xo(t.arrivalTime),e.querySelector("#train-timetable-file").value="",za(e,n),e.querySelector("#train-form-title").textContent="Редакция на влак",e.querySelector("#train-save-btn").textContent="Запази"}function Ka(e){e.querySelector("#train-id").value="",e.querySelector("#train-existing-timetable-url").value="",e.querySelector("#train-draft-timetable-url").value="",e.querySelector("#train-number").value="",e.querySelector("#train-origin-station").value="",e.querySelector("#train-destination-station").value="",e.querySelector("#train-departure-time").value="",e.querySelector("#train-arrival-time").value="",e.querySelector("#train-timetable-file").value="",za(e,[]),e.querySelector("#train-form-title").textContent="Нов влак",e.querySelector("#train-save-btn").textContent="Създай"}async function Yf(e,t){var r;if(!Array.isArray(e)||!e.length||!t)return[];const n=[];for(const s of e){const i=(((r=s.name)==null?void 0:r.split(".").pop())||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf",o=Math.random().toString(36).slice(2,10),d=`${t}/${Date.now()}-${o}.${i}`,{error:l}=await S.storage.from(mr).upload(d,s,{upsert:!0,contentType:s.type||void 0});if(l)return n.length&&await hr(n.map(u=>u.objectPath)),g(l.message,"error"),null;const{data:c}=S.storage.from(mr).getPublicUrl(d);if(!(c!=null&&c.publicUrl))return await hr([d,...n.map(u=>u.objectPath)]),g("Файлът е качен, но не успях да генерирам публичен линк.","error"),null;n.push({url:c.publicUrl,label:s.name||"",objectPath:d})}return n}function ha(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t)){const n=t.replace(/^\/+/,""),r=`${mr}/`;return n.startsWith(r)?n.slice(r.length):""}try{const n=new URL(t),r=`/storage/v1/object/public/${mr}/`,s=n.pathname.indexOf(r);return s===-1?"":decodeURIComponent(n.pathname.slice(s+r.length))}catch{return""}}async function hr(e){const t=Array.from(new Set((e||[]).filter(Boolean)));t.length&&await S.storage.from(mr).remove(t)}async function Xf(e,t){const n=t.querySelector("#train-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("duty_trains").select("duty_id",{count:"exact",head:!0}).eq("train_id",e);if(a){n.disabled=!1,n.innerHTML=r,g(a.message,"error");return}if((s||0)>0){n.disabled=!1,n.innerHTML=r,g("Влакът не може да се изтрие, защото се използва в повески.","warning");return}const{data:i,error:o}=await S.from("trains").select("timetable_url").eq("id",e).maybeSingle();if(o){n.disabled=!1,n.innerHTML=r,g(o.message,"error");return}const{error:d}=await S.from("trains").delete().eq("id",e);if(n.disabled=!1,n.innerHTML=r,d){if(d.code==="23503"){g("Влакът не може да се изтрие, защото се използва в повески.","warning");return}g(d.message,"error");return}const c=Ln(i==null?void 0:i.timetable_url).map(u=>ha(u.url)).filter(Boolean);c.length&&await hr(c),g("Влакът е изтрит.","success"),Wt(t.querySelector("#train-delete-modal")),Ka(t),await Ba(t)}function za(e,t){const n=e.querySelector("#train-current-timetable-wrap"),r=e.querySelector("#train-current-timetable-links"),s=e.querySelector("#train-draft-timetable-url");if(!n||!r||!s)return;const a=ds(t);if(s.value=fr(a)||"",!a.length){n.classList.add("d-none"),r.innerHTML="";return}n.classList.remove("d-none"),r.innerHTML=a.map((i,o)=>{const d=i.label||yr(i.url,o);return`
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${vn(i.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none train-existing-timetable-preview"
                data-url="${vn(i.url)}"
                data-label="${vn(d)}"
                title="Преглед"
                aria-label="Преглед"
              >
                👁
              </button>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger train-existing-timetable-remove"
              data-index="${o}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm train-existing-timetable-label"
            data-index="${o}"
            value="${vn(d)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `}).join("")}function Ln(e){if(Array.isArray(e))return e.map((n,r)=>Zr(n,r)).filter(n=>n.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const n=JSON.parse(t);if(Array.isArray(n))return n.map((r,s)=>Zr(r,s)).filter(r=>r.url)}catch{return[{url:t,label:yr(t,0)}]}return t.split(`
`).map((n,r)=>Zr(n,r)).filter(n=>n.url)}function Zr(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const r=String(e.url||"").trim(),s=String(e.label||"").trim()||yr(r,t);return{url:r,label:s}}const n=String(e||"").trim();return{url:n,label:yr(n,t)}}function ds(e){const t=new Set;return(e||[]).map((n,r)=>Zr(n,r)).filter(n=>!n.url||t.has(n.url)?!1:(t.add(n.url),!0))}function fr(e){const t=ds(e);return t.length?JSON.stringify(t):null}function yr(e,t){const n=String(e||"").trim();if(!n)return`Файл ${t+1}`;try{const s=new URL(n).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}function vn(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ko(e,t,n){const r=e.querySelector("#train-timetable-preview-modal"),s=e.querySelector("#train-timetable-preview-frame"),a=e.querySelector("#train-timetable-preview-text-wrap"),i=e.querySelector("#train-timetable-preview-text"),o=e.querySelector("#train-timetable-preview-csv-wrap"),d=e.querySelector("#train-timetable-preview-csv-note"),l=e.querySelector("#train-timetable-preview-csv-head"),c=e.querySelector("#train-timetable-preview-csv-body"),u=e.querySelector("#train-timetable-preview-title"),p=e.querySelector("#train-timetable-preview-fallback"),m=e.querySelector("#train-timetable-preview-open");if(!r||!s||!a||!i||!o||!d||!l||!c||!u||!p||!m)return;const h=String(t||"").trim();if(!h){g("Липсва линк за преглед.","warning");return}const y=ry(h),f=fa(h),b=f==="csv",w=["txt","csv","json"].includes(f);u.textContent=n?`Преглед: ${n}`:"Преглед на разписание",m.setAttribute("href",h),p.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),d.textContent="",l.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",b?(o.classList.remove("d-none"),s.classList.add("d-none"),ey(h,l,c,d,p)):w?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",ny(h,i,p)):(s.src=y,s.onload=()=>{if(y!==h){p.classList.add("d-none");return}const v=fa(h),_=["doc","docx","xls","xlsx","ppt","pptx"].includes(v);p.classList.toggle("d-none",!_)},s.onerror=()=>{p.classList.remove("d-none")}),Xr(r)}function Zf(e){const t=e.querySelector("#train-timetable-preview-modal"),n=e.querySelector("#train-timetable-preview-frame"),r=e.querySelector("#train-timetable-preview-text-wrap"),s=e.querySelector("#train-timetable-preview-text"),a=e.querySelector("#train-timetable-preview-csv-wrap"),i=e.querySelector("#train-timetable-preview-csv-note"),o=e.querySelector("#train-timetable-preview-csv-head"),d=e.querySelector("#train-timetable-preview-csv-body"),l=e.querySelector("#train-timetable-preview-fallback"),c=e.querySelector("#train-timetable-preview-open");!t||!n||!r||!s||!a||!i||!o||!d||!l||!c||(n.src="about:blank",n.classList.remove("d-none"),r.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",d.innerHTML="",c.setAttribute("href","#"),l.classList.add("d-none"),Wt(t))}async function ey(e,t,n,r,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=ty(i);if(!o.length){t.innerHTML="",n.innerHTML="",r.textContent="Файлът е празен.",s.classList.add("d-none");return}const d=200,l=o.slice(0,d),c=l[0]||[],u=l.slice(1);t.innerHTML=`
      <tr>${c.map(p=>`<th>${vn(p)}</th>`).join("")}</tr>
    `,n.innerHTML=u.map(p=>`<tr>${p.map(m=>`<td>${vn(m)}</td>`).join("")}</tr>`).join(""),o.length>d?r.textContent=`Показани са първите ${d} реда от общо ${o.length}.`:r.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",n.innerHTML="",r.textContent="",s.classList.remove("d-none")}}function ty(e){const t=[];let n=[],r="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(r+='"',a+=1):s=!s;continue}if(!s&&i===","){n.push(r),r="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),n.push(r),t.push(n),n=[],r="";continue}r+=i}return(r.length||n.length)&&(n.push(r),t.push(n)),t}async function ny(e,t,n){try{const r=await fetch(e,{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.text();t.textContent=s||"(Празен файл)",n.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",n.classList.remove("d-none")}}function ry(e){const t=fa(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function fa(e){const t=String(e||"").trim();if(!t)return"";try{const r=new URL(t).pathname.split("/").pop()||"",s=r.includes(".")?r.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}const sy=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Админ панел</h1>\r
    </div>\r
\r
    <p class="text-secondary mb-4">Управление на потребителски роли и свързване на профили към служители.</p>\r
\r
    <div class="mb-3">\r
      <div class="nav nav-tabs" role="tablist" aria-label="Админ панели">\r
        <button type="button" class="nav-link active" data-admin-tab="roles" role="tab" aria-selected="true">Роли</button>\r
        <button type="button" class="nav-link" data-admin-tab="profiles" role="tab" aria-selected="false">Профили към служители</button>\r
        <button type="button" class="nav-link" data-admin-tab="permissions" role="tab" aria-selected="false">Права по роли</button>\r
      </div>\r
    </div>\r
\r
    <div class="tab-content">\r
      <section class="tab-pane border rounded p-3 active" data-admin-tab-pane="roles" role="tabpanel">\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h2 class="h5 mb-0">Роли към потребители</h2>\r
            <button id="open-admin-role-modal" type="button" class="btn btn-sm btn-outline-primary">Нова роля</button>\r
          </div>\r
\r
          <div class="table-responsive mb-4">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Код</th>\r
                  <th>Име (БГ)</th>\r
                  <th class="text-end">Действия</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-role-catalog-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-role-catalog-empty" class="text-secondary d-none mt-2 mb-3"></p>\r
\r
          <nav id="admin-role-catalog-pagination" class="d-none d-flex align-items-center justify-content-between mt-3 mb-3" aria-label="Пейджиране">\r
            <button id="admin-role-catalog-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
            <div id="admin-role-catalog-pagination-label" class="text-secondary small"></div>\r
            <button id="admin-role-catalog-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
          </nav>\r
\r
          <div class="table-responsive">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Потребител</th>\r
                  <th>Роля</th>\r
                  <th>Дадена от</th>\r
                  <th class="text-end">Действия</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-roles-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-roles-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
          <nav id="admin-roles-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
            <button id="admin-roles-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
            <div id="admin-roles-pagination-label" class="text-secondary small"></div>\r
            <button id="admin-roles-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
          </nav>\r
\r
          <hr class="my-4" />\r
\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h3 class="h6 mb-0">История на ролеви промени</h3>\r
          </div>\r
\r
          <div class="table-responsive">\r
            <table class="table table-sm align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Кога</th>\r
                  <th>Действие</th>\r
                  <th>Роля</th>\r
                  <th>Кой</th>\r
                  <th>За кого</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-role-audit-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-role-audit-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
          <nav id="admin-role-audit-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
            <button id="admin-role-audit-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
            <div id="admin-role-audit-pagination-label" class="text-secondary small"></div>\r
            <button id="admin-role-audit-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
          </nav>\r
      </section>\r
\r
      <section class="tab-pane border rounded p-3 d-none" data-admin-tab-pane="profiles" role="tabpanel">\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h2 class="h5 mb-0">Профили към служители</h2>\r
          </div>\r
\r
          <div class="table-responsive">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Профил</th>\r
                  <th>Статус</th>\r
                  <th>Свързан служител</th>\r
                  <th class="text-end">Действия</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-profiles-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-profiles-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
          <nav id="admin-profiles-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
            <button id="admin-profiles-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
            <div id="admin-profiles-pagination-label" class="text-secondary small"></div>\r
            <button id="admin-profiles-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
          </nav>\r
      </section>\r
\r
      <section class="tab-pane border rounded p-3 d-none" data-admin-tab-pane="permissions" role="tabpanel">\r
          <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">\r
            <div>\r
              <h2 class="h5 mb-1">Права по роли</h2>\r
              <p class="text-secondary mb-0">Нива на достъп за всяко действие: без достъп, всички, собствени, към прикачени служители по роля.</p>\r
            </div>\r
            <form id="admin-permissions-form" class="d-flex flex-wrap align-items-end gap-2">\r
              <div>\r
                <label for="admin-permissions-role" class="form-label mb-1">Роля</label>\r
                <select id="admin-permissions-role" class="form-select">\r
                  <option value="">Избери роля</option>\r
                </select>\r
              </div>\r
              <button id="admin-permissions-save" type="submit" class="btn btn-primary">Запази права</button>\r
            </form>\r
          </div>\r
\r
          <div class="table-responsive">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Таблица</th>\r
                  <th class="text-center">Виж екрана</th>\r
                  <th class="text-center">Виж записи</th>\r
                  <th class="text-center">Създаване</th>\r
                  <th class="text-center">Редакция</th>\r
                  <th class="text-center">Изтриване</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-permissions-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-permissions-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
      </section>\r
    </div>\r
  </div>\r
</section>\r
\r
<div id="admin-role-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="admin-role-modal-title" class="h5 mb-0">Нова роля</h2>\r
          <button id="admin-role-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="admin-role-modal-form" class="row g-3">\r
          <input type="hidden" id="admin-role-modal-original-name" />\r
          <div class="col-12">\r
            <label for="admin-role-modal-name" class="form-label">Код на роля</label>\r
            <input id="admin-role-modal-name" class="form-control" type="text" placeholder="например: dispatcher" required />\r
            <div class="form-text">Използвай малки латински букви, цифри и _</div>\r
          </div>\r
          <div class="col-12">\r
            <label for="admin-role-modal-name-bg" class="form-label">Име на български</label>\r
            <input id="admin-role-modal-name-bg" class="form-control" type="text" placeholder="например: Диспечер" required />\r
          </div>\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="admin-role-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="admin-role-modal-save" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="admin-role-warning-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърди действие</h2>\r
          <button id="admin-role-warning-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <p id="admin-role-warning-message" class="text-secondary mb-4">Сигурен ли си?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="admin-role-warning-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="admin-role-warning-confirm" type="button" class="btn btn-danger">Потвърди</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="admin-assign-role-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Добави роля към потребител</h2>\r
          <button id="admin-assign-role-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="admin-role-form" class="row g-3">\r
          <div class="col-12">\r
            <label for="admin-role-profile-id" class="form-label">Профил</label>\r
            <select id="admin-role-profile-id" class="form-select" required>\r
              <option value="">Избери профил</option>\r
            </select>\r
          </div>\r
          <div class="col-12">\r
            <label for="admin-role-value" class="form-label">Роля</label>\r
            <select id="admin-role-value" class="form-select" required>\r
              <option value="">Избери роля</option>\r
            </select>\r
          </div>\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="admin-assign-role-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="admin-role-add" type="submit" class="btn btn-primary">Добави роля</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="admin-profile-link-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Свържи профил към служител</h2>\r
          <button id="admin-profile-link-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="admin-profile-link-form" class="row g-3">\r
          <div class="col-12">\r
            <label for="admin-profile-link-id" class="form-label">Профил</label>\r
            <select id="admin-profile-link-id" class="form-select" required>\r
              <option value="">Избери профил</option>\r
            </select>\r
          </div>\r
          <div class="col-12">\r
            <label for="admin-profile-link-employee-id" class="form-label">Служител</label>\r
            <select id="admin-profile-link-employee-id" class="form-select" required>\r
              <option value="">Избери служител</option>\r
            </select>\r
          </div>\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="admin-profile-link-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="admin-profile-link-clear" type="button" class="btn btn-outline-secondary">Разкачи</button>\r
            <button id="admin-profile-link-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,j={profiles:[],employees:[],roleCatalog:[],availableRoles:[],roles:[],roleAuditLogs:[],currentUserId:"",currentUserProtectedAdminIds:[],permissionsRole:"admin",permissions:[],pageSize:20,roleCatalogPage:1,rolesPage:1,profilesPage:1,roleAuditPage:1},ay={admin:"Админ",crew_manager:"Ръководител екип",head_of_transport:"Ръководител транспорт",crew_instructor:"Инструктор екип",instructor:"Инструктор",crew:"Екип",crew_member:"Член екип",user:"Потребител"};function ge(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function El(e){const t=String((e==null?void 0:e.username)||"").trim(),n=String((e==null?void 0:e.id)||"").trim(),r=(e==null?void 0:e.is_active)===!1;if(t&&n)return`${t} (${n})${r?" (деактивиран)":""}`;const s=t||n||"-";return r&&s!=="-"?`${s} (деактивиран)`:s}function $l(e){const t=String((e==null?void 0:e.first_name)||"").trim(),n=String((e==null?void 0:e.last_name)||"").trim(),r=`${t} ${n}`.trim();return r?(e==null?void 0:e.is_active)===!1?`${r} (неактивен)`:r:"-"}function br(e){const t=String(e||"").trim().toLowerCase();return t?ay[t]||e:"-"}const Al=[{value:"none",label:"без достъп"},{value:"all",label:"всички"},{value:"own",label:"собствени"},{value:"role_attached_employees",label:"към прикачени служители по роля"}],iy=[{value:"none",label:"Не"},{value:"all",label:"Да"}],oy=[{value:"none",label:"Не"},{value:"all",label:"Да"}];function ya(e){const t=e.querySelector("#admin-role-profile-id"),n=e.querySelector("#admin-profile-link-id"),r=e.querySelector("#admin-profile-link-employee-id"),s=(t==null?void 0:t.value)||"",a=(n==null?void 0:n.value)||"",i=(r==null?void 0:r.value)||"",o=j.profiles.map(l=>{const c=El(l);return`<option value="${l.id}">${ge(c)}</option>`}).join("");t&&(t.innerHTML=`<option value="">Избери профил</option>${o}`,t.value=j.profiles.some(l=>l.id===s)?s:""),n&&(n.innerHTML=`<option value="">Избери профил</option>${o}`,n.value=j.profiles.some(l=>l.id===a)?a:"");const d=j.employees.map(l=>{const c=$l(l);return`<option value="${l.id}">${ge(c)}</option>`}).join("");r&&(r.innerHTML=`<option value="">Избери служител</option>${d}`,r.value=j.employees.some(l=>l.id===i)?i:"")}function vr(e,t){const n=e.querySelector("#admin-roles-body"),r=e.querySelector("#admin-roles-empty");if(He(e,{rootSelector:"#admin-roles-pagination",prevSelector:"#admin-roles-pagination-prev",nextSelector:"#admin-roles-pagination-next",onPrev:()=>{j.rolesPage=Math.max(1,(j.rolesPage||1)-1),vr(e)},onNext:()=>{j.rolesPage=(j.rolesPage||1)+1,vr(e)}}),!n||!r)return;if(!j.roles.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма добавени роли.",ke(e,{rootSelector:"#admin-roles-pagination",prevSelector:"#admin-roles-pagination-prev",nextSelector:"#admin-roles-pagination-next",labelSelector:"#admin-roles-pagination-label",page:1,totalItems:0,totalPages:1});return}const{pageItems:s,page:a,totalItems:i,totalPages:o}=Ne(j.roles,j.rolesPage,j.pageSize);j.rolesPage=a,ke(e,{rootSelector:"#admin-roles-pagination",prevSelector:"#admin-roles-pagination-prev",nextSelector:"#admin-roles-pagination-next",labelSelector:"#admin-roles-pagination-label",page:a,totalItems:i,totalPages:o}),r.classList.add("d-none");const d=j.roles.filter(l=>String((l==null?void 0:l.role)||"").trim().toLowerCase()==="admin").length;n.innerHTML=s.map(l=>{const c=(l==null?void 0:l.username)||(l==null?void 0:l.user_id)||"-",u=l!=null&&l.role?ly(l.role):"-",p=(l==null?void 0:l.granted_by_username)||(l==null?void 0:l.granted_by_user_id)||"-",m=(l==null?void 0:l.user_id)||"",h=!!(l!=null&&l.role),y=String((l==null?void 0:l.role)||"").trim().toLowerCase()==="admin",f=y&&d<=1,b=y&&m&&j.currentUserProtectedAdminIds.includes(m),w=!h||f||b,v=[h?`<span class="badge text-bg-secondary">${ge(u)}</span>`:'<span class="text-secondary">-</span>',b?'<span class="badge text-bg-info">Твой grantor lineage</span>':""].filter(Boolean).join(" "),_=f?"Не може да се премахне последният администратор.":b?"Не можеш да премахнеш админ права нагоре по grantor веригата.":"";return`
        <tr>
          <td>${ge(c)}</td>
          <td>${v}</td>
          <td>${h?ge(p):'<span class="text-secondary">-</span>'}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="add-role"
                data-user-id="${m}"
                data-username="${ge(c)}"
              >
                Добави роля
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="remove-role"
                data-role-id="${l.id||""}"
                ${w?"disabled":""}
                title="${_}"
              >
                Премахни
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function gr(e,t){const n=e.querySelector("#admin-role-catalog-body"),r=e.querySelector("#admin-role-catalog-empty");if(He(e,{rootSelector:"#admin-role-catalog-pagination",prevSelector:"#admin-role-catalog-pagination-prev",nextSelector:"#admin-role-catalog-pagination-next",onPrev:()=>{j.roleCatalogPage=Math.max(1,(j.roleCatalogPage||1)-1),gr(e)},onNext:()=>{j.roleCatalogPage=(j.roleCatalogPage||1)+1,gr(e)}}),!n||!r)return;if(!j.roleCatalog.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма налични роли.",ke(e,{rootSelector:"#admin-role-catalog-pagination",prevSelector:"#admin-role-catalog-pagination-prev",nextSelector:"#admin-role-catalog-pagination-next",labelSelector:"#admin-role-catalog-pagination-label",page:1,totalItems:0,totalPages:1});return}const{pageItems:s,page:a,totalItems:i,totalPages:o}=Ne(j.roleCatalog,j.roleCatalogPage,j.pageSize);j.roleCatalogPage=a,ke(e,{rootSelector:"#admin-role-catalog-pagination",prevSelector:"#admin-role-catalog-pagination-prev",nextSelector:"#admin-role-catalog-pagination-next",labelSelector:"#admin-role-catalog-pagination-label",page:a,totalItems:i,totalPages:o}),r.classList.add("d-none"),n.innerHTML=s.map(d=>{const l=String((d==null?void 0:d.name)||"").trim(),c=String((d==null?void 0:d.display_name_bg)||"").trim()||br(l),u=l==="admin";return`
        <tr>
          <td>${ge(l)}</td>
          <td>${ge(c)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="edit-catalog-role"
                data-role-name="${ge(l)}"
                data-role-bg="${ge(c)}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="delete-catalog-role"
                data-role-name="${ge(l)}"
                ${u?"disabled":""}
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function wr(e,t){const n=e.querySelector("#admin-profiles-body"),r=e.querySelector("#admin-profiles-empty");if(He(e,{rootSelector:"#admin-profiles-pagination",prevSelector:"#admin-profiles-pagination-prev",nextSelector:"#admin-profiles-pagination-next",onPrev:()=>{j.profilesPage=Math.max(1,(j.profilesPage||1)-1),wr(e)},onNext:()=>{j.profilesPage=(j.profilesPage||1)+1,wr(e)}}),!n||!r)return;if(!j.profiles.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма налични профили.",ke(e,{rootSelector:"#admin-profiles-pagination",prevSelector:"#admin-profiles-pagination-prev",nextSelector:"#admin-profiles-pagination-next",labelSelector:"#admin-profiles-pagination-label",page:1,totalItems:0,totalPages:1});return}const{pageItems:s,page:a,totalItems:i,totalPages:o}=Ne(j.profiles,j.profilesPage,j.pageSize);j.profilesPage=a,ke(e,{rootSelector:"#admin-profiles-pagination",prevSelector:"#admin-profiles-pagination-prev",nextSelector:"#admin-profiles-pagination-next",labelSelector:"#admin-profiles-pagination-label",page:a,totalItems:i,totalPages:o}),r.classList.add("d-none"),n.innerHTML=s.map(d=>{const l=El(d),c=(d==null?void 0:d.is_active)!==!1,u=c?'<span class="badge text-bg-success">Активен</span>':'<span class="badge text-bg-secondary">Деактивиран</span>',p=d!=null&&d.employees?$l(d.employees):"-",m=!!(d!=null&&d.employee_id),h=String((d==null?void 0:d.id)||"")===String(j.currentUserId||""),y=!c||h,f=c,b=h;return`
        <tr>
          <td>${ge(l)}</td>
          <td>${u}</td>
          <td>${ge(p)}</td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary me-2"
              data-admin-action="link-profile"
              data-profile-id="${d.id}"
            >
              Свържи
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger me-2"
              data-admin-action="unlink-profile"
              data-profile-id="${d.id}"
              ${m?"":"disabled"}
            >
              Разкачи
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-warning me-2"
              data-admin-action="deactivate-profile"
              data-profile-id="${d.id}"
              ${y?"disabled":""}
              title="${h?"Не можеш да деактивираш собствения си профил.":""}"
            >
              Деактивирай
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-success"
              data-admin-action="restore-profile"
              data-profile-id="${d.id}"
              ${f?"disabled":""}
            >
              Възстанови
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger ms-2"
              data-admin-action="hard-delete-user"
              data-profile-id="${d.id}"
              ${b?"disabled":""}
              title="${h?"Не можеш да изтриеш собствения си акаунт.":"Необратимо изтриване (Auth + профил + роли)."}"
            >
              Изтрий
            </button>
          </td>
        </tr>
      `}).join("")}function ba(e,t){const n=e.querySelector("#admin-permissions-body"),r=e.querySelector("#admin-permissions-empty");if(!(!n||!r)){if(!j.permissions.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма данни за права.";return}r.classList.add("d-none"),n.innerHTML=j.permissions.map(s=>{const a=String((s==null?void 0:s.resource)||"-"),i=String((s==null?void 0:s.display_name_bg)||"").trim()||Ta(a),o=Fn(s==null?void 0:s.view_screen_scope),d=Fn(s==null?void 0:s.view_records_scope),l=Fn(s==null?void 0:s.create_records_scope),c=Fn(s==null?void 0:s.edit_records_scope),u=Fn(s==null?void 0:s.delete_records_scope);return`
        <tr data-resource="${ge(a)}">
          <td>${ge(i)}</td>
          <td class="text-center">
            ${Un("view_screen_scope",o)}
          </td>
          <td class="text-center">
            ${Un("view_records_scope",d)}
          </td>
          <td class="text-center">
            ${Un("create_records_scope",l)}
          </td>
          <td class="text-center">
            ${Un("edit_records_scope",c)}
          </td>
          <td class="text-center">
            ${Un("delete_records_scope",u)}
          </td>
        </tr>
      `}).join("")}}function _r(e,t){const n=e.querySelector("#admin-role-audit-body"),r=e.querySelector("#admin-role-audit-empty");if(He(e,{rootSelector:"#admin-role-audit-pagination",prevSelector:"#admin-role-audit-pagination-prev",nextSelector:"#admin-role-audit-pagination-next",onPrev:()=>{j.roleAuditPage=Math.max(1,(j.roleAuditPage||1)-1),_r(e)},onNext:()=>{j.roleAuditPage=(j.roleAuditPage||1)+1,_r(e)}}),!n||!r)return;if(!j.roleAuditLogs.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма записани промени по роли.",ke(e,{rootSelector:"#admin-role-audit-pagination",prevSelector:"#admin-role-audit-pagination-prev",nextSelector:"#admin-role-audit-pagination-next",labelSelector:"#admin-role-audit-pagination-label",page:1,totalItems:0,totalPages:1});return}const{pageItems:s,page:a,totalItems:i,totalPages:o}=Ne(j.roleAuditLogs,j.roleAuditPage,j.pageSize);j.roleAuditPage=a,ke(e,{rootSelector:"#admin-role-audit-pagination",prevSelector:"#admin-role-audit-pagination-prev",nextSelector:"#admin-role-audit-pagination-next",labelSelector:"#admin-role-audit-pagination-label",page:a,totalItems:i,totalPages:o}),r.classList.add("d-none"),n.innerHTML=s.map(d=>{const l=String((d==null?void 0:d.action)||"").trim(),c=l==="grant"?"Добавяне":l==="revoke"?"Премахване":"Обновяване",u=(d==null?void 0:d.role_label)||"-",p=(d==null?void 0:d.actor_label)||"-",m=(d==null?void 0:d.target_label)||"-",h=dy(d==null?void 0:d.occurred_at);return`
        <tr>
          <td>${ge(h)}</td>
          <td>${ge(c)}</td>
          <td>${ge(u)}</td>
          <td>${ge(p)}</td>
          <td>${ge(m)}</td>
        </tr>
      `}).join("")}function Un(e,t){const r=(e==="view_screen_scope"?iy:e==="create_records_scope"?oy:Al).map(s=>{const a=s.value===t?"selected":"";return`<option value="${s.value}" ${a}>${ge(s.label)}</option>`}).join("");return`<select class="form-select form-select-sm" data-permission-field="${e}">${r}</select>`}function Fn(e){const t=String(e||"").trim();return Al.some(n=>n.value===t)?t:"none"}function ly(e){const t=String(e||"").trim();if(!t)return"-";const n=j.roleCatalog.find(s=>(s==null?void 0:s.name)===t);return n&&String((n==null?void 0:n.display_name_bg)||"").trim()||br(t)}function dy(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString("bg-BG")}const cy=["admin","head_of_transport","instructor","crew","user"],qo={admin:10,crew_manager:20,head_of_transport:30,crew_instructor:40,instructor:50,crew:60,crew_member:70,user:80};let pn=null;async function uy(e){e.innerHTML=sy;const t=e.querySelector("#admin-permissions-role");t&&(t.value=j.permissionsRole),cs(e),ky(e),py(e),await Wa(e),await Lr(e,j.permissionsRole)}function py(e){const t=e.querySelector("#admin-assign-role-modal"),n=e.querySelector("#admin-assign-role-modal-close"),r=e.querySelector("#admin-assign-role-modal-cancel"),s=e.querySelector("#admin-profile-link-modal"),a=e.querySelector("#admin-profile-link-modal-close"),i=e.querySelector("#admin-profile-link-modal-cancel"),o=e.querySelector("#open-admin-role-modal"),d=e.querySelector("#admin-role-modal"),l=e.querySelector("#admin-role-modal-form"),c=e.querySelector("#admin-role-modal-close"),u=e.querySelector("#admin-role-modal-cancel"),p=e.querySelector("#admin-role-warning-modal"),m=e.querySelector("#admin-role-warning-close"),h=e.querySelector("#admin-role-warning-cancel"),y=e.querySelector("#admin-role-warning-confirm"),f=e.querySelector("#admin-role-form"),b=e.querySelector("#admin-profile-link-form"),w=e.querySelector("#admin-profile-link-clear"),v=e.querySelector("#admin-permissions-form"),_=e.querySelector("#admin-permissions-role"),k=e.querySelector("#admin-roles-body"),x=e.querySelector("#admin-role-catalog-body"),L=e.querySelector("#admin-profiles-body");n==null||n.addEventListener("click",()=>{Be(t)}),r==null||r.addEventListener("click",()=>{Be(t)}),a==null||a.addEventListener("click",()=>{Be(s)}),i==null||i.addEventListener("click",()=>{Be(s)}),o==null||o.addEventListener("click",()=>{To(e,{mode:"create"})}),l==null||l.addEventListener("submit",async T=>{T.preventDefault(),await yy(e)}),c==null||c.addEventListener("click",()=>{Be(d),cs(e)}),u==null||u.addEventListener("click",()=>{Be(d),cs(e)}),m==null||m.addEventListener("click",()=>{Be(p),pn=null}),h==null||h.addEventListener("click",()=>{Be(p),pn=null}),y==null||y.addEventListener("click",async()=>{if(!pn){Be(p);return}const T=pn;pn=null,Be(p),await T()}),f==null||f.addEventListener("submit",async T=>{T.preventDefault(),await by(e)}),b==null||b.addEventListener("submit",async T=>{T.preventDefault(),await gy(e)}),w==null||w.addEventListener("click",async()=>{var q;const T=((q=e.querySelector("#admin-profile-link-id"))==null?void 0:q.value)||"";if(!T){g("Избери профил за разкачане.","warning");return}bt(e,{message:"Сигурен ли си, че искаш да разкачиш профила от служителя?",confirmLabel:"Разкачи",onConfirm:()=>va(e,T,null)})}),v==null||v.addEventListener("submit",async T=>{T.preventDefault(),await Ly(e)}),_==null||_.addEventListener("change",async T=>{const q=T.target.value||"admin";j.permissionsRole=q,await Lr(e,q)}),k==null||k.addEventListener("click",async T=>{const q=T.target.closest('button[data-admin-action="add-role"]');if(q){const A=q.getAttribute("data-user-id")||"";if(!A)return;fy(e,A);return}const E=T.target.closest('button[data-admin-action="remove-role"]');if(!E)return;const $=E.getAttribute("data-role-id")||"";$&&bt(e,{message:"Сигурен ли си, че искаш да разкачиш тази роля от потребителя?",confirmLabel:"Разкачи",onConfirm:()=>vy(e,$)})}),x==null||x.addEventListener("click",async T=>{const q=T.target.closest('button[data-admin-action="edit-catalog-role"]');if(q){const A=q.getAttribute("data-role-name")||"",C=q.getAttribute("data-role-bg")||"";To(e,{mode:"edit",roleName:A,roleNameBg:C});return}const E=T.target.closest('button[data-admin-action="delete-catalog-role"]');if(!E)return;const $=E.getAttribute("data-role-name")||"";$&&await xy(e,$)}),L==null||L.addEventListener("click",async T=>{const q=T.target.closest('button[data-admin-action="link-profile"]');if(q){const P=q.getAttribute("data-profile-id")||"";P&&hy(e,P);return}const E=T.target.closest('button[data-admin-action="unlink-profile"]');if(E){const P=E.getAttribute("data-profile-id")||"";if(!P)return;bt(e,{message:"Сигурен ли си, че искаш да разкачиш профила от служителя?",confirmLabel:"Разкачи",onConfirm:()=>va(e,P,null)});return}const $=T.target.closest('button[data-admin-action="deactivate-profile"]');if($){const P=$.getAttribute("data-profile-id")||"";if(!P)return;if(P===j.currentUserId){g("Не можеш да деактивираш собствения си профил.","warning");return}bt(e,{message:"Сигурен ли си, че искаш да деактивираш този профил? Потребителят ще загуби достъп до системата.",confirmLabel:"Деактивирай",onConfirm:()=>Lo(e,P,!1)});return}const A=T.target.closest('button[data-admin-action="restore-profile"]');if(A){const P=A.getAttribute("data-profile-id")||"";if(!P)return;bt(e,{message:"Сигурен ли си, че искаш да възстановиш този профил?",confirmLabel:"Възстанови",onConfirm:()=>Lo(e,P,!0)});return}const C=T.target.closest('button[data-admin-action="hard-delete-user"]');if(!C)return;const R=C.getAttribute("data-profile-id")||"";if(R){if(R===j.currentUserId){g("Не можеш да изтриеш собствения си акаунт.","warning");return}bt(e,{message:"Сигурен ли си? Това е необратимо: ще бъдат изтрити Auth акаунтът, профилът и ролите.",confirmLabel:"Изтрий",onConfirm:()=>my(e,R)})}})}async function my(e,t){if(!t)return;const n=async()=>{var h,y;const{data:c,error:u}=await S.auth.refreshSession();if(!u&&((h=c==null?void 0:c.session)!=null&&h.access_token))return c.session.access_token;const{data:p,error:m}=await S.auth.getSession();return m||!((y=p==null?void 0:p.session)!=null&&y.access_token)?"":p.session.access_token};let r=await n();if(!r){g("Липсва активна сесия. Влез отново и опитай пак.","warning");return}const s="https://ujxczpaupfqaiqrcoykl.supabase.co",a="sb_publishable_EJ7wzzBh1hnKE0j_j7E1mQ_9TAJvRoO",i="admin-hard-delete-user-v2",o=async c=>fetch(`${s}/functions/v1/${i}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:a,Authorization:`Bearer ${c}`},body:JSON.stringify({userId:t,reason:"admin_panel"})});let d;try{d=await o(r)}catch{g("Неуспешна връзка към Edge функцията.","error");return}let l=null;try{l=await d.json()}catch{l=null}if(d.status===401&&(r=await n(),r))try{d=await o(r),l=null;try{l=await d.json()}catch{l=null}}catch{g("Неуспешна връзка към Edge функцията.","error");return}if(!d.ok){const c=String((l==null?void 0:l.error)||(l==null?void 0:l.message)||d.statusText||"Изтриването не беше успешно.");if(d.status===401){g("Нямаш валидна сесия за Edge функцията. Опитай logout/login.","warning");return}if(String(c).toLowerCase().includes("last admin")){g("Не може да се изтрие последният администратор.","warning");return}g(c,"error");return}if(!(l!=null&&l.ok)){g("Изтриването не беше успешно.","error");return}g("Потребителят е изтрит.","success"),await Wa(e)}function hy(e,t){const n=e.querySelector("#admin-profile-link-modal"),r=e.querySelector("#admin-profile-link-id"),s=e.querySelector("#admin-profile-link-employee-id"),a=j.profiles.find(i=>i.id===t);r&&(r.value=t),s&&(s.value=(a==null?void 0:a.employee_id)||""),ws(n)}function fy(e,t){const n=e.querySelector("#admin-assign-role-modal"),r=e.querySelector("#admin-role-profile-id"),s=e.querySelector("#admin-role-value");r&&(r.value=t),s&&(s.value=""),ws(n)}async function Wa(e){var p;const{data:t}=await S.auth.getUser();j.currentUserId=((p=t==null?void 0:t.user)==null?void 0:p.id)||"";const[{data:n,error:r},{data:s,error:a},{data:i,error:o},{data:d,error:l},{data:c,error:u}]=await Promise.all([S.from("user_profiles").select("id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)").order("username",{ascending:!0}),S.from("employees").select("id, first_name, last_name, is_active").order("last_name",{ascending:!0}).order("first_name",{ascending:!0}),S.from("user_roles").select("id, user_id, role, granted_by_user_id").order("role",{ascending:!0}).order("created_at",{ascending:!1}),S.from("roles").select("name, display_name_bg").order("name",{ascending:!0}),S.from("user_role_audit_logs").select("id, action, role, actor_user_id, target_user_id, occurred_at").order("occurred_at",{ascending:!1}).limit(100)]);if(r||a||o||l||u){g((r==null?void 0:r.message)||(a==null?void 0:a.message)||(o==null?void 0:o.message)||(l==null?void 0:l.message)||(u==null?void 0:u.message)||"Грешка при зареждане на админ панела.","error"),j.profiles=[],j.employees=[],j.roleCatalog=[],j.availableRoles=[],j.roles=[],j.roleAuditLogs=[],j.currentUserProtectedAdminIds=[],ya(e),gr(e,"Няма налични роли."),vr(e,"Няма данни за роли."),_r(e,"Няма записани промени по роли."),wr(e,"Няма данни за профили.");return}j.profiles=n||[],j.employees=s||[],j.roleCatalog=d||[],j.roles=_y(i||[],j.profiles),j.roleAuditLogs=Rl(c||[],j.profiles),j.currentUserProtectedAdminIds=Il(j.roles),j.availableRoles=Pl(d||[],i||[]),Dl(e),ya(e),gr(e),vr(e),_r(e),wr(e)}async function yy(e){var y,f;const t=e.querySelector("#admin-role-modal-original-name"),n=e.querySelector("#admin-role-modal-name"),r=e.querySelector("#admin-role-modal-name-bg"),s=e.querySelector("#admin-role-modal-save"),a=((y=t==null?void 0:t.value)==null?void 0:y.trim())||"",i=(n==null?void 0:n.value)||"",o=(r==null?void 0:r.value)||"",d=i.trim().toLowerCase(),l=o.trim();if(!d){g("Въведи име на роля.","warning");return}if(!l){g("Въведи име на ролята на български.","warning");return}if(!/^[a-z0-9_]+$/.test(d)){g("Ролята може да съдържа само малки латински букви, цифри и _.","warning");return}const c=(s==null?void 0:s.innerHTML)||"";s&&(s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Създаване...');const{data:u}=await S.auth.getUser();let p=null;if(a){const{error:b}=await S.from("roles").update({name:d,display_name_bg:l||d}).eq("name",a);p=b}else{const{error:b}=await S.from("roles").insert({name:d,display_name_bg:l||d,created_from:((f=u==null?void 0:u.user)==null?void 0:f.email)||"admin_panel"});p=b}if(p){s&&(s.disabled=!1,s.innerHTML=c),g(p.message,"error");return}const m=[...new Map(j.permissions.map(b=>[b.resource,b]).filter(([b])=>!!b)).values()];if(m.length){const b=m.map(v=>({role:d,resource:v.resource,display_name_bg:v.display_name_bg||Ta(v.resource),view_screen_scope:"none",view_records_scope:"none",create_records_scope:"none",edit_records_scope:"none",delete_records_scope:"none"})),{error:w}=await S.from("role_permissions").upsert(b,{onConflict:"role,resource"});if(w){s&&(s.disabled=!1,s.innerHTML=c),g(w.message,"error");return}}n&&(n.value=""),r&&(r.value=""),t&&(t.value=""),s&&(s.disabled=!1,s.innerHTML=c),g(a?"Ролята е обновена.":"Ролята е създадена.","success"),await Ml(e);const h=e.querySelector("#admin-permissions-role");h&&(h.value=d),j.permissionsRole=d,await Lr(e,d),Be(e.querySelector("#admin-role-modal")),cs(e)}async function by(e){var l,c,u,p;const t=((l=e.querySelector("#admin-role-profile-id"))==null?void 0:l.value)||"",n=((c=e.querySelector("#admin-role-value"))==null?void 0:c.value)||"",r=e.querySelector("#admin-role-add");if(!t||!n){g("Избери профил и роля.","warning");return}const s=(r==null?void 0:r.innerHTML)||"";r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...');const{data:a}=await S.auth.getUser(),{error:i}=await S.from("user_roles").insert({user_id:t,role:n,granted_by_user_id:((u=a==null?void 0:a.user)==null?void 0:u.id)||null,created_from:((p=a==null?void 0:a.user)==null?void 0:p.email)||"admin_panel"});if(r&&(r.disabled=!1,r.innerHTML=s),i){g(i.message,"error");return}g("Ролята е добавена.","success"),Be(e.querySelector("#admin-assign-role-modal"));const o=e.querySelector("#admin-role-profile-id"),d=e.querySelector("#admin-role-value");o&&(o.value=""),d&&(d.value=""),await Promise.all([Va(e),Cl(e)])}async function vy(e,t){const{error:n}=await S.from("user_roles").delete().eq("id",t);if(n){if(String(n.message||"").toLowerCase().includes("last admin")){g("Не може да се премахне последната админ роля.","warning");return}if(String(n.message||"").toLowerCase().includes("grantor")){g("Не можеш да отнемеш админ права нагоре по grantor веригата.","warning");return}g(n.message,"error");return}g("Ролята е премахната.","success"),await Promise.all([Va(e),Cl(e)])}async function gy(e){var r,s;const t=((r=e.querySelector("#admin-profile-link-id"))==null?void 0:r.value)||"",n=((s=e.querySelector("#admin-profile-link-employee-id"))==null?void 0:s.value)||"";if(!t||!n){g("Избери профил и служител.","warning");return}await va(e,t,n)}async function va(e,t,n){const r=e.querySelector("#admin-profile-link-save"),s=(r==null?void 0:r.innerHTML)||"";if(r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...'),n){const{error:d}=await S.from("user_profiles").update({employee_id:null,updated_at:new Date().toISOString()}).eq("employee_id",n).neq("id",t);if(d){r&&(r.disabled=!1,r.innerHTML=s),g(d.message,"error");return}}const{error:a}=await S.from("user_profiles").update({employee_id:n,updated_at:new Date().toISOString()}).eq("id",t);if(r&&(r.disabled=!1,r.innerHTML=s),a){g(a.message,"error");return}g(n?"Профилът е свързан със служителя.":"Профилът е разкачен от служител.","success"),Be(e.querySelector("#admin-profile-link-modal"));const i=e.querySelector("#admin-profile-link-id"),o=e.querySelector("#admin-profile-link-employee-id");i&&(i.value=""),o&&(o.value=""),await qy(e)}async function Lo(e,t,n){if(!t)return;const r=j.profiles.find(i=>String((i==null?void 0:i.id)||"")===String(t));if((r==null?void 0:r.is_active)!==!1===n){g(n?"Профилът вече е активен.":"Профилът вече е деактивиран.","warning");return}const{error:a}=await S.from("user_profiles").update({is_active:n,updated_at:new Date().toISOString()}).eq("id",t);if(a){if(String(a.message||"").toLowerCase().includes("last active admin")){g("Не може да деактивираш последния активен администратор.","warning");return}g(a.message,"error");return}g(n?"Профилът е възстановен.":"Профилът е деактивиран.","success"),await Wa(e)}async function Va(e){const{data:t,error:n}=await S.from("user_roles").select("id, user_id, role, granted_by_user_id").order("created_at",{ascending:!1});if(n){g(n.message,"error");return}j.roles=wy(t||[],j.profiles),j.currentUserProtectedAdminIds=Il(j.roles),vr(e)}async function Cl(e){const{data:t,error:n}=await S.from("user_role_audit_logs").select("id, action, role, actor_user_id, target_user_id, occurred_at").order("occurred_at",{ascending:!1}).limit(100);if(n){g(n.message,"error");return}j.roleAuditLogs=Rl(t||[],j.profiles),_r(e)}function Rl(e,t){const n=new Map((t||[]).map(r=>[r.id,r]));return(e||[]).map(r=>{const s=n.get(r.actor_user_id),a=n.get(r.target_user_id),i=String((r==null?void 0:r.role)||"").trim();return{...r,role_label:i?br(i):"-",actor_label:(s==null?void 0:s.username)||(r==null?void 0:r.actor_user_id)||"-",target_label:(a==null?void 0:a.username)||(r==null?void 0:r.target_user_id)||"-"}})}function Il(e){const t=String(j.currentUserId||"").trim();if(!t)return[];const n=(e||[]).filter(l=>String((l==null?void 0:l.role)||"").trim().toLowerCase()==="admin"),r=new Map(n.map(l=>[String((l==null?void 0:l.user_id)||"").trim(),String((l==null?void 0:l.granted_by_user_id)||"").trim()])),s=(e||[]).find(l=>String((l==null?void 0:l.user_id)||"").trim()===t&&String((l==null?void 0:l.role)||"").trim().toLowerCase()==="admin"),a=String((s==null?void 0:s.granted_by_user_id)||"").trim();if(!a)return[];const i=[],o=new Set([t]);let d=a;for(;d&&!o.has(d);){i.push(d),o.add(d);const l=String(r.get(d)||"").trim();if(!l||l===d)break;d=l}return i}function wy(e,t){const n=new Map((t||[]).map(r=>[r.id,r]));return(e||[]).map(r=>{var s,a;return{...r,username:((s=n.get(r.user_id))==null?void 0:s.username)||"",granted_by_username:((a=n.get(r.granted_by_user_id))==null?void 0:a.username)||""}})}function _y(e,t){const n=new Map((t||[]).map(a=>[a.id,a])),r=new Map;(e||[]).forEach(a=>{r.has(a.user_id)||r.set(a.user_id,[]),r.get(a.user_id).push(a)});const s=[];return(t||[]).forEach(a=>{const i=r.get(a.id)||[];i.length>0?i.forEach(o=>{var d;s.push({...o,username:a.username,user_id:a.id,granted_by_username:((d=n.get(o.granted_by_user_id))==null?void 0:d.username)||""})}):s.push({id:null,user_id:a.id,role:null,username:a.username,granted_by_user_id:null,granted_by_username:""})}),s}function Pl(e,t){const n=(e||[]).map(a=>String((a==null?void 0:a.name)||"").trim()).filter(Boolean),r=(t||[]).map(a=>String((a==null?void 0:a.role)||"").trim()).filter(Boolean);return[...new Set([...cy,...n,...r])].sort((a,i)=>{const o=String(a||"").trim().toLowerCase(),d=String(i||"").trim().toLowerCase(),l=qo[o]??999,c=qo[d]??999;return l!==c?l-c:o.localeCompare(d,"en")})}function Dl(e){const t=e.querySelector("#admin-role-value"),n=e.querySelector("#admin-permissions-role"),r=(t==null?void 0:t.value)||"",s=(n==null?void 0:n.value)||j.permissionsRole||"",a=j.availableRoles.map(i=>{const o=Ol(i);return`<option value="${i}">${o}</option>`}).join("");if(t&&(t.innerHTML=`<option value="">Избери роля</option>${a}`,t.value=j.availableRoles.includes(r)?r:""),n){n.innerHTML=a;const i=j.availableRoles.includes("admin")?"admin":j.availableRoles[0]||"",o=j.availableRoles.includes(s)?s:i;n.value=o,j.permissionsRole=o}}async function Ml(e){const{data:t,error:n}=await S.from("roles").select("name, display_name_bg").order("name",{ascending:!0});if(n){g(n.message,"error");return}j.roleCatalog=t||[],j.availableRoles=Pl(t||[],j.roles),Dl(e),gr(e)}function Ol(e){const t=j.roleCatalog.find(r=>(r==null?void 0:r.name)===e),n=String((t==null?void 0:t.display_name_bg)||"").trim();return n||br(e)}async function Sy(e,t){if(!t)return;if(t==="admin"){g("Ролята admin не може да бъде изтрита.","warning");return}const{error:n}=await S.from("role_permissions").delete().eq("role",t);if(n){g(n.message,"error");return}const{error:r}=await S.from("roles").delete().eq("name",t);if(r){g(r.message,"error");return}if(g("Ролята е изтрита.","success"),await Ml(e),await Va(e),j.permissionsRole===t){const s=j.availableRoles.includes("admin")?"admin":j.availableRoles[0]||"";j.permissionsRole=s,s?await Lr(e,s):(j.permissions=[],ba(e,"Няма данни за права."))}}function To(e,{mode:t,roleName:n="",roleNameBg:r=""}){const s=e.querySelector("#admin-role-modal"),a=e.querySelector("#admin-role-modal-title"),i=e.querySelector("#admin-role-modal-original-name"),o=e.querySelector("#admin-role-modal-name"),d=e.querySelector("#admin-role-modal-name-bg"),l=e.querySelector("#admin-role-modal-save");i&&(i.value=t==="edit"?n:""),o&&(o.value=t==="edit"?n:""),d&&(d.value=t==="edit"?r||n:""),a&&(a.textContent=t==="edit"?"Редакция на роля":"Нова роля"),l&&(l.textContent=t==="edit"?"Запази":"Създай"),ws(s)}function cs(e){const t=e.querySelector("#admin-role-modal-original-name"),n=e.querySelector("#admin-role-modal-name"),r=e.querySelector("#admin-role-modal-name-bg"),s=e.querySelector("#admin-role-modal-title"),a=e.querySelector("#admin-role-modal-save");t&&(t.value=""),n&&(n.value=""),r&&(r.value=""),s&&(s.textContent="Нова роля"),a&&(a.textContent="Създай")}function bt(e,{message:t,confirmLabel:n,onConfirm:r}){const s=e.querySelector("#admin-role-warning-modal"),a=e.querySelector("#admin-role-warning-message"),i=e.querySelector("#admin-role-warning-confirm");pn=typeof r=="function"?r:null,a&&(a.textContent=t||"Сигурен ли си?"),i&&(i.textContent=n||"Потвърди"),ws(s)}async function xy(e,t){const{count:n,error:r}=await S.from("user_roles").select("id",{count:"exact",head:!0}).eq("role",t);if(r){g(r.message,"error");return}const s=Ol(t),a=Number(n||0);if(a>0){bt(e,{message:`Ролята "${s}" не може да бъде изтрита, защото е разкачена към ${a} потребител(и). Първо премахни свързаните роли от потребителите.`,confirmLabel:"Затвори",onConfirm:null});return}bt(e,{message:`Сигурен ли си, че искаш да премахнеш ролята "${s}"? Ще бъдат изтрити и всички права за тази роля.`,confirmLabel:"Премахни",onConfirm:()=>Sy(e,t)})}function ws(e){e&&e.classList.remove("d-none")}function Be(e){e&&e.classList.add("d-none")}function ky(e){var a,i;const t=[...e.querySelectorAll("[data-admin-tab]")],n=[...e.querySelectorAll("[data-admin-tab-pane]")];if(!t.length||!n.length)return;const r=o=>{t.forEach(d=>{const l=d.getAttribute("data-admin-tab")===o;d.classList.toggle("active",l),d.setAttribute("aria-selected",l?"true":"false")}),n.forEach(d=>{const l=d.getAttribute("data-admin-tab-pane")===o;d.classList.toggle("active",l),d.classList.toggle("d-none",!l)})};t.forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-admin-tab")||"";d&&r(d)})});const s=((a=t.find(o=>o.classList.contains("active")))==null?void 0:a.getAttribute("data-admin-tab"))||((i=t[0])==null?void 0:i.getAttribute("data-admin-tab"))||"";s&&r(s)}async function qy(e){const{data:t,error:n}=await S.from("user_profiles").select("id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)").order("username",{ascending:!0});if(n){g(n.message,"error");return}j.profiles=t||[],ya(e),wr(e)}async function Lr(e,t){const n=t||"admin",{data:r,error:s}=await S.from("role_permissions").select("role, resource, display_name_bg, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope").eq("role",n).order("resource",{ascending:!0});if(s){g(s.message,"error"),j.permissions=[],ba(e,"Няма данни за права.");return}j.permissions=r||[],ba(e)}async function Ly(e){const t=e.querySelector("#admin-permissions-save"),n=e.querySelector("#admin-permissions-role"),r=(n==null?void 0:n.value)||"admin",s=[...e.querySelectorAll("#admin-permissions-body tr[data-resource]")];if(!s.length){g("Няма редове за запис.","warning");return}const a=s.map(d=>{const l=d.getAttribute("data-resource")||"",c=j.permissions.find(p=>p.resource===l),u=p=>{var h;const m=((h=d.querySelector(`[data-permission-field="${p}"]`))==null?void 0:h.value)||"none";return p==="view_screen_scope"||p==="create_records_scope"?["none","all"].includes(m)?m:"none":["none","all","own","role_attached_employees"].includes(m)?m:"none"};return{role:r,resource:l,display_name_bg:(c==null?void 0:c.display_name_bg)||Ta(l),view_screen_scope:u("view_screen_scope"),view_records_scope:u("view_records_scope"),create_records_scope:u("create_records_scope"),edit_records_scope:u("edit_records_scope"),delete_records_scope:u("delete_records_scope"),updated_at:new Date().toISOString()}}),i=(t==null?void 0:t.innerHTML)||"";t&&(t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:o}=await S.from("role_permissions").upsert(a,{onConflict:"role,resource"});if(t&&(t.disabled=!1,t.innerHTML=i),o){g(o.message,"error");return}g("Правата са записани.","success"),await Lr(e,r)}const Ty=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Документи</h1>\r
      <div class="d-flex gap-2">\r
        <button id="open-create-document-category" type="button" class="btn btn-outline-primary"><i class="bi bi-folder-plus me-1"></i>Нова категория</button>\r
        <button id="open-create-document" type="button" class="btn btn-primary"><i class="bi bi-file-earmark-plus me-1"></i>Нов документ</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary">Управление на категории и документи към тях.</p>\r
\r
    <div class="row g-4">\r
\r
      <!-- Left: Categories sidebar -->\r
      <div class="col-12 col-lg-3">\r
        <div class="d-flex align-items-center justify-content-between mb-2">\r
          <h2 class="h6 mb-0 fw-bold text-secondary text-uppercase" style="font-size:0.75rem;letter-spacing:0.06em;">Категории</h2>\r
        </div>\r
        <div id="document-categories-menu" class="list-group list-group-flush border rounded"></div>\r
        <p id="document-categories-empty" class="text-secondary d-none mb-0 mt-2" style="font-size:0.88rem;"></p>\r
      </div>\r
\r
      <!-- Right: Documents panel -->\r
      <div class="col-12 col-lg-9">\r
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">\r
          <div>\r
            <h2 id="documents-panel-title" class="h6 mb-0 fw-bold">Всички документи</h2>\r
            <p id="documents-panel-subtitle" class="text-secondary small mb-0 mt-1"></p>\r
          </div>\r
          <div class="position-relative">\r
            <i class="bi bi-search position-absolute text-secondary" style="left:0.65rem;top:50%;transform:translateY(-50%);pointer-events:none;font-size:0.82rem;"></i>\r
            <input\r
              id="documents-search"\r
              type="text"\r
              class="form-control form-control-sm ps-4"\r
              placeholder="Търси по заглавие…"\r
              style="min-width:210px;"\r
            />\r
          </div>\r
        </div>\r
\r
        <div id="documents-cards-wrap" class="row g-3"></div>\r
        <p id="documents-empty" class="text-secondary d-none mb-0"></p>\r
\r
        <nav id="documents-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
          <button id="documents-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
          <div id="documents-pagination-label" class="text-secondary small"></div>\r
          <button id="documents-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
        </nav>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
\r
<div id="document-category-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 620px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="document-category-form-title" class="h5 mb-0">Нова категория</h2>\r
          <button id="document-category-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="document-category-form">\r
          <input type="hidden" id="document-category-id" />\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label for="document-category-name" class="form-label">Име</label>\r
              <input id="document-category-name" type="text" class="form-control" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="document-category-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="document-category-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 720px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="document-form-title" class="h5 mb-0">Нов документ</h2>\r
          <button id="document-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="document-form">\r
          <input type="hidden" id="document-id" />\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label for="document-title" class="form-label">Заглавие</label>\r
              <input id="document-title" type="text" class="form-control" required />\r
            </div>\r
            <div class="col-md-6">\r
              <label for="document-category" class="form-label">Категория</label>\r
              <select id="document-category" class="form-select" required>\r
                <option value="">Избери категория</option>\r
              </select>\r
            </div>\r
            <div class="col-md-6">\r
              <label for="document-file" class="form-label">Файл</label>\r
              <input id="document-file" type="file" class="form-control" required />\r
              <div class="form-text" id="document-file-help">Качи файл за документа.</div>\r
              <div class="form-text d-none" id="document-current-file-wrap">\r
                Текущ файл: <a id="document-current-file-link" href="#" target="_blank" rel="noopener noreferrer">Отвори</a>\r
              </div>\r
            </div>\r
            <div class="col-12">\r
              <label for="document-notes" class="form-label">Бележки</label>\r
              <textarea id="document-notes" class="form-control" rows="3" placeholder="По избор"></textarea>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="document-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="document-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-category-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш тази категория?</p>\r
        <input type="hidden" id="document-category-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="document-category-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="document-category-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този документ?</p>\r
        <input type="hidden" id="document-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="document-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="document-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="document-preview-title" class="h5 mb-0">Преглед на документ</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="document-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="document-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="document-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <div id="document-preview-text-wrap" class="d-none">\r
          <pre id="document-preview-text" class="border rounded p-3 bg-light mb-0" style="height: min(72vh, 760px); overflow: auto; white-space: pre-wrap; word-break: break-word;"></pre>\r
        </div>\r
        <div id="document-preview-csv-wrap" class="d-none">\r
          <p id="document-preview-csv-note" class="text-secondary small mb-2"></p>\r
          <div class="table-responsive border rounded" style="height: min(72vh, 760px); overflow: auto;">\r
            <table class="table table-sm table-striped table-bordered mb-0">\r
              <thead id="document-preview-csv-head"></thead>\r
              <tbody id="document-preview-csv-body"></tbody>\r
            </table>\r
          </div>\r
        </div>\r
        <iframe\r
          id="document-preview-frame"\r
          title="Преглед на документ"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Dt(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Eo=new Map;function Ey(e,t){const n=Eo.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ve(a);return}}};Eo.set(e,r),document.addEventListener("keydown",r)}function Ve(e){var t,n,r,s,a;e.classList.add("d-none"),(t=document.querySelector("#document-category-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#document-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#document-category-delete-modal"))!=null&&r.classList.contains("d-none"))&&((s=document.querySelector("#document-delete-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#document-preview-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Ke(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const le={categories:[],documents:[],searchQuery:"",categoryFilter:"",page:1,pageSize:20};async function $y(e){const{data:t,error:n}=await S.from("document_categories").select("id, name").order("name",{ascending:!0});if(n){g(n.message,"error"),le.categories=[],ga(e,"Грешка при зареждане на категориите.");return}le.categories=t||[],ga(e),Ga(e)}async function Ay(e){const{data:t,error:n}=await S.from("documents").select("id, title, document_url, storage_path, notes, category_id, document_categories(name)").order("title",{ascending:!0});if(n){g(n.message,"error"),le.documents=[],Tn(e,"Грешка при зареждане на документите.");return}le.documents=t||[],Tn(e)}function Ga(e){const t=e.querySelector("#documents-category-filter"),n=e.querySelector("#document-category"),r=(le.categories||[]).map(s=>`<option value="${s.id}">${Ke(s.name||"-")}</option>`).join("");t&&(t.innerHTML='<option value="">Всички</option>'+r,t.value=le.categoryFilter||""),n&&(n.innerHTML='<option value="">Избери категория</option>'+r)}function Cy(){const e={};return(le.documents||[]).forEach(t=>{t.category_id&&(e[String(t.category_id)]=(e[String(t.category_id)]||0)+1)}),e}function Ry(e){const t=(e||"").split("?")[0].split(".").pop().toLowerCase();return t==="pdf"?"bi-file-earmark-pdf text-danger":["doc","docx"].includes(t)?"bi-file-earmark-word text-primary":["xls","xlsx","csv"].includes(t)?"bi-file-earmark-excel text-success":["ppt","pptx"].includes(t)?"bi-file-earmark-ppt text-warning":["jpg","jpeg","png","gif","webp","svg"].includes(t)?"bi-file-earmark-image text-info":["zip","rar","7z"].includes(t)?"bi-file-earmark-zip text-secondary":"bi-file-earmark-text text-secondary"}function ga(e,t){const n=e.querySelector("#document-categories-menu"),r=e.querySelector("#document-categories-empty"),s=le.categories||[];if(!s.length){n&&(n.innerHTML=""),r.classList.remove("d-none"),r.textContent=t||"Няма въведени категории.";return}if(r.classList.add("d-none"),!n)return;const a=String(le.categoryFilter||""),i=a==="",o=Cy(),d=(le.documents||[]).length;n.innerHTML=[`<div
        class="list-group-item list-group-item-action d-flex align-items-center gap-2 py-2 px-3 ${i?"active":""}"
        data-category-select="true" data-id="">
        <i class="bi bi-folder2-open ${i?"text-white":"text-primary"} me-1"></i>
        <span class="flex-grow-1 fw-semibold" style="font-size:0.9rem;">Всички</span>
        <span class="badge rounded-pill ${i?"bg-white text-primary":"bg-primary-subtle text-primary-emphasis"}">${d}</span>
      </div>`,...s.map(l=>{const c=String(l.id)===a,u=o[String(l.id)]||0;return`<div
          class="list-group-item list-group-item-action d-flex align-items-center gap-2 py-2 px-3 ${c?"active":""}"
          data-category-select="true" data-id="${l.id}">
          <i class="bi bi-folder ${c?"text-white":"text-secondary"} me-1"></i>
          <span class="flex-grow-1" style="font-size:0.9rem;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Ke(l.name||"-")}</span>
          <span class="badge rounded-pill ${c?"bg-white text-primary":"bg-secondary-subtle text-secondary-emphasis"} me-1">${u}</span>
          <button
            type="button"
            class="btn btn-sm p-0 lh-1 flex-shrink-0 ${c?"text-white border-0 opacity-75":"text-primary border-0"}"
            data-category-action="edit"
            data-id="${l.id}"
            data-name="${Ke(l.name||"")}"
            title="Редакция" aria-label="Редакция"
            style="background:transparent;width:1.6rem;height:1.6rem;"
          ><i class="bi bi-pencil" style="font-size:0.78rem;"></i></button>
          <button
            type="button"
            class="btn btn-sm p-0 lh-1 flex-shrink-0 ${c?"text-white border-0 opacity-75":"text-danger border-0"}"
            data-category-action="delete"
            data-id="${l.id}"
            title="Изтрий" aria-label="Изтрий"
            style="background:transparent;width:1.6rem;height:1.6rem;"
          ><i class="bi bi-trash" style="font-size:0.78rem;"></i></button>
        </div>`})].join("")}function Tn(e,t){const n=e.querySelector("#documents-cards-wrap"),r=e.querySelector("#documents-empty");He(e,{rootSelector:"#documents-pagination",prevSelector:"#documents-pagination-prev",nextSelector:"#documents-pagination-next",onPrev:()=>{le.page=Math.max(1,(le.page||1)-1),Tn(e)},onNext:()=>{le.page=(le.page||1)+1,Tn(e)}});const s=(le.documents||[]).filter(p=>{const m=!le.searchQuery||String((p==null?void 0:p.title)||"").toLowerCase().includes(le.searchQuery),h=!le.categoryFilter||String((p==null?void 0:p.category_id)||"")===String(le.categoryFilter||"");return m&&h}),{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,le.page,le.pageSize);le.page=i,ke(e,{rootSelector:"#documents-pagination",prevSelector:"#documents-pagination-prev",nextSelector:"#documents-pagination-next",labelSelector:"#documents-pagination-label",page:i,totalItems:o,totalPages:d});const l=le.categoryFilter||"",c=e.querySelector("#documents-panel-title"),u=e.querySelector("#documents-panel-subtitle");if(c)if(l){const p=(le.categories||[]).find(m=>String(m.id)===String(l));c.textContent=p?p.name:"Документи"}else c.textContent="Всички документи";if(u&&(u.textContent=s.length?`${s.length} ${s.length===1?"документ":"документа"}`:""),!s.length){n&&(n.innerHTML=""),r.classList.remove("d-none"),r.textContent=t||(le.searchQuery?"Няма намерени документи.":"Няма въведени документи.");return}r.classList.add("d-none"),n&&(n.innerHTML=a.map(p=>{var f;const m=Ry(p.document_url||""),h=Ke(((f=p.document_categories)==null?void 0:f.name)||""),y=Ke((p.notes||"").slice(0,100));return`
        <div class="col-12">
          <div class="card border shadow-sm document-card h-100">
            <div class="card-body d-flex align-items-center gap-3 py-3 px-3">
              <div class="flex-shrink-0 text-center" style="width:2.4rem;">
                <i class="bi ${m}" style="font-size:1.7rem;"></i>
              </div>
              <div class="flex-grow-1" style="min-width:0;">
                <div class="fw-semibold text-truncate" style="font-size:0.95rem;">${Ke(p.title||"-")}</div>
                ${h?`<span class="badge bg-primary-subtle text-primary-emphasis mt-1" style="font-size:0.73rem;">${h}</span>`:""}
                ${y?`<div class="text-secondary small text-truncate mt-1" style="font-size:0.8rem;">${y}</div>`:""}
              </div>
              <div class="d-flex gap-2 flex-shrink-0">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                  data-document-action="preview"
                  data-title="${Ke(p.title||"")}"
                  data-url="${Ke(p.document_url||"")}"
                  title="Преглед" aria-label="Преглед"
                ><i class="bi bi-eye"></i></button>
                <a
                  href="${Ke(p.document_url||"#")}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-sm btn-outline-secondary"
                  title="Отвори файла" aria-label="Отвори файла"
                ><i class="bi bi-box-arrow-up-right"></i></a>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary"
                  data-document-action="edit"
                  data-id="${p.id}"
                  data-title="${Ke(p.title||"")}"
                  data-category-id="${p.category_id||""}"
                  data-url="${Ke(p.document_url||"")}"
                  data-storage-path="${Ke(p.storage_path||"")}"
                  data-notes="${Ke(p.notes||"")}"
                  title="Редакция" aria-label="Редакция"
                ><i class="bi bi-pencil"></i></button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  data-document-action="delete"
                  data-id="${p.id}"
                  title="Изтрий" aria-label="Изтрий"
                ><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      `}).join(""))}const Sr="documents-files";async function Iy(e){e.innerHTML=Ty,Py(e),await Tr(e)}async function Tr(e){await $y(e),await Ay(e)}function Py(e){var m,h,y,f,b,w,v,_,k;const t=e.querySelector("#open-create-document-category"),n=e.querySelector("#open-create-document"),r=e.querySelector("#document-category-modal"),s=e.querySelector("#document-modal"),a=e.querySelector("#document-category-delete-modal"),i=e.querySelector("#document-delete-modal"),o=e.querySelector("#document-preview-modal"),d=e.querySelector("#document-category-form"),l=e.querySelector("#document-form"),c=e.querySelector("#document-categories-menu"),u=e.querySelector("#documents-cards-wrap"),p=e.querySelector("#documents-search");t==null||t.addEventListener("click",()=>{jl(e),Dt(r)}),n==null||n.addEventListener("click",()=>{if(!(le.categories||[]).length){g("Добави първо категория.","warning");return}Nl(e),Ga(e),Dt(s)}),d==null||d.addEventListener("submit",async x=>{x.preventDefault(),await Dy(e)}),l==null||l.addEventListener("submit",async x=>{x.preventDefault(),await My(e)}),(m=e.querySelector("#document-category-modal-close"))==null||m.addEventListener("click",()=>Ve(r)),(h=e.querySelector("#document-category-cancel-btn"))==null||h.addEventListener("click",()=>Ve(r)),(y=e.querySelector("#document-modal-close"))==null||y.addEventListener("click",()=>Ve(s)),(f=e.querySelector("#document-cancel-btn"))==null||f.addEventListener("click",()=>Ve(s)),(b=e.querySelector("#document-category-delete-cancel"))==null||b.addEventListener("click",()=>Ve(a)),(w=e.querySelector("#document-delete-cancel"))==null||w.addEventListener("click",()=>Ve(i)),(v=e.querySelector("#document-preview-close"))==null||v.addEventListener("click",()=>By(e)),(_=e.querySelector("#document-category-delete-confirm"))==null||_.addEventListener("click",async()=>{const x=e.querySelector("#document-category-delete-id").value;await Oy(e,x)}),(k=e.querySelector("#document-delete-confirm"))==null||k.addEventListener("click",async()=>{const x=e.querySelector("#document-delete-id").value;await jy(e,x)}),c==null||c.addEventListener("click",x=>{const L=x.target.closest("button[data-category-action]");if(L){const q=L.getAttribute("data-category-action");if(q==="edit"){Ny(e,{id:L.getAttribute("data-id"),name:L.getAttribute("data-name")}),Dt(r);return}q==="delete"&&(e.querySelector("#document-category-delete-id").value=L.getAttribute("data-id")||"",Dt(a));return}const T=x.target.closest('[data-category-select="true"]');T&&(le.categoryFilter=T.getAttribute("data-id")||"",le.page=1,Tn(e),ga(e))}),u==null||u.addEventListener("click",x=>{const L=x.target.closest("button[data-document-action]");if(!L)return;const T=L.getAttribute("data-document-action");if(T==="edit"){Hy(e,{id:L.getAttribute("data-id"),title:L.getAttribute("data-title"),categoryId:L.getAttribute("data-category-id"),url:L.getAttribute("data-url"),storagePath:L.getAttribute("data-storage-path"),notes:L.getAttribute("data-notes")}),Dt(s);return}if(T==="delete"){e.querySelector("#document-delete-id").value=L.getAttribute("data-id")||"",Dt(i);return}if(T==="preview"){const q=String(L.getAttribute("data-url")||"").trim(),E=String(L.getAttribute("data-title")||"").trim();Fy(e,q,E)}}),p==null||p.addEventListener("input",x=>{le.searchQuery=x.target.value.trim().toLowerCase(),Tn(e)}),Ey("documents-page",[o,i,a,s,r])}async function Dy(e){var o,d;const t=e.querySelector("#document-category-id").value,n=e.querySelector("#document-category-name"),r=e.querySelector("#document-category-save-btn"),s=n.value.trim();if(!s){g("Попълни име на категория.","warning");return}const a=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let i=null;if(t)({error:i}=await S.from("document_categories").update({name:s,updated_at:new Date().toISOString()}).eq("id",t));else{const{data:l}=await S.auth.getUser(),c=((o=l==null?void 0:l.user)==null?void 0:o.id)??((d=l==null?void 0:l.user)==null?void 0:d.email)??"web_app";({error:i}=await S.from("document_categories").insert({name:s,created_from:c}))}if(r.disabled=!1,r.innerHTML=a,i){if(i.code==="23505"){g("Категория с това име вече съществува.","warning");return}g(i.message,"error");return}Ve(e.querySelector("#document-category-modal")),jl(e),await Tr(e),g(t?"Категорията е обновена.":"Категорията е създадена.","success")}async function My(e){var h,y,f,b,w,v;const t=e.querySelector("#document-id").value,n=e.querySelector("#document-title").value.trim(),r=e.querySelector("#document-category").value||null,s=((h=e.querySelector("#document-current-file-link"))==null?void 0:h.getAttribute("href"))||"",a=((f=(y=e.querySelector("#document-current-file-link"))==null?void 0:y.dataset)==null?void 0:f.storagePath)||"",i=e.querySelector("#document-file"),o=((b=i==null?void 0:i.files)==null?void 0:b[0])||null,d=e.querySelector("#document-notes").value.trim()||null,l=e.querySelector("#document-save-btn");if(!n||!r){g("Попълни всички задължителни полета.","warning");return}if(!t&&!o){g("Качи файл за документа.","warning");return}const c=l.innerHTML;l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let u=null,p=s,m=a;if(o){const _=await Uy(o);if(_.error){l.disabled=!1,l.innerHTML=c,g(_.error.message||"Файлът не може да се качи.","error");return}p=_.publicUrl,m=_.path}if(t)({error:u}=await S.from("documents").update({title:n,category_id:r,document_url:p,storage_path:m,notes:d,updated_at:new Date().toISOString()}).eq("id",t));else{const{data:_}=await S.auth.getUser(),k=((w=_==null?void 0:_.user)==null?void 0:w.id)??((v=_==null?void 0:_.user)==null?void 0:v.email)??"web_app";({error:u}=await S.from("documents").insert({title:n,category_id:r,document_url:p,storage_path:m,notes:d,created_from:k}))}if(l.disabled=!1,l.innerHTML=c,u){o&&m&&await S.storage.from(Sr).remove([m]),g(u.message,"error");return}t&&o&&a&&a!==m&&await S.storage.from(Sr).remove([a]),Ve(e.querySelector("#document-modal")),Nl(e),await Tr(e),g(t?"Документът е обновен.":"Документът е създаден.","success")}async function Oy(e,t){const n=e.querySelector("#document-category-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("documents").select("id",{count:"exact",head:!0}).eq("category_id",t);if(a){n.disabled=!1,n.innerHTML=r,g(a.message,"error");return}if((s||0)>0){n.disabled=!1,n.innerHTML=r,g("Категорията не може да се изтрие, защото съдържа документи.","warning");return}const{error:i}=await S.from("document_categories").delete().eq("id",t);if(n.disabled=!1,n.innerHTML=r,i){g(i.message,"error");return}Ve(e.querySelector("#document-category-delete-modal")),await Tr(e),g("Категорията е изтрита.","success")}async function jy(e,t){const n=e.querySelector("#document-delete-confirm"),r=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{data:s}=await S.from("documents").select("storage_path").eq("id",t).maybeSingle(),{error:a}=await S.from("documents").delete().eq("id",t);if(n.disabled=!1,n.innerHTML=r,a){g(a.message,"error");return}s!=null&&s.storage_path&&await S.storage.from(Sr).remove([s.storage_path]),Ve(e.querySelector("#document-delete-modal")),await Tr(e),g("Документът е изтрит.","success")}function Ny(e,t){e.querySelector("#document-category-id").value=t.id||"",e.querySelector("#document-category-name").value=t.name||"",e.querySelector("#document-category-form-title").textContent="Редакция на категория",e.querySelector("#document-category-save-btn").textContent="Запази"}function jl(e){e.querySelector("#document-category-id").value="",e.querySelector("#document-category-name").value="",e.querySelector("#document-category-form-title").textContent="Нова категория",e.querySelector("#document-category-save-btn").textContent="Създай"}function Hy(e,t){Ga(e);const n=e.querySelector("#document-file"),r=e.querySelector("#document-file-help"),s=e.querySelector("#document-current-file-wrap"),a=e.querySelector("#document-current-file-link");e.querySelector("#document-id").value=t.id||"",e.querySelector("#document-title").value=t.title||"",e.querySelector("#document-category").value=t.categoryId||"",e.querySelector("#document-notes").value=t.notes||"",n&&(n.value="",n.required=!1),r&&(r.textContent="По избор: качи нов файл, за да замениш текущия."),s&&a&&t.url&&(s.classList.remove("d-none"),a.setAttribute("href",t.url),a.dataset.storagePath=t.storagePath||""),e.querySelector("#document-form-title").textContent="Редакция на документ",e.querySelector("#document-save-btn").textContent="Запази"}function Nl(e){const t=e.querySelector("#document-file"),n=e.querySelector("#document-file-help"),r=e.querySelector("#document-current-file-wrap"),s=e.querySelector("#document-current-file-link");e.querySelector("#document-id").value="",e.querySelector("#document-title").value="",e.querySelector("#document-category").value="",e.querySelector("#document-notes").value="",t&&(t.value="",t.required=!0),n&&(n.textContent="Качи файл за документа."),r&&r.classList.add("d-none"),s&&(s.setAttribute("href","#"),s.dataset.storagePath=""),e.querySelector("#document-form-title").textContent="Нов документ",e.querySelector("#document-save-btn").textContent="Създай"}async function Uy(e){var d,l;const{data:t}=await S.auth.getSession(),n=((l=(d=t==null?void 0:t.session)==null?void 0:d.user)==null?void 0:l.id)||"anonymous",r=Date.now(),s=String((e==null?void 0:e.name)||"document").replace(/[^a-zA-Z0-9._-]/g,"_"),a=`${n}/${r}_${s}`,{error:i}=await S.storage.from(Sr).upload(a,e,{upsert:!1});if(i)return{error:i};const{data:o}=S.storage.from(Sr).getPublicUrl(a);return{path:a,publicUrl:(o==null?void 0:o.publicUrl)||"",error:null}}function Fy(e,t,n){const r=e.querySelector("#document-preview-modal"),s=e.querySelector("#document-preview-frame"),a=e.querySelector("#document-preview-text-wrap"),i=e.querySelector("#document-preview-text"),o=e.querySelector("#document-preview-csv-wrap"),d=e.querySelector("#document-preview-csv-note"),l=e.querySelector("#document-preview-csv-head"),c=e.querySelector("#document-preview-csv-body"),u=e.querySelector("#document-preview-title"),p=e.querySelector("#document-preview-fallback"),m=e.querySelector("#document-preview-open");if(!r||!s||!a||!i||!o||!d||!l||!c||!u||!p||!m)return;const h=String(t||"").trim();if(!h){g("Липсва файл за преглед.","warning");return}const y=Vy(h),f=wa(h),b=f==="csv",w=["txt","csv","json"].includes(f);u.textContent=n?`Преглед: ${n}`:"Преглед на документ",m.setAttribute("href",h),p.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),d.textContent="",l.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",b?(o.classList.remove("d-none"),s.classList.add("d-none"),Ky(h,l,c,d,p)):w?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",Wy(h,i,p)):(s.src=y,s.onload=()=>{if(y!==h){p.classList.add("d-none");return}const v=wa(h),_=["doc","docx","xls","xlsx","ppt","pptx"].includes(v);p.classList.toggle("d-none",!_)},s.onerror=()=>{p.classList.remove("d-none")}),Dt(r)}function By(e){const t=e.querySelector("#document-preview-modal"),n=e.querySelector("#document-preview-frame"),r=e.querySelector("#document-preview-text-wrap"),s=e.querySelector("#document-preview-text"),a=e.querySelector("#document-preview-csv-wrap"),i=e.querySelector("#document-preview-csv-note"),o=e.querySelector("#document-preview-csv-head"),d=e.querySelector("#document-preview-csv-body"),l=e.querySelector("#document-preview-fallback"),c=e.querySelector("#document-preview-open");!t||!n||!r||!s||!a||!i||!o||!d||!l||!c||(n.src="about:blank",n.classList.remove("d-none"),r.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",d.innerHTML="",c.setAttribute("href","#"),l.classList.add("d-none"),Ve(t))}async function Ky(e,t,n,r,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=zy(i);if(!o.length){t.innerHTML="",n.innerHTML="",r.textContent="Файлът е празен.",s.classList.add("d-none");return}const d=200,l=o.slice(0,d),c=l[0]||[],u=l.slice(1);t.innerHTML=`
      <tr>${c.map(p=>`<th>${$o(p)}</th>`).join("")}</tr>
    `,n.innerHTML=u.map(p=>`<tr>${p.map(m=>`<td>${$o(m)}</td>`).join("")}</tr>`).join(""),o.length>d?r.textContent=`Показани са първите ${d} реда от общо ${o.length}.`:r.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",n.innerHTML="",r.textContent="",s.classList.remove("d-none")}}function zy(e){const t=[];let n=[],r="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(r+='"',a+=1):s=!s;continue}if(!s&&i===","){n.push(r),r="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),n.push(r),t.push(n),n=[],r="";continue}r+=i}return(r.length||n.length)&&(n.push(r),t.push(n)),t}async function Wy(e,t,n){try{const r=await fetch(e,{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.text();t.textContent=s||"(Празен файл)",n.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",n.classList.remove("d-none")}}function Vy(e){const t=wa(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function wa(e){const t=String(e||"").trim();if(!t)return"";try{const r=new URL(t).pathname.split("/").pop()||"",s=r.includes(".")?r.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}function $o(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Gy=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">\r
      <div>\r
        <h1 class="h3 mb-1">Потребителски профили</h1>\r
        <p class="text-secondary mb-0">Преглед и редакция на профили според правата за достъп.</p>\r
      </div>\r
      <div style="min-width: 260px;">\r
        <label for="user-profiles-search" class="form-label mb-1">Търсене</label>\r
        <input id="user-profiles-search" type="text" class="form-control form-control-sm" placeholder="Търси по username, email, име" />\r
      </div>\r
    </div>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle mb-0">\r
        <thead>\r
          <tr>\r
            <th>Потребителско име</th>\r
            <th>Имейл</th>\r
            <th>Име</th>\r
            <th>Служител</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="user-profiles-table-body"></tbody>\r
      </table>\r
    </div>\r
    <p id="user-profiles-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
    <nav id="user-profiles-pagination" class="d-none d-flex align-items-center justify-content-between mt-3" aria-label="Пейджиране">\r
      <button id="user-profiles-pagination-prev" type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-chevron-left me-1"></i>Назад</button>\r
      <div id="user-profiles-pagination-label" class="text-secondary small"></div>\r
      <button id="user-profiles-pagination-next" type="button" class="btn btn-sm btn-outline-secondary">Напред<i class="bi bi-chevron-right ms-1"></i></button>\r
    </nav>\r
  </div>\r
</section>\r
\r
<div id="user-profile-view-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 680px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Преглед на профил</h2>\r
          <button id="user-profile-view-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div class="row g-3">\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Потребителско име</div>\r
              <div id="user-profile-view-username" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Имейл</div>\r
              <div id="user-profile-view-email" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Собствено име</div>\r
              <div id="user-profile-view-first-name" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Фамилия</div>\r
              <div id="user-profile-view-last-name" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-12">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Свързан служител</div>\r
              <div id="user-profile-view-employee" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="d-flex justify-content-end mt-4">\r
          <button id="user-profile-view-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="user-profile-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 680px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Редакция на профил</h2>\r
          <button id="user-profile-edit-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="user-profile-edit-form" class="row g-3">\r
          <input id="user-profile-edit-id" type="hidden" />\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-username" class="form-label">Потребителско име</label>\r
            <input id="user-profile-edit-username" type="text" class="form-control" required minlength="3" maxlength="30" pattern="^[A-Za-z0-9_]{3,30}$" />\r
          </div>\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-email" class="form-label">Имейл</label>\r
            <input id="user-profile-edit-email" type="email" class="form-control" required />\r
          </div>\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-first-name" class="form-label">Собствено име</label>\r
            <input id="user-profile-edit-first-name" type="text" class="form-control" required />\r
          </div>\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-last-name" class="form-label">Фамилия</label>\r
            <input id="user-profile-edit-last-name" type="text" class="form-control" required />\r
          </div>\r
\r
          <div id="user-profile-password-wrap" class="col-12 d-none">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small mb-2">Смяна на парола</div>\r
              <div class="row g-3">\r
                <div class="col-md-6">\r
                  <label for="user-profile-edit-new-password" class="form-label">Нова парола</label>\r
                  <div class="input-group">\r
                    <input\r
                      id="user-profile-edit-new-password"\r
                      type="password"\r
                      class="form-control"\r
                      minlength="6"\r
                      pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
                      title="Паролата не трябва да съдържа кирилица"\r
                    />\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-secondary"\r
                      data-toggle-password="user-profile-edit-new-password"\r
                      aria-label="Покажи новата парола"\r
                    >\r
                      <i class="bi bi-eye"></i>\r
                    </button>\r
                  </div>\r
                </div>\r
                <div class="col-md-6">\r
                  <label for="user-profile-edit-confirm-password" class="form-label">Потвърди нова парола</label>\r
                  <div class="input-group">\r
                    <input\r
                      id="user-profile-edit-confirm-password"\r
                      type="password"\r
                      class="form-control"\r
                      minlength="6"\r
                      pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
                      title="Паролата не трябва да съдържа кирилица"\r
                    />\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-secondary"\r
                      data-toggle-password="user-profile-edit-confirm-password"\r
                      aria-label="Покажи потвърждението на новата парола"\r
                    >\r
                      <i class="bi bi-eye"></i>\r
                    </button>\r
                  </div>\r
                </div>\r
              </div>\r
              <div class="form-text mt-2">Остави празно, ако не искаш смяна на паролата.</div>\r
            </div>\r
          </div>\r
\r
          <div id="user-profile-edit-employee-wrap" class="col-12 d-none">\r
            <label for="user-profile-edit-employee-id" class="form-label">Свързан служител</label>\r
            <select id="user-profile-edit-employee-id" class="form-select">\r
              <option value="">Без свързан служител</option>\r
            </select>\r
          </div>\r
\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="user-profile-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="user-profile-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="user-profile-reset-confirm-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърждение</h2>\r
          <button id="user-profile-reset-confirm-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <p id="user-profile-reset-confirm-message" class="mb-4">Сигурни ли сте, че искате да изпратите линк?</p>\r
\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="user-profile-reset-confirm-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="user-profile-reset-confirm-accept" type="button" class="btn btn-warning">Изпрати</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Ja(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ao=new Map;function Jy(e,t){const n=Ao.get(e);n&&document.removeEventListener("keydown",n);const r=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Tt(a);return}}};Ao.set(e,r),document.addEventListener("keydown",r)}function Tt(e){var t,n,r;e==null||e.classList.add("d-none"),(t=document.querySelector("#user-profile-view-modal"))!=null&&t.classList.contains("d-none")&&((n=document.querySelector("#user-profile-edit-modal"))!=null&&n.classList.contains("d-none"))&&((r=document.querySelector("#user-profile-reset-confirm-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Vn(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function _a(e){var s,a;const t=String(((s=e==null?void 0:e.employees)==null?void 0:s.first_name)||"").trim(),n=String(((a=e==null?void 0:e.employees)==null?void 0:a.last_name)||"").trim();return`${t} ${n}`.trim()||"-"}const ae={rows:[],employees:[],searchQuery:"",isAdmin:!1,currentUserId:"",resetConfirmResolver:null,page:1,pageSize:20};function xr(e,t){const n=e.querySelector("#user-profiles-table-body"),r=e.querySelector("#user-profiles-empty");He(e,{rootSelector:"#user-profiles-pagination",prevSelector:"#user-profiles-pagination-prev",nextSelector:"#user-profiles-pagination-next",onPrev:()=>{ae.page=Math.max(1,(ae.page||1)-1),xr(e)},onNext:()=>{ae.page=(ae.page||1)+1,xr(e)}});const s=(ae.rows||[]).filter(l=>{const c=[l==null?void 0:l.username,l==null?void 0:l.email,l==null?void 0:l.first_name,l==null?void 0:l.last_name,_a(l)].map(u=>String(u||"").toLowerCase()).join(" ");return!ae.searchQuery||c.includes(ae.searchQuery)}),{pageItems:a,page:i,totalItems:o,totalPages:d}=Ne(s,ae.page,ae.pageSize);if(ae.page=i,ke(e,{rootSelector:"#user-profiles-pagination",prevSelector:"#user-profiles-pagination-prev",nextSelector:"#user-profiles-pagination-next",labelSelector:"#user-profiles-pagination-label",page:i,totalItems:o,totalPages:d}),!s.length){n.innerHTML="",r.classList.remove("d-none"),r.textContent=t||"Няма намерени профили.";return}r.classList.add("d-none"),n.innerHTML=a.map(l=>{const c=`${String((l==null?void 0:l.first_name)||"").trim()} ${String((l==null?void 0:l.last_name)||"").trim()}`.trim()||"-",u=_a(l);return`
        <tr>
          <td>${Vn((l==null?void 0:l.username)||"-")}</td>
          <td>${Vn((l==null?void 0:l.email)||"-")}</td>
          <td>${Vn(c)}</td>
          <td>${Vn(u)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-user-profile-action="view"
                data-id="${l.id}"
              >
                Преглед
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-user-profile-action="edit"
                data-id="${l.id}"
              >
                Редакция
              </button>
              ${ae.isAdmin?`
                <button
                  type="button"
                  class="btn btn-sm btn-outline-warning"
                  data-user-profile-action="reset-password"
                  data-id="${l.id}"
                >
                  Reset парола
                </button>
              `:""}
            </div>
          </td>
        </tr>
      `}).join("")}function Qy(e){const t=e.querySelector("#user-profile-edit-employee-id");if(!t)return;const n=(ae.employees||[]).map(r=>{const s=`${String((r==null?void 0:r.first_name)||"").trim()} ${String((r==null?void 0:r.last_name)||"").trim()}`.trim()||"-";return`<option value="${r.id}">${Vn(s)}</option>`}).join("");t.innerHTML='<option value="">Без свързан служител</option>'+n}async function Yy(e){e.innerHTML=Gy,Xy(e),tb(e),await Sa(e)}function Xy(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-toggle-password")||"",r=e.querySelector(`#${n}`);if(!r)return;const s=r.type==="password";r.type=s?"text":"password",t.innerHTML=s?'<i class="bi bi-eye-slash"></i>':'<i class="bi bi-eye"></i>';const a=n.includes("confirm"),i=a?"Покажи потвърждението на новата парола":"Покажи новата парола",o=a?"Скрий потвърждението на новата парола":"Скрий новата парола";t.setAttribute("aria-label",s?o:i)})})}function Zy(){return`${window.location.origin}/reset-password`}function Wr(e,t){const n=ae.resetConfirmResolver;n&&(ae.resetConfirmResolver=null,Tt(e.querySelector("#user-profile-reset-confirm-modal")),n(!!t))}function eb(e,t){const n=e.querySelector("#user-profile-reset-confirm-modal"),r=e.querySelector("#user-profile-reset-confirm-message");if(!n||!r)return Promise.resolve(!1);if(ae.resetConfirmResolver){const s=ae.resetConfirmResolver;ae.resetConfirmResolver=null,s(!1)}return r.textContent=`Да се изпрати ли линк за смяна на парола до ${t}?`,Ja(n),new Promise(s=>{ae.resetConfirmResolver=s})}function tb(e){var i,o,d,l,c,u,p,m;const t=e.querySelector("#user-profiles-search"),n=e.querySelector("#user-profiles-table-body"),r=e.querySelector("#user-profile-view-modal"),s=e.querySelector("#user-profile-edit-modal"),a=e.querySelector("#user-profile-reset-confirm-modal");t==null||t.addEventListener("input",h=>{var y;ae.searchQuery=String(((y=h.target)==null?void 0:y.value)||"").trim().toLowerCase(),xr(e)}),n==null||n.addEventListener("click",h=>{const y=h.target.closest("button[data-user-profile-action]");if(!y)return;const f=y.getAttribute("data-user-profile-action"),b=y.getAttribute("data-id")||"";if(f==="view"){rb(e,b);return}if(f==="edit"){sb(e,b);return}f==="reset-password"&&nb(e,b,y)}),(i=e.querySelector("#user-profile-view-close"))==null||i.addEventListener("click",()=>Tt(r)),(o=e.querySelector("#user-profile-view-close-secondary"))==null||o.addEventListener("click",()=>Tt(r)),(d=e.querySelector("#user-profile-edit-close"))==null||d.addEventListener("click",()=>Tt(s)),(l=e.querySelector("#user-profile-edit-cancel"))==null||l.addEventListener("click",()=>Tt(s)),(c=e.querySelector("#user-profile-reset-confirm-close"))==null||c.addEventListener("click",()=>Wr(e,!1)),(u=e.querySelector("#user-profile-reset-confirm-cancel"))==null||u.addEventListener("click",()=>Wr(e,!1)),(p=e.querySelector("#user-profile-reset-confirm-accept"))==null||p.addEventListener("click",()=>Wr(e,!0)),a==null||a.addEventListener("click",h=>{h.target===a&&Wr(e,!1)}),(m=e.querySelector("#user-profile-edit-form"))==null||m.addEventListener("submit",async h=>{h.preventDefault(),await ab(e)}),Jy("user-profiles",[a,s,r])}async function nb(e,t,n){if(!ae.isAdmin){g("Нямаш права за това действие.","warning");return}const r=ae.rows.find(c=>c.id===t);if(!r){g("Профилът не е намерен.","warning");return}const s=String(r.email||"").trim();if(!s){g("Потребителят няма валиден имейл.","warning");return}const i=`${String(r.first_name||"").trim()} ${String(r.last_name||"").trim()}`.trim()||r.username||s;if(!await eb(e,i))return;const d=(n==null?void 0:n.innerHTML)||"Reset парола";n&&(n.disabled=!0,n.innerHTML="Изпращане...");const{error:l}=await S.auth.resetPasswordForEmail(s,{redirectTo:Zy()});if(n&&(n.disabled=!1,n.innerHTML=d),l){g(l.message||"Линкът за смяна на парола не беше изпратен.","error");return}g("Изпратен е линк за смяна на парола към потребителя.","success")}async function Sa(e){var l,c;const t=await wn(),n=((l=t==null?void 0:t.user)==null?void 0:l.id)||"";ae.currentUserId=n,ae.isAdmin=await Lu();const r=e.querySelector("#user-profiles-search");r&&(r.classList.toggle("d-none",!ae.isAdmin),(c=r.previousElementSibling)==null||c.classList.toggle("d-none",!ae.isAdmin));const s=S.from("user_profiles").select("id, username, email, first_name, last_name, employee_id, employees(id, first_name, last_name)").order("username",{ascending:!0});!ae.isAdmin&&n&&s.eq("id",n);const[{data:a,error:i},{data:o,error:d}]=await Promise.all([s,ae.isAdmin?S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0}):Promise.resolve({data:[],error:null})]);if(i||d){g((i==null?void 0:i.message)||(d==null?void 0:d.message)||"Грешка при зареждане на профили.","error"),ae.rows=[],ae.employees=[],xr(e,"Няма данни за профили.");return}ae.rows=a||[],ae.employees=o||[],Qy(e),xr(e)}function rb(e,t){const n=ae.rows.find(r=>r.id===t);if(!n){g("Профилът не е намерен.","warning");return}e.querySelector("#user-profile-view-username").textContent=n.username||"-",e.querySelector("#user-profile-view-email").textContent=n.email||"-",e.querySelector("#user-profile-view-first-name").textContent=n.first_name||"-",e.querySelector("#user-profile-view-last-name").textContent=n.last_name||"-",e.querySelector("#user-profile-view-employee").textContent=_a(n),Ja(e.querySelector("#user-profile-view-modal"))}function sb(e,t){const n=ae.rows.find(d=>d.id===t);if(!n){g("Профилът не е намерен.","warning");return}const r=e.querySelector("#user-profile-edit-employee-wrap"),s=e.querySelector("#user-profile-password-wrap"),a=e.querySelector("#user-profile-edit-new-password"),i=e.querySelector("#user-profile-edit-confirm-password");r&&r.classList.toggle("d-none",!ae.isAdmin);const o=n.id===ae.currentUserId;s&&s.classList.toggle("d-none",!o),a&&(a.value=""),i&&(i.value=""),e.querySelector("#user-profile-edit-id").value=n.id,e.querySelector("#user-profile-edit-username").value=n.username||"",e.querySelector("#user-profile-edit-email").value=n.email||"",e.querySelector("#user-profile-edit-first-name").value=n.first_name||"",e.querySelector("#user-profile-edit-last-name").value=n.last_name||"",e.querySelector("#user-profile-edit-employee-id").value=n.employee_id||"",Ja(e.querySelector("#user-profile-edit-modal"))}async function ab(e){var y,f,b,w,v,_,k,x;const t=(((y=e.querySelector("#user-profile-edit-id"))==null?void 0:y.value)||"").trim(),n=(((f=e.querySelector("#user-profile-edit-username"))==null?void 0:f.value)||"").trim(),r=(((b=e.querySelector("#user-profile-edit-email"))==null?void 0:b.value)||"").trim(),s=(((w=e.querySelector("#user-profile-edit-first-name"))==null?void 0:w.value)||"").trim(),a=(((v=e.querySelector("#user-profile-edit-last-name"))==null?void 0:v.value)||"").trim(),i=((_=e.querySelector("#user-profile-edit-new-password"))==null?void 0:_.value)||"",o=((k=e.querySelector("#user-profile-edit-confirm-password"))==null?void 0:k.value)||"",d=((x=e.querySelector("#user-profile-edit-employee-id"))==null?void 0:x.value)||null,l=e.querySelector("#user-profile-edit-save"),c=t===ae.currentUserId;if(!t||!n||!r||!s||!a){g("Попълни всички задължителни полета.","warning");return}if(!/^[A-Za-z0-9_]{3,30}$/.test(n)){g("Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.","warning");return}if((i||o)&&!c){g("Можеш да сменяш паролата само на собствения си профил.","warning");return}if(c&&(i||o)){if(i.length<6){g("Новата парола трябва да е поне 6 символа.","warning");return}const L=/[\u0400-\u04FF]/;if(L.test(i)||L.test(o)){g("Паролата не трябва да съдържа кирилица.","warning");return}if(i!==o){g("Новата парола и потвърждението не съвпадат.","warning");return}}const p=(l==null?void 0:l.innerHTML)||"";l&&(l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const m={username:n,email:r,first_name:s,last_name:a,updated_at:new Date().toISOString()};ae.isAdmin&&(m.employee_id=d||null);const{error:h}=await S.from("user_profiles").update(m).eq("id",t);if(l&&(l.disabled=!1,l.innerHTML=p),h){if(h.code==="23505"){g("Потребителско име или имейл вече съществува.","warning");return}g(h.message,"error");return}if(c&&i){const{error:L}=await S.auth.updateUser({password:i});if(L){g(L.message||"Профилът е обновен, но паролата не беше сменена.","warning"),await Sa(e),Tt(e.querySelector("#user-profile-edit-modal"));return}}Tt(e.querySelector("#user-profile-edit-modal")),await Sa(e),g(c&&i?"Профилът и паролата са обновени.":"Профилът е обновен.","success")}const Co={"/":{render:cp,title:"TrainCrewHub"},"/login":{render:mp,title:"TrainCrewHub / Sign In"},"/register":{render:bp,title:"TrainCrewHub / Register"},"/forgot-password":{render:xp,title:"TrainCrewHub / Forgot Password"},"/reset-password":{render:Ep,title:"TrainCrewHub / Reset Password"},"/pending-access":{render:Cp,title:"TrainCrewHub / Чака одобрение"},"/schedule-keys":{render:Pp,title:"TrainCrewHub / Ключ-График",resource:"schedule_keys"},"/duties":{render:Vp,title:"TrainCrewHub / Повески",resource:"duties"},"/duty-types":{render:pf,title:"TrainCrewHub / Типове повески",resource:"duty_types"},"/trains":{render:Vf,title:"TrainCrewHub / Влакове",resource:"trains"},"/employees":{render:bm,title:"TrainCrewHub / Служители",resource:"employees"},"/employee-absences":{render:Lm,title:"TrainCrewHub / Отсъствия",resource:"employee_absences"},"/planned-duties":{render:Qm,title:"TrainCrewHub / Планирани повески",resource:"planned_duties"},"/actual-duties":{render:ih,title:"TrainCrewHub / Реални повески",resource:"actual_duties"},"/plan-schedule":{render:Uh,title:"TrainCrewHub / План График",screenResource:"page_plan_schedule",resource:"planned_duties"},"/schedule":{render:of,title:"TrainCrewHub / График",screenResource:"page_schedule",resource:"actual_duties"},"/schedule-key-duties":{render:qf,title:"TrainCrewHub / Повески към Ключ-График",resource:"duties"},"/documents":{render:Iy,title:"TrainCrewHub / Документи",resource:"documents"},"/user-profiles":{render:Yy,title:"TrainCrewHub / Потребителски профили"},"/admin":{render:uy,title:"TrainCrewHub / Админ Панел",requiresAdmin:!0}},ib="page-content";function Ro(e){return Co[e]??Co["/"]}async function ob(e,t){var a,i,o,d;const n=new Set(["/login","/register","/forgot-password","/reset-password"]);let r=null;if(!n.has(e)){const l=await Ti();if(!l.allowed)return l.reason==="inactive-profile"&&g("Профилът е деактивиран. Свържи се с администратор.","warning"),"/login";if(r=await wn(),!((a=r==null?void 0:r.user)!=null&&a.id))return"/login";if(!await ea(r.user.id))return e==="/pending-access"?e:(g("Акаунтът ти чака одобрение от администратор.","warning"),"/pending-access")}if(e==="/pending-access"){if(!((i=r==null?void 0:r.user)!=null&&i.id)){const c=await Ti();if(!c.allowed)return c.reason==="inactive-profile"&&g("Профилът е деактивиран. Свържи се с администратор.","warning"),"/login";r=await wn()}return(o=r==null?void 0:r.user)!=null&&o.id?await ea(r.user.id)?"/":e:"/login"}if(!(t!=null&&t.requiresAdmin)){const l=(t==null?void 0:t.screenResource)||(t==null?void 0:t.resource)||"";return!l||await Yo(l)?e:(g("Нямаш права за достъп до този екран.","warning"),"/")}return r=r||await wn(),(d=r==null?void 0:r.user)!=null&&d.id?await La(r.user.id)?e:(g("Нямаш права за достъп до админ панела.","warning"),"/"):"/login"}async function xa(){const e=document.getElementById(ib);Au();const t=window.location.pathname,n=Ro(t),r=await ob(t,n);r!==t&&window.history.replaceState({},"",r);const s=Ro(r);document.title=s.title,await s.render(e),s.resource&&await $u(e,s.resource),window.dispatchEvent(new CustomEvent("route:changed",{detail:{pathname:r}}))}function lb(e){const t=e.target.closest("a[data-link]");if(!t)return;e.preventDefault();const n=t.getAttribute("href");n!==window.location.pathname&&(window.history.pushState({},"",n),xa())}function db(){Xo(),window.addEventListener("popstate",xa),document.addEventListener("click",lb),xa()}function Hl(){return document.getElementById("app")}function cb(e){const t=Hl();t&&(t.innerHTML=`
		<div class="container py-5">
			<div class="alert alert-danger" role="alert">
				<h4 class="alert-heading">Грешка при зареждане</h4>
				<p class="mb-2">${e}</p>
				<hr />
				<p class="mb-0">Ако това е Netlify deploy: провери Environment variables за <code>VITE_SUPABASE_URL</code> и <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> и пусни нов deploy.</p>
			</div>
		</div>
	`)}async function ub(){const e=Hl();if(!e)throw new Error("App root element (#app) not found.");await Pu(e),db()}function Io(){ub().catch(e=>{const t=e instanceof Error?e.message:String(e);console.error("App bootstrap failed:",e),cb(t)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Io,{once:!0}):Io();
