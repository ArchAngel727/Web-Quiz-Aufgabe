import { DIFFICULTY } from "./question_manager.js";

export class ScoreManager {
  private progress: number;
  private score: number;
  private scores: Array<number>;

  constructor() {
    this.progress = 0;
    this.score = 0;
    this.scores = [];

    this.load_scores();
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

      let num = parseInt(item) ?? [];
      this.scores.push(num);
    });
  }

  save_score(): void {
    let scores_str = "";

    this.scores.push(this.score);
    this.scores.forEach((item) => {
      scores_str += `${item},`;
    });
    scores_str.replace(/,$/g, "");

    console.log(this.score);
    console.log(this.scores);
    console.log(scores_str);

    localStorage.setItem("scores", scores_str);
  }

  get_scores(): Array<number> {
    return structuredClone(this.scores);
  }
}
