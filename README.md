confe
========

Simple config file management.

Top level keys that include the special "extends" key will include, and overwrite, keys from that top level key. This process is recursive. 

The two required arguments can be set via the enviroment variables;
 * NODE_CONFIG_FILE
 * NODE_ENV

or provided inline (in order);

 * path to config file
 * top level key name

Installation
--------

    $ npm install -g confe

Examples
--------

The following examples show you how to use confe.

```javascript
var confe = require('confe');

// example config file (config.json)
/*
{
	"dev": {"email": "dev-webmaster@test.com", "google-key": "abcxyz"}
	, "local-developer1": {"extends": "dev", "email": "tom1@test.com"}
	, "local-developer2": {"extends": "dev", "email": "kay2@test.com", "google-key": "123"}
	
	, "prod": {"email": "webmaster@test.com", "google-key": "asdf4567"}
}
*/

var config = confe('./config.json', 'dev');
// { email: 'dev-webmaster@test.com', 'google-key': 'abcxyz' }

// or

var config = confe('./config.json', 'local-developer1');
// { email: 'tom1@test.com', 'google-key': 'abcxyz', extends: 'dev' }

// or

var config = confe('./config.json', 'local-developer2');
// { email: 'kay2@test.com', 'google-key': '123', extends: 'dev' }

// or
// NODE_CONFIG_FILE=/path/to/config.json
// NODE_ENV=prod

var config = confe();
// { email: 'webmaster@test.com', 'google-key': 'asdf4567' }
```

Running tests
----

    $ npm test