import Image from 'next/image'

import style from './Style.module.scss'

const LeftAuth = () => {
  return (
    <div className={style.leftContent}>
      <Image
        className={style.image}
        src="/illustration.svg"
        alt=""
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
        priority
      />
    </div>
  )
}

export default LeftAuth
