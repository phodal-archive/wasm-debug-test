# wasm-debug-test

Documents: [Improved WebAssembly debugging in Chrome DevTools](https://developers.google.com/web/updates/2019/12/webassembly#enter_dwarf)

## Setup

1. install emsdk for compile wasm

```
brew install emsdk
```

or 

```
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install 1.39.12
./emsdk activate 1.39.12
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
    deps/oniguruma/src/.libs/libonig.a \
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

## Logs

### emsdk install logs

``` 
Installing SDK 'sdk-releases-upstream-e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-64bit'..
Installing tool 'node-12.18.1-64bit'..
Downloading: /Users/fdhuang/sdk/emsdk/zips/node-v12.18.1-darwin-x64.tar.gz from https://storage.googleapis.com/webassembly/emscripten-releases-builds/deps/node-v12.18.1-darwin-x64.tar.gz, 20873670 Bytes
Unpacking '/Users/fdhuang/sdk/emsdk/zips/node-v12.18.1-darwin-x64.tar.gz' to '/Users/fdhuang/sdk/emsdk/node/12.18.1_64bit'
Done installing tool 'node-12.18.1-64bit'.
Installing tool 'python-3.7.4-2-64bit'..
Downloading: /Users/fdhuang/sdk/emsdk/zips/python-3.7.4-2-macos.tar.gz from https://storage.googleapis.com/webassembly/emscripten-releases-builds/deps/python-3.7.4-2-macos.tar.gz, 25365593 Bytes
Unpacking '/Users/fdhuang/sdk/emsdk/zips/python-3.7.4-2-macos.tar.gz' to '/Users/fdhuang/sdk/emsdk/python/3.7.4-2_64bit'
Done installing tool 'python-3.7.4-2-64bit'.
Installing tool 'releases-upstream-e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-64bit'..
Downloading: /Users/fdhuang/sdk/emsdk/zips/e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-wasm-binaries.tbz2 from https://storage.googleapis.com/webassembly/emscripten-releases-builds/mac/e13b86d4dbd9a986525ef27d4ad8157949b9bc3a/wasm-binaries.tbz2, 127305099 Bytes
Unpacking '/Users/fdhuang/sdk/emsdk/zips/e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-wasm-binaries.tbz2' to '/Users/fdhuang/sdk/emsdk/upstream'
Done installing tool 'releases-upstream-e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-64bit'.
Running post-install step: npm ci ...
Done running: npm ci
Done installing SDK 'sdk-releases-upstream-e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-64bit'.
```

### specific emcc version

```bash
source "/Users/fdhuang/sdk/emsdk/emsdk_env.sh"
Adding directories to PATH:
PATH += /Users/fdhuang/sdk/emsdk
PATH += /Users/fdhuang/sdk/emsdk/upstream/emscripten
PATH += /Users/fdhuang/sdk/emsdk/node/12.18.1_64bit/bin
PATH += /Users/fdhuang/sdk/emsdk/python/3.7.4-2_64bit/bin

Setting environment variables:
EMSDK = /Users/fdhuang/sdk/emsdk
EM_CONFIG = /Users/fdhuang/sdk/emsdk/.emscripten
EM_CACHE = /Users/fdhuang/sdk/emsdk/upstream/emscripten/cache
EMSDK_NODE = /Users/fdhuang/sdk/emsdk/node/12.18.1_64bit/bin/node
EMSDK_PYTHON = /Users/fdhuang/sdk/emsdk/python/3.7.4-2_64bit/bin/python3
➜  vscode-oniguruma git:(master) emsdk activate 1.39.12
Setting the following tools as active:
   node-12.18.1-64bit
   python-3.7.4-2-64bit
   releases-upstream-e13b86d4dbd9a986525ef27d4ad8157949b9bc3a-64bit

Next steps:
- To conveniently access emsdk tools from the command line,
  consider adding the following directories to your PATH:
    /Users/fdhuang/sdk/emsdk
    /Users/fdhuang/sdk/emsdk/node/12.18.1_64bit/bin
    /Users/fdhuang/sdk/emsdk/python/3.7.4-2_64bit/bin
    /Users/fdhuang/sdk/emsdk/upstream/emscripten
- This can be done for the current shell by running:
    source "/Users/fdhuang/sdk/emsdk/emsdk_env.sh"
- Configure emsdk in your bash profile by running:
    echo 'source "/Users/fdhuang/sdk/emsdk/emsdk_env.sh"' >> $HOME/.bash_profile
➜  vscode-oniguruma git:(master) subl ~/.zshrc
```
