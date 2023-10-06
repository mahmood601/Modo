import { fromStore } from "../storage";
import { setStatus } from "./delete";

export const makeCompleted = async (item: any) => {
  item.classList.toggle("checked")
  const tasks = await fromStore("tasks");

  let li = item.parentNode;
  if (!item.classList.contains("checked")) {
    setStatus(li, false);
  }
  if (item.classList.contains("checked")) {
    setStatus(li, true);
    li.firstChild.style.bacgroundColor = tasks.icon + "";
  }
}
