'use strict'

const fs = require('fs-extra')
const yml = require('js-yaml')

class Figg {
  constructor (opts) {
    this.opts = Object.assign({
      name: 'config',
      extension: '.yml',
      path: process.cwd()
    }, opts)
    this.data = {}
    this.file = `${this.opts.path}/${this.opts.name}${this.opts.extension}`
  }

  // Parse a config file and return it as an object
  load () {
    if (this.opts.extension === '.yaml' || this.opts.extension === '.yml') {
      try {
        this.data = yml.safeLoad(fs.readFileSync(this.file, 'utf-8'))
        return this.data
      } catch (err) {
        throw new Error(err)
      }
    } else {
      try {
        this.data = JSON.parse(fs.readFileSync(this.file, 'utf-8'))
        return this.data
      } catch (err) {
        throw new Error(err)
      }
    }
  }

  // Save config object as a file named <opts.name><opts.extension>
  save () {
    if (this.opts.extension === '.yaml' || this.opts.extension === '.yml') {
      fs.outputFile(this.file, yml.safeDump(this.data), err => {
        if (err) {
          throw new Error(err)
        }
      })
    } else {
      fs.outputFile(this.file, JSON.stringify(this.data, null, 2), err => {
        if (err) {
          throw new Error(err)
        }
      })
    }
  }

  // Get a property
  get (key) {
    let result = key.split('.').reduce((object, property) => {
      if (object === null) return

      return object[property]
    }, this.data)

    if (result === undefined) {
      throw new Error(`${key} not found`)
    } else {
      return result
    }
  }

  // Set one or more properties
  set (key, value) {
    if (typeof key !== 'string' && typeof key !== 'object') {
      throw new Error(`Expected key to be string or object, was ${typeof key}`)
    }

    if (typeof key === 'object') {
      this.data = Object.assign(key, this.data)
    } else {
      this.data[key] = value
    }
  }

  // Check if a property exists
  has (key) {
    if (typeof key !== 'string') {
      throw new Error(`Expected key to be string, was ${typeof key}`)
    } else {
      return this.data.hasOwnProperty(key)
    }
  }
}

module.exports = Figg
