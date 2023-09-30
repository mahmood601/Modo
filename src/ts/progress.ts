export const changeProgress = (tasks: any, status: boolean) => {
  let filteredTasks = tasks.filter((task: any) => (task.status ? task : ""));
  let percent = Number.parseInt(`${filteredTasks.length !== 0 ? (filteredTasks.length * 100) / tasks.length : 0}`);

  let progress = document.getElementById("progress") as HTMLElement;
  let progressNumber = Number.parseInt(progress.dataset.progress as string)


  if (percent > progressNumber) {
    const countPlus = setInterval(() => {
      if (percent <= progressNumber) {
        clearInterval(countPlus)
      }
     progressCount(progress, progressNumber)
      progressNumber++;
    }, 20)
  }
  if (percent < progressNumber) {
    const countMin = setInterval(() => {
      if (progressNumber <= percent) {
        clearInterval(countMin)
      }
      progressCount(progress, progressNumber)
      progressNumber--;
    }, 20)
  }
}



const progressCount = (element: any, number: number): void => {
  element.style.background = `conic-gradient(var(--fav-color) ${number / 100
    }turn, var(--mode-color) 0deg)`;
  element.dataset.progress = number;

}
