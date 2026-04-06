import { App } from "./app.js";
import { Question } from "./question_manager.js";

enum Page {
  Username = 0,
  Quiz = 1,
  Result = 2
}

export class UIManager {
  private current_page: Page;
  private pages: Array<HTMLElement>;

  constructor(app: App) {
    this.current_page = Page.Username;
    this.pages = [];
    const box = document.getElementById("username-box") as HTMLInputElement;

    this.pages.push(document.getElementById("ui-username")!);
    this.pages.push(document.getElementById("ui-quiz")!);
    this.pages.push(document.getElementById("ui-result")!);

    document.getElementById("username-submit")!.onclick = () => {
      const username = box.value ?? "";
      if (!this.validate_username(username)) {
        window.alert("Invalid username");
        return;
      }

      app.score_manager.set_username(username);
      this.next(app);
    };
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

        app.score_manager.save_score();
        this.load_leaderboard(app);

        break;
    }
  }

  validate_username(str: string): boolean {
    let is_valid: boolean = true;

    if (str.length === 0) {
      is_valid = false;
    }

    if (!(str.length > 3 && str.length < 21)) {
      is_valid = false;
    }

    return is_valid;
  }

  private generate_card(app: App): void {
    let quiz_ui = document.getElementById("ui-quiz")!;
    let div = document.createElement("div");
    let str = "";
    let question: Question = app.question_manager.get_question();

    if (question === null || question === undefined) {
      console.log("how?");
    }

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

  private load_leaderboard(app: App): void {
    let leaderboard = document.getElementById("ui-result")!;
    app.score_manager.get_scores().forEach((score) => {
      console.log(score);
      leaderboard.innerHTML += `<p>${score.username} | ${score.score}</p>`;
    });
  }
}
