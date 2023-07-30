"use strict";
var _a, _b, _c, _d;
const mainButton = document.getElementById('button'), modeButton = document.getElementById("mode"), setting = document.getElementById('setting'), colorsList = document.querySelectorAll(".colors-list li"), statusList = document.querySelectorAll(".footer li");
function toggleMenu(button, menu) {
    button === null || button === void 0 ? void 0 : button.addEventListener('click', (event) => {
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle('hide');
        button === null || button === void 0 ? void 0 : button.classList.toggle('clicked');
        event.stopPropagation();
    });
}
function hideMenu(menu) {
    document.addEventListener('click', (event) => {
        var _a;
        if (!(menu === null || menu === void 0 ? void 0 : menu.contains(event.target))) {
            menu === null || menu === void 0 ? void 0 : menu.classList.add('hide');
            (_a = menu === null || menu === void 0 ? void 0 : menu.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove('clicked');
            event.stopPropagation();
        }
    });
}
toggleMenu(mainButton, mainButton === null || mainButton === void 0 ? void 0 : mainButton.nextElementSibling);
hideMenu(mainButton === null || mainButton === void 0 ? void 0 : mainButton.nextElementSibling);
toggleMenu(setting, setting === null || setting === void 0 ? void 0 : setting.nextElementSibling);
hideMenu(setting === null || setting === void 0 ? void 0 : setting.nextElementSibling);
let toStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
let fromStore = (key) => JSON.parse(localStorage.getItem(key));
let person = { image: '', mode: '', favColor: '', tasks: [] };
let updateStorage = (image = person.image, mode = person.mode, favColor = person.favColor, tasks = person.tasks) => {
    person.image = image;
    person.favColor = favColor;
    person.mode = mode;
    person.tasks = tasks;
    toStore('person', person);
};
const userImage = document.getElementById('u-image');
userImage.addEventListener('change', (event) => {
    var _a;
    const reader = new FileReader();
    reader.readAsDataURL((_a = userImage.files) === null || _a === void 0 ? void 0 : _a.item(0));
    reader.addEventListener('load', () => {
        updateStorage(reader.result, fromStore('person').mode, fromStore('person').favColor, fromStore('person').tasks);
        mainButton === null || mainButton === void 0 ? void 0 : mainButton.setAttribute('src', `${fromStore('person').image}`);
    });
    event.stopPropagation();
});
modeButton === null || modeButton === void 0 ? void 0 : modeButton.addEventListener('click', () => {
    let mode = !modeButton.classList.contains('dark') ? 'dark' : 'light';
    updateStorage(fromStore('person').image, mode, fromStore('person').favColor, fromStore('person').tasks);
});
const extraColor = document.getElementById('extra-color');
extraColor === null || extraColor === void 0 ? void 0 : extraColor.addEventListener('input', () => {
    var _a;
    colorsList[4].dataset.color = extraColor.value;
    updateStorage(fromStore('person').image, fromStore('person').mode, extraColor.value, fromStore('person').tasks);
    (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.style.setProperty('--fav-color', extraColor.value);
});
colorsList.forEach((color) => {
    color.addEventListener('click', () => {
        var _a;
        updateStorage(fromStore('person').image, fromStore('person').mode, color.dataset.color, fromStore('person').tasks);
        (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.style.setProperty('--fav-color', color.dataset.color);
    });
});
class Task {
    constructor(icon, id, content, status) {
        this.icon = icon;
        this.id = id;
        this.content = content;
        this.status = status;
        icon = this.icon;
        id = this.id;
        content = this.content;
        status = this.status;
    }
    get taskIcon() {
        return this.icon;
    }
    get taskId() {
        return this.id;
    }
    get taskContent() {
        return this.content;
    }
    get taskStatus() {
        return this.status;
    }
    set taskIcon(icon) {
        this.content = icon;
    }
    set taskId(id) {
        this.id = id;
    }
    set taskContent(content) {
        this.content = content;
    }
    set taskStatus(status) {
        this.status = status;
    }
}
const taskIcon = document.getElementById('task-icon'), taskContent = document.getElementById('task-content'), inputTaskColor = document.querySelector('.checkbox input:first-child');
let parentinput = inputTaskColor.parentNode;
inputTaskColor === null || inputTaskColor === void 0 ? void 0 : inputTaskColor.addEventListener('input', (e) => {
    parentinput.style.border = `2px solid ${inputTaskColor.value}`;
    e.stopPropagation();
});
function renderTasks(arrayOfTasks) {
    var _a;
    parentinput.style.border = `2px solid var(--choosen-color)`;
    (_a = document.querySelectorAll('.tasks-list li')) === null || _a === void 0 ? void 0 : _a.forEach(element => {
        element.remove();
    });
    arrayOfTasks.forEach(task => {
        var _a;
        let fSpan = document.createElement('span');
        fSpan.classList.add('icon');
        fSpan.style.border = `2px solid ${task.icon}`;
        fSpan.style.color = `${task.icon}`;
        let p = document.createElement('p');
        p.classList.add('task-content');
        p.textContent = task.content;
        let div = document.createElement('div');
        div.classList.add('options');
        div.innerHTML = `            <span class="span-opts">•••</span>
            <ul class="options-list hide">
              <li class="edit" onclick="edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>Edit</p>
              </li>
              <li class="completed" onclick="makeCompleted(this)">
                <i class="fa-solid fa-check fa-sm"></i>
                <p>${task.status == false ? 'Completed' : 'Not Completed'}</p>
              </li>
              <li class="delete" onclick="deleteThis(this)">
                <i class="fa-solid fa-trash fa-sm"></i>
                <p>Delete</p>
              </li>
            </ul>
 `;
        let sSpan = document.createElement('span');
        sSpan.classList.add('move-task');
        sSpan.textContent = ':::';
        let li = document.createElement('li');
        li.setAttribute('data-id', `${task.id}`);
        li.setAttribute('data-status', task.status ? 'completed' : 'not-completed');
        li.append(fSpan);
        li.append(p);
        li.append(div);
        li.append(sSpan);
        (_a = document.querySelector('.tasks-list')) === null || _a === void 0 ? void 0 : _a.append(li);
        const opts = document.querySelectorAll('.span-opts');
        opts.forEach(opt => {
            opt.addEventListener('click', () => {
                opts.forEach(op => { var _a; return (_a = op.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add('hide'); });
            });
            toggleMenu(opt, opt.nextElementSibling);
            hideMenu(opt.nextElementSibling);
        });
    });
}
function findLiChild(item) {
    item.parentNode.classList.add('hide');
    return item.parentNode.parentNode.previousElementSibling;
}
function edit(item) {
    let p = findLiChild(item);
    p.setAttribute('contenteditable', 'true');
    p.addEventListener('mouseleave', () => {
        p.removeAttribute('contenteditable');
        let tasksFLS = fromStore('person').tasks;
        tasksFLS[p.parentNode.dataset.id].content = p.textContent;
        updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasksFLS);
        renderTasks(fromStore('person').tasks);
    });
}
function setStatus(element, status) {
    let tasksFLS = fromStore('person').tasks;
    tasksFLS[element.dataset.id].status = status;
    updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasksFLS);
    renderTasks(fromStore('person').tasks);
}
function changeProgress(tasks) {
    let newTasks = tasks.filter((task) => task.status ? task : '');
    let percent = tasks.length !== 0 ? (newTasks.length * 100) / tasks.length : 0;
    let progress = document.getElementById('progress');
    progress.style.background = `conic-gradient(var(--fav-color) ${percent / 100}turn, var(--mode-color) 0deg)`;
    progress.dataset.progress = percent.toFixed(1);
}
function makeCompleted(item) {
    let li = findLiChild(item).parentNode;
    if (item.children[1].textContent == 'Not Completed') {
        setStatus(li, false);
        li.firstChild.style.bacgroundColor = fromStore('person').tasks.icon + "";
    }
    else {
        setStatus(li, true);
    }
    changeProgress(fromStore('person').tasks);
}
function deleteThis(item) {
    let tasksFLS = fromStore('person').tasks;
    tasksFLS.splice(findLiChild(item).parentNode.dataset.id, 1);
    tasksFLS.forEach((task, index) => {
        task.id = index;
    });
    updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasksFLS);
    renderTasks(fromStore('person').tasks);
    changeProgress(fromStore('person').tasks);
}
let tasks = [];
(_a = document.querySelector('.input-box')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
    if (taskContent.value !== '') {
        fromStore('person') !== null ? tasks = fromStore('person').tasks : [];
        tasks.push(new Task(taskIcon.value, tasks.length, taskContent.value, false));
        renderTasks(tasks);
        if (fromStore('person')) {
            updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasks);
        }
        else {
            updateStorage(undefined, undefined, undefined, tasks);
        }
    }
    taskContent.value = '';
    e.preventDefault();
});
const darkColors = new Map();
const lightColors = new Map();
darkColors
    .set("--mode-color", "#222")
    .set("--alt-mode-color", "#fff")
    .set("--hover-color", "#363636")
    .set("--sec-mode-color", "#333");
lightColors
    .set("--mode-color", "#fff")
    .set("--alt-mode-color", "#000")
    .set("--hover-color", "#f6f6f6")
    .set("--sec-mode-color", "#eee");
modeButton === null || modeButton === void 0 ? void 0 : modeButton.addEventListener("click", (e) => {
    var _a, _b;
    e.stopPropagation();
    modeButton.classList.toggle("dark");
    if (modeButton.classList.contains('dark')) {
        for (const [variable, value] of darkColors) {
            (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.style.setProperty(variable, value);
        }
    }
    if (!modeButton.classList.contains('dark')) {
        for (const [variable, value] of lightColors) {
            (_b = document.querySelector("html")) === null || _b === void 0 ? void 0 : _b.style.setProperty(variable, value);
        }
    }
});
function changeActive(collectionOfEle, ...classes) {
    collectionOfEle.forEach(ele => {
        ele.addEventListener('click', (e) => {
            collectionOfEle.forEach(ele => ele.classList.remove(classes.join(' ')));
            e.target.classList.add('active');
        });
    });
}
changeActive(colorsList, 'active');
changeActive(statusList, 'active');
statusList[0].addEventListener('click', () => renderTasks(fromStore('person').tasks));
statusList[1].addEventListener('click', () => renderTasks(fromStore('person').tasks.filter((ele) => !ele.status ? ele : '')));
statusList[2].addEventListener('click', () => renderTasks(fromStore('person').tasks.filter((ele) => ele.status ? ele : '')));
if (fromStore('person')) {
    if (fromStore('person').mode == 'dark') {
        modeButton === null || modeButton === void 0 ? void 0 : modeButton.classList.add('dark');
        for (const [variable, value] of darkColors) {
            (_b = document.querySelector("html")) === null || _b === void 0 ? void 0 : _b.style.setProperty(variable, value);
        }
    }
    if (fromStore('person').mode != 'dark') {
        modeButton === null || modeButton === void 0 ? void 0 : modeButton.classList.remove('dark');
        for (const [variable, value] of lightColors) {
            (_c = document.querySelector("html")) === null || _c === void 0 ? void 0 : _c.style.setProperty(variable, value);
        }
    }
    if (fromStore('person').favColor) {
        (_d = document.querySelector("html")) === null || _d === void 0 ? void 0 : _d.style.setProperty('--fav-color', fromStore('person').favColor);
    }
    changeProgress(fromStore('person').tasks);
    if (fromStore('person').image) {
        mainButton === null || mainButton === void 0 ? void 0 : mainButton.setAttribute('src', `${fromStore('person').image}`);
    }
    renderTasks(fromStore('person').tasks);
}
//# sourceMappingURL=main.js.map