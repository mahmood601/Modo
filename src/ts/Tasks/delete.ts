import { changeProgress } from "../progress";
import { renderTasks } from "../renderer";
import { fromStore, toStore } from "../storage";
import { findLiChild } from "./edit";

export const deleteThis = async (item: any) => {
  const tasks = await fromStore("tasks");
  const status = tasks[findLiChild(item).parentNode.dataset.id].status;

  tasks.splice(findLiChild(item).parentNode.dataset.id, 1);
  tasks.forEach((task: any, index: any) => {
    task.id = index;
  });
  await toStore("tasks", tasks)
  renderTasks(tasks);
  changeProgress(tasks, status);
}

export const setStatus = (element: any, status: boolean) => {
  fromStore("tasks").then(async (tasks: any) => {
    tasks[element.dataset.id].status = status;
    changeProgress(tasks, status)
    renderTasks(tasks);
    await toStore("tasks", tasks)
  })
}
