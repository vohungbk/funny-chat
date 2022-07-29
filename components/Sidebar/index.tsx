import Dropdown, { DropdownItem, DropdownMenu } from '@Components/Dropdown'
import classNames from 'classnames'
import { AuthContext } from 'context/AuthProvider'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Image from 'next/image'
import { MouseEvent, useContext, useState } from 'react'
import { DEFAULT_AVATAR, IMAGE_PROXY } from 'shared/constants'
import style from './Style.module.scss'
import CreateConvention from '@Components/CreateConvention'

const Sidebar = () => {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOpen(!open)
  }

  return (
    <div className={style.sidebar}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.headerWrapper}>
            <Dropdown isOpen={open} className={style.userDropdown}>
              <div className={style.logo} onClick={handleClick}>
                <Image
                  src={
                    user.photoURL ? IMAGE_PROXY(user.photoURL) : DEFAULT_AVATAR
                  }
                  alt=""
                  width={36}
                  height={36}
                  objectFit="cover"
                />
              </div>
              <DropdownMenu className={style.menuAccount}>
                <DropdownItem className={style.item}>
                  <a
                    href="#"
                    className={style.link}
                    onClick={() => signOut(auth)}
                  >
                    <i
                      className={classNames([
                        'bx bx-log-out-circle',
                        style.icon,
                      ])}
                    ></i>

                    <div className={style.text}>SignOut</div>
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div className={style.title}>
              <h1>Chat</h1>
            </div>
            <div className={style.action}>
              <button
                className={style.btnCreate}
                onClick={() => setOpenModal(!openModal)}
              >
                <i className="bx bxs-edit"></i>
              </button>
            </div>
          </div>
        </div>

        <div className={style.content}></div>
      </div>
      {openModal && (
        <CreateConvention open={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  )
}

export default Sidebar
