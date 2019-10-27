# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.22.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.9...v0.22.0) (2019-10-27)

### [0.21.9](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.8...v0.21.9) (2019-10-27)

### [0.21.8](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.7...v0.21.8) (2019-10-27)


### Features

* Added context menu button for playlist tracks (songs can be removed using this menu) ([1870fb0](https://github.com/EricLambrecht/spotify-magician/commit/1870fb0433d85bc6b9b3cc77a615da5c1a68dad6)), closes [#38](https://github.com/EricLambrecht/spotify-magician/issues/38)
* Re-implemented track adding modal ([e9dedeb](https://github.com/EricLambrecht/spotify-magician/commit/e9dedebc47df246caeb8b7e5ab58eba62806b467)), closes [#73](https://github.com/EricLambrecht/spotify-magician/issues/73)


### Bug Fixes

* Fix display of list-items with multiple lines in changelog ([7c72e8f](https://github.com/EricLambrecht/spotify-magician/commit/7c72e8fe6e815301ff3a4d07da38b33c0a1aceec)), closes [#81](https://github.com/EricLambrecht/spotify-magician/issues/81)
* Fixed playlist selection modal exceeding the screen ([bb2af34](https://github.com/EricLambrecht/spotify-magician/commit/bb2af34452414dae12c813a7e00e6b6e0180a5e2)), closes [#80](https://github.com/EricLambrecht/spotify-magician/issues/80)
* Fixed tracks not being removed correctly from track adder ([893c054](https://github.com/EricLambrecht/spotify-magician/commit/893c0543abb01e4dca36f92388bc92f26c6954d7))
* Sessions will now be properly restored if expired. User will be asked to retry though. ([c652f63](https://github.com/EricLambrecht/spotify-magician/commit/c652f63d5469399972b0a7ec353c806b858ae35f))

<a name="0.21.7"></a>
## [0.21.7](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.6...v0.21.7) (2019-10-25)


### Bug Fixes

* Fixed broken scope request ([5ab6daf](https://github.com/EricLambrecht/spotify-magician/commit/5ab6daf))



<a name="0.21.6"></a>
## [0.21.6](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.5...v0.21.6) (2019-10-25)


### Bug Fixes

* Recover from revoked app access. (user was stuck on /init before) ([57efbd4](https://github.com/EricLambrecht/spotify-magician/commit/57efbd4)), closes [#87](https://github.com/EricLambrecht/spotify-magician/issues/87)



<a name="0.21.5"></a>
## [0.21.5](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.4...v0.21.5) (2019-10-25)


### Bug Fixes

* Fix layout issues with sorting modal ([6e98d77](https://github.com/EricLambrecht/spotify-magician/commit/6e98d77))
* Fixed dropdown look on Android ([088e590](https://github.com/EricLambrecht/spotify-magician/commit/088e590))
* Improved text overflow handling on mobile screens ([1929416](https://github.com/EricLambrecht/spotify-magician/commit/1929416))



<a name="0.21.4"></a>
## [0.21.4](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.3...v0.21.4) (2019-10-25)


### Bug Fixes

* Improved mobile layout of analyzation panel ([cf1f8d3](https://github.com/EricLambrecht/spotify-magician/commit/cf1f8d3))



<a name="0.21.3"></a>
## [0.21.3](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.2...v0.21.3) (2019-10-14)


### Bug Fixes

* Handled errors are now sent to Sentry ([0f1861b](https://github.com/EricLambrecht/spotify-magician/commit/0f1861b))



<a name="0.21.2"></a>
## [0.21.2](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.1...v0.21.2) (2019-10-13)


### Bug Fixes

* Fixed changelog modal rendering issue ([f7b59fd](https://github.com/EricLambrecht/spotify-magician/commit/f7b59fd))



<a name="0.21.1"></a>
## [0.21.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.21.0...v0.21.1) (2019-10-13)


### Bug Fixes

* Aligned logo and app name position between login and loading-screen ([1b89e88](https://github.com/EricLambrecht/spotify-magician/commit/1b89e88))



<a name="0.21.0"></a>
# [0.21.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.20.5...v0.21.0) (2019-10-13)

This version introduces **persistent user sessions** and a **loading screen**!

No longer do you have to login on every reload. The session will last for the next two years as long as you don't log out ...which is not possible right now :D

The loading screen makes the app load less "flickery" and hopefully provides a better user experience than before.

### Bug Fixes

* All of the user's playlists are now fetched (instead of only 20) ([d71fa23](https://github.com/EricLambrecht/spotify-magician/commit/d71fa23)), closes [#75](https://github.com/EricLambrecht/spotify-magician/issues/75) [#47](https://github.com/EricLambrecht/spotify-magician/issues/47)


### Features

* Added 404 page ([05fef4e](https://github.com/EricLambrecht/spotify-magician/commit/05fef4e))
* Playlists will now be loaded before launching the editor ([f044519](https://github.com/EricLambrecht/spotify-magician/commit/f044519)), closes [#74](https://github.com/EricLambrecht/spotify-magician/issues/74)
* User sessions are now persisted and refreshed automatically. ([5960f2a](https://github.com/EricLambrecht/spotify-magician/commit/5960f2a)), closes [#15](https://github.com/EricLambrecht/spotify-magician/issues/15)



<a name="0.20.5"></a>
## [0.20.5](https://github.com/EricLambrecht/spotify-magician/compare/v0.20.4...v0.20.5) (2019-09-27)


### Bug Fixes

* Now.sh deployment url fix. The attempted fix in 0.20.4 was broken, too. ([aebb965](https://github.com/EricLambrecht/spotify-magician/commit/aebb965))



<a name="0.20.4"></a>
## [0.20.4](https://github.com/EricLambrecht/spotify-magician/compare/v0.20.3...v0.20.4) (2019-09-27)


### Bug Fixes

* **[NOT WORKING]** Now.sh deployment fix. The attempted fix in 0.20.3 was broken. ([2869dce](https://github.com/EricLambrecht/spotify-magician/commit/2869dce))



<a name="0.20.3"></a>
## [0.20.3](https://github.com/EricLambrecht/spotify-magician/compare/v0.20.2...v0.20.3) (2019-09-27)


### Bug Fixes

* **[NOT WORKING]** Fixed deployment url on now.sh ([6ed271c](https://github.com/EricLambrecht/spotify-magician/commit/6ed271c)) 



<a name="0.20.2"></a>
## [0.20.2](https://github.com/EricLambrecht/spotify-magician/compare/v0.20.1...v0.20.2) (2019-09-27)


### Bug Fixes

* Fixed an error in confirmation modal ([8792f72](https://github.com/EricLambrecht/spotify-magician/commit/8792f72)), closes [#62](https://github.com/EricLambrecht/spotify-magician/issues/62)



<a name="0.20.1"></a>
## [0.20.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.20.0...v0.20.1) (2019-09-25)


### Bug Fixes

* **deps:** bump eslint-utils from 1.3.1 to 1.4.2 ([#52](https://github.com/EricLambrecht/spotify-magician/issues/52)) ([ab288b4](https://github.com/EricLambrecht/spotify-magician/commit/ab288b4))
* **deps:** bump lodash.merge from 4.6.1 to 4.6.2 ([#54](https://github.com/EricLambrecht/spotify-magician/issues/54)) ([f89eb4c](https://github.com/EricLambrecht/spotify-magician/commit/f89eb4c))
* **deps:** bump lodash.mergewith from 4.6.1 to 4.6.2 ([#55](https://github.com/EricLambrecht/spotify-magician/issues/55)) ([215cb0c](https://github.com/EricLambrecht/spotify-magician/commit/215cb0c))
* **deps:** bump lodash.template from 4.4.0 to 4.5.0 ([#56](https://github.com/EricLambrecht/spotify-magician/issues/56)) ([663c284](https://github.com/EricLambrecht/spotify-magician/commit/663c284))
* **deps:** bump mixin-deep from 1.3.1 to 1.3.2 ([1730979](https://github.com/EricLambrecht/spotify-magician/commit/1730979))
* **deps:** bump vuex from 3.1.0 to 3.1.1 ([#58](https://github.com/EricLambrecht/spotify-magician/issues/58)) ([2b3e9c3](https://github.com/EricLambrecht/spotify-magician/commit/2b3e9c3))
* Removed insecurity (replaced union-value 1.0.0 with 1.0.1) ([460a317](https://github.com/EricLambrecht/spotify-magician/commit/460a317))
* Updated set-value 2.0.0 to 2.0.1 ([41c78dc](https://github.com/EricLambrecht/spotify-magician/commit/41c78dc))



<a name="0.20.0"></a>
# [0.20.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.19.1...v0.20.0) (2019-06-30)


### Bug Fixes

* "Analyze" button will now stay pressed when panel is open ([c161a03](https://github.com/EricLambrecht/spotify-magician/commit/c161a03))
* Improved mobile layout of operation panel ([b6c457c](https://github.com/EricLambrecht/spotify-magician/commit/b6c457c))
* Updated dependencies to fix security vulnerabilities ([b15181c](https://github.com/EricLambrecht/spotify-magician/commit/b15181c))


### Features

* Added "show song tempo" toggle ([0f77f92](https://github.com/EricLambrecht/spotify-magician/commit/0f77f92))



<a name="0.19.1"></a>
## [0.19.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.19.0...v0.19.1) (2019-03-05)


### Bug Fixes

* Fixed "time-of-day" format for times after 12am (next day) ([91c84f7](https://github.com/EricLambrecht/spotify-magician/commit/91c84f7))
* Fixed font of "time-of-day" input ([4c34a12](https://github.com/EricLambrecht/spotify-magician/commit/4c34a12))



<a name="0.19.0"></a>
# [0.19.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.18.1...v0.19.0) (2019-02-12)


### Bug Fixes

* One can now replace (and add) more than 100 tracks at once ([93cad92](https://github.com/EricLambrecht/spotify-magician/commit/93cad92))
* Playlist analysis now supports playlists with more than 100 tracks ([a99619e](https://github.com/EricLambrecht/spotify-magician/commit/a99619e))


### Features

* Enabled editing of collaborative playlists ([e3e352b](https://github.com/EricLambrecht/spotify-magician/commit/e3e352b))



<a name="0.18.1"></a>
## [0.18.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.18.0...v0.18.1) (2019-02-06)


### Bug Fixes

* Fixed broken shuffle ([1e006c7](https://github.com/EricLambrecht/spotify-magician/commit/1e006c7))
* Fixed min width of sort config modal ([36b3e6e](https://github.com/EricLambrecht/spotify-magician/commit/36b3e6e))



<a name="0.18.0"></a>
# [0.18.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.17.1...v0.18.0) (2019-02-06)


### Bug Fixes

* Audio feature graphs now display the correct label on hover (instead of always "Energy") ([67ba4a1](https://github.com/EricLambrecht/spotify-magician/commit/67ba4a1)), closes [#48](https://github.com/EricLambrecht/spotify-magician/issues/48)


### Features

* Made line chart tooltips more "human readable" (Added units etc.) ([1afc8b1](https://github.com/EricLambrecht/spotify-magician/commit/1afc8b1))
* Sorting by audio feature is now supported ([f0ba1f9](https://github.com/EricLambrecht/spotify-magician/commit/f0ba1f9))



<a name="0.17.1"></a>
## [0.17.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.17.0...v0.17.1) (2019-02-03)


### Bug Fixes

* Fixed broken buttons and modals on mobile devices ([459343c](https://github.com/EricLambrecht/spotify-magician/commit/459343c)), closes [#41](https://github.com/EricLambrecht/spotify-magician/issues/41) [#42](https://github.com/EricLambrecht/spotify-magician/issues/42) [#46](https://github.com/EricLambrecht/spotify-magician/issues/46)
* Fixed changelog formatting ([28f7a4f](https://github.com/EricLambrecht/spotify-magician/commit/28f7a4f))
* Fixed dropdown appearance on macOS ([8e876e1](https://github.com/EricLambrecht/spotify-magician/commit/8e876e1))
* Fixed top menu appearance on mobile screens ([be1583b](https://github.com/EricLambrecht/spotify-magician/commit/be1583b)), closes [#43](https://github.com/EricLambrecht/spotify-magician/issues/43)
* Fixed track adder window on mobile ([868a848](https://github.com/EricLambrecht/spotify-magician/commit/868a848)), closes [#45](https://github.com/EricLambrecht/spotify-magician/issues/45)



<a name="0.17.0"></a>
# [0.17.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.16.3...v0.17.0) (2019-02-02)

Version 0.17 features an extensive **redesign** of the app. This redesign includes:

- Proper track items (with album cover art)
- A completely overhauled audio feature section
- Improved "time of day" feature
- Overall UX/UI improvements for all menus

Apart from that, there were also new technical features:

### Features

* Added "Sort" feature. It allows sorting by track name, artist name, duration and popularity. ([74358c1](https://github.com/EricLambrecht/spotify-magician/commit/74358c1))
* Users can now choose which audio feature graphs they want to see. ([b2601e5](https://github.com/EricLambrecht/spotify-magician/commit/b2601e5))



<a name="0.16.3"></a>
## [0.16.3](https://github.com/EricLambrecht/spotify-magician/compare/v0.16.2...v0.16.3) (2019-01-22)


### Bug Fixes

* Audio feature graphs now properly resize on small screens ([2955482](https://github.com/EricLambrecht/spotify-magician/commit/2955482))
* Fixed general responsiveness (no clipping on small screens) ([8639cfa](https://github.com/EricLambrecht/spotify-magician/commit/8639cfa))
* Fixed playlist item not being clickable everywhere ([c51a154](https://github.com/EricLambrecht/spotify-magician/commit/c51a154))
* Improved general appearance on mobile screens ([a7fe42c](https://github.com/EricLambrecht/spotify-magician/commit/a7fe42c))



<a name="0.16.2"></a>
## [0.16.2](https://github.com/EricLambrecht/spotify-magician/compare/v0.16.1...v0.16.2) (2019-01-21)


### Bug Fixes

* Fix broken github pages deployment ([0879034](https://github.com/EricLambrecht/spotify-magician/commit/0879034))



<a name="0.16.1"></a>
## [0.16.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.16.0...v0.16.1) (2019-01-21)


### Bug Fixes

* Fixed drag & drop in firefox ([2fc7a4c](https://github.com/EricLambrecht/spotify-magician/commit/2fc7a4c)), closes [#33](https://github.com/EricLambrecht/spotify-magician/issues/33)



<a name="0.16.0"></a>
# [0.16.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.15.1...v0.16.0) (2018-10-31)


### Features

* Added tooltip to audio feature graphs ([b4cdef7](https://github.com/EricLambrecht/spotify-magician/commit/b4cdef7))



<a name="0.15.1"></a>
## [0.15.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.15.0...v0.15.1) (2018-10-28)


### Features

* Slightly altered design of audio feature graphs ([348f873](https://github.com/EricLambrecht/spotify-magician/commit/348f873))



<a name="0.15.0"></a>
# [0.15.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.14.1...v0.15.0) (2018-10-28)


### Features

* Added playlist statistics (energy, valence, danceability) ([804d0d7](https://github.com/EricLambrecht/spotify-magician/commit/804d0d7))



<a name="0.14.1"></a>
## [0.14.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.14.0...v0.14.1) (2018-10-26)

Re-deployment because of previously broken test.

<a name="0.14.0"></a>
# [0.14.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.13.1...v0.14.0) (2018-10-26)


### Features

* Added shuffle operation ([e6cd418](https://github.com/EricLambrecht/spotify-magician/commit/e6cd418))



<a name="0.13.1"></a>
## [0.13.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.13.0...v0.13.1) (2018-09-14)


### Bug Fixes

* Fixed changelog modal animation ([9d59393](https://github.com/EricLambrecht/spotify-magician/commit/9d59393))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.12.1...v0.13.0) (2018-09-11)


### Features

* Restyled tracklist ([045d038](https://github.com/EricLambrecht/spotify-magician/commit/045d038))
* Version number and changelog are now displayed inside the app ([ecba3ae](https://github.com/EricLambrecht/spotify-magician/commit/ecba3ae))
* You can now remove tracks ([cb3c800](https://github.com/EricLambrecht/spotify-magician/commit/cb3c800)), closes [#19](https://github.com/EricLambrecht/spotify-magician/issues/19)



<a name="0.12.1"></a>
## [0.12.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.12.0...v0.12.1) (2018-09-09)


### Features

* Added toast message system ([e7ee980](https://github.com/EricLambrecht/spotify-magician/commit/e7ee980))
* Made most errors appear as toast messages ([ea7cec3](https://github.com/EricLambrecht/spotify-magician/commit/ea7cec3))



<a name="0.12.0"></a>
# [0.12.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.11.0...v0.12.0) (2018-09-07)


### Bug Fixes

* Fixed a bug where selecting the first playlist was impossible ([15a253b](https://github.com/EricLambrecht/spotify-magician/commit/15a253b))
* Hide playlist selector button if no playlist is selected. ([1406a79](https://github.com/EricLambrecht/spotify-magician/commit/1406a79))


### Features

* Slightly restyled login screen ([422c11b](https://github.com/EricLambrecht/spotify-magician/commit/422c11b))



<a name="0.11.0"></a>
# [0.11.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.10.0...v0.11.0) (2018-09-07)


### Bug Fixes

* Fixed display of playlists with duplicate tracks ([4caee70](https://github.com/EricLambrecht/spotify-magician/commit/4caee70))
* Starting time: fixed hour heading indentation ([1692dfd](https://github.com/EricLambrecht/spotify-magician/commit/1692dfd))


### Features

* Users now have to choose a playlist upon startup ([4a6c15b](https://github.com/EricLambrecht/spotify-magician/commit/4a6c15b))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.9.2...v0.10.0) (2018-09-06)


### Features

* We now support modals (e.g. track adding is now a modal) ([86e88db](https://github.com/EricLambrecht/spotify-magician/commit/86e88db))



<a name="0.9.2"></a>
## [0.9.2](https://github.com/EricLambrecht/spotify-magician/compare/v0.9.1...v0.9.2) (2018-09-06)


### Bug Fixes

* Fixed drag and drop rendering (when reordering tracks) ([33710e7](https://github.com/EricLambrecht/spotify-magician/commit/33710e7))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.9.0...v0.9.1) (2018-09-06)


### Bug Fixes

* Fixed ui glitch when reordering tracks ([2ce2853](https://github.com/EricLambrecht/spotify-magician/commit/2ce2853))



<a name="0.9.0"></a>
# [0.9.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.5...v0.9.0) (2018-09-05)


### Features

* Added ability to re-order tracks! ([cef82d9](https://github.com/EricLambrecht/spotify-magician/commit/cef82d9)), closes [#5](https://github.com/EricLambrecht/spotify-magician/issues/5)



<a name="0.8.0"></a>
# [0.8.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.5...v0.8.0) (2018-09-05)


### Features

* Added ability to add tracks to the playlist ([04bae10](https://github.com/EricLambrecht/spotify-magician/commit/04bae10))


<a name="0.7.5"></a>
## [0.7.5](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.4...v0.7.5) (2018-09-03)


### Bug Fixes

* Fixed automated changelog generation (strip emojis) ([33c53e6](https://github.com/EricLambrecht/spotify-magician/commit/33c53e6))



<a name="0.7.4"></a>
## [0.7.4](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.3...v0.7.4) (2018-09-03)


### Features

* We now use emojis in our git commit messages again! ([3e87539](https://github.com/EricLambrecht/spotify-magician/commit/3e87539))



<a name="0.7.3"></a>
## [0.7.3](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.2...v0.7.3) (2018-09-02)


### Bug Fixes

* redirect user to login on "token expired" error ([8010c75](https://github.com/EricLambrecht/spotify-magician/commit/8010c75)), closes [#13](https://github.com/EricLambrecht/spotify-magician/issues/13)
* fixed error in base headline component ([779b222](https://github.com/EricLambrecht/spotify-magician/commit/779b222))
* fixed error message display for real this time (last fix was broken) ([6a5001d](https://github.com/EricLambrecht/spotify-magician/commit/6a5001d))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.1...v0.7.2) (2018-09-01)


### Bug Fixes

* fixed displayling of error messages ([d3f88af](https://github.com/EricLambrecht/spotify-magician/commit/d3f88af))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/EricLambrecht/spotify-magician/compare/v0.7.0...v0.7.1) (2018-09-01)
I accidentally commited this feature as a "bug fix". I didn't want to change the version number, though. Sorry for that. ;)

### Bug Fixes

* added option to (de-)activate relative starting time feature ([976d4c7](https://github.com/EricLambrecht/spotify-magician/commit/976d4c7))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/EricLambrecht/spotify-magician/compare/v0.6.3...v0.7.0) (2018-09-01)


### Features

* slightly altered playlist item styles ([fdf4e30](https://github.com/EricLambrecht/spotify-magician/commit/fdf4e30))
* styled header section and added playlist meta information ([98eaa12](https://github.com/EricLambrecht/spotify-magician/commit/98eaa12))



<a name="0.6.3"></a>
## [0.6.3](https://github.com/EricLambrecht/better-spotify-playlists/compare/v0.6.2...v0.6.3) (2018-08-28)


### Miscellaneous

* Removed default spotify URI from input.


<a name="0.6.2"></a>
## [0.6.2](https://github.com/EricLambrecht/better-spotify-playlists/compare/v0.6.1...v0.6.2) (2018-08-28)


### Bug Fixes

* Prevent playlist image aspect ratio from changing ([5b49f93](https://github.com/EricLambrecht/better-spotify-playlists/commit/5b49f93))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/EricLambrecht/better-spotify-playlists/compare/v0.6.0...v0.6.1) (2018-08-28)


### Bug Fixes

* Fixed error message not disappearing. Also removed tracks in case of error. ([2ba9c69](https://github.com/EricLambrecht/better-spotify-playlists/commit/2ba9c69))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/EricLambrecht/better-spotify-playlists/compare/v0.5.0...v0.6.0) (2018-08-28)


### Features

* Added a playlist dropdown for easier playlist selection ([13cb061](https://github.com/EricLambrecht/better-spotify-playlists/commit/13cb061))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/EricLambrecht/better-spotify-playlists/compare/v0.4.1...v0.5.0) (2018-08-24)


### Features

* Error messages are now shown to the user ([2c3a279](https://github.com/EricLambrecht/better-spotify-playlists/commit/2c3a279))



<a name="0.4.1"></a>
## 0.4.1 (2018-08-23)


### Bug Fixes

* Fixed spotify web api calls ([d4f76d9](https://github.com/EricLambrecht/better-spotify-playlists/commit/d4f76d9))



<a name="0.4.0"></a>
# 0.4.0 (2017-04-04)
### Features
* Added support for more than 100 tracks per playlist

<a name="0.3.0"></a>
# 0.3.0 (2017-04-03)
### Features
* Added ability to define playlist start time.
* Fixed several bugs
* Refactored code base

<a name="0.2.0"></a>
# 0.2.0 (2017-04-03)
### Features
* Adjusted icon size
* fixed callback url (to work on servers other than "localhost:8080").

<a name="0.1.0"></a>
# 0.1.0 (2017-04-03)

### Features
* First working draft.
