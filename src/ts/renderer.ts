import { hideMenu, toggleMenu } from "./menu";
import { parentinput } from "./elements";
import { fromStore } from "./storage";
import { Task } from "./main";

import { deleteThis } from './Tasks/delete'
import { edit } from './Tasks/edit'
import { makeCompleted } from './Tasks/makeComplete'
import { changeProgress } from "./progress";

const rtl = document.body.classList.contains("rtl")

export const renderTasks = async (arrayOfTasks: Task[], status: boolean): Promise<void> => {

  parentinput.style.border = `2px solid var(--choosen-color)`;
  document.querySelectorAll(".tasks-list li")?.forEach((element) => {
    element.remove();
  });

  arrayOfTasks.forEach((task, index) => {
    let fSpan = document.createElement("span");
    fSpan.classList.add("icon");
    fSpan.style.border = `2px solid ${task.icon}`;
    fSpan.style.color = `${task.icon}`;

    let p = document.createElement("p");
    p.classList.add("task-content");
    p.textContent = task.content;

    let div = document.createElement("div");
    div.classList.add("options");

    // use this for detect status and language
    let completed: string = "";
    if (!task.status) {
      if (rtl) {
        completed = "مكتملة"
      } else {
        completed = "Completed"
      }
    }
    if (task.status) {
      if (rtl) {
        completed = "غير مكتملة"
      } else {
        completed = "Not Completed"
      }
    }
 
    div.innerHTML = `      
            <span class="span-opts">•••</span>
            <ul class="options-list hide">
              <li class="edit" onclick="window.edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>${rtl ? "تعديل" : "Edit"}</p>
              </li>
              <li class="completed" onclick="window.makeCompleted(this)">
                <i class="fa-solid fa-check fa-sm"></i>
               <p>${completed}</p>
              </li>
              <li class="delete" onclick = "window.deleteThis(this)" >
                <i class="fa-solid fa-trash fa-sm" > </i>
                <p> ${rtl ? "حذف" : "Delete"} </p>
              </li>
            </ul>`;

    let sSpan = document.createElement("span");
    sSpan.classList.add("move-task");
    sSpan.textContent = ":::";

    let li = document.createElement("li");
    li.setAttribute("data-id", `${task.id}`);
    li.setAttribute("data-status", task.status ? "completed" : "not-completed");
    fromStore("tasks").then((tasks: Task[]) => {
      if (tasks?.length >= 5 && (tasks?.length - 1 == index || tasks?.length - 2 == index)) {
        li.classList.add("last-li")
      }
    })
    li.append(fSpan);
    li.append(p);
    li.append(div);
    li.append(sSpan);


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
}



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
