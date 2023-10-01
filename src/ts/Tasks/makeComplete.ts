import { fromStore } from "../storage";
import { setStatus } from "./delete";
import { findLiChild } from "./edit";

export const makeCompleted = async (item: any) => {
  const tasks = await fromStore("tasks");

  let li = findLiChild(item).parentNode;
  if (item.children[1].textContent == "Not Completed" || item.children[1].textContent == "غير مكتملة") {
    setStatus(li, false);
  }
  if (item.children[1].textContent == "Completed" || item.children[1].textContent == "مكتملة") {
    setStatus(li, true);
    li.firstChild.style.bacgroundColor = tasks.icon + "";
  }
}
