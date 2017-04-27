'use strict'

const test = require('ava')
const Figg = require('..')

const yamlConfig = new Figg({
  path: 'test'
})

const yamlConfig2 = new Figg({
  name: 'config2',
  path: 'test'
})

const jsonConfig = new Figg({
  extension: '.json',
  path: 'test'
})

const jsonConfig2 = new Figg({
  name: 'config2',
  extension: '.json',
  path: 'test'
})

test.before(() => {
  yamlConfig.set('hello', 'world')
  yamlConfig.set('cool', true)
  yamlConfig.set({
    location: 'Portland',
    weather: {
      sunny: false
    }
  })

  jsonConfig.set('hello', 'world')
  jsonConfig.set('cool', true)
  jsonConfig.set({
    location: 'Portland',
    weather: {
      sunny: false
    }
  })
})

// .get()
test('Returns value if key is found', t => {
  t.is(yamlConfig.get('hello'), 'world')
  t.is(jsonConfig.get('hello'), 'world')
})

test('Throws error if key is not found', t => {
  t.throws(() => {
    yamlConfig.get('goodbye')
  })

  t.throws(() => {
    jsonConfig.get('goodbye')
  })
})

// .set()
test('Adds property to config', t => {
  t.is(yamlConfig.get('cool'), true)
  t.is(jsonConfig.get('cool'), true)
})

test('Adds multiple properties to config', t => {
  t.is(yamlConfig.get('location'), 'Portland')
  t.is(yamlConfig.get('weather.sunny'), false)
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

// .save()
test('Saves YAML config file', t => {
  t.notThrows(() => { yamlConfig.save() })
})

test('Saves JSON config file', t => {
  t.notThrows(() => { jsonConfig.save() })
})

// .load()
test('Loads YAML config file', t => {
  t.notThrows(() => { yamlConfig2.load() })
  t.is(yamlConfig2.get('hello'), 'world')
})

test('Loads JSON config file', t => {
  t.notThrows(() => { jsonConfig2.load() })
  t.is(jsonConfig2.get('hello'), 'world')
})
