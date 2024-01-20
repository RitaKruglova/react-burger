import { FC, ReactNode } from 'react';
import burgerStyles from './burger.module.css';

interface IBurgerProps {
  children: ReactNode
}

const Burger: FC<IBurgerProps> = ({ children }) => {
  return (
    <section className={burgerStyles.burger}>
      {children}
    </section>
  )
}

export default Burger;