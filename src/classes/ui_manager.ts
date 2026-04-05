import { Question } from "./question_manager";

enum Page {
  Username = 0,
  Quiz = 1,
  Result = 2
}

export class UIManager {
  current_page: Page;
  pages: Array<HTMLElement> = [];

  constructor() {
    this.current_page = Page.Username;

    this.pages.push(document.getElementById("ui-username")!);
    this.pages.push(document.getElementById("ui-quiz")!);
    this.pages.push(document.getElementById("ui-result")!);
  }

  next() {
    this.current_page = (this.current_page + 1) % 3;
    this.update_page();
  }

  goto(page: Page) {
    this.current_page = page;
    this.update_page();
  }

  private update_page() {
    switch (this.current_page) {
      case Page.Username:
        this.pages[0].classList.remove("hidden");
        this.pages[1].classList.add("hidden");
        this.pages[2].classList.add("hidden");
        break;
      case Page.Quiz:
        this.pages[0].classList.add("hidden");
        this.pages[1].classList.remove("hidden");
        this.pages[2].classList.add("hidden");
        break;
      case Page.Result:
        this.pages[0].classList.add("hidden");
        this.pages[1].classList.add("hidden");
        this.pages[2].classList.remove("hidden");
        break;
    }
  }

  validate_username(): boolean {
    const box = document.getElementById("username-box") as HTMLInputElement;
    const text = box.value ?? "";
    let is_valid: boolean = true;

    if (text.length === 0) {
      is_valid = false;
    }

    if (!(text.length > 3 && text.length < 21)) {
      is_valid = false;
    }

    return is_valid;
  }

  generate_card(question: Question, parent: HTMLElement) {
    let div = document.createElement("div");
    let str = "";

    str += `<h2>${question.question}</h2>`;
    str += `<p>${question.category}</p>`;
    div.innerHTML = str;

    question.options.forEach((option) => {
      let btn = document.createElement("button");

      btn.classList.add("button-bg");
      btn.innerText = option;
      btn.onclick = () => {
        this.next();
      };

      div.appendChild(btn);
    });

    parent.appendChild(div);
  }
}
