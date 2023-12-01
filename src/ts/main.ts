import './menu'
import './storage'
import './renderer'
import './dargAndDrop'
import './notifications'
import { fromStore, toStore } from './storage'
import { renderTasks } from './renderer'
import {
  mainButton,
  modeButton,
  colorsList,
  statusList,
  extraColor,
  taskIcon,
  taskContent,
  inputTaskColor,
  parentinput,
  userImage,
} from "./elements";



// start sending info to localStorage -- mode - image - favColor
export interface Task {
  icon: string;
  id: number;
  content: string;
  status: boolean;
}


// Start Handling Image
document.addEventListener("DOMContentLoaded", async () => {

  const image = await fromStore("image")
  if (image == undefined) {
    await toStore("image", "")
  }
  if (image !== "") {
    mainButton?.setAttribute("src", image);
  } else {
    mainButton?.removeAttribute("src");
  }

  userImage.addEventListener("change", (event) => {
    const reader = new FileReader();
    // Convert image to base64 and store it in localStorage
    reader.readAsDataURL(userImage.files?.item(0) as Blob);

    reader.addEventListener("load", async () => {
      await toStore("image", reader.result)
      mainButton?.setAttribute("src", `${reader.result}`);
    });

    event.stopPropagation();
  });

  const mode = await fromStore("mode")

  if (mode == undefined) {
    await toStore("mode", "")
  }

  modeButton?.addEventListener("click", () => {
    let mode = !modeButton?.classList.contains("dark") ? "dark" : "light";
    toStore("mode", mode)
  });

  // start handling tasks operations
  const tasks = await fromStore("tasks")

  if (tasks == undefined) {
    await toStore("tasks", [])
  }

  fromStore("tasks").then((tasks: Task[]) => {
    if (tasks && tasks != undefined) {
      renderTasks(tasks, true);

    }
  })

  // Define an object to store all task info
  inputTaskColor?.addEventListener("input", (e) => {
    parentinput.style.border = `2px solid ${inputTaskColor.value}`;
    e.stopPropagation();
  });

  document.querySelector(".input-box")?.addEventListener("submit", async (e) => {
    if (taskContent.value !== "") {
      e.preventDefault();

      const tasks = await fromStore("tasks")

      const updatedTasks = [...tasks, {
        icon: taskIcon.value,
        id: tasks.length,
        content: taskContent.value,
        status: false
      }]

      toStore("tasks", updatedTasks)

      renderTasks(updatedTasks, true)
    }
    taskContent.value = "";
  });

  fromStore("fav-color").then((colorIdb: string) => {
    colorsList.forEach((color: HTMLElement) => {
      color.classList.remove("active")
      if (colorIdb == color.dataset.color) {
        color.classList.add("active")
      }
    })
  })


  const favColor = await fromStore("fav-color")

  if (favColor == undefined) {
    await toStore("fav-color", "")
  } else {
    document
      .querySelector("html")
      ?.style.setProperty("--fav-color", favColor);
  }

  extraColor?.addEventListener("input", () => {
    colorsList[4].dataset.color = extraColor.value;
    toStore("fav-color", extraColor.value)

    document
      .querySelector("html")
      ?.style.setProperty("--fav-color", extraColor.value);
  });

  colorsList.forEach((color: any) => {
    color.addEventListener("click", () => {
      toStore("fav-color", color.dataset.color)
      document
        .querySelector("html")
        ?.style.setProperty("--fav-color", color.dataset.color);
    });
  });

  const darkColors = new Map();
  const lightColors = new Map();

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

  modeButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    modeButton?.classList.toggle("dark");
    if (modeButton?.classList.contains("dark") == true) {
      for (const [variable, value] of darkColors) {

        document.querySelector("html")?.style.setProperty(variable, value);
      }
    }
    if (modeButton?.classList.contains("dark") == false) {
      for (const [variable, value] of lightColors) {
        document.querySelector("html")?.style.setProperty(variable, value);
      }
    }
  });

  
// Remove a specific classes from element

  function changeActive(
    collectionOfEle: NodeListOf<Element>,
    ...classes: string[]
  ) {
    collectionOfEle.forEach((ele) => {
      ele.addEventListener("click", (e: any) => {
        collectionOfEle.forEach((ele) => ele.classList.remove(classes.join(" ")));
        e.target.classList.add("active");
      });
    });
  }

  changeActive(colorsList, "active");
  changeActive(statusList, "active");

  statusList[0].addEventListener("click", async () => {
    const tasks = await fromStore("tasks")
    renderTasks(tasks, false)
  })

  statusList[1].addEventListener("click", async () => {
    const tasks = await fromStore("tasks")
    renderTasks(
      tasks.filter((ele: any) => (!ele.status ? ele : "")),
      false
    )
  });


  statusList[2].addEventListener("click", async () => {
    const tasks = await fromStore("tasks")
    renderTasks(
      tasks.filter((ele: any) => (ele.status ? ele : "")),
      false)
  });

  fromStore("mode").then((mode: string) => {
    if (mode == "dark") {
      modeButton?.classList.add("dark");
      for (const [variable, value] of darkColors) {
        document.querySelector("html")?.style.setProperty(variable, value);
      }
    }

    if (mode != "dark") {
      modeButton?.classList.remove("dark");
      for (const [variable, value] of lightColors) {

        document.querySelector("html")?.style.setProperty(variable, value);
      }
    }
  })

})


