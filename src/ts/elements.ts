export const
  mainButton: HTMLImageElement = document.getElementById("button") as HTMLImageElement,
  modeButton = document.getElementById("mode"),
  setting: HTMLElement | null = document.getElementById("setting"),
  colorsList: any = document.querySelectorAll(".colors-list li"),
  extraColor: any = document.getElementById("extra-color"),
  userImage = document.getElementById("u-image") as HTMLInputElement,
  statusList = document.querySelectorAll(".footer li"),
  taskIcon: HTMLInputElement = document.getElementById("task-icon") as HTMLInputElement,
  taskContent: HTMLInputElement = document.getElementById("task-content") as HTMLInputElement,
  inputTaskColor: HTMLInputElement = document.querySelector(".checkbox input:first-child") as HTMLInputElement,
  parentinput = inputTaskColor.parentNode as HTMLElement



