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
