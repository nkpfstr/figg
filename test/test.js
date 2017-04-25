'use strict'

const test = require('ava')
const Figg = require('..')

// config.load()
// ----------------------------------------
// Loads YAML config file successfully
// Loads JSON config file successfully
// Returns error if file not found

// config.save()
// ----------------------------------------
// Saves YAML config file successfully
// Saves JSON config file successfully
// Returns error if file not saved successfully

// config.get(key)
// ----------------------------------------
// Returns value of key if found
// Returns error if key doesn't exist

// config.set(key, value)
// ----------------------------------------
// Adds property to config successfully
// Returns error if arguments are not strings

// config.set(object)
// ----------------------------------------
// Adds properties to config successfully
// Returns error if argument is not an object

// config.has(key)
// ----------------------------------------
// Returns true if key exists
// Returns false if key doesn't exist
// Returns error if argument is not a string
