import { QuestionManager } from './classes/question_manager.js'
import { UIManager } from './classes/ui_manager.js';


async function main() {
  let quiz_ui = document.getElementById("ui-quiz")!;
  let question_manager = new QuestionManager();
  let ui_manager = new UIManager();

  document.getElementById("username-submit")!.onclick = () => {
    if (!ui_manager.validate_username()) {
      window.alert("Invalid username");
      return;
    }

    ui_manager.next();
  };

  await question_manager.load_questions();

  ui_manager.generate_card(question_manager.get_questions()[0], quiz_ui);

  ui_manager.next();
}

main()
