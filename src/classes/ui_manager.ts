import { App } from "../main.js";
import { Question } from "./question_manager.js";

enum Page {
  Username = 0,
  Quiz = 1,
  Result = 2
}

export class UIManager {
  private current_page: Page;
  private pages: Array<HTMLElement>;

  constructor() {
    this.current_page = Page.Username;
    this.pages = [];

    this.pages.push(document.getElementById("ui-username")!);
    this.pages.push(document.getElementById("ui-quiz")!);
    this.pages.push(document.getElementById("ui-result")!);
  }

  next(app: App) {
    this.current_page = (this.current_page + 1) % 3;
    this.update_page(app);
  }

  goto(page: Page, app: App) {
    this.current_page = page;
    this.update_page(app);
  }

  private update_page(app: App) {
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

        this.generate_card(app);

        break;
      case Page.Result:
        this.pages[0].classList.add("hidden");
        this.pages[1].classList.add("hidden");
        this.pages[2].classList.remove("hidden");

        save_score();
        load_leaderboard();

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

  private generate_card(app: App) {
    let quiz_ui = document.getElementById("ui-quiz")!;
    let div = document.createElement("div");
    let str = "";
    let question: Question = app.question_manager.get_question();

    str += `<h2>${question.question}</h2>`;
    str += `<p>${question.category} | ${question.difficulty}</p>`;
    div.innerHTML = str;

    question.options.forEach((option) => {
      let btn = document.createElement("button");

      btn.classList.add("button-bg");
      btn.innerText = option;
      btn.onclick = () => {
        if (question.answer === option) {
          app.score_manager.correct(question.difficulty);
        } else {
          app.score_manager.incorrect();
        }

        if (app.score_manager.get_progress() === 5) {
          this.next(app);
        }

        this.generate_card(app);
      };

      div.appendChild(btn);
    });

    quiz_ui.innerHTML = "";
    quiz_ui.appendChild(div);
  }
}
