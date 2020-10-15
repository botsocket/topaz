import * as Topaz from '../src';

let strArrType: string[];
let guard: unknown;

// sorter()

Topaz.sorter();

// Sorter.add()

Topaz.sorter<string>().add('x');
Topaz.sorter<string>().add('x', 'y');
Topaz.sorter<string>().add('x', ['y', 'z']);
Topaz.sorter<string>().add('x').add('y');
Topaz.sorter<string>().add('x', 'y', 'z');

// Sorter.sort()

Topaz.sorter().sort();
Topaz.sorter<string>().add('x').add('y').sort();
strArrType = Topaz.sorter<string>().sort();
