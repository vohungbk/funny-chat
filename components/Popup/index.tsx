/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import style from './Style.module.scss'

interface PopupProps {
  onHide?: () => void
  title?: string
  children?: ReactNode
  footer?: string | ReactNode
  open: boolean
}

const Popup: FC<PopupProps> = ({ title, ...props }) => {
  const [open, setOpen] = useState<boolean>(props.open)
  const [closing, setClosing] = useState<boolean>()
  const timeoutClosing = useRef<any>()

  useEffect(() => {
    if (open) {
      setTimeout(() => document.body.classList.add('overflow-hidden'), 1)
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open])

  useEffect(() => {
    if (props.open) {
      setClosing(false)
      setOpen(props.open)
      clearTimeout(timeoutClosing.current)
    } else {
      setClosing(true)
      clearTimeout(timeoutClosing.current)
      setOpen(false)
      setClosing(false)
    }
  }, [props.open])

  const className = classNames([
    style.popup,
    {
      [style.open]: open,
      [style.closing]: closing,
    },
  ])

  return (
    <div className={className}>
      <div className={style.dialogPopup}>
        <div className={style.contentPopup}>
          {title ? <div className={style.headerPopup}>{title}</div> : ''}
          <button
            className={style.closeButton}
            onClick={() => props.onHide?.()}
          >
            <i className={classNames(['bx bx-x', style.icon])}></i>
          </button>
          {props.children ? (
            <div className={style.bodyPopup}>{props.children}</div>
          ) : (
            ''
          )}
          {props.footer ? (
            <div className={style.footerPopup}>{props.footer}</div>
          ) : (
            ''
          )}
        </div>
        <i className={style.overlayPopup} onClick={() => props.onHide?.()}></i>
      </div>
    </div>
  )
}

export default Popup
