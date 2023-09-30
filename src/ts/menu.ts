import { mainButton, setting } from "./elements";


// Menu Logic
export const toggleMenu = (button: HTMLElement | null, menu: Element | null | undefined): void => {
  button?.addEventListener("click", (event) => {
    menu?.classList.toggle("hide");
    button?.classList.toggle("clicked");
    event.stopPropagation();
  });
}

export const hideMenu = (menu: Element | null | undefined): void => {
  document.addEventListener("click", (event) => {
    if (!menu?.contains(event.target as Node)) {
      menu?.classList.add("hide");
      menu?.previousElementSibling?.classList.remove("clicked");
      event.stopPropagation();
    }
  });
}


mainButton.addEventListener('click', (): void => {
  if (!setting?.nextElementSibling?.classList.contains("hide")) {
    setting?.nextElementSibling?.classList.add("hide");
  }
}
)


toggleMenu(mainButton, mainButton?.nextElementSibling);
hideMenu(mainButton?.nextElementSibling);
toggleMenu(setting, setting?.nextElementSibling);
hideMenu(setting?.nextElementSibling);

