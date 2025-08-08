import type { IBlock } from "../blocks/BlockFactory";

export class HighlightDecorator implements IBlock {
  constructor(private wrapped: IBlock) {}

  render(): HTMLElement {
    const el = this.wrapped.render();
    el.classList.add("highlight");
    return el;
  }
}
