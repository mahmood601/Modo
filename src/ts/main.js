var _a, _b, _c, _d;
var mainButton = document.getElementById("button"), modeButton = document.getElementById("mode"), setting = document.getElementById("setting"), colorsList = document.querySelectorAll(".colors-list li"), statusList = document.querySelectorAll(".footer li");
function toggleMenu(button, menu) {
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function (event) {
        menu === null || menu === void 0 ? void 0 : menu.classList.toggle("hide");
        button === null || button === void 0 ? void 0 : button.classList.toggle("clicked");
        event.stopPropagation();
    });
}
function hideMenu(menu) {
    document.addEventListener("click", function (event) {
        var _a;
        if (!(menu === null || menu === void 0 ? void 0 : menu.contains(event.target))) {
            menu === null || menu === void 0 ? void 0 : menu.classList.add("hide");
            (_a = menu === null || menu === void 0 ? void 0 : menu.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove("clicked");
            event.stopPropagation();
        }
    });
}
mainButton.addEventListener('click', function () {
    var _a, _b;
    if (!((_a = setting === null || setting === void 0 ? void 0 : setting.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.contains("hide"))) {
        (_b = setting === null || setting === void 0 ? void 0 : setting.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.add("hide");
    }
});
toggleMenu(mainButton, mainButton === null || mainButton === void 0 ? void 0 : mainButton.nextElementSibling);
hideMenu(mainButton === null || mainButton === void 0 ? void 0 : mainButton.nextElementSibling);
toggleMenu(setting, setting === null || setting === void 0 ? void 0 : setting.nextElementSibling);
hideMenu(setting === null || setting === void 0 ? void 0 : setting.nextElementSibling);
var toStore = function (key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
};
var fromStore = function (key) { return JSON.parse(localStorage.getItem(key)); };
var person = { image: "", mode: "", favColor: "", tasks: [] };
var updateStorage = function (image, mode, favColor, tasks) {
    if (image === void 0) { image = person.image; }
    if (mode === void 0) { mode = person.mode; }
    if (favColor === void 0) { favColor = person.favColor; }
    if (tasks === void 0) { tasks = person.tasks; }
    person.image = image;
    person.favColor = favColor;
    person.mode = mode;
    person.tasks = tasks;
    toStore("person", person);
};
var userImage = document.getElementById("u-image");
userImage.addEventListener("change", function (event) {
    var _a;
    var reader = new FileReader();
    reader.readAsDataURL((_a = userImage.files) === null || _a === void 0 ? void 0 : _a.item(0));
    reader.addEventListener("load", function () {
        updateStorage(reader.result, fromStore("person").mode, fromStore("person").favColor, fromStore("person").tasks);
        mainButton === null || mainButton === void 0 ? void 0 : mainButton.setAttribute("src", "".concat(fromStore("person").image));
    });
    event.stopPropagation();
});
modeButton === null || modeButton === void 0 ? void 0 : modeButton.addEventListener("click", function () {
    var mode = !modeButton.classList.contains("dark") ? "dark" : "light";
    updateStorage(fromStore("person").image, mode, fromStore("person").favColor, fromStore("person").tasks);
});
var extraColor = document.getElementById("extra-color");
extraColor === null || extraColor === void 0 ? void 0 : extraColor.addEventListener("input", function () {
    var _a;
    colorsList[4].dataset.color = extraColor.value;
    updateStorage(fromStore("person").image, fromStore("person").mode, extraColor.value, fromStore("person").tasks);
    (_a = document
        .querySelector("html")) === null || _a === void 0 ? void 0 : _a.style.setProperty("--fav-color", extraColor.value);
});
colorsList.forEach(function (color) {
    color.addEventListener("click", function () {
        var _a;
        updateStorage(fromStore("person").image, fromStore("person").mode, color.dataset.color, fromStore("person").tasks);
        (_a = document
            .querySelector("html")) === null || _a === void 0 ? void 0 : _a.style.setProperty("--fav-color", color.dataset.color);
    });
});
var Task = (function () {
    function Task(icon, id, content, status) {
        this.icon = icon;
        this.id = id;
        this.content = content;
        this.status = status;
        icon = this.icon;
        id = this.id;
        content = this.content;
        status = this.status;
    }
    Object.defineProperty(Task.prototype, "taskIcon", {
        get: function () {
            return this.icon;
        },
        set: function (icon) {
            this.content = icon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "taskId", {
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "taskContent", {
        get: function () {
            return this.content;
        },
        set: function (content) {
            this.content = content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "taskStatus", {
        get: function () {
            return this.status;
        },
        set: function (status) {
            this.status = status;
        },
        enumerable: false,
        configurable: true
    });
    return Task;
}());
var taskIcon = document.getElementById("task-icon"), taskContent = document.getElementById("task-content"), inputTaskColor = document.querySelector(".checkbox input:first-child");
var parentinput = inputTaskColor.parentNode;
inputTaskColor === null || inputTaskColor === void 0 ? void 0 : inputTaskColor.addEventListener("input", function (e) {
    parentinput.style.border = "2px solid ".concat(inputTaskColor.value);
    e.stopPropagation();
});
function renderTasks(arrayOfTasks) {
    var _a;
    parentinput.style.border = "2px solid var(--choosen-color)";
    (_a = document.querySelectorAll(".tasks-list li")) === null || _a === void 0 ? void 0 : _a.forEach(function (element) {
        element.remove();
    });
    arrayOfTasks.forEach(function (task, index) {
        var _a;
        var fSpan = document.createElement("span");
        fSpan.classList.add("icon");
        fSpan.style.border = "2px solid ".concat(task.icon);
        fSpan.style.color = "".concat(task.icon);
        var p = document.createElement("p");
        p.classList.add("task-content");
        p.textContent = task.content;
        var div = document.createElement("div");
        div.classList.add("options");
        div.innerHTML = "            <span class=\"span-opts\">\u2022\u2022\u2022</span>\n            <ul class=\"options-list hide\">\n              <li class=\"edit\" onclick=\"edit(this)\">\n                <i class=\"fa-solid fa-pencil fa-sm\"></i>\n                <p>Edit</p>\n              </li>\n              <li class=\"completed\" onclick=\"makeCompleted(this)\">\n                <i class=\"fa-solid fa-check fa-sm\"></i>\n                <p>".concat(task.status == false ? "Completed" : "Not Completed", "</p>\n              </li>\n              <li class=\"delete\" onclick=\"deleteThis(this)\">\n                <i class=\"fa-solid fa-trash fa-sm\"></i>\n                <p>Delete</p>\n              </li>\n            </ul>\n ");
        var sSpan = document.createElement("span");
        sSpan.classList.add("move-task");
        sSpan.textContent = ":::";
        var li = document.createElement("li");
        li.setAttribute("data-id", "".concat(task.id));
        li.setAttribute("data-status", task.status ? "completed" : "not-completed");
        if (fromStore("person").tasks.length >= 5 && (fromStore("person").tasks.length - 1 == index || fromStore("person").tasks.length - 2 == index)) {
            li.classList.add("last-li");
        }
        li.append(fSpan);
        li.append(p);
        li.append(div);
        li.append(sSpan);
        (_a = document.querySelector(".tasks-list")) === null || _a === void 0 ? void 0 : _a.append(li);
        var opts = document.querySelectorAll(".span-opts");
        opts.forEach(function (opt) {
            opt.addEventListener("click", function () {
                opts.forEach(function (op) { var _a; return (_a = op.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add("hide"); });
            });
            toggleMenu(opt, opt.nextElementSibling);
            hideMenu(opt.nextElementSibling);
        });
    });
}
function findLiChild(item) {
    item.parentNode.classList.add("hide");
    return item.parentNode.parentNode.previousElementSibling;
}
function edit(item) {
    var p = findLiChild(item);
    p.setAttribute("contenteditable", "true");
    p.addEventListener("mouseleave", function () {
        p.removeAttribute("contenteditable");
        var tasksFLS = fromStore("person").tasks;
        tasksFLS[p.parentNode.dataset.id].content = p.textContent;
        updateStorage(fromStore("person").image, fromStore("person").mode, fromStore("person").color, tasksFLS);
        renderTasks(fromStore("person").tasks);
    });
}
function setStatus(element, status) {
    var tasksFLS = fromStore("person").tasks;
    tasksFLS[element.dataset.id].status = status;
    updateStorage(fromStore("person").image, fromStore("person").mode, fromStore("person").color, tasksFLS);
    renderTasks(fromStore("person").tasks);
}
function changeProgress(tasks) {
    var newTasks = tasks.filter(function (task) { return (task.status ? task : ""); });
    var percent = tasks.length !== 0 ? (newTasks.length * 100) / tasks.length : 0;
    var progress = document.getElementById("progress");
    progress.style.background = "conic-gradient(var(--fav-color) ".concat(percent / 100, "turn, var(--mode-color) 0deg)");
    progress.dataset.progress = percent.toFixed(1);
}
function makeCompleted(item) {
    var li = findLiChild(item).parentNode;
    if (item.children[1].textContent == "Not Completed") {
        setStatus(li, false);
        li.firstChild.style.bacgroundColor = fromStore("person").tasks.icon + "";
    }
    else {
        setStatus(li, true);
    }
    changeProgress(fromStore("person").tasks);
}
function deleteThis(item) {
    var tasksFLS = fromStore("person").tasks;
    tasksFLS.splice(findLiChild(item).parentNode.dataset.id, 1);
    tasksFLS.forEach(function (task, index) {
        task.id = index;
    });
    updateStorage(fromStore("person").image, fromStore("person").mode, fromStore("person").color, tasksFLS);
    renderTasks(fromStore("person").tasks);
    changeProgress(fromStore("person").tasks);
}
var tasks = [];
(_a = document.querySelector(".input-box")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    if (taskContent.value !== "") {
        fromStore("person") !== null ? (tasks = fromStore("person").tasks) : [];
        tasks.push(new Task(taskIcon.value, tasks.length, taskContent.value, false));
        renderTasks(tasks);
        if (fromStore("person")) {
            updateStorage(fromStore("person").image, fromStore("person").mode, fromStore("person").color, tasks);
        }
        else {
            updateStorage(undefined, undefined, undefined, tasks);
        }
    }
    taskContent.value = "";
    e.preventDefault();
});
var darkColors = new Map();
var lightColors = new Map();
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
modeButton === null || modeButton === void 0 ? void 0 : modeButton.addEventListener("click", function (e) {
    var _a, _b;
    e.stopPropagation();
    modeButton.classList.toggle("dark");
    if (modeButton.classList.contains("dark")) {
        for (var _i = 0, darkColors_2 = darkColors; _i < darkColors_2.length; _i++) {
            var _c = darkColors_2[_i], variable = _c[0], value = _c[1];
            (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.style.setProperty(variable, value);
        }
    }
    if (!modeButton.classList.contains("dark")) {
        for (var _d = 0, lightColors_2 = lightColors; _d < lightColors_2.length; _d++) {
            var _e = lightColors_2[_d], variable = _e[0], value = _e[1];
            (_b = document.querySelector("html")) === null || _b === void 0 ? void 0 : _b.style.setProperty(variable, value);
        }
    }
});
function changeActive(collectionOfEle) {
    var classes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        classes[_i - 1] = arguments[_i];
    }
    collectionOfEle.forEach(function (ele) {
        ele.addEventListener("click", function (e) {
            collectionOfEle.forEach(function (ele) { return ele.classList.remove(classes.join(" ")); });
            e.target.classList.add("active");
        });
    });
}
changeActive(colorsList, "active");
changeActive(statusList, "active");
statusList[0].addEventListener("click", function () {
    return renderTasks(fromStore("person").tasks);
});
statusList[1].addEventListener("click", function () {
    return renderTasks(fromStore("person").tasks.filter(function (ele) { return (!ele.status ? ele : ""); }));
});
statusList[2].addEventListener("click", function () {
    return renderTasks(fromStore("person").tasks.filter(function (ele) { return (ele.status ? ele : ""); }));
});
if (fromStore("person")) {
    if (fromStore("person").mode == "dark") {
        modeButton === null || modeButton === void 0 ? void 0 : modeButton.classList.add("dark");
        for (var _i = 0, darkColors_1 = darkColors; _i < darkColors_1.length; _i++) {
            var _e = darkColors_1[_i], variable = _e[0], value = _e[1];
            (_b = document.querySelector("html")) === null || _b === void 0 ? void 0 : _b.style.setProperty(variable, value);
        }
    }
    if (fromStore("person").mode != "dark") {
        modeButton === null || modeButton === void 0 ? void 0 : modeButton.classList.remove("dark");
        for (var _f = 0, lightColors_1 = lightColors; _f < lightColors_1.length; _f++) {
            var _g = lightColors_1[_f], variable = _g[0], value = _g[1];
            (_c = document.querySelector("html")) === null || _c === void 0 ? void 0 : _c.style.setProperty(variable, value);
        }
    }
    if (fromStore("person").favColor) {
        (_d = document
            .querySelector("html")) === null || _d === void 0 ? void 0 : _d.style.setProperty("--fav-color", fromStore("person").favColor);
    }
    changeProgress(fromStore("person").tasks);
    if (fromStore("person").image) {
        mainButton === null || mainButton === void 0 ? void 0 : mainButton.setAttribute("src", "".concat(fromStore("person").image));
    }
    renderTasks(fromStore("person").tasks);
}
//# sourceMappingURL=main.js.map