import { QuestionManager } from './classes/question_manager.js'
import { ScoreManager } from './classes/score_manager.js';
import { UIManager } from './classes/ui_manager.js';

export class App {
  question_manager: QuestionManager;
  ui_manager: UIManager;
  score_manager: ScoreManager;

  constructor() {
    this.question_manager = new QuestionManager();
    this.ui_manager = new UIManager();
    this.score_manager = new ScoreManager();
  }
}

async function main() {
  let app = new App();

  document.getElementById("username-submit")!.onclick = () => {
    if (!app.ui_manager.validate_username()) {
      window.alert("Invalid username");
      return;
    }

    app.ui_manager.next(app);
  };

  await app.question_manager.load_questions();

  app.ui_manager.next(app);
}

main()
