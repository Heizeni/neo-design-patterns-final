import { ResumeModel } from "../models/ResumeModel";
import type { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  render(): HTMLElement {
    const header = document.createElement("header");
    header.className = "section header";

    const contacts: string[] = [];
    if (this.d.contacts.email) contacts.push(this.d.contacts.email);
    if (this.d.contacts.phone) contacts.push(this.d.contacts.phone);
    if (this.d.contacts.location) contacts.push(this.d.contacts.location);

    header.innerHTML = `
      <h1>${this.d.fullName}</h1>
      <p>${this.d.title}</p>
      <p>${contacts.join(" • ")}</p>
    `;

    return header;
  }
}
