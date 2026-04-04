import { QuestionManager, Question } from './classes/question_manager.js'
import { UIManager } from './classes/ui_manager.js';

async function main() {
  let quic_ui = document.getElementById("ui-quiz");
  let question_manager = new QuestionManager();
  let ui_manager = new UIManager();

  document.getElementById("username-submit")!.onclick = () => {
    if (!ui_manager.validate_username()) {
      window.alert("Invalid username");
      return;
    }

    ui_manager.next();
    console.log(ui_manager.current_page);
    console.log(ui_manager.pages[ui_manager.current_page]);
  };

  await question_manager.load_questions();

  question_manager.generate_questions().forEach((q: Question) => {
    let div = document.createElement("div");
    let str = "";

    str += `Question: ${q.question}\n`;
    str += `Answer: ${q.answer}\n`;
    str += `Options: ${q.options}\n`;
    str += `Category: ${q.category}\n`;
    str += `Difficulty: ${q.difficulty}\n`;

    div.innerText = str;

    quic_ui?.appendChild(div);
    quic_ui?.appendChild(document.createElement("br"));
  });
}

main()
