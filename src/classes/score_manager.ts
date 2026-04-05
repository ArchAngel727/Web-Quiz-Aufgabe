import { DIFFICULTY } from "./question_manager.js";

export class ScoreManager {
  private progress: number;
  private score: number;
  private percentage: number;

  constructor() {
    this.progress = 0;
    this.score = 0;
    this.percentage = 0;
  }

  get_progress() {
    return structuredClone(this.progress);
  }

  correct(dif: DIFFICULTY) {
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

    this.percentage = ((this.score / 9) * 100);
  }

  incorrect() {
    this.progress += 1;
  }
}
