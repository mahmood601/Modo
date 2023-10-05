"use strict";(()=>{var Ot=Object.create;var ht=Object.defineProperty;var Pt=Object.getOwnPropertyDescriptor;var Mt=Object.getOwnPropertyNames;var Dt=Object.getPrototypeOf,Nt=Object.prototype.hasOwnProperty;var Bt=(e,i)=>()=>(i||e((i={exports:{}}).exports,i),i.exports);var Ht=(e,i,o,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let f of Mt(i))!Nt.call(e,f)&&f!==o&&ht(e,f,{get:()=>i[f],enumerable:!(s=Pt(i,f))||s.enumerable});return e};var jt=(e,i,o)=>(o=e!=null?Ot(Dt(e)):{},Ht(i||!e||!e.__esModule?ht(o,"default",{value:e,enumerable:!0}):o,e));var It=Bt((J,wt)=>{(function(e,i){typeof J=="object"&&typeof wt<"u"?i(J):typeof define=="function"&&define.amd?define(["exports"],i):i(e.MobileDragDrop=e.MobileDragDrop||{})})(J,function(e){"use strict";var i="dnd-poly-",o=["none","copy","copyLink","copyMove","link","linkMove","move","all"],s=["none","copy","move","link"];function f(){var t=!1;try{var n=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,n)}catch{}return t}var E=f();function g(t){return t&&t.tagName}function d(t,n,r){r===void 0&&(r=!0),document.addEventListener(t,n,!!E&&{passive:r})}function u(t,n){document.removeEventListener(t,n)}function v(t,n,r,a){a===void 0&&(a=!1);var l=E?{passive:!0,capture:a}:a;return t.addEventListener(n,r,l),{off:function(){t.removeEventListener(n,r,l)}}}function w(t){return t.length===0?0:t.reduce(function(n,r){return r+n},0)/t.length}function D(t,n){for(var r=0;r<t.changedTouches.length;r++)if(t.changedTouches[r].identifier===n)return!0;return!1}function S(t,n,r){for(var a=[],l=[],c=0;c<n.touches.length;c++){var h=n.touches[c];a.push(h[t+"X"]),l.push(h[t+"Y"])}r.x=w(a),r.y=w(l)}var F=["","-webkit-"];function $(t,h,r,a,l){var c=h.x,h=h.y;a&&(c+=a.x,h+=a.y),(l=l===void 0||l)&&(c-=parseInt(t.offsetWidth,10)/2,h-=parseInt(t.offsetHeight,10)/2);for(var m="translate3d("+c+"px,"+h+"px, 0)",p=0;p<F.length;p++){var k=F[p]+"transform";t.style[k]=m+" "+r[p]}}var Tt=(Object.defineProperty(P.prototype,"dropEffect",{get:function(){return this.t},set:function(t){this.i.mode!==0&&-1<o.indexOf(t)&&(this.t=t)},enumerable:!1,configurable:!0}),Object.defineProperty(P.prototype,"types",{get:function(){if(this.i.mode!==0)return Object.freeze(this.i.types)},enumerable:!1,configurable:!0}),Object.defineProperty(P.prototype,"effectAllowed",{get:function(){return this.i.effectAllowed},set:function(t){this.i.mode===2&&-1<o.indexOf(t)&&(this.i.effectAllowed=t)},enumerable:!1,configurable:!0}),P.prototype.setData=function(t,n){if(this.i.mode===2){if(-1<t.indexOf(" "))throw new Error("illegal arg: type contains space");this.i.data[t]=n,this.i.types.indexOf(t)===-1&&this.i.types.push(t)}},P.prototype.getData=function(t){if(this.i.mode===1||this.i.mode===2)return this.i.data[t]||""},P.prototype.clearData=function(t){this.i.mode===2&&(t&&this.i.data[t]?(delete this.i.data[t],-1<(t=this.i.types.indexOf(t))&&this.i.types.splice(t,1)):(this.i.data={},this.i.types=[]))},P.prototype.setDragImage=function(t,n,r){this.i.mode===2&&this.h(t,n,r)},P);function P(t,n){this.i=t,this.h=n,this.t=s[0]}function at(t,n){return t?t===o[0]?s[0]:t.indexOf(o[1])===0||t===o[7]?s[1]:t.indexOf(o[4])===0?s[3]:t===o[6]?s[2]:s[1]:n.nodeType===3&&n.tagName==="A"?s[3]:s[1]}function T(t,n,r,a,l,c,h){return h===void 0&&(h=null),l=function(m,p,k,b,x,C,ft){h===void 0&&(ft=null);var B=r.changedTouches[0],b=new Event(t,{bubbles:!0,cancelable:b});return b.dataTransfer=C,b.relatedTarget=ft,b.screenX=B.screenX,b.screenY=B.screenY,b.clientX=B.clientX,b.clientY=B.clientY,b.pageX=B.pageX,b.pageY=B.pageY,m=m.getBoundingClientRect(),b.offsetX=b.clientX-m.left,b.offsetY=b.clientY-m.top,b}(n,0,0,c=c===void 0||c,document.defaultView,l,h),l=!n.dispatchEvent(l),a.mode=0,l}function lt(t,n){if(!t||t===o[7])return n;if(n===s[1]){if(t.indexOf(s[1])===0)return s[1]}else if(n===s[3]){if(t.indexOf(s[3])===0||-1<t.indexOf("Link"))return s[3]}else if(n===s[2]&&(t.indexOf(s[2])===0||-1<t.indexOf("Move")))return s[2];return s[0]}var Ct=(M.prototype.o=function(){var t=this;this.u=1,this.l=s[0],this.v={data:{},effectAllowed:void 0,mode:3,types:[]},this.p={x:null,y:null},this.g={x:null,y:null};var n=this.m;if(this.I=new Tt(this.v,function(c,h,m){n=c,typeof h!="number"&&typeof m!="number"||(t.j={x:h||0,y:m||0})}),this.v.mode=2,this.I.dropEffect=s[0],T("dragstart",this.m,this.k,this.v,this.I))return this.u=3,this.C(),!1;S("page",this.k,this.g);var r,a,l=this.S.dragImageSetup(n);return this.A=(r=l,F.map(function(c){return c=r.style[c+"transform"],c&&c!=="none"?c.replace(/translate\(\D*\d+[^,]*,\D*\d+[^,]*\)\s*/g,""):""})),l.style.position="absolute",l.style.left="0px",l.style.top="0px",l.style.zIndex="999999",l.classList.add("dnd-poly-drag-image"),l.classList.add("dnd-poly-icon"),this.O=l,this.j||(this.S.dragImageOffset?this.j={x:this.S.dragImageOffset.x,y:this.S.dragImageOffset.y}:this.S.dragImageCenterOnTouch?(a=getComputedStyle(n),this.j={x:0-parseInt(a.marginLeft,10),y:0-parseInt(a.marginTop,10)}):(l=n.getBoundingClientRect(),a=getComputedStyle(n),this.j={x:l.left-this.M.clientX-parseInt(a.marginLeft,10)+l.width/2,y:l.top-this.M.clientY-parseInt(a.marginTop,10)+l.height/2})),$(this.O,this.g,this.A,this.j,this.S.dragImageCenterOnTouch),document.body.appendChild(this.O),this.D=window.setInterval(function(){t.F||(t.F=!0,t.N(),t.F=!1)},this.S.iterationInterval),!0},M.prototype.C=function(){this.D&&(clearInterval(this.D),this.D=null),u("touchmove",this.P),u("touchend",this.T),u("touchcancel",this.T),this.O&&(this.O.parentNode.removeChild(this.O),this.O=null),this.L(this.S,this.k,this.u)},M.prototype._=function(t){var n=this;if(D(t,this.M.identifier)!==!1){if(this.k=t,this.u===0){var r=void 0;if(this.S.dragStartConditionOverride)try{r=this.S.dragStartConditionOverride(t)}catch{r=!1}else r=t.touches.length===1;return r?void(this.o()===!0&&(this.H.preventDefault(),t.preventDefault())):void this.C()}if(t.preventDefault(),S("client",t,this.p),S("page",t,this.g),this.S.dragImageTranslateOverride)try{var a=!1;if(this.S.dragImageTranslateOverride(t,{x:this.p.x,y:this.p.y},this.V,function(l,c){n.O&&(a=!0,n.p.x+=l,n.p.y+=c,n.g.x+=l,n.g.y+=c,$(n.O,n.g,n.A,n.j,n.S.dragImageCenterOnTouch))}),a)return}catch{}$(this.O,this.g,this.A,this.j,this.S.dragImageCenterOnTouch)}},M.prototype.X=function(t){if(D(t,this.M.identifier)!==!1){if(this.S.dragImageTranslateOverride)try{this.S.dragImageTranslateOverride(void 0,void 0,void 0,function(){})}catch{}this.u!==0?(t.preventDefault(),this.u=t.type==="touchcancel"?3:2):this.C()}},M.prototype.N=function(){var t=this,n=this.l;this.v.mode=3,this.I.dropEffect=s[0];var r,a,l,c,h,m=T("drag",this.m,this.k,this.v,this.I);if(m&&(this.l=s[0]),m||this.u===2||this.u===3)return this.Y(this.u)?(c=this.m,r=this.O,a=this.A,k=function(){t.q()},void((h=getComputedStyle(c)).visibility!=="hidden"&&h.display!=="none"?(r.classList.add("dnd-poly-snapback"),l=getComputedStyle(r),m=parseFloat(l.transitionDuration),isNaN(m)||m===0?k():((c={x:(p=c.getBoundingClientRect()).left,y:p.top}).x+=document.body.scrollLeft||document.documentElement.scrollLeft,c.y+=document.body.scrollTop||document.documentElement.scrollTop,c.x-=parseInt(h.marginLeft,10),c.y-=parseInt(h.marginTop,10),p=parseFloat(l.transitionDelay),p=Math.round(1e3*(m+p)),$(r,c,a,void 0,!1),setTimeout(k,p))):k())):void this.q();var p=this.S.elementFromPoint(this.p.x,this.p.y),k=this.B;p!==this.V&&p!==this.B&&(this.V=p,this.B!==null&&(this.v.mode=3,this.I.dropEffect=s[0],T("dragexit",this.B,this.k,this.v,this.I,!1)),this.V===null?this.B=this.V:(this.v.mode=3,this.I.dropEffect=at(this.v.effectAllowed,this.m),T("dragenter",this.V,this.k,this.v,this.I)?(this.B=this.V,this.l=lt(this.I.effectAllowed,this.I.dropEffect)):this.V!==document.body&&(this.B=document.body))),k!==this.B&&g(k)&&(this.v.mode=3,this.I.dropEffect=s[0],T("dragleave",k,this.k,this.v,this.I,!1,this.B)),g(this.B)&&(this.v.mode=3,this.I.dropEffect=at(this.v.effectAllowed,this.m),T("dragover",this.B,this.k,this.v,this.I)===!1?this.l=s[0]:this.l=lt(this.I.effectAllowed,this.I.dropEffect)),n!==this.l&&this.O.classList.remove(i+n),n=i+this.l,this.O.classList.add(n)},M.prototype.Y=function(t){return t=this.l===s[0]||this.B===null||t===3,t?g(this.B)&&(this.v.mode=3,this.I.dropEffect=s[0],T("dragleave",this.B,this.k,this.v,this.I,!1)):g(this.B)&&(this.v.mode=1,this.I.dropEffect=this.l,T("drop",this.B,this.k,this.v,this.I)===!0?this.l=this.I.dropEffect:this.l=s[0]),t},M.prototype.q=function(){this.v.mode=3,this.I.dropEffect=this.l,T("dragend",this.m,this.k,this.v,this.I,!1),this.u=2,this.C()},M);function M(t,n,r,a){this.H=t,this.S=n,this.m=r,this.L=a,this.u=0,this.V=null,this.B=null,this.k=t,this.M=t.changedTouches[0],this.P=this._.bind(this),this.T=this.X.bind(this),d("touchmove",this.P,!1),d("touchend",this.T,!1),d("touchcancel",this.T,!1)}var tt,N={iterationInterval:150,tryFindDraggableTarget:function(t){for(var n=0,r=t.composedPath();n<r.length;n++){var a=r[n];do if(a.draggable!==!1&&(a.draggable===!0||a.getAttribute&&a.getAttribute("draggable")==="true"))return a;while((a=a.parentNode)&&a!==document.body)}},dragImageSetup:function(t){var n=t.cloneNode(!0);return function r(a,l){if(a.nodeType===1){for(var c,h,m=getComputedStyle(a),p=0;p<m.length;p++){var k=m[p];l.style.setProperty(k,m.getPropertyValue(k),m.getPropertyPriority(k))}l.style.pointerEvents="none",l.removeAttribute("id"),l.removeAttribute("class"),l.removeAttribute("draggable"),l.nodeName==="CANVAS"&&(c=l,h=(h=a).getContext("2d").getImageData(0,0,h.width,h.height),c.getContext("2d").putImageData(h,0,0))}if(a.hasChildNodes())for(p=0;p<a.childNodes.length;p++)r(a.childNodes[p],l.childNodes[p]);(function ut(x){if(x instanceof HTMLElement&&(x.style.pointerEvents="none"),x.children&&x.children.length)for(var C=0;C<x.children.length;C++)ut(x.children[C]);if(x.shadowRoot&&x.shadowRoot.children.length)for(C=0;C<x.shadowRoot.children.length;C++)ut(x.shadowRoot.children[C])})(l)}(t,n),n},elementFromPoint:function(t,n){var r=document.elementFromPoint(t,n);if(r){for(;r.shadowRoot;){var a=r.shadowRoot.elementFromPoint(t,n);if(a===null||a===r)break;r=a}return r}}};function dt(t){if(!tt){var n=N.tryFindDraggableTarget(t);if(n)try{tt=new Ct(t,N,n,ct)}catch(r){throw ct(N,t,3),r}}}function At(t){function n(p){l.off(),c.off(),h.off(),m.off(),r&&r.dispatchEvent(new CustomEvent("dnd-poly-dragstart-cancel",{bubbles:!0,cancelable:!0})),clearTimeout(a)}var r=t.target;r&&r.dispatchEvent(new CustomEvent("dnd-poly-dragstart-pending",{bubbles:!0,cancelable:!0}));var a=window.setTimeout(function(){l.off(),c.off(),h.off(),m.off(),dt(t)},N.holdToDrag),l=v(r,"touchend",n),c=v(r,"touchcancel",n),h=v(r,"touchmove",n),m=v(window,"scroll",n,!0)}function ct(t,n,r){if(r===0&&t.defaultActionOverride)try{t.defaultActionOverride(n),n.defaultPrevented}catch{}tt=null}e.polyfill=function(t){if(t&&Object.keys(t).forEach(function(r){N[r]=t[r]}),!N.forceApply&&(n=(n=!!window.chrome||/chrome/i.test(navigator.userAgent),{dragEvents:"ondragstart"in document.documentElement,draggable:"draggable"in document.documentElement,userAgentSupportingNativeDnD:!(/iPad|iPhone|iPod|Android/.test(navigator.userAgent)||n&&"ontouchstart"in document.documentElement)}),n.userAgentSupportingNativeDnD&&n.draggable&&n.dragEvents))return!1;var n;return N.holdToDrag?d("touchstart",At,!1):d("touchstart",dt,!1),!0},e.supportsPassiveEventListener=f,Object.defineProperty(e,"G",{value:!0})})});var A=document.getElementById("button"),O=document.getElementById("mode"),H=document.getElementById("setting"),V=document.querySelectorAll(".colors-list li"),R=document.getElementById("extra-color"),et=document.getElementById("u-image"),X=document.querySelectorAll(".footer li"),pt=document.getElementById("task-icon"),K=document.getElementById("task-content"),G=document.querySelector(".checkbox input:first-child"),W=G.parentNode;var z=(e,i)=>{e?.addEventListener("click",o=>{i?.classList.toggle("hide"),e?.classList.toggle("clicked"),o.stopPropagation()})},_=e=>{document.addEventListener("click",i=>{e?.contains(i.target)||(e?.classList.add("hide"),e?.previousElementSibling?.classList.remove("clicked"),i.stopPropagation())})};A.addEventListener("click",()=>{H?.nextElementSibling?.classList.contains("hide")||H?.nextElementSibling?.classList.add("hide")});z(A,A?.nextElementSibling);_(A?.nextElementSibling);z(H,H?.nextElementSibling);_(H?.nextElementSibling);function U(e){return new Promise((i,o)=>{e.oncomplete=e.onsuccess=()=>i(e.result),e.onabort=e.onerror=()=>o(e.error)})}function it(e,i){let o=indexedDB.open(e);o.onupgradeneeded=()=>o.result.createObjectStore(i);let s=U(o);return(f,E)=>s.then(g=>E(g.transaction(i,f).objectStore(i)))}var nt;function ot(){return nt||(nt=it("keyval-store","keyval")),nt}function mt(e,i=ot()){return i("readonly",o=>U(o.get(e)))}function gt(e,i,o=ot()){return o("readwrite",s=>(s.put(i,e),U(s.transaction)))}function vt(e,i,o=ot()){return o("readwrite",s=>new Promise((f,E)=>{s.get(e).onsuccess=function(){try{s.put(i(this.result),e),f(U(s.transaction))}catch(g){E(g)}}}))}var rt=it("Modo","person"),L=(e,i)=>gt(e,i,rt),y=e=>mt(e,rt),yt=(e,i)=>vt(e,i,rt);var Y=(e,i)=>{if(i){let o=e.filter(g=>g.status?g:""),s=Number.parseInt(`${o.length!==0?o.length*100/e.length:0}`),f=document.getElementById("progress"),E=Number.parseInt(f.dataset.progress);if(s>E){let g=setInterval(()=>{s<=E&&clearInterval(g),Et(f,E),E++},20)}if(s<E){let g=setInterval(()=>{E<=s&&clearInterval(g),Et(f,E),E--},20)}}},Et=(e,i)=>{e.style.background=`conic-gradient(var(--fav-color) ${i/100}turn, var(--mode-color) 0deg)`,e.dataset.progress=i};var j=e=>(e.parentNode.classList.add("hide"),e.parentNode.parentNode.previousElementSibling),bt=e=>{let i=j(e);i.setAttribute("contenteditable","true"),i.addEventListener("mouseleave",async()=>{i.removeAttribute("contenteditable");let o=await y("tasks");o[i.parentNode.dataset.id].content=i.textContent,yt("tasks",()=>o),I(o,!0)})};var Lt=async e=>{let i=await y("tasks"),o=i[j(e).parentNode.dataset.id].status;i.splice(j(e).parentNode.dataset.id,1),i.forEach((s,f)=>{s.id=f}),await L("tasks",i),I(i,!1),Y(i,o)},st=(e,i)=>{y("tasks").then(async o=>{o[e.dataset.id].status=i,Y(o,i),I(o,!0),await L("tasks",o)})};var kt=async e=>{let i=await y("tasks"),o=j(e).parentNode;(e.children[1].textContent=="Not Completed"||e.children[1].textContent=="\u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629")&&st(o,!1),(e.children[1].textContent=="Completed"||e.children[1].textContent=="\u0645\u0643\u062A\u0645\u0644\u0629")&&(st(o,!0),o.firstChild.style.bacgroundColor=i.icon+"")};var St=jt(It());(0,St.polyfill)();var Q,q;async function qt(e,i){let o=await y("tasks");o.splice(Number.parseInt(i),0,o.splice(Number.parseInt(e),1)[0]),I(o,!1),console.log(o),await L("tasks",o)}async function xt(e){e.forEach(i=>{i.addEventListener("dragstart",o=>{Q=o.currentTarget,o.currentTarget?.classList.add("dragging"),o.dataTransfer?.setData("text/plain",o.currentTarget?.innerHTML)}),i.addEventListener("dragend",o=>{o.currentTarget?.classList.remove("draging"),q&&q.classList.remove("over"),Q=null,q=null}),i.addEventListener("dragenter",o=>{o.currentTarget.classList.add("over")}),i.addEventListener("dragleave",o=>{o.currentTarget.classList.remove("over")}),i.addEventListener("dragover",o=>{o.preventDefault(),q=o.currentTarget}),i.addEventListener("drop",o=>{o.preventDefault(),console.log(`src element: ${Q.dataset.id}`),console.log(`over element: ${q.dataset.id}`),qt(Q.dataset.id,q.dataset.id)})})}var Z=document.body.classList.contains("rtl"),I=async(e,i)=>{W.style.border="2px solid var(--choosen-color)",document.querySelectorAll(".tasks-list li")?.forEach(f=>{f.remove()});let o=0;e.forEach((f,E)=>{let g=document.createElement("span");g.classList.add("icon"),g.style.border=`2px solid ${f.icon}`,g.style.color=`${f.icon}`;let d=document.createElement("p");d.classList.add("task-content"),d.textContent=f.content;let u=document.createElement("div");u.classList.add("options");let v="";f.status||(Z?v="\u0645\u0643\u062A\u0645\u0644\u0629":v="Completed"),f.status&&(Z?v="\u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629":v="Not Completed"),u.innerHTML=`      
            <span class="span-opts">\u2022\u2022\u2022</span>
            <ul class="options-list hide">
              <li class="edit" onclick="window.edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>${Z?"\u062A\u0639\u062F\u064A\u0644":"Edit"}</p>
              </li>
              <li class="completed" onclick="window.makeCompleted(this)">
                <i class="fa-solid fa-check fa-sm"></i>
               <p>${v}</p>
              </li>
              <li class="delete" onclick = "window.deleteThis(this)" >
                <i class="fa-solid fa-trash fa-sm" > </i>
                <p> ${Z?"\u062D\u0630\u0641":"Delete"} </p>
              </li>
            </ul>`;let w=document.createElement("li");w.setAttribute("data-id",`${o++}`),w.setAttribute("draggable","true"),w.setAttribute("data-status",f.status?"completed":"not-completed"),y("tasks").then(S=>{S?.length>=5&&(S?.length-1==E||S?.length-2==E)&&w.classList.add("last-li")}),w.append(g),w.append(d),w.append(u),document.querySelector(".tasks-list")?.append(w);let D=document.querySelectorAll(".span-opts");D.forEach(S=>{S.addEventListener("click",()=>{D.forEach(F=>F.nextElementSibling?.classList.add("hide"))}),z(S,S.nextElementSibling),_(S.nextElementSibling)})}),Y(e,i);let s=document.querySelectorAll(".tasks-list > li");xt(s)};window.edit=bt;window.deleteThis=Lt;window.makeCompleted=kt;document.querySelector(".fa-bell")?.addEventListener("click",e=>{e.preventDefault(),Notification.requestPermission(i=>{console.log("Notification permission status:",i)})});function Ft(e){Notification.permission==="granted"&&navigator.serviceWorker.getRegistrations().then(i=>{i[0].showNotification("Modo",e),i[0].pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:""}).then(()=>{})})}var Vt={body:"\u0645\u0631\u062D\u0628\u0627 \u0627\u0646\u0627 \u0645\u062D\u0645\u0648\u062F",icon:"../../images/icon-72\xD772.ico",badge:"../../images/icon-72\xD772.webp"};Ft(Vt);document.addEventListener("DOMContentLoaded",async()=>{let e=await y("image");e==null&&await L("image",""),e!==""?A?.setAttribute("src",e):A?.removeAttribute("src"),et.addEventListener("change",d=>{let u=new FileReader;u.readAsDataURL(et.files?.item(0)),u.addEventListener("load",async()=>{await L("image",u.result),A?.setAttribute("src",`${u.result}`)}),d.stopPropagation()}),await y("mode")==null&&await L("mode",""),O?.addEventListener("click",()=>{let d=O?.classList.contains("dark")?"light":"dark";L("mode",d)}),await y("tasks")==null&&await L("tasks",[]),y("tasks").then(d=>{d&&d!=null&&I(d,!0)}),G?.addEventListener("input",d=>{W.style.border=`2px solid ${G.value}`,d.stopPropagation()}),document.querySelector(".input-box")?.addEventListener("submit",async d=>{if(K.value!==""){d.preventDefault();let u=await y("tasks"),v=[...u,{icon:pt.value,id:u.length,content:K.value,status:!1}];L("tasks",v),I(v,!0)}K.value=""}),y("fav-color").then(d=>{V.forEach(u=>{u.classList.remove("active"),d==u.dataset.color&&u.classList.add("active")})});let s=await y("fav-color");s==null?await L("fav-color",""):document.querySelector("html")?.style.setProperty("--fav-color",s),R?.addEventListener("input",()=>{V[4].dataset.color=R.value,L("fav-color",R.value),document.querySelector("html")?.style.setProperty("--fav-color",R.value)}),V.forEach(d=>{d.addEventListener("click",()=>{L("fav-color",d.dataset.color),document.querySelector("html")?.style.setProperty("--fav-color",d.dataset.color)})});let f=new Map,E=new Map;f.set("--mode-color","#222").set("--alt-mode-color","#fff").set("--hover-color","#363636").set("--sec-mode-color","#333"),E.set("--mode-color","#fff").set("--alt-mode-color","#000").set("--hover-color","#f6f6f6").set("--sec-mode-color","#eee"),O?.addEventListener("click",d=>{if(d.stopPropagation(),O?.classList.toggle("dark"),O?.classList.contains("dark")==!0)for(let[u,v]of f)document.querySelector("html")?.style.setProperty(u,v);if(O?.classList.contains("dark")==!1)for(let[u,v]of E)document.querySelector("html")?.style.setProperty(u,v)});function g(d,...u){d.forEach(v=>{v.addEventListener("click",w=>{d.forEach(D=>D.classList.remove(u.join(" "))),w.target.classList.add("active")})})}g(V,"active"),g(X,"active"),X[0].addEventListener("click",async()=>{let d=await y("tasks");I(d,!1)}),X[1].addEventListener("click",async()=>{let d=await y("tasks");I(d.filter(u=>u.status?"":u),!1)}),X[2].addEventListener("click",async()=>{let d=await y("tasks");I(d.filter(u=>u.status?u:""),!1)}),y("mode").then(d=>{if(d=="dark"){O?.classList.add("dark");for(let[u,v]of f)document.querySelector("html")?.style.setProperty(u,v)}if(d!="dark"){O?.classList.remove("dark");for(let[u,v]of E)document.querySelector("html")?.style.setProperty(u,v)}})});})();
/*! Bundled license information:

mobile-drag-drop/index.min.js:
  (*! mobile-drag-drop 3.0.0-rc.0 | Copyright (c) 2022 Tim Ruffles | MIT License *)
*/
