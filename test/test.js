'use strict'

const test = require('ava')
const fs = require('fs-extra')
const Figg = require('..')

const yamlConfig = new Figg({
  path: 'test'
})

const jsonConfig = new Figg({
  extension: '.json',
  path: 'test'
})

test.before(() => {
  yamlConfig.set('hello', 'world')
  jsonConfig.set('hello', 'world')
})

test.beforeEach(() => {
  yamlConfig.save()
  jsonConfig.save()
})

// .get()
test('Returns value if key is found', t => {
  t.is(yamlConfig.get('hello'), 'world')

  t.is(jsonConfig.get('hello'), 'world')
})

test('Throws error if key is not found', t => {
  t.throws(() => { yamlConfig.get('goodbye') })
  t.throws(() => { jsonConfig.get('goodbye') })
})

// .set()
test('Adds property to config', t => {
  yamlConfig.set('cool', true)
  t.is(yamlConfig.get('cool'), true)
  jsonConfig.set('cool', true)
  t.is(jsonConfig.get('cool'), true)
})

test('Adds multiple properties to config', t => {
  yamlConfig.set({
    location: 'Portland',
    weather: {
      sunny: false
    }
  })
  t.is(yamlConfig.get('location'), 'Portland')
  t.is(yamlConfig.get('weather.sunny'), false)
  jsonConfig.set({
    location: 'Portland',
    weather: {
      sunny: false
    }
  })
  t.is(jsonConfig.get('location'), 'Portland')
  t.is(jsonConfig.get('weather.sunny'), false)
})

test('Throws error if key is not a string or object', t => {
  t.throws(() => { yamlConfig.set(42) })
  t.throws(() => { yamlConfig.set(true) })
  t.throws(() => { yamlConfig.set(undefined) })
  t.throws(() => { yamlConfig.set(null) })
  t.throws(() => { jsonConfig.set(42) })
  t.throws(() => { jsonConfig.set(true) })
  t.throws(() => { jsonConfig.set(undefined) })
  t.throws(() => { jsonConfig.set(null) })
})

// .has()
test('Returns true if key is found', t => {
  t.true(yamlConfig.has('hello'))
  t.true(jsonConfig.has('hello'))
})

test('Returns false if key is not found', t => {
  t.false(yamlConfig.has('goodbye'))
  t.false(jsonConfig.has('goodbye'))
})

test('Throws error if argument is not a string', t => {
  t.throws(() => { yamlConfig.has(42) })
  t.throws(() => { jsonConfig.has(42) })
})

// .load()
test('Loads YAML config file', t => {
  t.notThrows(() => { yamlConfig.load() })
})

test('Loads JSON config file', t => {
  t.notThrows(() => { jsonConfig.load() })
})

// .save()
test('Saves YAML config file', t => {
  t.notThrows(() => { yamlConfig.save() })
})

test('Saves JSON config file', t => {
  t.notThrows(() => { jsonConfig.save() })
})

// Cleanup
test.after('Cleanup', t => {
  fs.removeSync('./test/config.yml')
  fs.removeSync('./test/config.json')
})
