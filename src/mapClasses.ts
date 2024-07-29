/**
 * Easily map over classes to map to css modules
 *
 * @param className classes to be mapped
 * @param maps Object created by importing css module
 * @param str Should the format be a string or an array
 * @returns an array or space separated string of classNames
 */
function mapClasses<T extends boolean = true>(
  className: string | string[],
  maps: { [key: string]: string },
  str?: T,
): T extends true ? string : string[] {
  const _classList = typeof className === 'string' ? className.split(' ') : className.slice(0);
  const _output = _classList.slice(0);

  for (const cn of _classList) {
    if (maps[cn]) _output.push(maps[cn]);
  }

  return (typeof str === 'undefined' || str ? _output.join(' ') : _output) as T extends true ? string : string[];
}

/**
 * A curried variant of mapClasses to save on duplication
 *
 * @param maps Object created by importing css module
 * @param str Should the format be a string or an array
 * @returns mapClasses function that only requires className
 */
function mapClassesCurried<T extends boolean = true>(maps: { [key: string]: string }, str?: T) {
  return (className: string | string[]) => mapClasses(className, maps, str);
}

export { mapClasses, mapClassesCurried };
