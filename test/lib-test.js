/* eslint-env mocha */

'use strict';

const resolve = require('path').resolve;
const expect = require('chai').expect;
const stripIndent = require('common-tags').stripIndent;
const pruneKeys = require('../index.js');

function fixtureFiles(...names) {
  return names.map((fileName) => resolve(__dirname, './fixtures', fileName));
}

describe('prune logic', function () {
  it('prune the first YAML file', function () {
    const output = pruneKeys(...fixtureFiles('basic/a.yml', 'basic/b.yml'));

    expect(output).to.equal(
      stripIndent`
      b:
        foo: bar
    ` + '\n'
    );
  });

  it('prune deep YAML keys', function () {
    const output = pruneKeys(...fixtureFiles('deep/a.yml', 'deep/b.yml'));

    expect(output).to.equal(
      stripIndent`
      a:
        a1:
          a11: a11
      b:
        b2:
          b21:
            b211: b211
    ` + '\n'
    );
  });

  it('deep YAML keys not found', function () {
    const output = pruneKeys(...fixtureFiles('notfound/a.yml', 'notfound/b.yml'));

    expect(output).to.equal(
      stripIndent`
      a:
        foo: bar
      b:
        foo: null
    ` + '\n'
    );
  });

  it('prune with YAML arrays', function () {
    const output = pruneKeys(...fixtureFiles('array/a.yml', 'array/b.yml'));

    expect(output).to.equal(
      stripIndent`
      a:
        foo:
          - a1
          - a2
      b:
        foo:
          - b1
          - b2
    ` + '\n'
    );
  });

  it('prune with YAML objects', function () {
    const output = pruneKeys(...fixtureFiles('object/a.yml', 'object/b.yml'));

    expect(output).to.equal(
      stripIndent`
      a:
        foo:
          a1: a1
          a2: a2
      b:
        foo:
          b1: b1
          b2: b2
      c:
        foo: null
    ` + '\n'
    );
  });
});
