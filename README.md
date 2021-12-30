# APHGames Web

<p align="center">
    <img alt="NI-APH" src="./slides/logo.png" width="500">
</p>

- 🎓 intended mainly for education at FIT CTU
- 📦 built on top of [docusaurus library](https://docusaurus.io/)
- 🔥 slides and examples are built by using [parcelJS](https://parceljs.org) pipeline


## Project Structure

```
project
│   │   blog                // place for a blog... not used right now
│   │   docs                // markdown documents with instructions, tutorials, guides etc.
│   │   plugins             // some plugins
│   │   src                 // React sources with custom components and themes
│   │   static              // static files (slides and examples are copied into this folder) 
│   │   types               // additional Typescript declarations
│
│   CHANGELOG.md            // changelog
│   package.json            // npm scripts and dependencies
│   README.md               // README file
│   tsconfig.json           // typescript config (only for pre-build)
│   tslint.json             // typescript linter settings for static checking
```

## How to build this project
- clone it
- install [nodeJS](https://nodejs.org/en/download/), LTS version if possible 
- run `npm install`
- download and extract examples and slides into the static folder (create folders static/examples and static/slides):
  - examples: https://github.com/APHGames/examples/releases/download/6.3.2/release.zip
  - slides: https://github.com/APHGames/slides/releases/download/6.3.1/release.zip
- run `npm run download_data` to download external assets (examples, slides, etc.)
- run `npm run start` to run the web, navigate to `localhost:3000` 

Changelog is available [here](./CHANGELOG.md)

## Deployment

- the current version is deployed on [aphgames.io](https://aphgames.io)