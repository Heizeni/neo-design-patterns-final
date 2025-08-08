import { Skills } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section skills";
    sec.innerHTML = "<h2>Skills</h2>";

    const list = document.createElement("ul");
    list.className = "skills-list";

    for (const [category, items] of Object.entries(this.d)) {
      const li = document.createElement("li");
      const title = category[0].toUpperCase() + category.slice(1);
      li.innerHTML = `<strong>${title}:</strong> ${items.join(", ")}`;
      list.appendChild(li);
    }

    sec.appendChild(list);
    return sec;
  }
}
