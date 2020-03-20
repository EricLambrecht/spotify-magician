## Contributing to Spotify Magician

All contributions are welcome!

We use ECMAScript 2018 in this project. So please use _async/await_ instead of _Promises_ and
feel free to make use of the newest Javascript features whenever it makes sense. See
([Code Style](#code-style) for further information).

This project uses's [Vue](https://vuejs.org/)'s _single-file-components_.
They are parsed and bundled with [webpack](https://webpack.js.org)
(see [docs for vue-loader](http://vuejs.github.io/vue-loader)).

### Code Style

This project uses [Prettier](https://prettier.io). You can let _Prettier_ format everything
on save using a watcher, there is no pre-commit hook. _eslint_ is also set up of course.

You should use [eslint](https://eslint.org/) to check your code before you commit it to avoid code style errors:

```bash
npm run lint
```

You can also configure your editor or IDE to use _eslint_ (and _Prettier_) and check your code during development.

### Testing

Use `ComponentName.test.js` to write unit tests for a component. This project uses _Jest_ + _Vue test utils_.

Run tests with

```bash
npm run test
```

### Commiting changes

**Please commit your changes in the [conventional commit format](https://conventionalcommits.org/).**

You can't do anything wrong if you use 

```bash
npm run commit # ...or yarn commit
```

to commit changes. It will run _commitizen_. 

This will also guarantee that your commits can be used to _automatically_ generate new changelog entries.
You can release a new app version (and update the changelog) by running `npm run release`.

### New Features

Please create _feature branches_ and make a pull request to **master** if you want to implement new features.

### Deployment

All releases (i.e. tagged commits) on master will be automatically deployed to [now.sh](https://zeit.co/docs)!

|Staging                                         | Production                                     |
|------------------------------------------------|------------------------------------------------|
|[https://spotify-magician.ericlambrecht.now.sh] | [https://spotify-magician.ericlambrecht.now.sh]|


We have an automated deployment pipeline using [Github Workflows](https://help.github.com/en/github/automating-your-workflow-with-github-actions/configuring-a-workflow).
You can monitor the current build status in the "Actions" tab or next to every commit.
