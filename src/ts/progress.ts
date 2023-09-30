export const changeProgress = (tasks: any, newTasks: any, status: boolean) => {
 let oTasks = tasks.filter((task: any) => (task.status ? task : ""));
  let nTasks = newTasks.filter((task: any) => (task.status ? task : ""));
  let percent = oTasks.length !== 0 ? (oTasks.length * 100) / tasks.length : 0;
  let newPercent = nTasks.length !== 0 ? (nTasks.length * 100) / newTasks.length : 0;

  let progress = document.getElementById("progress") as HTMLElement;


  if (status) {
    const countPlus = setInterval(() => {
      if (percent >= newPercent ) {
        clearInterval(countPlus)
      }
      // progress.style.background = `conic-gradient(var(--fav-color) ${percent / 100
      //   }turn, var(--mode-color) 0deg)`;
      // progress.dataset.progress = percent.toFixed(1);
      progressCount(progress, percent)
      percent++;
    }, 50)
  }
  if (!status) {
    const countMin = setInterval(() => {
      if (percent >= newPercent) {
        clearInterval(countMin)
      }
      progressCount(progress, newPercent)
      newPercent--;
    }, 50)
  }
}



const progressCount = (element: any, number: number): void => {
  element.style.background = `conic-gradient(var(--fav-color) ${number / 100
    }turn, var(--mode-color) 0deg)`;
  element.dataset.progress = number.toFixed(1);

}
