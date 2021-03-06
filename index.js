'use strict';

const readFileSync = require('fs').readFileSync;
const jsYaml = require('js-yaml');

function readAsJSON(fileName) {
  const fileBuffer = readFileSync(fileName);
  const fileString = fileBuffer.toString();

  return jsYaml.load(fileString);
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function prune(first, second) {
  // second is a object, recursive find
  if (isObject(second) && !Array.isArray(second)) {
    // cannot recursive find in first, just return null
    if (!(isObject(first) && !Array.isArray(second))) {
      return null;
    }
    const output = {};
    for (let key in second) {
      if (key in first) {
        output[key] = prune(first[key], second[key]);
      }
    }
    return output;
  }
  // second is not a object, just return first
  return first;
}

/**
 * Prune the first YAML with keys in the second YAML and output a new YAML
 *
 * @param {string} first the first file path
 * @param {string} second the second file path
 * @return {string} the output YAML file
 */
function yamlPruneKeys(first, second) {
  const firstFile = readAsJSON(first);
  const secondFile = readAsJSON(second);

  const outputJSON = prune(firstFile, secondFile);
  return jsYaml.dump(outputJSON);
}

module.exports = yamlPruneKeys;
