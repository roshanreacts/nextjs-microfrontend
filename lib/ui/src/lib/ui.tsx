'use client';
import styles from './ui.module.css';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { store } from '@lib/state';

export function Ui() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    console.log('useEffect');
  }, [store.name]);
  return (
    <div className={styles['container']}>
      {show && <h1>Welcome to {store.name}</h1>}
      <button onClick={() => setShow(!show)}>Toggle</button>
      <button onClick={async () => await store.getUser()}>Get Name</button>
    </div>
  );
}

export default observer(Ui);

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Ui />);
    expect(baseElement).toBeTruthy();
  });
}
