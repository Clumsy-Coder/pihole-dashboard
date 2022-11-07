## [1.0.0-development.3](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0-development.2...1.0.0-development.3) (2022-11-07)


### :bug: Bug Fixes

* **component:** fetching number of entries for `topBlockedClientQueries` and fetch polling ([a7b1035](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a7b1035b1edcc7522c74ff88e534c2c730fe648b))
* **component:** offsetting content when drawer is visible ([cef49fb](https://github.com/Clumsy-Coder/pihole-dashboard/commit/cef49fb83baaf92c5c217c9c06685ecabebabe0a))
* **component:** set link address if `ipAddress` is not provided for `TopBlockedClientsQueries` ([87d7f09](https://github.com/Clumsy-Coder/pihole-dashboard/commit/87d7f093f5485ad437c3860f50f10eb0ef285d43))
* **page:** load favicon when running NextJS in production mode ([290ed3a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/290ed3a07716d377becf41831e3a0cfb70a5b862))


### :sparkles: Features

* **api:** add API endpoint '/api/auth/unauthorized' ([5a41acc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5a41accd4b68a9a163fe289d8b20d0c35587c773))
* **api:** add API endpoint for '/api/summary' with formatted data ([906734f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/906734f34f855fcca2f9419f9a0348b5e75ed8b3))
* **api:** add API endpoint for '/api/summary' with raw data ([bf14fd7](https://github.com/Clumsy-Coder/pihole-dashboard/commit/bf14fd7ab9f56fecd6c2e74adf517405d857ea43))
* **api:** add NextJS 'GET' API endpoint for '/api/forwardedDestinations' ([a80a56a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a80a56abdfeeee22a6bf37f083b43141a82876a8))
* **api:** add NextJS 'GET' API endpoint for '/api/queries/topBlocked' ([dc37c41](https://github.com/Clumsy-Coder/pihole-dashboard/commit/dc37c4128fdd3ba93fe172844b1753985b07c83d))
* **api:** add NextJS 'GET' API endpoint for '/api/queries/topPermitted' ([c0ef177](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c0ef17754c81b4cd02e0de0d54b56775061da5c0))
* **api:** add NextJS 'GET' API endpoint for '/api/queryTypes' ([98d9281](https://github.com/Clumsy-Coder/pihole-dashboard/commit/98d9281ac13e9ee4e3d17668a77d0997a16587fa))
* **api:** add NextJS 'GET' API endpoint for `/api/queries/clients/topAllowed` ([bf0a0b2](https://github.com/Clumsy-Coder/pihole-dashboard/commit/bf0a0b2001a8ca3a7377303aedb2b56ffa69425f))
* **api:** add NextJS 'GET' API endpoint for `/api/queries/clients/topBlocked` ([914e70a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/914e70a1951fe3091cf4c78597d8c4f18009c23e))
* **api:** add NextJS 'GET' API endpoint for `/api/queries/overtime?formatted=true` ([58a99fa](https://github.com/Clumsy-Coder/pihole-dashboard/commit/58a99fa22bca82a600d96b15b5f0a5ed3756e112)), closes [/github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js#L219-L286](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js/issues/L219-L286)
* **api:** add NextJS 'GET' API endpoint for `/api/queries/overtime` ([4b8f45d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4b8f45dda7b78551ac87e5ede973688146915f32))
* **api:** add NextJS `GET` API endpoint for `/api/queries/clients/overtime?formatted=true` ([5d0c2ee](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5d0c2ee1777f2731268104f2dab02610c55b4d17)), closes [/github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js#L330-L417](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js/issues/L330-L417)
* **api:** add NextJS `GET` API endpoint for `/api/queries/clients/overtime` ([46e0f51](https://github.com/Clumsy-Coder/pihole-dashboard/commit/46e0f511ef0ffd6be9e130f030857307c3e6ecb2))
* **component:** add Bar chart to display clients overtime in the last 24 hours ([9676bc5](https://github.com/Clumsy-Coder/pihole-dashboard/commit/9676bc5d44c72d97273d91a7ffe38fc571e01f3c)), closes [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js#L71-L73](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js/issues/L71-L73) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L953-L1047](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L953-L1047) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L1081-L1102](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L1081-L1102)
* **component:** add Bar chart to display queries overtime in 24 hours ([0cfd0e9](https://github.com/Clumsy-Coder/pihole-dashboard/commit/0cfd0e9b09ad06feaa8c28d18516d7c134bbc6ee)), closes [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js#L71-L73](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js/issues/L71-L73) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L858-L900](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L858-L900) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L1059-L1079](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L1059-L1079)
* **component:** add chart to render Forwarded destinations ([64cb0a7](https://github.com/Clumsy-Coder/pihole-dashboard/commit/64cb0a733b60ced16088e66ab39620b3a6aec801))
* **component:** add chart to render Query Types ([0ee20cf](https://github.com/Clumsy-Coder/pihole-dashboard/commit/0ee20cf4d90462128be379fb432eae2792a9b8e0))
* **component:** add component 'Summary' ([ec87580](https://github.com/Clumsy-Coder/pihole-dashboard/commit/ec87580b51b7b7f3b552652ad4b2fb3b05f456e1))
* **component:** add property 'numeric' to Pi-hole IP address text field ([62c52fc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/62c52fcdf13788c5efd4853ed8168fc6851235b6))
* **component:** add table to display top blocked queries ([80f3eb8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/80f3eb8cff37cc3ea6e7f68f2612ac894278f9b5))
* **component:** add table to display top clients allowed queries ([75c9cce](https://github.com/Clumsy-Coder/pihole-dashboard/commit/75c9cce1e45e033df8eb1a9d9deada6b703fc435))
* **component:** add table to display top clients blocked queries ([ff3f0d0](https://github.com/Clumsy-Coder/pihole-dashboard/commit/ff3f0d050f4b7fa3626d14adb7304f126c98579f))
* **component:** add table to display top permitted queries ([cdea617](https://github.com/Clumsy-Coder/pihole-dashboard/commit/cdea61788e6f9223b9151f62be2130a01b2ca6d8))
* **component:** redirect to Login page if AuthSession has expired ([469728a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/469728a68f431c38ab256fef0acb0f506b37ad0c))
* **component:** render Skeleton for component 'Summary' when loading data ([fa21f02](https://github.com/Clumsy-Coder/pihole-dashboard/commit/fa21f02631c4ed205609e093d410c3ea4a7046c6))
* **component:** use custom colours for 'ForwardDestinations' component ([a91d635](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a91d6359bd0ef6f929e0c0b7d334478a1a957cfb))
* **lib:** add function 'isApiAuthenticated' ([d8eec93](https://github.com/Clumsy-Coder/pihole-dashboard/commit/d8eec935edc8713a62434a3f3ccc0b7c2e63e706))
* **middleware:** add api route '/api/queries/topBlocked' to NextJS middleware ([6ee5016](https://github.com/Clumsy-Coder/pihole-dashboard/commit/6ee50169aeec3e5ff0baaaa82a3e8ae6a984e6ad))
* **middleware:** add api route '/api/queries/topPermitted' to NextJS middleware ([a96ba5f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a96ba5ff698719ee321b96eae1e8af1c37e0c7ad))
* **middleware:** add api route '/api/queryTypes' to NextJS middleware ([37d59bb](https://github.com/Clumsy-Coder/pihole-dashboard/commit/37d59bb7d4e101621bcca48d169635d55fc3f877))
* **middleware:** add api route `/api/queries/clients/topAllowed` to NextJS middleware ([6104e26](https://github.com/Clumsy-Coder/pihole-dashboard/commit/6104e26767b3c993d464db59c5357b44d1ec30f7))
* **middleware:** add api route `/api/queries/clients/topBlocked` to NextJS middleware ([3c49bd0](https://github.com/Clumsy-Coder/pihole-dashboard/commit/3c49bd0d0d5a6574e2e24d2f5d16110aacfbb845))
* **middleware:** add NextJS middleware ([7b81f55](https://github.com/Clumsy-Coder/pihole-dashboard/commit/7b81f55a13732a9b56246cee8e7fc27d60e6f4fd))
* **page:** render `Clients overtime` bar chart in Home page ([91dac41](https://github.com/Clumsy-Coder/pihole-dashboard/commit/91dac41fdf1a386cfa3f0b34e292f2b9a0b4c18d))
* **page:** render `Queries overtime` bar chart in Home page ([464e735](https://github.com/Clumsy-Coder/pihole-dashboard/commit/464e735a18885ea2a7edf36050ed364e165390ca))
* **page:** render `TopBlockedQueries` table in home page ([22f355c](https://github.com/Clumsy-Coder/pihole-dashboard/commit/22f355caf72e46b3d84283c2200d567898c2dcba))
* **page:** render `TopClientsAllowedTable` table in home page ([5930c87](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5930c87c5b180eac525bfdca1505c71228d2dd30))
* **page:** render `TopClientsBlockedTable` table in home page ([a2a2a91](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a2a2a91d8c598d0fecf207b783ce750e9668f557))
* **page:** render `TopPermittedQueries` table in home page ([9f25e00](https://github.com/Clumsy-Coder/pihole-dashboard/commit/9f25e0009634d93d0e7314770a62d3a8a2529ae3))
* **page:** render component 'Summary' on page '/' ([2082acc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2082accb9f6e119c7707b2c8cac4508cd1d86695))
* **page:** render ForwardedDestinations chart on main page ([fdff8da](https://github.com/Clumsy-Coder/pihole-dashboard/commit/fdff8da2706712143598ac35485c7258befcbcf0))
* **page:** render QueryTypes chart on main page ([1cb0f79](https://github.com/Clumsy-Coder/pihole-dashboard/commit/1cb0f791423ec169bf900385489d851d61848b73))
* **redux:** add API queries for 'Summary' using Redux toolkit Query ([0f015c6](https://github.com/Clumsy-Coder/pihole-dashboard/commit/0f015c64bac46193862c83241b31a9a6fdc567c2))
* **redux:** add API query for 'ForwardedDestinations' using Redux Toolkit Query ([81964fd](https://github.com/Clumsy-Coder/pihole-dashboard/commit/81964fdb0eb65aed29c4dbe6c10c958e180abc24))
* **redux:** add API query for 'QueryTypes' using Redux Toolkit Query ([25c6c8e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/25c6c8e1267f7ece2fe70b2f62a2cb6ec918626b))
* **redux:** add API query for 'TopBlocked' using Redux Toolkit Query ([826ca73](https://github.com/Clumsy-Coder/pihole-dashboard/commit/826ca7362d4662048820a9d32eddbcfa7a8c80a2))
* **redux:** add API query for 'TopPermitted' using Redux Toolkit Query ([49b5ed4](https://github.com/Clumsy-Coder/pihole-dashboard/commit/49b5ed4dabd63728c7e27c488c10964b30025473))
* **redux:** add API query for `/api/queries/clients/overtime?formatted=true` using Redux Toolkit Query ([409498f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/409498f162c4be56e429edf3c77788358f9cc09f))
* **redux:** add API query for `/api/queries/clients/overtime` using Redux Toolkit Query ([e28a709](https://github.com/Clumsy-Coder/pihole-dashboard/commit/e28a7098a1151f8034cc20b30a7a2810292f9bb5))
* **redux:** add API query for `/api/queries/clients/topAllowed` using Redux Toolkit Query ([f0f4c74](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f0f4c7401152009a31222bfed8886cf2dc0f4523))
* **redux:** add API query for `/api/queries/clients/topBlocked` using Redux Toolkit Query ([4bcbf6a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4bcbf6a1f01961e30932246e4473fb58989619e4))
* **redux:** add API query for `/api/queries/overtime?formatted=true` using Redux Toolkit Query ([ee6e652](https://github.com/Clumsy-Coder/pihole-dashboard/commit/ee6e652d12f02dd74b5e58568d9173152645d7ea))
* **redux:** add API query for `/api/queries/overtime` using Redux Toolkit Query ([8b57b0b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/8b57b0bd5cfc7c69089e5b2a811c4bbfcb260dbb))
* **redux:** fetch `forwardedDestinations` in an interval ([002ad2f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/002ad2f6b9eb11c72b958bf267a1604934fc47f9))

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
