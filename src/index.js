'use strict';

const Assert = require('@botbind/dust/src/assert');

const internals = {};

exports.sorter = function () {
    return new internals.Sorter();
};

internals.Sorter = class {
    constructor() {
        this._edges = new Map();
    }

    add(node, ...deps) {
        if (deps.length === 1) {
            deps = deps[0];
            if (!Array.isArray(deps)) {
                deps = [deps];
            }
        }

        if (deps.length) {
            for (const dep of deps) {
                const adjs = this._edges.get(node);
                if (adjs) {
                    adjs.push(dep);
                    continue;
                }

                this._edges.set(node, [dep]);
            }
        }
        else {
            this._edges.set(node, []);
        }

        return this;
    }

    sort() {
        const visited = new Set();
        const sorted = [];

        const visit = (node, adjs, predecessors = new Set()) => {
            if (visited.has(node)) { // Node visited, skip
                return;
            }

            predecessors.add(node);
            visited.add(node);

            if (adjs) {
                for (const adj of adjs) {
                    Assert(!predecessors.has(adj), `Circular dependency detected. Dependency chain: ${[...predecessors, adj].join(' => ')}`);

                    visit(adj, this._edges.get(adj), new Set(predecessors));
                }
            }

            sorted.push(node);
        };

        for (const [node, adjs] of this._edges) {
            visit(node, adjs);
        }

        return sorted;
    }
};
