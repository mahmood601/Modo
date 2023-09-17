"use strict";var _a,_b,_c,_d;const mainButton=document.getElementById("button"),modeButton=document.getElementById("mode"),setting=document.getElementById("setting"),colorsList=document.querySelectorAll(".colors-list li"),statusList=document.querySelectorAll(".footer li");function toggleMenu(t,o){null!=t&&t.addEventListener("click",e=>{null!=o&&o.classList.toggle("hide"),null!=t&&t.classList.toggle("clicked"),e.stopPropagation()})}function hideMenu(o){document.addEventListener("click",e=>{var t;null!=o&&o.contains(e.target)||(null!=o&&o.classList.add("hide"),null!=(t=null==o?void 0:o.previousElementSibling)&&t.classList.remove("clicked"),e.stopPropagation())})}toggleMenu(mainButton,null===mainButton||void 0===mainButton?void 0:mainButton.nextElementSibling),hideMenu(null===mainButton||void 0===mainButton?void 0:mainButton.nextElementSibling),toggleMenu(setting,null===setting||void 0===setting?void 0:setting.nextElementSibling),hideMenu(null===setting||void 0===setting?void 0:setting.nextElementSibling);let toStore=(e,t)=>localStorage.setItem(e,JSON.stringify(t)),fromStore=e=>JSON.parse(localStorage.getItem(e)),person={image:"",mode:"",favColor:"",tasks:[]},updateStorage=(e=person.image,t=person.mode,o=person.favColor,s=person.tasks)=>{person.image=e,person.favColor=o,person.mode=t,person.tasks=s,toStore("person",person)};const userImage=document.getElementById("u-image"),extraColor=(userImage.addEventListener("change",e=>{var t;const o=new FileReader;o.readAsDataURL(null==(t=userImage.files)?void 0:t.item(0)),o.addEventListener("load",()=>{updateStorage(o.result,fromStore("person").mode,fromStore("person").favColor,fromStore("person").tasks),null!==mainButton&&void 0!==mainButton&&mainButton.setAttribute("src",""+fromStore("person").image)}),e.stopPropagation()}),null!==modeButton&&void 0!==modeButton&&modeButton.addEventListener("click",()=>{var e=modeButton.classList.contains("dark")?"light":"dark";updateStorage(fromStore("person").image,e,fromStore("person").favColor,fromStore("person").tasks)}),document.getElementById("extra-color"));null!==extraColor&&void 0!==extraColor&&extraColor.addEventListener("input",()=>{var e;colorsList[4].dataset.color=extraColor.value,updateStorage(fromStore("person").image,fromStore("person").mode,extraColor.value,fromStore("person").tasks),null!=(e=document.querySelector("html"))&&e.style.setProperty("--fav-color",extraColor.value)}),colorsList.forEach(t=>{t.addEventListener("click",()=>{var e;updateStorage(fromStore("person").image,fromStore("person").mode,t.dataset.color,fromStore("person").tasks),null!=(e=document.querySelector("html"))&&e.style.setProperty("--fav-color",t.dataset.color)})});class Task{constructor(e,t,o,s){this.icon=e,this.id=t,this.content=o,this.status=s,e=this.icon,t=this.id,o=this.content,this.status}get taskIcon(){return this.icon}get taskId(){return this.id}get taskContent(){return this.content}get taskStatus(){return this.status}set taskIcon(e){this.content=e}set taskId(e){this.id=e}set taskContent(e){this.content=e}set taskStatus(e){this.status=e}}const taskIcon=document.getElementById("task-icon"),taskContent=document.getElementById("task-content"),inputTaskColor=document.querySelector(".checkbox input:first-child");let parentinput=inputTaskColor.parentNode;function renderTasks(e){var t;parentinput.style.border="2px solid var(--choosen-color)",null!=(t=document.querySelectorAll(".tasks-list li"))&&t.forEach(e=>{e.remove()}),e.forEach(e=>{var t=document.createElement("span"),o=(t.classList.add("icon"),t.style.border="2px solid "+e.icon,t.style.color=""+e.icon,document.createElement("p")),s=(o.classList.add("task-content"),o.textContent=e.content,document.createElement("div")),r=(s.classList.add("options"),s.innerHTML=`            <span class="span-opts">•••</span>
            <ul class="options-list hide">
              <li class="edit" onclick="edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>Edit</p>
              </li>
              <li class="completed" onclick="makeCompleted(this)">
                <i class="fa-solid fa-check fa-sm"></i>
                <p>${0==e.status?"Completed":"Not Completed"}</p>
              </li>
              <li class="delete" onclick="deleteThis(this)">
                <i class="fa-solid fa-trash fa-sm"></i>
                <p>Delete</p>
              </li>
            </ul>
 `,document.createElement("span")),n=(r.classList.add("move-task"),r.textContent=":::",document.createElement("li"));n.setAttribute("data-id",""+e.id),n.setAttribute("data-status",e.status?"completed":"not-completed"),n.append(t),n.append(o),n.append(s),n.append(r),null!=(e=document.querySelector(".tasks-list"))&&e.append(n);const a=document.querySelectorAll(".span-opts");a.forEach(e=>{e.addEventListener("click",()=>{a.forEach(e=>{return null==(e=e.nextElementSibling)?void 0:e.classList.add("hide")})}),toggleMenu(e,e.nextElementSibling),hideMenu(e.nextElementSibling)})})}function findLiChild(e){return e.parentNode.classList.add("hide"),e.parentNode.parentNode.previousElementSibling}function edit(e){let t=findLiChild(e);t.setAttribute("contenteditable","true"),t.addEventListener("mouseleave",()=>{t.removeAttribute("contenteditable");var e=fromStore("person").tasks;e[t.parentNode.dataset.id].content=t.textContent,updateStorage(fromStore("person").image,fromStore("person").mode,fromStore("person").color,e),renderTasks(fromStore("person").tasks)})}function setStatus(e,t){var o=fromStore("person").tasks;o[e.dataset.id].status=t,updateStorage(fromStore("person").image,fromStore("person").mode,fromStore("person").color,o),renderTasks(fromStore("person").tasks)}function changeProgress(e){var t=e.filter(e=>e.status?e:""),t=0!==e.length?100*t.length/e.length:0,e=document.getElementById("progress");e.style.background=`conic-gradient(var(--fav-color) ${t/100}turn, var(--mode-color) 0deg)`,e.dataset.progress=t.toFixed(1)}function makeCompleted(e){var t=findLiChild(e).parentNode;"Not Completed"==e.children[1].textContent?(setStatus(t,!1),t.firstChild.style.bacgroundColor=fromStore("person").tasks.icon+""):setStatus(t,!0),changeProgress(fromStore("person").tasks)}function deleteThis(e){var t=fromStore("person").tasks;t.splice(findLiChild(e).parentNode.dataset.id,1),t.forEach((e,t)=>{e.id=t}),updateStorage(fromStore("person").image,fromStore("person").mode,fromStore("person").color,t),renderTasks(fromStore("person").tasks),changeProgress(fromStore("person").tasks)}null!==inputTaskColor&&void 0!==inputTaskColor&&inputTaskColor.addEventListener("input",e=>{parentinput.style.border="2px solid "+inputTaskColor.value,e.stopPropagation()});let tasks=[];null!=(_a=document.querySelector(".input-box"))&&_a.addEventListener("submit",e=>{""!==taskContent.value&&((tasks=null!==fromStore("person")?fromStore("person").tasks:tasks).push(new Task(taskIcon.value,tasks.length,taskContent.value,!1)),renderTasks(tasks),fromStore("person")?updateStorage(fromStore("person").image,fromStore("person").mode,fromStore("person").color,tasks):updateStorage(void 0,void 0,void 0,tasks)),taskContent.value="",e.preventDefault()});const darkColors=new Map,lightColors=new Map;function changeActive(t,...o){t.forEach(e=>{e.addEventListener("click",e=>{t.forEach(e=>e.classList.remove(o.join(" "))),e.target.classList.add("active")})})}if(darkColors.set("--mode-color","#222").set("--alt-mode-color","#fff").set("--hover-color","#363636").set("--sec-mode-color","#333"),lightColors.set("--mode-color","#fff").set("--alt-mode-color","#000").set("--hover-color","#f6f6f6").set("--sec-mode-color","#eee"),null!==modeButton&&void 0!==modeButton&&modeButton.addEventListener("click",e=>{var t,o;if(e.stopPropagation(),modeButton.classList.toggle("dark"),modeButton.classList.contains("dark"))for(var[s,r]of darkColors)null!=(t=document.querySelector("html"))&&t.style.setProperty(s,r);if(!modeButton.classList.contains("dark"))for(var[n,a]of lightColors)null!=(o=document.querySelector("html"))&&o.style.setProperty(n,a)}),changeActive(colorsList,"active"),changeActive(statusList,"active"),statusList[0].addEventListener("click",()=>renderTasks(fromStore("person").tasks)),statusList[1].addEventListener("click",()=>renderTasks(fromStore("person").tasks.filter(e=>e.status?"":e))),statusList[2].addEventListener("click",()=>renderTasks(fromStore("person").tasks.filter(e=>e.status?e:""))),fromStore("person")){if("dark"==fromStore("person").mode){null!==modeButton&&void 0!==modeButton&&modeButton.classList.add("dark");for(const[wa,xa]of darkColors)null!=(_b=document.querySelector("html"))&&_b.style.setProperty(wa,xa)}if("dark"!=fromStore("person").mode){null!==modeButton&&void 0!==modeButton&&modeButton.classList.remove("dark");for(const[ya,za]of lightColors)null!=(_c=document.querySelector("html"))&&_c.style.setProperty(ya,za)}fromStore("person").favColor&&null!=(_d=document.querySelector("html"))&&_d.style.setProperty("--fav-color",fromStore("person").favColor),changeProgress(fromStore("person").tasks),fromStore("person").image&&null!==mainButton&&void 0!==mainButton&&mainButton.setAttribute("src",""+fromStore("person").image),renderTasks(fromStore("person").tasks)}var __awaiter=this&&this.__awaiter||function(e,a,i,l){return new(i=i||Promise)(function(o,t){function s(e){try{n(l.next(e))}catch(e){t(e)}}function r(e){try{n(l.throw(e))}catch(e){t(e)}}function n(e){var t;e.done?o(e.value):((t=e.value)instanceof i?t:new i(function(e){e(t)})).then(s,r)}n((l=l.apply(e,a||[])).next())})};importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),self.addEventListener("install",e=>__awaiter(void 0,void 0,void 0,function*(){e.waitUntil(caches.open("pwabuilder-offline-page").then(e=>e.add("../index.html")))})),workbox.navigationPreload.isSupported()&&workbox.navigationPreload.enable(),workbox.routing.registerRoute(new RegExp("/*"),new workbox.strategies.StaleWhileRevalidate({cacheName:"pwabuilder-offline-page"})),self.addEventListener("fetch",t=>{"navigate"===t.request.mode&&t.respondWith(__awaiter(void 0,void 0,void 0,function*(){try{var e=yield t.preloadResponse;return e?e:yield fetch(t.request)}catch(e){return yield(yield caches.open("pwabuilder-offline-page")).match("../../index.html")}}))});