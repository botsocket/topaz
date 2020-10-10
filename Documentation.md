# Documenation

## Introduction

Topaz is a library for [topological sorting](https://en.wikipedia.org/wiki/Topological_sorting).

## Installation

Topaz is available on npm:

```bash
npm install @botsocket/topaz
```

## Usage

```js
const Topaz = require('@botsocket/topaz');

const sorter = Topaz.sorter();

sorter
    .add('a', 'b')
    .add('b', 'c');

sorter.sort();  // [ c, b, a ]
```

## API

-   [`sorter()`](#sorter)
    -   [`sorter.add()`](#sorteraddnode-deps)
    -   [`sorter.sort()`](#sortersort)

### `sorter()`

Creates a sorter.

```js
const sorter = Topaz.sorter();
```

[Back to top](#api)

#### `sorter.add(node, [...deps])`

Adds a node and its dependencies where:

-   `node`: The node to add.
-   `deps`: Optional dependencies to the node. Can be an array of values or multiple values passed as arguments.

Note that calling the method multiple times with the same node will concatenate its dependencies.

```js
const sorter = Topaz.sorter();

sorter.add('x', 'y'); // Single dependency
sorter.add('x', ['y', 'z']); // Multiple dependencies
sorter.add('x', 'y').add('x', 'z', 't'); // Multiple calls
sorter.add('x'); // No dependencies
```

[Back to top](#api)

#### `sorter.sort()`

Sorts the given nodes topologically. If a circular dependency is detected, an error will be thrown with the dependency chain for debugging purposes. Note that objects are sorted by their references.

```js
const sorter = Topaz.sorter();

sorter.add('x', 'y');
sorter.add('y', 'z');
sorter.sort(); // [ z, y, x ]
```

[Back to top](#api)
