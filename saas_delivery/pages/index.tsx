import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      Insira na url o nome do estabelecimento para acessar a pagina
      <Link href='/BurgerLanches'>Burgerlanches</Link>
      <div> - </div>
      <Link href='/PizzaLanches'>Pizzalanches</Link>
    </div>
  )
}

export default Home
