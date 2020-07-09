# `yaml-prune`

![Verify](https://github.com/shlteater/yaml-prune-keys/workflows/Verify/badge.svg)

A super simple tool for pruning YAML file with keys in another YAML file.

## Installation

### For the command line

```bash
npm install -g yaml-prune-keys
```

### For use through Node

```bash
npm install --save yaml-prune-keys
```

## Usage

`yaml-prune` takes a two `yaml` files and prune the first file with the keys in the second.

given the first file
```yml
a:
  foo: bar
b:
  foo: bar
```

and the second file
```yml
b:
  foo: 
```

the output will be
```yml
b:
  foo: bar
```

### Command Line

When using this tool from the command line, the output file will simply be written to `STDOUT`

```bash
yaml-merge test/fixtures/basic/a.yml test/fixtures/basic/b.yml
a:
  foo: bar
b:
  foo: bar
```

This way, you can pipe the output to whatever you want. For example, this will write the new `yaml` file to `output.yml`

```bash
yaml-prune test/fixtures/basic/a.yml test/fixtures/basic/b.yml > output.yml
```

The provided file names will be resolved relative to the current directory. So, you an provide a relative path to the files, or an absolute path -- either method works just fine.

See test/lib-test.js for all the behaviors.

### As a Node package

`yaml-prune` also provides a `node` package that can be consumed to get the output file programmatically.

```javascript
const resolve = require('path').resolve;
const pruneKeys = require('yaml-prune-keys');

const output = pruneKeys(resolve('relative/path/to/the/first/file.yml'), '/Users/the/second/file.yml');
console.log(output); // Prints out the resulting YAML as a string
```
