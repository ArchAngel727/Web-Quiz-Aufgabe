import { App } from "./classes/app.js";

async function main() {
  let app = new App();

  await app.question_manager.load_questions();

  // app.ui_manager.goto(2, app);
}

main()
