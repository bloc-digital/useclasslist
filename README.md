# @blocdigital/useclasslist

> React hook that allows modifying class lists easily with css modules.

## Install

```bash
npm install --save @bloc/useclasslist
```

## Usage

```tsx
import { useCallback } from 'react';
import useClassList from '../../hooks/useClassList';
import styles from './styles.module.scss';

export default function GreatContent({ active, ...props }) {
  const classList = useClassList(
    { defaultClass: 'great-content', maps: styles, string: true },
    useCallback((_c) => active && _c.push('great-content--is-active'), [active]),
  );

  return <div className={classList}>This is my great content</div>;
}
```
