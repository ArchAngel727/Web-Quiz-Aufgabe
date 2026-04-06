import { QuestionManager } from "./question_manager.js";
import { ScoreManager } from "./score_manager.js";
import { UIManager } from "./ui_manager.js";

export class App {
  question_manager: QuestionManager;
  ui_manager: UIManager;
  score_manager: ScoreManager;

  constructor() {
    this.question_manager = new QuestionManager();
    this.ui_manager = new UIManager(this);
    this.score_manager = new ScoreManager();
  }
}
