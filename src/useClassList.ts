import { useMemo } from 'react';

interface IClassListProps {
  /** default classes to be applied to the array */
  defaultClass?: string;
  /** classes to be applied to the array */
  className?: string | string[];
  /** variant classes to be applied to the array */
  variant?: string | string[];
  /** maps classes to be applied to the array */
  maps?: { [key: string]: string };
  /** determines if the output is a string or an array */
  string?: boolean;
}

/**
 * A simple hook to generate a class list, based on the default classes, the className and the variant classes.
 *
 * @param object containing the default classes, the className and the variant classes (all are optional and can be an array or a string)
 *
 * @example
 * const classList = useClassList(
 *   { defaultClass: "choice-box", string: true },
 *   useCallback((_c) => active && _c.push("choice-box--is-active"), [active])
 * );
 *
 * @returns set of class names in array or string format
 */
export default function useClassList(
  { defaultClass, className, variant, maps, string = false }: IClassListProps,
  callback?: (list: string[]) => void,
): string | string[] {
  return useMemo(() => {
    const _classList = [];

    // add default classes
    if (defaultClass) _classList.push(defaultClass);

    // add className
    if (className) {
      if (typeof className === 'string') {
        for (const name of className.split(' ')) _classList.push(name);
      } else if (Array.isArray(className)) {
        for (const name of className) _classList.push(name);
      }
    }

    // add variant classes
    if (variant) {
      if (typeof variant === 'string') {
        for (const name of variant.split(' ')) _classList.push(`${defaultClass}--${name}`);
      } else if (Array.isArray(variant)) {
        for (const name of variant) _classList.push(`${defaultClass}--${name}`);
      }
    }

    // if there is a callback, call it
    if (typeof callback === 'function') callback(_classList);

    // if a maps object has been passed, add the classes from the maps
    if (maps) {
      for (const cn of _classList) {
        if (maps[cn]) _classList.push(maps[cn]);
      }
    }

    if (string) return _classList.join(' ');

    return _classList;
  }, [defaultClass, className, variant, maps, string, callback]);
}
