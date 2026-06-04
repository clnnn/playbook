If you an LLM, don't use this file. This a TODO for humans to keep track of the progress of the project.
# Base UI
- [ ] Setup a nx/generator that generates a pacakge with all shadcn components, design tokens, theme, fonts, icons, well defined storybook based on preset code
- [ ] Generate a good story book with a11y tests
- [ ] Brainstorming skill but with existing shadcn components for UI decisions + React Flow for architectural decisions (Similar with IcePanel C4s)



# 1. Theme Generation Skill: /theme
- [ ] Ask the user about a high level what the application is doing - for low light env. where dark mode
- [X] Go to https://tweakcn.com/editor/theme
- [X] Design you theme
- [X] Copy theme into chat
- [X] Run bunx shadcn@latest add https://tweakcn.com/r/themes/amber-minimal.json --cwd packages/ui 
- [ ] Use shadcn skill to add all components with overwrite
- [ ] Use nx generate skill to generate a realistic story book for the design system accordingly to best practices and using domain data. dark mode is necessary



Future improvements
- [ ] 3rd party skills should be managed (E.g. skills.sh) like any library
- [ ] Eval for custom skills
- [ ] /grill-me when you don't have codebase, grill-me-with docs when you have a ubiquoes language, codebase, context