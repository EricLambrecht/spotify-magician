[![Build Status](https://travis-ci.org/EricLambrecht/better-spotify-playlists.svg?branch=master)](https://travis-ci.org/EricLambrecht/better-spotify-playlists)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# spotify-magician

> A spotify playlist editor

**Live App on Github Pages:** 
[http://ericlambrecht.github.io/better-spotify-playlists](http://ericlambrecht.github.io/better-spotify-playlists)

This project is an attempt to improve the playlist editing (and visualization)
capabilities of Spotify. So far, this is a purely client based web app. It's built 
with [VueJS](https://vuejs.org/) and the 
[Spotify Web API](https://developer.spotify.com/documentation/web-api/) (using 
[this](https://github.com/JMPerez/spotify-web-api-js) wrapper).


## Build Setup

You will need the following tools if you want to setup this project locally:

- [Node](https://nodejs.org/en/download/)
- npm >= 5.2 (comes with Node)

Install packages and run a local development server using the following npm scripts:

``` bash
# install dependencies
npm install

# serve app with hot module reloading on localhost:8080
npm run start
```


## Contributing

We use ECMAScript 2018 in this project. So please use *async/await* instead of *Promises* and 
feel free to make use of the newest Javascript features whenever it makes sense. See 
([Code Style](#code-style) for further information). 

This project uses's [Vue](https://vuejs.org/)'s *single-page-components*. 
They are parsed and bundled with [webpack](https://webpack.js.org) 
(see [docs for vue-loader](http://vuejs.github.io/vue-loader)).

### Code Style

We use the [airbnb code style](https://github.com/airbnb/javascript) and the 
recommended [Vue code styles](https://github.com/vuejs/eslint-plugin-vue).

You should use [eslint](https://eslint.org/) to check your code before you commit it to avoid code style errors:

```bash
npm run lint
```

You can also configure your editor or IDE to use *eslint* and check your code during development.

### Commiting changes

Please use *commitizen* if you want to commit any changes and try to be as specific as necessary.

You can run the following command to commit your changes with commitizen:
```bash
npm run commit
```

This will also guarantee that your commits can be used to automatically generate new changelog entries.
You can release a new app version (and update the changelog) if you run:

```bash
npm run release
```

### New Features

Please create feature branches and make a pull request to *master* if you want to implement new features.

### Deployment
All changes on master will be automatically deployed to github pages!

We have an automated deployment pipeline on Travis CI. You can monitor the current build status 
[here](https://travis-ci.org/EricLambrecht/better-spotify-playlists) (or by clicking on the build status badge at the top).
