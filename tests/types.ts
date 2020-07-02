import Constellation = require('../src');

let strArrType: string[];
let guard: unknown;

// sorter()

Constellation.sorter();

// Sorter.add()

Constellation.sorter<string>().add('x');
Constellation.sorter<string>().add('x', 'y');
Constellation.sorter<string>().add('x', ['y', 'z']);
Constellation.sorter<string>().add('x').add('y');
Constellation.sorter<string>().add('x', 'y', 'z');

// Sorter.sort()

Constellation.sorter().sort();
Constellation.sorter<string>().add('x').add('y').sort();
strArrType = Constellation.sorter<string>().sort();
