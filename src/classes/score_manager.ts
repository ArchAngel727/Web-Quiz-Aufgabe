import { DIFFICULTY } from "./question_manager.js";

interface Score {
  username: string,
  score: number
}

export class ScoreManager {
  private progress: number;
  private score: number;
  private scores: Array<Score>;
  private username: string;

  constructor() {
    this.progress = 0;
    this.score = 0;
    this.scores = [];
    this.username = "";

    this.load_scores();
  }

  set_username(str: string): void {
    this.username = str;
  }

  get_progress(): number {
    return structuredClone(this.progress);
  }

  correct(dif: DIFFICULTY): void {
    this.progress += 1;

    switch (dif) {
      case DIFFICULTY.Easy:
        this.score += 1;
        break;
      case DIFFICULTY.Normal:
        this.score += 2;
        break;
      case DIFFICULTY.Hard:
        this.score += 3;
        break;
    }
  }

  incorrect(): void {
    this.progress += 1;
  }

  private load_scores(): void {
    this.scores = [];

    localStorage.getItem("scores")?.split(",").forEach((item) => {
      if (item.length === 0) {
        return;
      }

      let splt = item.split("|");
      let [username, score_str] = splt;
      let score = parseInt(score_str) ?? [];

      this.scores.push({ username: username, score: score });
    });
  }

  save_score(): void {
    let scores_str = "";

    if (this.username.length === 0) {
      console.log("No username");
      return;
    }

    let score: Score = { username: this.username, score: this.score };
    this.scores.push(score);
    this.scores.forEach((item) => {
      scores_str += `,${item.username}|${item.score}`;
    });
    scores_str = scores_str.slice(1);

    localStorage.setItem("scores", scores_str);
  }

  get_scores(): Array<Score> {
    this.load_scores();
    return structuredClone(this.scores);
  }
}
