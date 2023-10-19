# @blocdigital/useclasslist

> React hook that allows modifying class lists easily with css modules.

## Install

```bash
npm install --save @bloc/useclasslist
```

## Usage

### Hook usage

```tsx
import { useCallback } from 'react';
import useClassList from '@blocdigital/useclasslist';
import styles from './styles.module.scss';

export default function GreatContent({ active, className, ...props }) {
  // Create a classNist that can be used for your base component.
  // A use callback can push in to the array of classes to add extra classes.
  const classList = useClassList(
    { defaultClass: 'great-content', className, maps: styles, string: true },
    useCallback((_c) => active && _c.push('great-content--is-active'), [active]),
  );

  return <div className={classList}>This is my great content</div>;
}
```

### Function usage

```tsx
import { useCallback } from 'react';
import { mapClassesCurried } from '@blocdigital/useclasslist';
import styles from './styles.module.scss';

// mc is a new function that has all the styles ready to me matched
const mc = mapClassesCurried(styles, true);

export default function MoarContent({ children }) {
  return <div classname={mc('some-class')}>{children}</div>;
}
```
