import { Education } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education) {}

  render(): HTMLElement {
    const el = document.createElement("div");
    el.className = "education-item";
    el.innerHTML = `
      <strong>${this.d.degree}</strong>, ${this.d.field} — ${this.d.institution}
      <div>${this.d.graduation}</div>
    `;
    return el;
  }
}
