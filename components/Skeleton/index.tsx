import classNames from 'classnames'
import { FC, HTMLProps } from 'react'

import style from './Style.module.scss'

const Skeleton: FC<HTMLProps<HTMLDivElement>> = ({ className, ...others }) => {
  return (
    <div className={classNames([style.skeleton, className])} {...others}></div>
  )
}

export default Skeleton
