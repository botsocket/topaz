export { };

/**
 * Creates a sorter.
 *
 * @returns A sorter.
 */
export function sorter<T>(): internals.Sorter<T>;

declare namespace internals {
    class Sorter<T> {
        /**
         * Adds a node and its dependencies where:
         *
         * @param node - The node to add.
         * @param deps - Optional dependencies to the node. Can be an array of values or multiple values passed as arguments.
         *
         * @returns The current sorter instance.
         */
        add(node: T, deps?: readonly T[]): this;
        add(node: T, ...deps: readonly T[]): this;

        /**
         * Sorts the given nodes topologically. If a circular dependency is detected, an error will be thrown with the dependency chain for debugging purposes. Note that objects are sorted by their references.
         *
         * @returns An array with the sorted nodes.
         */
        sort(): T[];
    }
}
