import styles from "./NotFound.module.css";
import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <h1>Página não encontrada!</h1>
      <Link to="/" className="btn">
        Voltar
      </Link>
    </div>
  )
}