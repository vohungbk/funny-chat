/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames'
import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import style from './Style.module.scss'

interface ContextType {
  isOpen: boolean
  setOpen(isOpen: boolean): void
}

const initState: ContextType = {
  isOpen: false,
  setOpen: () => null,
}

const Context = React.createContext(initState)

interface DropdownProps {
  children: ReactNode
  isOpen: boolean
  className?: string
}

const Dropdown: FC<DropdownProps> = ({ children, className, ...props }) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [isOpen, setOpen] = useState(props.isOpen)

  useEffect(() => {
    window.document.addEventListener(
      'click',
      (event: any) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setOpen(false)
        }
      },
      { passive: true }
    )
  }, [])

  useEffect(() => {
    if (props.isOpen !== isOpen) {
      setOpen(props.isOpen)
    }
  }, [props.isOpen, isOpen])

  const handleClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      event.stopPropagation()
    }
  }

  const providerValue = { isOpen, setOpen }
  return (
    <div
      ref={dropdownRef}
      className={classnames([style.dropdown, className])}
      onClick={handleClick}
    >
      <Context.Provider value={providerValue}>{children}</Context.Provider>
    </div>
  )
}

export default Dropdown

interface DropdownMenuProps {
  children: ReactNode
  className?: string
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  children,
  className,
}) => {
  const { isOpen } = useContext(Context)
  return isOpen ? (
    <div className={classnames([style.menuDropdown, className])}>
      {children}
    </div>
  ) : null
}

interface DropdownItemProps {
  onClick?(event: React.MouseEvent<HTMLElement>): void
  children: ReactNode
  className?: string
}

export const DropdownItem: FC<
  DropdownItemProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(function DropdownItem(
  { children, onClick, className },
  ref
) {
  const { setOpen } = useContext(Context)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event)
    setOpen(false)
  }

  return (
    <div onClick={handleClick} className={classnames([className])} ref={ref}>
      {children}
    </div>
  )
})
