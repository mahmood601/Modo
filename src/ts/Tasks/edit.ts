import { renderTasks } from "../renderer";
import { updateStorage, fromStore } from "../storage";


export const findLiChild = (item: any) => {
  item.parentNode.classList.add("hide");
  return item.parentNode.parentNode.previousElementSibling;
}

export const edit = (item: any) => {
  let p = findLiChild(item);
  p.setAttribute("contenteditable", "true");
  p.addEventListener("mouseleave", async () => {
    p.removeAttribute("contenteditable");

    const tasks = await fromStore("tasks")

    tasks[p.parentNode.dataset.id].content = p.textContent;
    updateStorage("tasks", () => tasks)
    renderTasks(tasks);
  });
}

