/**
 * Easily map over classes to map to css modules
 * 
 * @param className classes to be mapped
 * @param maps Object created by importing css module
 * @param string Should the format be a string or an array
 * @returns an array or space separated string of classNames
 */
const mapClasses = (
  className: string | string[],
  maps: { [key: string]: string },
  string: Boolean = true
): string | string[] => {
  const _classList = []

  if (typeof className === "string") {
    _classList.push(...className.split(" "));
  } else if (Array.isArray(className)) {
    _classList.push(...className);
  }

  for (const cn of _classList) {
    if (maps[cn]) _classList.push(maps[cn]);
  }

  if (string) return _classList.join(" ");

  return _classList;
};

/**
 * A curried variant of mapClasses to save on duplication
 * 
 * @param maps Object created by importing css module
 * @param string Should the format be a string or an array
 * @returns mapClasses function that only requires className
 */
const mapClassesCurried = (maps: { [key: string]: string }, string: Boolean = true): (className: string | string[]) => string | string[] => {
  /**
   * Easily map over classes to map to css modules
   * 
   * @param className classes to be mapped
   * @returns an array or space separated string of classNames
   */
  const func = (className: string | string[]) => mapClasses(className, maps, string);
  return func;
}

export { mapClasses, mapClassesCurried }