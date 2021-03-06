'use strict';

const Bone = require('@botsocket/bone');

const Topaz = require('..');

const internals = {};

describe('sorter()', () => {

    it('should add only a node', () => {

        const sorter = Topaz.sorter();

        sorter.add('x').add('y', []);
        internals.testSort(sorter, ['x', 'y']);
    });

    it('should add an edge', () => {

        const sorter = Topaz.sorter();

        sorter.add('x', 'y');
        internals.testSort(sorter, ['y', 'x']);
    });

    it('should add multiple egdes with a single call passing an array of dependencies ', () => {

        const sorter = Topaz.sorter();

        sorter.add('x', ['y', 'z']).add('z', 'y');
        internals.testSort(sorter, ['y', 'z', 'x']);
    });

    it('should add multiple egdes with a single call passing dependencies as arguments ', () => {

        const sorter = Topaz.sorter();

        sorter.add('x', 'y', 'z').add('z', 'a', 'y');
        internals.testSort(sorter, ['y', 'a', 'z', 'x']);
    });

    it('should add multiple egdes with multiple calls', () => {

        const sorter = Topaz.sorter();

        sorter.add('x', 'y').add('x', 'z').add('x', ['a', 'b']).add('x', 'c', 'd');
        internals.testSort(sorter, ['y', 'z', 'a', 'b', 'c', 'd', 'x']);
    });

    it('should sort complex sequences', () => {

        const sorter = Topaz.sorter();

        sorter
            .add('a', ['b', 'f'])
            .add('g', ['a', 'b', 'c'])
            .add('b', 'h')
            .add('d', 'c', 'i', 'e', 'h')
            .add('e', 'i')
            .add('j', 'e')
            .add('i', 'c')
            .add('h', 'k')
            .add('l');

        internals.testSort(sorter, ['k', 'h', 'b', 'f', 'a', 'c', 'g', 'i', 'e', 'd', 'j', 'l']);
    });

    it('should detect circular dependencies', () => {

        const sorter = Topaz.sorter();

        sorter.add(1, 2).add(2, 3).add(3, 1);
        expect(() => sorter.sort()).toThrow('Circular dependency detected. Dependency chain: 1 => 2 => 3 => 1');
    });
});

internals.testSort = function (sorter, expected) {

    expect(Bone.equal(sorter.sort(), expected)).toBe(true);
};
