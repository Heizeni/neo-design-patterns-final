import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  protected validate(): void {
    if (!this.raw || typeof this.raw !== "object") {
      throw new Error("Resume JSON is empty or invalid");
    }

    const r = this.raw as Record<string, unknown>;
    const required = ["header", "summary", "experience", "education", "skills"] as const;

    for (const key of required) {
      if (!(key in r)) {
        throw new Error(`Missing required block: ${key}`);
      }
    }

    const exp = (r["experience"] as unknown) as unknown[];
    const edu = (r["education"] as unknown) as unknown[];

    if (!Array.isArray(exp)) throw new Error("experience must be an array");
    if (!Array.isArray(edu)) throw new Error("education must be an array");
  }

  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content");
    if (!root) throw new Error("#resume-content not found");
    root.innerHTML = "";

    const factory = new BlockFactory();
    root.appendChild(factory.createBlock("header", model).render());
    root.appendChild(factory.createBlock("summary", model).render());
    root.appendChild(factory.createBlock("experience", model).render());
    root.appendChild(factory.createBlock("education", model).render());
    root.appendChild(factory.createBlock("skills", model).render());
  }
}
