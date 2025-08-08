import { ResumeModel } from "../models/ResumeModel";
import { HeaderBlock } from "./HeaderBlock";
import { SummaryBlock } from "./SummaryBlock";
import { ExperienceBlock } from "./ExperienceBlock";
import { EducationBlock } from "./EducationBlock";
import { SkillsBlock } from "./SkillsBlock";

export interface IBlock {
  render(): HTMLElement;
}

export type BlockType =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills";

export class BlockFactory {
  createBlock(type: BlockType, m: ResumeModel): IBlock {
    switch (type) {
      case "header":
        return new HeaderBlock(m.header);

      case "summary":
        return new SummaryBlock(m.summary);

      case "skills":
        return new SkillsBlock(m.skills);

      case "experience":
        return {
          render(): HTMLElement {
            const section = document.createElement("section");
            section.className = "section experience";
            section.innerHTML = "<h2>Experience</h2>";
            for (const exp of m.experience) {
              section.appendChild(new ExperienceBlock(exp).render());
            }
            return section;
          },
        };

      case "education":
        return {
          render(): HTMLElement {
            const section = document.createElement("section");
            section.className = "section education";
            section.innerHTML = "<h2>Education</h2>";
            for (const ed of m.education) {
              section.appendChild(new EducationBlock(ed).render());
            }
            return section;
          },
        };

      default:
        throw new Error(`Unknown block type: ${type}`);
    }
  }
}
