import { fromStore } from "../storage";
import { setStatus } from "./delete";
import { findLiChild } from "./edit";

export const makeCompleted = async (item: any) => {
  const tasks = await fromStore("tasks");

  let li = findLiChild(item).parentNode;
  if (item.children[1].textContent == "Not Completed") {
    setStatus(li, false);
    li.firstChild.style.bacgroundColor = tasks.icon + "";
  } else {
    setStatus(li, true);
  }
}
