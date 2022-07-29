import style from './Style.module.scss'

const Error = () => {
  return (
    <div className={style.error}>
      <p className={style.title}>Something went wrong</p>
    </div>
  )
}

export default Error
