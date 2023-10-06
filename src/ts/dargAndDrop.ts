import { polyfill } from "mobile-drag-drop";
import { fromStore, toStore } from "./storage";
import { Task } from "./main";
import { renderTasks } from "./renderer";

// Enable polyfill to unsupported browsers
polyfill({holdToDrag: 1000});

// variables for store src and target element
let srcElement: any,
  overElement: any;

/**
  * Function to swap Element
*/
async function swapElements(srcId: any, targetId: any) {
  const tasks: Task[] = await fromStore("tasks")
  tasks.splice(Number.parseInt(targetId), 0, tasks.splice(Number.parseInt(srcId), 1)[0])
  renderTasks(tasks, false)
  
  await toStore("tasks", tasks)
}

export async function dragFun(dragItems: NodeListOf<Element>) {
  dragItems.forEach((item: Element | any): void => {

    item.addEventListener('dragstart', (e: DragEvent) => {
      // store the drag element
      srcElement = e.currentTarget;
      // add class to change its shape
      (e.currentTarget as Element)?.classList.add('dragging');
      // determine data and its types
      e.dataTransfer?.setData("text/plain", (e.currentTarget as Element)?.innerHTML)
    })

    // when drag end
    item.addEventListener('dragend', (e: DragEvent) => {
      (e.currentTarget as Element)?.classList.remove('draging')
      if (overElement) {
        overElement.classList.remove('over')
      }
      srcElement = null
      overElement = null
    })

    item.addEventListener("dragenter", (e: any) => {
      e.currentTarget.classList.add('over')
    })

    item.addEventListener("dragleave", (e: any) => {
      e.currentTarget.classList.remove('over')
    })

    item.addEventListener("dragover", (e: any) => {
      e.preventDefault();
      overElement = e.currentTarget
    })

    item.addEventListener("drop", (e: any) => {
      e.preventDefault();
      swapElements(srcElement.dataset.id, overElement.dataset.id)
    })

  })
}
