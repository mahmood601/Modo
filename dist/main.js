"use strict";(()=>{var f=document.getElementById("button"),g=document.getElementById("mode"),y=document.getElementById("setting"),h=document.querySelectorAll(".colors-list li"),k=document.getElementById("extra-color"),P=document.getElementById("u-image"),E=document.querySelectorAll(".footer li"),$=document.getElementById("task-icon"),S=document.getElementById("task-content"),w=document.querySelector(".checkbox input:first-child"),x=w.parentNode;var C=(e,t)=>{e?.addEventListener("click",n=>{t?.classList.toggle("hide"),e?.classList.toggle("clicked"),n.stopPropagation()})},T=e=>{document.addEventListener("click",t=>{e?.contains(t.target)||(e?.classList.add("hide"),e?.previousElementSibling?.classList.remove("clicked"),t.stopPropagation())})};f.addEventListener("click",()=>{y?.nextElementSibling?.classList.contains("hide")||y?.nextElementSibling?.classList.add("hide")});C(f,f?.nextElementSibling);T(f?.nextElementSibling);C(y,y?.nextElementSibling);T(y?.nextElementSibling);function M(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function N(e,t){let n=indexedDB.open(e);n.onupgradeneeded=()=>n.result.createObjectStore(t);let l=M(n);return(c,i)=>l.then(d=>i(d.transaction(t,c).objectStore(t)))}var A;function B(){return A||(A=N("keyval-store","keyval")),A}function D(e,t=B()){return t("readonly",n=>M(n.get(e)))}function K(e,t,n=B()){return n("readwrite",l=>(l.put(t,e),M(l.transaction)))}function O(e,t,n=B()){return n("readwrite",l=>new Promise((c,i)=>{l.get(e).onsuccess=function(){try{l.put(t(this.result),e),c(M(l.transaction))}catch(d){i(d)}}}))}var H=N("Modo","person");var u=(e,t)=>K(e,t,H),r=e=>D(e,H),R=(e,t)=>O(e,t,H);var L=(e,t)=>{if(t){let n=e.filter(d=>d.status?d:""),l=Number.parseInt(`${n.length!==0?n.length*100/e.length:0}`),c=document.getElementById("progress"),i=Number.parseInt(c.dataset.progress);if(l>i){let d=setInterval(()=>{l<=i&&clearInterval(d),j(c,i),i++},20)}if(l<i){let d=setInterval(()=>{i<=l&&clearInterval(d),j(c,i),i--},20)}}},j=(e,t)=>{e.style.background=`conic-gradient(var(--fav-color) ${t/100}turn, var(--mode-color) 0deg)`,e.dataset.progress=t};var v=e=>(e.parentNode.classList.add("hide"),e.parentNode.parentNode.previousElementSibling),V=e=>{let t=v(e);t.setAttribute("contenteditable","true"),t.addEventListener("mouseleave",async()=>{t.removeAttribute("contenteditable");let n=await r("tasks");n[t.parentNode.dataset.id].content=t.textContent,R("tasks",()=>n),m(n,!0)})};var F=async e=>{let t=await r("tasks"),n=t[v(e).parentNode.dataset.id].status;t.splice(v(e).parentNode.dataset.id,1),t.forEach((l,c)=>{l.id=c}),await u("tasks",t),m(t,!1),L(t,n)},q=(e,t)=>{r("tasks").then(async n=>{n[e.dataset.id].status=t,L(n,t),m(n,!0),await u("tasks",n)})};var G=async e=>{let t=await r("tasks"),n=v(e).parentNode;(e.children[1].textContent=="Not Completed"||e.children[1].textContent=="\u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629")&&q(n,!1),(e.children[1].textContent=="Completed"||e.children[1].textContent=="\u0645\u0643\u062A\u0645\u0644\u0629")&&(q(n,!0),n.firstChild.style.bacgroundColor=t.icon+"")};var I=document.body.classList.contains("rtl"),m=async(e,t)=>{x.style.border="2px solid var(--choosen-color)",document.querySelectorAll(".tasks-list li")?.forEach(n=>{n.remove()}),e.forEach((n,l)=>{let c=document.createElement("span");c.classList.add("icon"),c.style.border=`2px solid ${n.icon}`,c.style.color=`${n.icon}`;let i=document.createElement("p");i.classList.add("task-content"),i.textContent=n.content;let d=document.createElement("div");d.classList.add("options");let o="";n.status||(I?o="\u0645\u0643\u062A\u0645\u0644\u0629":o="Completed"),n.status&&(I?o="\u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629":o="Not Completed"),d.innerHTML=`      
            <span class="span-opts">\u2022\u2022\u2022</span>
            <ul class="options-list hide">
              <li class="edit" onclick="window.edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>${I?"\u062A\u0639\u062F\u064A\u0644":"Edit"}</p>
              </li>
              <li class="completed" onclick="window.makeCompleted(this)">
                <i class="fa-solid fa-check fa-sm"></i>
               <p>${o}</p>
              </li>
              <li class="delete" onclick = "window.deleteThis(this)" >
                <i class="fa-solid fa-trash fa-sm" > </i>
                <p> ${I?"\u062D\u0630\u0641":"Delete"} </p>
              </li>
            </ul>`;let s=document.createElement("span");s.classList.add("move-task"),s.textContent=":::";let a=document.createElement("li");a.setAttribute("data-id",`${n.id}`),a.setAttribute("data-status",n.status?"completed":"not-completed"),r("tasks").then(p=>{p?.length>=5&&(p?.length-1==l||p?.length-2==l)&&a.classList.add("last-li")}),a.append(c),a.append(i),a.append(d),a.append(s),document.querySelector(".tasks-list")?.append(a);let b=document.querySelectorAll(".span-opts");b.forEach(p=>{p.addEventListener("click",()=>{b.forEach(W=>W.nextElementSibling?.classList.add("hide"))}),C(p,p.nextElementSibling),T(p.nextElementSibling)})}),L(e,t)};window.edit=V;window.deleteThis=F;window.makeCompleted=G;document.querySelector(".fa-bell")?.addEventListener("click",e=>{e.preventDefault(),Notification.requestPermission(t=>{console.log("Notification permission status:",t)})});function U(e){Notification.permission==="granted"&&navigator.serviceWorker.getRegistrations().then(t=>{t[0].showNotification("Modo",e),t[0].pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:""}).then(()=>{})})}var z={body:"\u0645\u0631\u062D\u0628\u0627 \u0627\u0646\u0627 \u0645\u062D\u0645\u0648\u062F",icon:"../../images/icon-72\xD772.ico",badge:"../../images/icon-72\xD772.webp"};U(z);document.addEventListener("DOMContentLoaded",async()=>{let e=await r("image");e==null&&await u("image",""),e!==""?f?.setAttribute("src",e):f?.removeAttribute("src"),P.addEventListener("change",o=>{let s=new FileReader;s.readAsDataURL(P.files?.item(0)),s.addEventListener("load",async()=>{await u("image",s.result),f?.setAttribute("src",`${s.result}`)}),o.stopPropagation()}),await r("mode")==null&&await u("mode",""),g?.addEventListener("click",()=>{let o=g?.classList.contains("dark")?"light":"dark";u("mode",o)});let n=await r("fav-color");n==null?await u("fav-color",""):document.querySelector("html")?.style.setProperty("--fav-color",n),k?.addEventListener("input",()=>{h[4].dataset.color=k.value,u("fav-color",k.value),document.querySelector("html")?.style.setProperty("--fav-color",k.value)}),h.forEach(o=>{o.addEventListener("click",()=>{u("fav-color",o.dataset.color),document.querySelector("html")?.style.setProperty("--fav-color",o.dataset.color)})}),await r("tasks")==null&&await u("tasks",[]),w?.addEventListener("input",o=>{x.style.border=`2px solid ${w.value}`,o.stopPropagation()}),document.querySelector(".input-box")?.addEventListener("submit",async o=>{if(S.value!==""){o.preventDefault();let s=await r("tasks"),a=[...s,{icon:$.value,id:s.length,content:S.value,status:!1}];u("tasks",a),m(a,!0)}S.value=""});let c=new Map,i=new Map;c.set("--mode-color","#222").set("--alt-mode-color","#fff").set("--hover-color","#363636").set("--sec-mode-color","#333"),i.set("--mode-color","#fff").set("--alt-mode-color","#000").set("--hover-color","#f6f6f6").set("--sec-mode-color","#eee"),g?.addEventListener("click",o=>{if(o.stopPropagation(),g?.classList.toggle("dark"),g?.classList.contains("dark")==!0)for(let[s,a]of c)document.querySelector("html")?.style.setProperty(s,a);if(g?.classList.contains("dark")==!1)for(let[s,a]of i)document.querySelector("html")?.style.setProperty(s,a)});function d(o,...s){o.forEach(a=>{a.addEventListener("click",b=>{o.forEach(p=>p.classList.remove(s.join(" "))),b.target.classList.add("active")})})}d(h,"active"),d(E,"active"),E[0].addEventListener("click",async()=>{let o=await r("tasks");m(o,!1)}),E[1].addEventListener("click",async()=>{let o=await r("tasks");m(o.filter(s=>s.status?"":s),!1)}),E[2].addEventListener("click",async()=>{let o=await r("tasks");m(o.filter(s=>s.status?s:""),!1)}),r("mode").then(o=>{if(o=="dark"){g?.classList.add("dark");for(let[s,a]of c)document.querySelector("html")?.style.setProperty(s,a)}if(o!="dark"){g?.classList.remove("dark");for(let[s,a]of i)document.querySelector("html")?.style.setProperty(s,a)}}),r("tasks").then(o=>{o&&o!=null&&m(o,!0)}),r("fav-color").then(o=>{h.forEach(s=>{s.classList.remove("active"),o==s.dataset.color&&s.classList.add("active")})})});})();
