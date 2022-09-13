## [1.0.0-development.2](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0-development.1...1.0.0-development.2) (2022-09-13)


### :bug: Bug Fixes

* **api:** fix error type for axios interceptor in '/api/auth/login' endpoint ([06e4f3b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/06e4f3b1866d6743ba1f39285fa01567d08c9623))


### :sparkles: Features

* **api:** add api endpoint '/api/auth/login' ([b29d5fd](https://github.com/Clumsy-Coder/pihole-dashboard/commit/b29d5fd916058011e326595b629c361c605acd67))
* **api:** add API endpoint '/api/auth/logout' ([46a8488](https://github.com/Clumsy-Coder/pihole-dashboard/commit/46a848825a4a05a7ce0b8dd7192bc949501a8069))
* **api:** add API endpoint '/api/auth/session' ([b0e765e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/b0e765e5cd933b7b7fb3b02610c4b3207ffacd87))
* **api:** create helper functions for 'iron-session' ([bd840b7](https://github.com/Clumsy-Coder/pihole-dashboard/commit/bd840b7f28e96b6c125f93189c7f71cfc87af7c3))
* **api:** load 'port' from endpoint '/api/auth/login' ([5839d5b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5839d5b1f1d76e53c8ac93bfb47656ff814d8aca))
* **api:** send response based on axios error for api '/api/auth/login' ([278fb68](https://github.com/Clumsy-Coder/pihole-dashboard/commit/278fb685c67b6cf0dbeeb73b6bbc0d0335ca803b))
* **api:** store authenticated credentials to an encrypted session cookie ([30f452e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/30f452e1e08dc3270945bdbbbab85ff79d19f476))
* **component:** add 'Logout' page link ([f43a374](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f43a37441d79dbcdc4d22620f62ee96aa8b6d002))
* **component:** add component 'LoginForm' ([02fa2a3](https://github.com/Clumsy-Coder/pihole-dashboard/commit/02fa2a3d5e143dc14fa2f90d30135748f220e699))
* **component:** add component for rendering authenticated Drawer items ([8158168](https://github.com/Clumsy-Coder/pihole-dashboard/commit/8158168897d49149d4c18807bac23e352e3fc5e9))
* **component:** display error message for LoginForm after HTTP request ([551579f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/551579f07696079a95abae24d422b0229c7bb9d5))
* **component:** display loading when authenticating LoginForm ([45a28e8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/45a28e85546ea343574abd440e670bd10f366c5b))
* **component:** display pi-hole ip address and port when authenticated ([fc3e7d8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/fc3e7d804faef0379125c03dc4c8684f32506864))
* **component:** go to page '/' after logging in ([296803a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/296803a6424307df2604a6eff7afacee63b42e64))
* **component:** provide Redux store to the entire app ([331ac01](https://github.com/Clumsy-Coder/pihole-dashboard/commit/331ac0120c0612d5714ed3c5fae6a73ca69a3e9f))
* **component:** render Authenticated drawer items when the user's logged in ([6ccc90f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/6ccc90f25e4a03e6be9da8dc1da7868be1343b8c))
* **lib:** add helper functions to load protected page routes ([08b8eeb](https://github.com/Clumsy-Coder/pihole-dashboard/commit/08b8eeb1befcf7ff463f0c5a177f5be2405f5ff3))
* **page:** add 'login' page ([4c37c99](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4c37c99abda3321a3ff4c836307a8e7fb34a32a3))
* **page:** redirect Home page to Login page IF not logged in ([13cc049](https://github.com/Clumsy-Coder/pihole-dashboard/commit/13cc049c1668753a32194245e4c82db77303ffa9))
* **page:** redirect login page to Home page if the user is logged in ([ca0f03d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/ca0f03dc308bf03c48c53ffca52d3c6671e0461f))
* **redux:** add API queries for AuthSession using Redux Toolkit Query ([c942d60](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c942d6060c6e81faa0ee392e7fe3f42822d56481))
* **redux:** create Redux store ([c20f620](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c20f620b29fd291dcc978f584fb029d39b6b90dd))
* **redux:** create Redux toolkit query API ([f0d2d2b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f0d2d2b4be4583085909a8cc3db6583e52a156fa))
* **url:** add API url for pi-hole API endpoints ([607fe3e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/607fe3eab1258481bf2d291ce4fa2dbf8ab0edfb))

## 1.0.0-development.1 (2022-08-22)


### :sparkles: Features

* **component:** add 'AppBar' component ([64f7d9d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/64f7d9d4050febfa97688e61c1adb17289c5baee))
* **component:** add 'Drawer' component ([e451b58](https://github.com/Clumsy-Coder/pihole-dashboard/commit/e451b58c22afb0d24eaaa6da66d890a1fca4a729))
* **component:** add helper object to manage pages ([eb60db1](https://github.com/Clumsy-Coder/pihole-dashboard/commit/eb60db1b4139ed61d4df5b13922408db242badbb))
* **component:** offset main content to right by drawer width ([5c40ce2](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5c40ce251447553b300d46c519605086ad9391e8))
* **component:** render 'AppBar' in the app ([8d9afa0](https://github.com/Clumsy-Coder/pihole-dashboard/commit/8d9afa00ce6ce61196a3f9f8b3b9bc1448ccb26c))
