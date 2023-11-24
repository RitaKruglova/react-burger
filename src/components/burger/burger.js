import burgerStyles from './burger.module.css'

function Burger({ children }) {
  return (
    <section className={burgerStyles.burger}>
      {children}
    </section>
  )
}

export default Burger;