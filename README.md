# envcnf

```
const envcnf = require('envcnf');
```

## Functions

* `envcnf.env()` - Returns your entire enviroment as an object. Same as
  node's `process.env` object. This function is here for mocking reasons.
* `envcnf.get('MY_CONFIG_ENV_VAR')` - Returns a string or `undefined`.
* `envcnf.getMap('MY_CONFIG')` - Returns an object containing all environment
  variables prefixed by `MY_CONFIG_`.
* `envcnf.getList('MY_SERVERS')` - Returns an array containing all enviroment
  variables prefixed by `MY_SERVERS_` followed by a positive integer number,
  sorted in numeric order.

## Mocking your configuration

When using this module, you can mock your environment variables like this:

```
const td = require('testdouble');

td.replace(envcnf, 'env');
td.when(envcnf.env()).thenReturn({
  'LANGUAGE': 'en_US:en',
  'MY_ENV_VAR': 'some value',
  'ETC': 'and so on...'
});

// Make your tests here...

td.reset();
```

