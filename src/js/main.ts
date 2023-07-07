const mainButton: HTMLImageElement = document.getElementById('button') as HTMLImageElement,
  modeButton = document.getElementById("mode"),
  setting: HTMLElement | null = document.getElementById('setting'),
  colorsList: any = document.querySelectorAll(".colors-list li"),
  statusList = document.querySelectorAll(".footer li");

function toggleMenu(button: HTMLElement | null, menu: Element | null | undefined) {
  button?.addEventListener('click', (event) => {
    menu?.classList.toggle('hide');
    button?.classList.toggle('clicked');
    event.stopPropagation();
  });
}

function hideMenu(menu: Element | null | undefined) {
  document.addEventListener('click', (event) => {
    if (!menu?.contains(event.target as Node)) {
      menu?.classList.add('hide');
      menu?.previousElementSibling?.classList.remove('clicked')
      event.stopPropagation()
    }
  });
}

toggleMenu(mainButton, mainButton?.nextElementSibling);
hideMenu(mainButton?.nextElementSibling);
toggleMenu(setting, setting?.nextElementSibling);
hideMenu(setting?.nextElementSibling);

// start storing informations
let toStore = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value))
let fromStore = (key: any) => JSON.parse(localStorage.getItem(key) as string)
let person = { image: '', mode: '', favColor: '', tasks: [] };

let updateStorage = (image: any = person.image, mode: string = person.mode, favColor: string = person.favColor, tasks: any = person.tasks) => {
  person.image = image;
  person.favColor = favColor;
  person.mode = mode;
  person.tasks = tasks;
  toStore('person', person)
}

// start sending info to localStorage -- mode - image - favColor --
const userImage = document.getElementById('u-image') as HTMLInputElement

userImage.addEventListener('change', (event) => {
  const reader = new FileReader();
  // Convert image to base64 and store it in localStorage
  reader.readAsDataURL(userImage.files?.item(0) as Blob);

  reader.addEventListener('load', () => {
    updateStorage(reader.result, fromStore('person').mode, fromStore('person').favColor, fromStore('person').tasks)
    mainButton?.setAttribute('src', `${fromStore('person').image}`);
  });

  event.stopPropagation()
});

modeButton?.addEventListener('click', () => {
  let mode = !modeButton.classList.contains('dark') ? 'dark' : 'light'
  updateStorage(fromStore('person').image, mode, fromStore('person').favColor, fromStore('person').tasks)
})


const extraColor: any = document.getElementById('extra-color');
extraColor?.addEventListener('input', () => {
  colorsList[4].dataset.color = extraColor.value
  updateStorage(fromStore('person').image, fromStore('person').mode, extraColor.value, fromStore('person').tasks)
  document.querySelector("html")?.style.setProperty('--fav-color', extraColor.value)

})

colorsList.forEach((color: any) => {
  color.addEventListener('click', () => {
    updateStorage(fromStore('person').image, fromStore('person').mode, color.dataset.color, fromStore('person').tasks)
    document.querySelector("html")?.style.setProperty('--fav-color', color.dataset.color)
  })
})

// start handling tasks operations
// Define an object to store all task info
class Task {
  constructor(private icon: string, private id: number, private content: string, private status: boolean) {
    icon = this.icon;
    id = this.id;
    content = this.content;
    status = this.status;
  }
  get taskIcon(): string {
    return this.icon;
  }
  get taskId(): number {
    return this.id;
  }
  get taskContent(): string {
    return this.content;
  }
  get taskStatus(): boolean {
    return this.status;
  }
  set taskIcon(icon) {
    this.content = icon;
  }

  set taskId(id) {
    this.id = id;
  }
  set taskContent(content) {
    this.content = content;
  }
  set taskStatus(status) {
    this.status = status;
  }
}

type TaskModule = {
  icon: string;
  id: number;
  content: string;
  status: boolean;
}
const taskIcon: HTMLInputElement = document.getElementById('task-icon') as HTMLInputElement,
  taskContent: HTMLInputElement = document.getElementById('task-content') as HTMLInputElement,
  inputTaskColor: HTMLInputElement = document.querySelector('.checkbox input:first-child') as HTMLInputElement


let parentinput = inputTaskColor.parentNode as HTMLElement
inputTaskColor?.addEventListener('input', (e) => {
  parentinput.style.border = `2px solid ${inputTaskColor.value}`
  e.stopPropagation()
})

function renderTasks(arrayOfTasks: TaskModule[]) {
  parentinput.style.border = `2px solid var(--choosen-color)`
  document.querySelectorAll('.tasks-list li')?.forEach(element => {
    element.remove()

  });
  arrayOfTasks.forEach(task => {
    let fSpan = document.createElement('span');
    fSpan.classList.add('icon')
    fSpan.style.border = `2px solid ${task.icon}`
    fSpan.style.color = `${task.icon}`

    let p = document.createElement('p');
    p.classList.add('task-content');
    p.textContent = task.content;

    let div = document.createElement('div');
    div.classList.add('options')
    div.innerHTML = `            <span class="span-opts">•••</span>
            <ul class="options-list hide">
              <li class="edit" onclick="edit(this)">
                <i class="fa-solid fa-pencil fa-sm"></i>
                <p>Edit</p>
              </li>
              <li class="completed" onclick="makeCompleted(this)">
                <i class="fa-solid fa-check fa-sm"></i>
                <p>${task.status == false ? 'Completed' : 'Not Completed'}</p>
              </li>
              <li class="delete" onclick="deleteThis(this)">
                <i class="fa-solid fa-trash fa-sm"></i>
                <p>Delete</p>
              </li>
            </ul>
 `

    let sSpan = document.createElement('span');
    sSpan.classList.add('move-task');
    sSpan.textContent = ':::'

    let li = document.createElement('li');
    li.setAttribute('data-id', `${task.id}`)
    li.setAttribute('data-status', task.status ? 'completed' : 'not-completed');
    li.append(fSpan)
    li.append(p)
    li.append(div)
    li.append(sSpan)

    document.querySelector('.tasks-list')?.append(li);

    const opts: NodeListOf<HTMLElement> = document.querySelectorAll('.span-opts')
    opts.forEach(opt => {
      opt.addEventListener('click', () => {
        opts.forEach(op => op.nextElementSibling?.classList.add('hide'))
      }
      )

      toggleMenu(opt, opt.nextElementSibling);
      hideMenu(opt.nextElementSibling);
    });
  })
}

function findLiChild(item: any) {
  item.parentNode.classList.add('hide')
  return item.parentNode.parentNode.previousElementSibling
}

function edit(item: any) {
  let p = findLiChild(item)
  p.setAttribute('contenteditable', 'true')
  p.addEventListener('mouseleave', () => {
    p.removeAttribute('contenteditable')
    let tasksFLS = fromStore('person').tasks
    tasksFLS[p.parentNode.dataset.id].content = p.textContent
    updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasksFLS)
    renderTasks(fromStore('person').tasks)
  })
}

function setStatus(element: any, status: boolean) {
  let tasksFLS = fromStore('person').tasks
  tasksFLS[element.dataset.id].status = status
  updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasksFLS)

  renderTasks(fromStore('person').tasks)
}

function changeProgress(tasks: any) {
  let newTasks = tasks.filter((task: any) => task.status ? task : '')
  let percent = tasks.length !== 0 ? (newTasks.length * 100) / tasks.length : 0;

  let progress = document.getElementById('progress') as HTMLElement;
  progress.style.background = `conic-gradient(var(--fav-color) ${percent / 100}turn, var(--mode-color) 0deg)`
  progress.dataset.progress = percent.toFixed(1)

}

function makeCompleted(item: any) {
  let li = findLiChild(item).parentNode

  if (item.children[1].textContent == 'Not Completed') {
    setStatus(li, false)
    li.firstChild.style.bacgroundColor = fromStore('person').tasks.icon + ""
  }
  else {
    setStatus(li, true)

  }
  changeProgress(fromStore('person').tasks)


}

function deleteThis(item: any) {
  let tasksFLS = fromStore('person').tasks as [TaskModule]
  tasksFLS.splice(findLiChild(item).parentNode.dataset.id, 1)
  tasksFLS.forEach((task, index) => {
    task.id = index

  })
  updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasksFLS)
  renderTasks(fromStore('person').tasks)
  changeProgress(fromStore('person').tasks)

}


let tasks: any[] = [];
document.querySelector('.input-box')?.addEventListener('submit', (e) => {
  if (taskContent.value !== '') {


    fromStore('person') !== null ? tasks = fromStore('person').tasks : [];


    tasks.push(new Task(
      taskIcon.value,
      tasks.length,
      taskContent.value,
      false
    ))

    renderTasks(tasks);
    if (fromStore('person')) {
      updateStorage(fromStore('person').image, fromStore('person').mode, fromStore('person').color, tasks)

    }
    else {
      updateStorage(undefined, undefined, undefined, tasks)

    }
  }
  taskContent.value = ''
  e.preventDefault()
})



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
  e.stopPropagation()
  modeButton.classList.toggle("dark")
  if (modeButton.classList.contains('dark')) {
    for (const [variable, value] of darkColors) {
      document.querySelector("html")?.style.setProperty(variable, value)
    }
  }
  if (!modeButton.classList.contains('dark')) {
    for (const [variable, value] of lightColors) {
      document.querySelector("html")?.style.setProperty(variable, value)
    }
  }
}
)

/**
 * Remove a specific classes from element
 * */
function changeActive(collectionOfEle: NodeListOf<Element>, ...classes: string[]) {
  collectionOfEle.forEach(ele => {
    ele.addEventListener('click', (e: any) => {
      collectionOfEle.forEach(ele => ele.classList.remove(classes.join(' ')))
      e.target.classList.add('active')
    })
  })

}


changeActive(colorsList, 'active')
changeActive(statusList, 'active')

statusList[0].addEventListener('click', () => renderTasks(fromStore('person').tasks))
statusList[1].addEventListener('click', () => renderTasks(fromStore('person').tasks.filter((ele: any) => !ele.status ? ele : '')))
statusList[2].addEventListener('click', () => renderTasks(fromStore('person').tasks.filter((ele: any) => ele.status ? ele : '')))

if (fromStore('person')) {
  if (fromStore('person').mode == 'dark') {
    modeButton?.classList.add('dark')
    for (const [variable, value] of darkColors) {
      document.querySelector("html")?.style.setProperty(variable, value)
    }
  }

  if (fromStore('person').mode != 'dark') {
    modeButton?.classList.remove('dark')
    for (const [variable, value] of lightColors) {
      document.querySelector("html")?.style.setProperty(variable, value)
    }
  }

  if (fromStore('person').favColor) {
    document.querySelector("html")?.style.setProperty('--fav-color', fromStore('person').favColor)
  }

  changeProgress(fromStore('person').tasks)
  if (fromStore('person').image) {
    mainButton?.setAttribute('src', `${fromStore('person').image}`);

  }

  renderTasks(fromStore('person').tasks)
}
