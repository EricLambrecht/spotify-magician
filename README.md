[![Build Status](https://travis-ci.org/EricLambrecht/spotify-magician.svg?branch=master)](https://travis-ci.org/EricLambrecht/spotify-magician)
[![dependencies Status](https://david-dm.org/ericlambrecht/spotify-magician/status.svg)](https://david-dm.org/ericlambrecht/spotify-magician)
[![devDependencies Status](https://david-dm.org/ericlambrecht/spotify-magician/dev-status.svg)](https://david-dm.org/ericlambrecht/spotify-magician?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Spotify Magician

> A playlist editor for Spotify

**Live App:**
[https://spotify-magician.now.sh](https://spotify-magician.now.sh)

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

```bash
# install dependencies
npm install

# serve app with hot module reloading on localhost:8080
npm run start
```

## Contributing

We use ECMAScript 2018 in this project. So please use _async/await_ instead of _Promises_ and
feel free to make use of the newest Javascript features whenever it makes sense. See
([Code Style](#code-style) for further information).

This project uses's [Vue](https://vuejs.org/)'s _single-file-components_.
They are parsed and bundled with [webpack](https://webpack.js.org)
(see [docs for vue-loader](http://vuejs.github.io/vue-loader)).

### Code Style

We use the [airbnb code style](https://github.com/airbnb/javascript) and the
recommended [Vue code styles](https://github.com/vuejs/eslint-plugin-vue).

You should use [eslint](https://eslint.org/) to check your code before you commit it to avoid code style errors:

```bash
npm run lint
```

You can also configure your editor or IDE to use _eslint_ and check your code during development.

### Commiting changes

**Please commit your changes in the [conventional commit format](https://conventionalcommits.org/).**

I recommend to use _commitizen_ (which is included in our dev-dependencies). It will help you to write
your commit messages in this format. There is an npm script to launch commitizen (`npm run commit`) - but
make sure to stage your changes beforehand with `git add`.

This will also guarantee that your commits can be used to _automatically_ generate new changelog entries.
You can release a new app version (and update the changelog) by running `npm run release`.

### New Features

Please create _feature branches_ and make a pull request to **master** if you want to implement new features.

### Deployment

All releases (i.e. tagged commits) on master will be automatically deployed to github pages!

We have an automated deployment pipeline on Travis CI. You can monitor the current build status
[here](https://travis-ci.org/EricLambrecht/spotify-magician) (or by clicking on the build status badge at the top).
