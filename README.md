# pwdb Client
> MAKE IT WORK - MAKE IT RIGHT - MAKE IT FAST

## ToDos until 1.0.0

- `[TD-SLATE]` Because keystonejs uses [slatejs](https://docs.slatejs.org/) editor for its document type, we need to implement the a slate editor field for formik to be able to show and to edit these fields.
- `[TD-i18n]` It should be possible to use the App in diffrent languages. We should use react-intl libary wich comes with the [FormatJS](https://formatjs.io) intl libarys.
- `[TD-TESTS]` Implement Tests
- `[TS-GRAPHQL]` Check the possibility for Graphql request schemas and load them from graphql files instead of having them inside the api slice
- `[TD-HOUSEKEEPING]` Tidy up the App.
- Whatever you think we could improve.

## Setup

### Fast local setup with docker:
- https://github.com/casey/just/
- prefix all following commands with `just`

0. `npm install`
1. Make sure your Backend is set up and running
2. `cp codegen.ts.exampe codegen.ts` and edit schema Url e.g. (`http://localhost:8888/api/graphql`)
3. Run `yarn codegen`
4. `cp .env.example .env` and edit pwdb api url e.g. (`http://localhost:8888/api/graphql`)
5. Run `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run audit`

Runs npm audit but checking for Production mode only.

### `npm run codegen`

Generates all Types from our Graphql Api. You can configure this in the `codegen.ts` file.
Configuration documentation can be found [here](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config)

### `npm run intl_extract`
[`Message Extraction Documentation`](https://formatjs.io/docs/getting-started/message-extraction)

### `npm run intl_compile`
[`Message Compilation and Distribution`](https://formatjs.io/docs/getting-started/message-distribution)

## i18n

### `npm run intl_extract -- 'src/**/*.ts*' --ignore='**/*.d.ts' --out-file extracted-lang/en-US.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'``
Extract en-US file from all declared Messages

### `npm run intl_compile -- extracted-lang/en.json --ast --out-file lang/en-US.json`
Compile Messages into AST react-intl consumable format

## MISC

### [`npm i -g npm-check-updates`](https://www.npmjs.com/package/npm-check-updates)
Install this and check with ncu package versions

### [`React Icons`](https://react-icons.github.io/react-icons/)
Icon Libary Lookup

### List of VSCode Plugins that are helpful
- [graphQl Language Support](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
- [Jetbrains Space Integration](https://marketplace.visualstudio.com/items?itemName=olivertasevski.vscode-space)
- [Chakra Ui Docs](https://marketplace.visualstudio.com/items?itemName=timitejumola.chakra-ui-doc)
