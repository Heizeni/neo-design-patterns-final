import { Experience } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private d: Experience) {}

  render(): HTMLElement {
    const item = document.createElement("div");
    item.className = "experience-item";
    item.innerHTML = `
      <strong>${this.d.position}</strong> — ${this.d.company}
      <div>${this.d.start} – ${this.d.end}</div>
    `;

    const projectsWrap = document.createElement("div");

    for (const p of this.d.projects) {
      const base = new ProjectBlock(p);
      const el = p.isRecent ? new HighlightDecorator(base).render() : base.render();
      projectsWrap.appendChild(el);
    }

    item.appendChild(projectsWrap);
    return item;
  }
}
