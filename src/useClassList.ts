import { useMemo } from 'react';

interface IClassListProps<T> {
  /** default classes to be applied to the array */
  defaultClass?: string;
  /** classes to be applied to the array */
  className?: string | string[];
  /** variant classes to be applied to the array */
  variant?: string | string[];
  /** maps classes to be applied to the array */
  maps?: { [key: string]: string };
  /** determines if the output is a string or an array */
  string?: T;
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
export default function useClassList<T extends boolean = false>(
  { defaultClass, className, variant, maps, string }: IClassListProps<T>,
  callback?: (list: string[]) => void,
): T extends true ? string : string[] {
  return useMemo(() => {
    const _classList: string[] = [];

    // add default classes
    if (defaultClass) _classList.push(defaultClass);

    // add className
    className && _classList.push(...(typeof className === 'string' ? className.split(' ') : className.slice(0)));

    // add variant classes
    variant &&
      _classList.push(
        ...(typeof variant === 'string' ? variant.split(' ') : variant.slice(0)).map(
          (name) => `${defaultClass}--${name}`,
        ),
      );

    // if there is a callback, call it
    if (typeof callback === 'function') callback(_classList);

    // if a maps object has been passed, add the classes from the maps
    const _output = _classList.slice(0);
    if (maps) {
      for (const cn of _classList) {
        if (maps[cn]) _output.push(maps[cn]);
      }
    }

    return (string ? _output.join(' ') : _output) as T extends true ? string : string[];
  }, [defaultClass, className, variant, maps, string, callback]);
}
