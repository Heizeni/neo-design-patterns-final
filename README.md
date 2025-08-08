# neo-design-patterns-final

## Резюме з патернами (Facade, Template Method, Factory Method, Composite, Decorator)

Самодостатня HTML‑сторінка резюме, яка динамічно будується з одного джерела даних — resume.json.
Проєкт демонструє застосування 5 патернів проєктування:

Facade — спрощений вхід у систему генерації резюме

Template Method — стабільний алгоритм імпорту (validate → map → render)

Factory Method — інкапсульоване створення блоків резюме

Composite — вкладені проєкти в елементах досвіду

Decorator — динамічне підсвічування нещодавніх проєктів

## Структура

/
├── index.html
├── public/
│   ├── styles.css        
│   └── resume.json       
├── src/
│   ├── main.ts           
│   ├── facade/
│   │   └── ResumePage.ts
│   ├── importer/
│   │   ├── AbstractImporter.ts
│   │   └── ResumeImporter.ts
│   ├── block/
│   │   ├── BlockFactory.ts
│   │   ├── HeaderBlock.ts
│   │   ├── SummaryBlock.ts
│   │   ├── ExperienceBlock.ts
│   │   ├── ProjectBlock.ts
│   │   ├── EducationBlock.ts
│   │   └── SkillsBlock.ts
│   ├── decorators/
│   │   └── HighlightDecorator.ts
│   └── models/
│       └── ResumeModel.ts
├── vite.config.js
├── tsconfig.json
└── package.json

## Як запустити

npm install
npm run dev       
npm run build     
npm run preview   

## Додаванная нового блоку (наприклад "Certificates")

1. Створити типу моделі:

ResumeModel.ts

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
}

export interface ResumeModel {
  // ...
  certificates?: Certificate[];
}

2. Створити клас блоку:

CertificatesBlock.ts

import { IBlock } from "./BlockFactory";
import { Certificate } from "../models/ResumeModel";

export class CertificatesBlock implements IBlock {
  constructor(private items: Certificate[] = []) {}

  render(): HTMLElement {
    const sec = document.createElement("section");
    sec.className = "section certificates";
    sec.innerHTML = "<h2>Certificates</h2>";

    this.items.forEach(c => {
      const div = document.createElement("div");
      div.className = "certificate-item";
      div.textContent = `${c.title} — ${c.issuer} (${c.year})`;
      sec.appendChild(div);
    });

    return sec;
  }
}

3. Додати одну гілку у фабрику:

BlockFactory.ts

import { CertificatesBlock } from "./CertificatesBlock";
// ...
export type BlockType =
  | "header" | "summary" | "experience" | "education" | "skills" | "certificates";

export class BlockFactory {
  createBlock(type: BlockType, m: ResumeModel): IBlock {
    switch (type) {
      // ... інші кейси
      case "certificates":
        return {
          render() {
            return new CertificatesBlock(m.certificates ?? []).render();
          },
        };
      default:
        throw new Error(`Unknown block type: ${type}`);
    }
  }
}

4. Дані у json:

resume.json

"certificates": [
  { "title": "AWS Certified Cloud Practitioner", "issuer": "AWS", "year": "2024" },
  { "title": "Google UX Certificate", "issuer": "Google", "year": "2023" }
]


