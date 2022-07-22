import AuthWrapper from '@Components/Auth/AuthWrapper'
import classNames from 'classnames'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Link from 'next/link'
import { ChangeEvent, FC, useState } from 'react'

import style from './Style.module.scss'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const Register: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()

  const handleRegister = () => {
    setIsSubmitting(true)
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        setIsSubmitting(false)
        toast.success('Sign up success!', {
          position: 'top-right',
          autoClose: 3000,
        })
        router.push('/login')
      })
      .catch((err) => {
        toast.error(err.message, {
          position: 'top-right',
          autoClose: 3000,
        })
        setIsSubmitting(false)
      })
  }

  return (
    <AuthWrapper>
      <div className={style.rightContent}>
        <form autoComplete="new-password">
          <div className={style.inputControl}>
            <div className={classNames([style.inputField, style.email])}>
              <label htmlFor="email" className={style.label}>
                Email
              </label>
              <input
                id="email"
                placeholder="Email"
                name="email"
                autoComplete="new-password"
                maxLength={64}
                className={style.input}
                value={emailValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setEmailValue(e.target.value)
                }}
              />
            </div>
          </div>

          <div className={style.inputControl}>
            <div className={classNames([style.inputField, style.password])}>
              <label htmlFor="password" className={style.label}>
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                className={style.input}
                value={passwordValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setPasswordValue(e.target.value)
                }}
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            onClick={handleRegister}
            className={style.registerBtnSubmit}
          >
            <span>Sign Up</span>
          </button>
          <p className={style.formLink}>
            <span>
              Already have an account? <Link href="/login">Log in</Link>
            </span>
          </p>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Register
