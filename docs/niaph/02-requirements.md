---
title: Requirements
description: Requirements to finish the NI-APH course

---

## Three main rules
- **demonstrate some degree of effort in your project**
- **prove that you have learned something**
- **have fun**

## Total evaluation
- will be collected on [grades.fit.cvut.cz](https://grades.fit.cvut.cz/)
- 100 points, 70 for the project, 30 for the exam
- to pass, you need to get:
  - 35 points from the project
  - 15 points from the exam
  - 50 points in total

## Project rules
- 1) **implement a simple web game** - whatever library or engine you use, the game must be available on the web
  - you can either use gitlab CI/CD or any service of your choosing
- 2) **the topic and technology/engine is up to you**, yet it must be approved by the lecturer
- 3) the game should have at least **one specific hook** (from either design, gameplay, or technical perspective)
  - you can create a clone of an existing game, yet there must be some improvements that would elevate the original game to the next level
- 4) the game should use ECS pattern (or any other component-oriented pattern if the library/engine you chose supports it)
- 5) you can work as an **individual** or as a **group of two** (in such a case, however, the complexity of the work should look like so)
- 6) the game, especially the implementation of its mechanics, must be your own contribution. If you use any 3rd party libraries, tools, assets, or any existing minigames as a template project, it must be documented in the README
- 7) game assets, such as images and sounds, should have **Public Domain** license or any other license that makes the assets freely available
- 8) the deadline is set for **10.1.2022**

## Recommendations
- how to start
  - analyse a few existing games
  - pick up some interesting mechanics
  - choose one mechanic that will be the most challenging from technical perspective
  - make up or download some assets (dots, squares, circles)
  - start prototyping
  - bring your gaming mechanics to the perfection
  - tidy up the gameplay and the codebase
  - prepare your game for submitting (add readme, diagrams if needed,...)
- pay your utmost attention to the technical solution, **clean code**, **meaningful commit messages**,  and polished gameplay
- if you want to build a 2D minigame and focus on the algorithmic part, **it's recommended to choose PixiJS library**, since it will be provided with many examples and minigames
  - yet, you can use any game engine you like
- it is better to submit a very simple yet polished and completed game than an ambicious but broken prototype
- some mechanics you may choose from:
  - interesting AI
  - advanced pathfinding
  - adaptive procedural generator
  - dialogue tree for event-based adventure game
  - particle systems
  - advanced steering behaviors
  - advanced randomness (Perlin Noise)
  - looting table

### Project description
- submit until 7.10.
- **make it as short and as descriptive as possible, don't submit several pages of redundant text**
- the content: your team (if you work in a group of two or as an individual), engine/library of your choosing, list of game mechanics

#### Example
- Genre: Platformer
- Library: PixiJS
- Space: 2D world, sidescroller, grid environment, 2 maps to choose from
- Objects: animated player, enemies, power-ups, weapons, platforms
- Actions
  - running, jumping over platforms, picking up power-ups, killing enemies, switching weapons
- Rules
  - player has got 2 weapons: a laser and a rifle. The laser affects the target instantly, the rifle shoots projectiles at a given speed
  - enemies spawn randomly
  - there is no exit. The goal is to survive as long as possible.
  - power-ups are falling from above. They add damage boost and extra speed to the player
- The main mechanic
  - AI behavior - enemies will jump over platforms, chasing the player, capable of avoiding projectiles

### Project implementation
- create your own repository under your username. The name should be NI-APH `gitlab.fit.cvut.cz/<username>/NI-APH`
- assign access permission (at least Reporter) to the lecturer (loginname svecadam)
- if you choose to use PixiJS or ThreeJS library for your project:
  - fork [template](https://gitlab.fit.cvut.cz/NI-APH/ecs-template) repo to your own project
  - share it with the [NI-APH 2021](https://gitlab.fit.cvut.cz/NI-APH/projects2021) group (assign membership to this group)
  - execute `npm run dev`
  - go to `localhost:1234`, you should see the skeleton project
  - skeleton is located in `src/my-game`, loaded from `view/index.html`
- your repository must contain ONLY your game and documentation in the README (or any other files that are linked from the readme)
- readme should contain the following information:
  - where the game is deployed
  - how to make the game install and run
  - **diagram of the game architecture**
  - short description and manual, if necessary

### Milestones
- **by 7.10**
  - prepare the description of your project as mentioned above
  - send it all to the lecturer **via MSTeams chat**
- **on 4.11 and 11.11** for each group respectively:
  - every team/individual will present their progress during the lab
- **by 10.1. 2022**
  - finish and submit your project
- **after 10.1. 2022**
  - prepare for the exam. The organization of the exam will be provided by the end of 2021

| Date | Description |
| ------ | ------ | 
| 7.10. | Submit project description |
| 4.11 / 11.11 | Presentation of the progress |
| 10.1. | Deadline | 
| January/February | Evaluation + exam |

## Exam requirements
- 1-on-one discussion over the semestral project and 3 theoretical questions
- the questions will be taken from the topics that are marked with orange and red bulbs in the slides
- maximum **30 points**
- **in order to pass, you must receive 15 points from the exam and 50 points in total**

## Evaluation table
- according to the Study and Examination Rules for Students of CTU 

| Grade | Range | Meaning |
| ------ | ------ | ------ |
| A | 90+ | excellent |
| B | 80-89 | very good |
| C | 70-79 | good |
| D | 60-69 | fine |
| E | 50-59 | satisfactory |
| F | 0-49 | unsatisfactory |