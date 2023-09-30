import { changeProgress } from "../progress";
import { renderTasks } from "../renderer";
import { fromStore, toStore } from "../storage";
import { findLiChild } from "./edit";

export const deleteThis = async (item: any) => {
  const tasks = await fromStore("tasks");
  const status = tasks[findLiChild(item).parentNode.dataset.id].status;

  const oldTasks = tasks;
  tasks.splice(findLiChild(item).parentNode.dataset.id, 1);
  tasks.forEach((task: any, index: any) => {
    task.id = index;
  });
  await toStore("tasks", tasks)
  renderTasks(tasks);
  changeProgress(oldTasks, tasks, status);
}

export const setStatus = async (element: any, status: boolean) => {
  const tasks = await fromStore("tasks")
  const oldTasks = tasks;
  tasks[element.dataset.id].status = status;
  changeProgress(oldTasks, tasks, status)
  renderTasks(tasks);
  await toStore("tasks", tasks)
}
