## [1.1.0-development.2](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.1.0-development.1...1.1.0-development.2) (2023-11-10)


### :sparkles: Features

* **component:** use `react-hook-form` for validation ([1ea8f34](https://github.com/Clumsy-Coder/pihole-dashboard/commit/1ea8f34e9e05878bc0a6c55e8f804bbf9581ed30)), closes [#754](https://github.com/Clumsy-Coder/pihole-dashboard/issues/754)

## [1.1.0-development.1](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0...1.1.0-development.1) (2023-08-21)


### :sparkles: Features

* **page:** display build time in the `about` page ([4cb30d8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4cb30d8108a886d12eb8e2b276b96ac806bb6399))

## 1.0.0 (2023-08-20)


### :sparkles: Features

* **api:** add api endpoint '/api/auth/login' ([3bebdfc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/3bebdfc4361357b3aed5e1c84004a35c071141fb))
* **api:** add API endpoint '/api/auth/logout' ([fc4db10](https://github.com/Clumsy-Coder/pihole-dashboard/commit/fc4db10d9a38d60806e8acac97e57c0a0838d531))
* **api:** add API endpoint '/api/auth/session' ([ebbb273](https://github.com/Clumsy-Coder/pihole-dashboard/commit/ebbb2739901a830cd45fc28e5b44c0d49a46c3dc))
* **api:** add API endpoint '/api/auth/unauthorized' ([309a74e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/309a74eac21db5c23fbf25d04fbe00639178c446))
* **api:** add API endpoint for '/api/summary' with formatted data ([62e050a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/62e050a3065532355727412cc57ada3c40a52dd3))
* **api:** add API endpoint for '/api/summary' with raw data ([646dc23](https://github.com/Clumsy-Coder/pihole-dashboard/commit/646dc238c33129c6be3249a27d18204342029caf))
* **api:** add NextJS 'GET' API endpoint for '/api/forwardedDestinations' ([808b6d5](https://github.com/Clumsy-Coder/pihole-dashboard/commit/808b6d58e9860648e937f923bdbc82daf7df8980))
* **api:** add NextJS 'GET' API endpoint for '/api/queries/topBlocked' ([847be60](https://github.com/Clumsy-Coder/pihole-dashboard/commit/847be60c11b262741f87b8edbedf62c48ae3901a))
* **api:** add NextJS 'GET' API endpoint for '/api/queries/topPermitted' ([4ea4acc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4ea4acca436d06c9c3791cec969766c748fa9140))
* **api:** add NextJS 'GET' API endpoint for '/api/queryTypes' ([54c77ad](https://github.com/Clumsy-Coder/pihole-dashboard/commit/54c77adb6e156e9239805d531554babc5613a114))
* **api:** add NextJS 'GET' API endpoint for `/api/queries/clients/topAllowed` ([089ef52](https://github.com/Clumsy-Coder/pihole-dashboard/commit/089ef52705e0686aff243490c34c57989239153a))
* **api:** add NextJS 'GET' API endpoint for `/api/queries/clients/topBlocked` ([47fe337](https://github.com/Clumsy-Coder/pihole-dashboard/commit/47fe3370a6669934ba416db80330866685f93294))
* **api:** add NextJS 'GET' API endpoint for `/api/queries/overtime?formatted=true` ([e757c04](https://github.com/Clumsy-Coder/pihole-dashboard/commit/e757c04e1c03bd393c06bcb2df77f80dbe4857df)), closes [/github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js#L219-L286](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js/issues/L219-L286)
* **api:** add NextJS 'GET' API endpoint for `/api/queries/overtime` ([5c1da54](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5c1da54d723c826e4cad674e911c4333f5f6f9b7))
* **api:** add NextJS `GET` API endpoint for `/api/queries/clients/overtime?formatted=true` ([487fd5e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/487fd5eb9972231dd558544043692602fd4cb617)), closes [/github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js#L330-L417](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js/issues/L330-L417)
* **api:** add NextJS `GET` API endpoint for `/api/queries/clients/overtime` ([c3e6080](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c3e608022a756c3859b888562714dde86a40e520))
* **api:** create helper functions for 'iron-session' ([3ac8974](https://github.com/Clumsy-Coder/pihole-dashboard/commit/3ac8974f9e89aa7d709783aeb857ffbc61726c0c))
* **api:** load 'port' from endpoint '/api/auth/login' ([71ce6b7](https://github.com/Clumsy-Coder/pihole-dashboard/commit/71ce6b773c6863eff6b16d8113c89f8ee921bb1a))
* **api:** send response based on axios error for api '/api/auth/login' ([47fa60c](https://github.com/Clumsy-Coder/pihole-dashboard/commit/47fa60c31434cacfe2aa8d8c57755a3fc8b977ba))
* **api:** store authenticated credentials to an encrypted session cookie ([f903ee0](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f903ee06e2a65a298aabd76a2802c2611537ae79))
* **component:** add 'AppBar' component ([2c0eeb8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2c0eeb85450872a9130f9cda53e2b5492a4dde0e))
* **component:** add 'Drawer' component ([2eb440f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2eb440fb45134e5bafc72bcfd1f83b3b69308e87))
* **component:** add 'Logout' page link ([28d8103](https://github.com/Clumsy-Coder/pihole-dashboard/commit/28d81036240fac417c5d36211eeeeb514b3d8dc1))
* **component:** add Bar chart to display clients overtime in the last 24 hours ([39d39c9](https://github.com/Clumsy-Coder/pihole-dashboard/commit/39d39c9d338298519b64c22d643e4d529baec69d)), closes [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js#L71-L73](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js/issues/L71-L73) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L953-L1047](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L953-L1047) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L1081-L1102](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L1081-L1102)
* **component:** add Bar chart to display queries overtime in 24 hours ([12c59bc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/12c59bc646804567ab4aee1f558aa17ec87e7bb6)), closes [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js#L71-L73](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/utils.js/issues/L71-L73) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L858-L900](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L858-L900) [/github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js#L1059-L1079](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/c2afe4221ac275a1c082e1d8e14ccbb6113b0e7b/scripts/pi-hole/js/index.js/issues/L1059-L1079)
* **component:** add chart to render Forwarded destinations ([2ff7267](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2ff726749f4bd48dcfb42a7fcda9eefacf3659b4))
* **component:** add chart to render Query Types ([7510797](https://github.com/Clumsy-Coder/pihole-dashboard/commit/7510797b562063baa6625255c015a58ce5fc669a))
* **component:** add component 'LoginForm' ([60a886d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/60a886dd510e451660a2daac614f66d80d859c42))
* **component:** add component 'Summary' ([f46796f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f46796f903634061deb6f78b825a0e3b658fda63))
* **component:** add component for rendering authenticated Drawer items ([d95ae36](https://github.com/Clumsy-Coder/pihole-dashboard/commit/d95ae369e11be4c7bd238420937f4fe90423162f))
* **component:** add helper object to manage pages ([9db8df1](https://github.com/Clumsy-Coder/pihole-dashboard/commit/9db8df1fe059b2dceb655707181ed8e9b8089ff5))
* **component:** add property 'numeric' to Pi-hole IP address text field ([adf04f8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/adf04f832cf6137430e91de9289783217a02d506))
* **component:** add table to display top blocked queries ([af5eb2e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/af5eb2e9f42af4d79469857ad825a53b85f32e3b))
* **component:** add table to display top clients allowed queries ([5078176](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5078176edfdf6d56b44455e05b9d175e671cf7ca))
* **component:** add table to display top clients blocked queries ([056718f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/056718f89e74e24ec7bea60795d46a91a7d25990))
* **component:** add table to display top permitted queries ([caa99d8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/caa99d8bf3d9348118a64f82bba06dd4967e28d6))
* **component:** display error message for LoginForm after HTTP request ([0e9e89c](https://github.com/Clumsy-Coder/pihole-dashboard/commit/0e9e89c15bd6b7e7b225c70c65b0f6f977fbd0c6))
* **component:** display loading when authenticating LoginForm ([89542dc](https://github.com/Clumsy-Coder/pihole-dashboard/commit/89542dcf8c5175fef40a37568777990d36feee18))
* **component:** display pi-hole ip address and port when authenticated ([d52a6f4](https://github.com/Clumsy-Coder/pihole-dashboard/commit/d52a6f44318954cfcd8f525484b6ac1a81696842))
* **component:** go to page '/' after logging in ([571cc0d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/571cc0de4afa8a99b5da2143582e17a9b550fed3))
* **component:** offset main content to right by drawer width ([bb913e9](https://github.com/Clumsy-Coder/pihole-dashboard/commit/bb913e9c11683320d02e55dca21ec9a7658d6733))
* **component:** provide Redux store to the entire app ([7e8a8f9](https://github.com/Clumsy-Coder/pihole-dashboard/commit/7e8a8f94a6df2d9bb5075466a1f97f77cb334fba))
* **component:** redirect to Login page if AuthSession has expired ([90fcb04](https://github.com/Clumsy-Coder/pihole-dashboard/commit/90fcb04382cf8eb456192881cb6dbdc46266a4be))
* **component:** render 'AppBar' in the app ([a433b71](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a433b711efcfbc82025e81859f191f9a5ec9efcb))
* **component:** render Authenticated drawer items when the user's logged in ([81e3eaf](https://github.com/Clumsy-Coder/pihole-dashboard/commit/81e3eaf2d5790a4e93b4747848912542ee05504f))
* **component:** render Skeleton for component 'Summary' when loading data ([e9a7572](https://github.com/Clumsy-Coder/pihole-dashboard/commit/e9a75726a9073b8944c75137ab6044a33d00f160))
* **component:** use custom colours for 'ForwardDestinations' component ([cdd694a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/cdd694ade59e728cf0a5d1116719d68d23d169c0))
* **lib:** add function 'isApiAuthenticated' ([752284b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/752284bee65600e6ff5add757400525facfb27d1))
* **lib:** add helper functions to load protected page routes ([c91484e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c91484ec3762f61bbb2fd41558fe15454554184b))
* **middleware:** add api route '/api/queries/topBlocked' to NextJS middleware ([cd50668](https://github.com/Clumsy-Coder/pihole-dashboard/commit/cd506684cb6f0b806d1b06372ecdbe00bafd4b38))
* **middleware:** add api route '/api/queries/topPermitted' to NextJS middleware ([90a83b7](https://github.com/Clumsy-Coder/pihole-dashboard/commit/90a83b7d0b3a9cab006e993668258dffecd4b31b))
* **middleware:** add api route '/api/queryTypes' to NextJS middleware ([c3cce50](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c3cce507811888099344c9d331b3881afb5c36fe))
* **middleware:** add api route `/api/queries/clients/topAllowed` to NextJS middleware ([414c15b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/414c15b61b386a0dd89a6d36f08ce2af083b0819))
* **middleware:** add api route `/api/queries/clients/topBlocked` to NextJS middleware ([c1a4f0b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c1a4f0b66bad5a6a25b9bb43ff4d1bdebab1df5e))
* **middleware:** add NextJS middleware ([fd8ccf8](https://github.com/Clumsy-Coder/pihole-dashboard/commit/fd8ccf8e7949c71517c982e41a592fe229bcac1c))
* **page:** add 'login' page ([28b9b51](https://github.com/Clumsy-Coder/pihole-dashboard/commit/28b9b5145def97df788737d17ff4d95576d9711e))
* **page:** add `About` page ([4c44a3f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4c44a3febe1705bac67f1a0fc6fb115f57334462))
* **page:** redirect Home page to Login page IF not logged in ([44d456e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/44d456eded5a4fa70a838f3229a6de90ad8af2cb))
* **page:** redirect login page to Home page if the user is logged in ([2b5c2b4](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2b5c2b4549d880de0b6886939b2f2fa4b420866b))
* **page:** render `Clients overtime` bar chart in Home page ([5d42e92](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5d42e92a60aa68ef8d9b5b39f1cc0b597df55910))
* **page:** render `Queries overtime` bar chart in Home page ([6a63933](https://github.com/Clumsy-Coder/pihole-dashboard/commit/6a63933c53ff2debedb24676f03f3a7e438a725d))
* **page:** render `TopBlockedQueries` table in home page ([4381a31](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4381a31d9e0fab0b5af7e9a55b9489b1bfbf6d78))
* **page:** render `TopClientsAllowedTable` table in home page ([43b055f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/43b055f7d4f995aacf1abcb3369577f69d32b16b))
* **page:** render `TopClientsBlockedTable` table in home page ([212b46b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/212b46b45f2e751a890a1b3eb59751d02f68ae0d))
* **page:** render `TopPermittedQueries` table in home page ([1e44e05](https://github.com/Clumsy-Coder/pihole-dashboard/commit/1e44e055a27445006c1d9183ca772a53893764b8))
* **page:** render component 'Summary' on page '/' ([2acace1](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2acace117c2cd916a77fd06aeab3f377d37af2b8))
* **page:** render ForwardedDestinations chart on main page ([5a33e62](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5a33e62aecc315c3bf8f8eda6ffcf2b5d54dc929))
* **page:** render QueryTypes chart on main page ([775779f](https://github.com/Clumsy-Coder/pihole-dashboard/commit/775779f5da0f450727acdfcede7d0f95a5665683))
* **redux:** add API queries for 'Summary' using Redux toolkit Query ([c223210](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c223210a38cf1ee68cdfb95efdd45161b80bf204))
* **redux:** add API queries for AuthSession using Redux Toolkit Query ([1d2014a](https://github.com/Clumsy-Coder/pihole-dashboard/commit/1d2014a14da45cec64e3418263baf3b3ab5ca878))
* **redux:** add API query for 'ForwardedDestinations' using Redux Toolkit Query ([b3f6168](https://github.com/Clumsy-Coder/pihole-dashboard/commit/b3f6168c74367a1c030a45a30e99b828c228e46a))
* **redux:** add API query for 'QueryTypes' using Redux Toolkit Query ([dfc90c4](https://github.com/Clumsy-Coder/pihole-dashboard/commit/dfc90c48af192404eeedf47bbe20fae89637b729))
* **redux:** add API query for 'TopBlocked' using Redux Toolkit Query ([f0c41cd](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f0c41cdaa0f7c0e4af00e427e18e319afa063c93))
* **redux:** add API query for 'TopPermitted' using Redux Toolkit Query ([4c1284e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4c1284ebe39ca3fb24be3d5759811222a1cdd95b))
* **redux:** add API query for `/api/queries/clients/overtime?formatted=true` using Redux Toolkit Query ([2b3a80d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/2b3a80dc449ff05cae97bdc632189eca5d8e71de))
* **redux:** add API query for `/api/queries/clients/overtime` using Redux Toolkit Query ([c30384e](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c30384e74cd350e55c8203f8916651bf4cebf605))
* **redux:** add API query for `/api/queries/clients/topAllowed` using Redux Toolkit Query ([cb70c83](https://github.com/Clumsy-Coder/pihole-dashboard/commit/cb70c8303b4937ecfeb790bce1be6c2e7d57f7da))
* **redux:** add API query for `/api/queries/clients/topBlocked` using Redux Toolkit Query ([5630773](https://github.com/Clumsy-Coder/pihole-dashboard/commit/56307738cb17356e1ad8de515613f6d4a51543e5))
* **redux:** add API query for `/api/queries/overtime?formatted=true` using Redux Toolkit Query ([8e2a532](https://github.com/Clumsy-Coder/pihole-dashboard/commit/8e2a532cb26611bbb6c72283291b55feb5527a90))
* **redux:** add API query for `/api/queries/overtime` using Redux Toolkit Query ([680a361](https://github.com/Clumsy-Coder/pihole-dashboard/commit/680a361906a8c1d14597f7552a9ad41d1520ab8c))
* **redux:** create Redux store ([ca7db90](https://github.com/Clumsy-Coder/pihole-dashboard/commit/ca7db903a95ba566aab192f6a4891edb49006f4c))
* **redux:** create Redux toolkit query API ([6b306c5](https://github.com/Clumsy-Coder/pihole-dashboard/commit/6b306c5856b94c4a28b7f3496832fa1f9a7ac3ea))
* **redux:** fetch `forwardedDestinations` in an interval ([cd47ed3](https://github.com/Clumsy-Coder/pihole-dashboard/commit/cd47ed38386ed09d20d5ec9d3674799cd2295b5e))
* **url:** add API url for pi-hole API endpoints ([d8432cb](https://github.com/Clumsy-Coder/pihole-dashboard/commit/d8432cba3bba2a76c3604746dc4a2e0fb37fb520))


### :bug: Bug Fixes

* **api:** fix error type for axios interceptor in '/api/auth/login' endpoint ([94fb326](https://github.com/Clumsy-Coder/pihole-dashboard/commit/94fb3267c76dacdbcdcb5334e816ccea0f9861c9))
* **component:** fetching number of entries for `topBlockedClientQueries` and fetch polling ([923d9bf](https://github.com/Clumsy-Coder/pihole-dashboard/commit/923d9bf292c0feb3497a792643cded9a2192864c))
* **component:** offsetting content when drawer is visible ([1b1192d](https://github.com/Clumsy-Coder/pihole-dashboard/commit/1b1192dde4c5a002d08b2ebfad2c4be4921ba778))
* **component:** set link address if `ipAddress` is not provided for `TopBlockedClientsQueries` ([a296c3b](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a296c3b10d442ab328f25e8e8897adfbf828622a))
* **component:** tooltip clipping for ClientsOvertime bar chart ([d3c3d8c](https://github.com/Clumsy-Coder/pihole-dashboard/commit/d3c3d8c03ba9ed06858f1c07da93f0216dc502f2)), closes [/github.com/pi-hole/AdminLTE/blob/41682f17b72d3fb83837a7a08fa68b3e37cd35b7/scripts/pi-hole/js/index.js#L33-L214](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/41682f17b72d3fb83837a7a08fa68b3e37cd35b7/scripts/pi-hole/js/index.js/issues/L33-L214) [#546](https://github.com/Clumsy-Coder/pihole-dashboard/issues/546)
* **docker:** pass `.env.local` to the final stage of docker image building ([a66af30](https://github.com/Clumsy-Coder/pihole-dashboard/commit/a66af30b3d3b987c489bea55772b7758be6f3560))
* **nextjs:** building nextjs app by dynamic importing nivo chart ([f9b5a80](https://github.com/Clumsy-Coder/pihole-dashboard/commit/f9b5a800ef555fb0dd7029e1526ff14efc416138)), closes [/github.com/plouc/nivo/issues/2310#issuecomment-1552663752](https://github.com/Clumsy-Coder//github.com/plouc/nivo/issues/2310/issues/issuecomment-1552663752)
* **page:** load favicon when running NextJS in production mode ([4da7b95](https://github.com/Clumsy-Coder/pihole-dashboard/commit/4da7b95cfe5566f4ff716348e7fb3cbadb7ef0eb))

## [1.0.0-development.7](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0-development.6...1.0.0-development.7) (2023-08-20)


### :bug: Bug Fixes

* **component:** tooltip clipping for ClientsOvertime bar chart ([e14aa18](https://github.com/Clumsy-Coder/pihole-dashboard/commit/e14aa18766186873ac28586e45a6dc39162654d2)), closes [/github.com/pi-hole/AdminLTE/blob/41682f17b72d3fb83837a7a08fa68b3e37cd35b7/scripts/pi-hole/js/index.js#L33-L214](https://github.com/Clumsy-Coder//github.com/pi-hole/AdminLTE/blob/41682f17b72d3fb83837a7a08fa68b3e37cd35b7/scripts/pi-hole/js/index.js/issues/L33-L214) [#546](https://github.com/Clumsy-Coder/pihole-dashboard/issues/546)

## [1.0.0-development.6](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0-development.5...1.0.0-development.6) (2023-08-17)


### :bug: Bug Fixes

* **nextjs:** building nextjs app by dynamic importing nivo chart ([c4762e1](https://github.com/Clumsy-Coder/pihole-dashboard/commit/c4762e1ad96eb62d9111633d7be67e95cd152788)), closes [/github.com/plouc/nivo/issues/2310#issuecomment-1552663752](https://github.com/Clumsy-Coder//github.com/plouc/nivo/issues/2310/issues/issuecomment-1552663752)

## [1.0.0-development.5](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0-development.4...1.0.0-development.5) (2022-11-14)


### :sparkles: Features

* **page:** add `About` page ([0c0f5ae](https://github.com/Clumsy-Coder/pihole-dashboard/commit/0c0f5aee935645cc9398c4316d0a119aba509895))

## [1.0.0-development.4](https://github.com/Clumsy-Coder/pihole-dashboard/compare/1.0.0-development.3...1.0.0-development.4) (2022-11-12)


### :bug: Bug Fixes

* **docker:** pass `.env.local` to the final stage of docker image building ([5ca3c65](https://github.com/Clumsy-Coder/pihole-dashboard/commit/5ca3c655855622a4c1a10bfd70ae0ac0fca7d225))

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
