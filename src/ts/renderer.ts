import { hideMenu, toggleMenu } from "./menu";
import { parentinput } from "./elements";
import { fromStore } from "./storage";
import { Task } from "./main";

import { deleteThis } from './Tasks/delete'
import { edit } from './Tasks/edit'
import { makeCompleted } from './Tasks/makeComplete'
import { changeProgress } from "./progress";
import { dragFun } from "./dargAndDrop";

const rtl = document.body.classList.contains("rtl")

/**
 * Function to render tasks
 * */
export const renderTasks = async (arrayOfTasks: Task[], status: boolean): Promise<void> => {

  parentinput.style.border = `2px solid var(--choosen-color)`;
  document.querySelectorAll(".tasks-list li")?.forEach((element) => {
    element.remove();
  });

  let id = 0;
  arrayOfTasks.forEach((task, index) => {
    let fSpan = document.createElement("span");
    fSpan.classList.add("icon");
    fSpan.style.border = `2px solid ${task.icon}`;
    fSpan.style.color = `${task.icon}`;
    fSpan.setAttribute("onclick", "window.makeCompleted(this)")
    if (task.status) {
      fSpan.classList.add("checked")
    }

    let p = document.createElement("p");
    p.classList.add("task-content");
    p.textContent = task.content;

    let div = document.createElement("div");
    div.classList.add("options");

    div.innerHTML = `      
            <span class="span-opts">•••</span>
            <ul class="options-list hide">
              <li class="edit" onclick="window.edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>${rtl ? "تعديل" : "Edit"}</p>
              </li>
             <li class="delete" onclick = "window.deleteThis(this)" >
                <i class="fa-solid fa-trash fa-sm" > </i>
                <p> ${rtl ? "حذف" : "Delete"} </p>
              </li>
            </ul>`;

    let li = document.createElement("li");
    li.setAttribute("data-id", `${id++}`);
    li.setAttribute("draggable", "true");
    li.setAttribute("data-status", task.status ? "completed" : "not-completed");

    li.append(fSpan);
    li.append(p);
    li.append(div);


    document.querySelector(".tasks-list")?.append(li);

    const opts: NodeListOf<HTMLElement> = document.querySelectorAll(".span-opts");
    opts.forEach((opt) => {
      opt.addEventListener("click", () => {
        opts.forEach((op) => op.nextElementSibling?.classList.add("hide"));
      });

      toggleMenu(opt, opt.nextElementSibling);
      hideMenu(opt.nextElementSibling);
    });
  });
  changeProgress(arrayOfTasks, status)

  const dragItems: NodeListOf<Element> = document.querySelectorAll(".tasks-list > li");
  
  dragFun(dragItems)
}

// add funtions to window object
declare global {
  interface Window {
    edit: any;
    makeCompleted: any;
    deleteThis: any;
  }
}
window.edit = edit;
window.deleteThis = deleteThis;
window.makeCompleted = makeCompleted;

