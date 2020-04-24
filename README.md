# Twala Auth

Package for authenticating Twala identities.

![Node.js CI](https://github.com/twala-io/twala-auth/workflows/Node.js%20CI/badge.svg)
[![Version](https://img.shields.io/npm/v/@twala-io/twala-auth.svg)](https://npmjs.org/package/@twala-io/twala-auth)
[![Downloads/week](https://img.shields.io/npm/dw/@twala-io/twala-auth.svg)](https://npmjs.org/package/@twala-io/twala-auth)
[![License](https://img.shields.io/npm/l/@twala-io/twala-auth.svg)](https://github.com/twala-io/twala-auth/blob/master/package.json)

## Features

* Authenticate identity
```js
const TwalaAuth = require('@twala-io/twala-auth')
const auth = new TwalaAuth(web3Provider)
const identity = await auth.authenticate(message, messageHash, v, r, s)
```

## Installation

```sh-session
$ npm i @twala-io/twala-auth
```

## Contributing

Keep it simple. Keep it minimal. Don't put every single feature just because you can.

## Authors

* Alexander Paul P. Quinit
* Edilberto D. Salvador Jr.

## License

This project is licensed under the MIT License.
