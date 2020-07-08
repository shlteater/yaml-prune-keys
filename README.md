# `yaml-prune`

![Verify](https://github.com/shlteater/yaml-prune/workflows/Verify/badge.svg)

A super simple tool for pruning YAML file.

## Installation

### For the command line

```bash
npm install -g @shlteater/yaml-prune
```

### For use through Node

```bash
npm install --save @shlteater/yaml-prune
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

### As a Node package

`yaml-prune` also provides a `node` package that can be consumed to get the output file programmatically.

```javascript
const resolve = require('path').resolve;
const prune = require('@shlteater/yaml-prune');

const output = prune(resolve('relative/path/to/the/first/file.yml'), '/Users/the/second/file.yml');
console.log(output); // Prints out the resulting YAML as a string
```
