import { App } from "./classes/app.js";

async function main() {
  let app = new App();

  await app.question_manager.load_questions();
}

main()
