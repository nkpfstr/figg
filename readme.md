# Figg
> A simple utility for managing YAML and JSON configuration files

[![Build Status](https://travis-ci.org/nkpfstr/figg.svg?branch=master)](https://travis-ci.org/nkpfstr/figg)

## Install
NPM:
```
$ npm install figg
```

Yarn:
```
$ yarn add figg
```

## Usage
```js
const Figg = require('figg')
const config = new Figg()

// Add a single property
config.set('name', 'John Div')

// Add multiple properties
config.set({
  description: 'A stylish web designer',
  url: 'http://johndiv.cool',
  stylish: true
})

// Get a property
console.log(config.get('name'))
// 'John Div'

// Save config file (config.yml by default)
config.save()

// Load existing config file as an object
let myConfig = config.load()
```

## API

### Figg([options])

#### options.name
Type: `string`<br>
Default: `'config'`

Name of the config without the extension

#### options.extension
Type: `string`<br>
Default: `'.yml'`

The file extension used when loading and saving config files. Valid extensions are `'.yml'`, `'.yaml'` and `'.json'`.

#### options.path
Type: `string`<br>
Default: Current working directory

Path to the directory where the config file is loaded/saved.

#### Examples

In this example, Figg will load/save your config at `./app/settings.json`.
```js
const config = new Figg({
  name: 'settings',
  extension: '.json',
  path: './app'
})
```

TODO
- config.load()
- config.save()
- config.get()
- config.set()
- config.has()

## License
MIT © Nick Pfisterer
