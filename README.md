# wasm-debug-test

Documents: [Improved WebAssembly debugging in Chrome DevTools](https://developers.google.com/web/updates/2019/12/webassembly#enter_dwarf)

## Setup

1. install emsdk for compile wasm

```
brew install emsdk
```

2. npm install

```
yarn install
```

3. run 

```
yarn package
```

## VSCode BuildScript

```bash
# https://github.com/emscripten-core/emscripten/blob/master/src/settings.js

emcc -O2 \
    deps/oniguruma/src/.libs/libonig.so \
    src/onig.cc \
    -Isrc -Ideps/oniguruma/src \
    -o out/onig.js \
    -s ENVIRONMENT=shell \
    -s FILESYSTEM=0 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME=Onig \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s EXTRA_EXPORTED_RUNTIME_METHODS="['UTF8ToString']" \
    -g

# can be removed when https://github.com/emscripten-core/emscripten/issues/9829 is fixed.
node ./scripts/remove-print.js
```

### Webpack Build Script

```javascript

const path = require('path');

module.exports = {
	entry: './out/index.js',
	// mode: 'production',
	mode: 'development',
	output: {
		library: 'onig',
		libraryTarget: 'window',
		globalObject: 'this',
		path: path.resolve(__dirname, 'release')
	},
	resolve: {
		extensions: ['.js']
	}
};

```
