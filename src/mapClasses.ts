/**
 * Easily map over classes to map to css modules
 *
 * @param className classes to be mapped
 * @param maps Object created by importing css module
 * @param string Should the format be a string or an array
 * @returns an array or space separated string of classNames
 */
const mapClasses = (className: string | string[], maps: { [key: string]: string }, string: Boolean = true) => {
  const _classList = typeof className === 'string' ? className.split(' ') : className.slice(0);
  const _output = _classList.slice(0);

  for (const cn of _classList) maps[cn] && _output.push(maps[cn]);

  return string ? (_output.join(' ') as string) : _output;
};

/**
 * Easily map over classes to map to css modules
 *
 * @param className classes to be mapped
 * @returns an array or space separated string of classNames
 */
type mc = (className: string | string[]) => string | string[];

/**
 * A curried variant of mapClasses to save on duplication
 *
 * @param maps Object created by importing css module
 * @param string Should the format be a string or an array
 * @returns mapClasses function that only requires className
 */
const mapClassesCurried = (maps: { [key: string]: string }, string: boolean = true): mc => {
  return (className: string | string[]) => mapClasses(className, maps, string);
};

export { mapClasses, mapClassesCurried };
