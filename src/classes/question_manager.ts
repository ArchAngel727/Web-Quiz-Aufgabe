export enum CATEGORY {
  Math = "Math",
  Science = "Science",
  History = "History",
  Geography = "Geography",
  Literature = "Literature",
  General_Knowledge = "General_Knowledge",
}

export enum DIFFICULTY {
  Easy = "Easy",
  Normal = "Normal",
  Hard = "Hard",
}

export interface Question {
  category: CATEGORY,
  question: string,
  options: Array<string>,
  answer: string,
  difficulty: DIFFICULTY
}

// https://stackoverflow.com/questions/2450954/
function shuffle<T>(array: Array<T>) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export class QuestionManager {
  private questions: Array<Question>;

  constructor() {
    this.questions = [];
  }

  async load_questions(): Promise<void> {
    const response = await fetch("../../questions.json");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    this.questions = (await response.json()) as Array<Question>;

    shuffle(this.questions);
  }

  get_questions(): Array<Question> {
    return structuredClone(this.questions);
  }

  generate_questions(): Array<Question> {
    let questions: Array<Question> = [];

    QuestionManager.filter_by_difficulty(this.get_questions(), DIFFICULTY.Easy).forEach((q: Question, i) => {
      if (i > 1) {
        return;
      }

      questions.push(q);
    });

    QuestionManager.filter_by_difficulty(this.get_questions(), DIFFICULTY.Normal).forEach((q: Question, i) => {
      if (i > 1) {
        return;
      }

      questions.push(q);
    });

    QuestionManager.filter_by_difficulty(this.get_questions(), DIFFICULTY.Hard).forEach((q: Question, i) => {
      if (i > 0) {
        return;
      }

      questions.push(q);
    });

    return questions;
  }

  get_question(): Question {
    let min = Math.ceil(0);
    let max = Math.floor(this.questions.length);
    let i = Math.floor(Math.random() * (max - min + 1)) + min;
    return structuredClone(this.questions[i]);
  }

  static filter_by_category(questions: Array<Question>, category: CATEGORY): Array<Question> {
    return questions.filter((q) => {
      return q.category === category;
    });
  }

  static filter_by_difficulty(questions: Array<Question>, difficulty: DIFFICULTY): Array<Question> {
    return questions.filter((q) => {
      return q.difficulty === difficulty;
    });
  }
}
