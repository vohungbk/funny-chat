import { ChangeEvent, FC, useState } from 'react'
import classNames from 'classnames'

import style from './Style.module.scss'

import {
  AuthProvider,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import Image from 'next/image'
import AuthWrapper from '@Components/Auth/AuthWrapper'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { addDocument } from '../../firebase/service'
import { generateKeywords } from 'shared/utils'

const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider()

const Login: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleLoginThirdParty = async (provider: AuthProvider) => {
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user
    if (getAdditionalUserInfo(userCredential)?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName as string,
        email: user.email as string,
        photoUrl: user.photoURL as string,
        uid: user.uid as string,
        providerId: user.providerId as string,
        keywords: generateKeywords(user.displayName as string),
      })
    }
  }

  const handleLogin = () => {
    setIsSubmitting(true)
    signInWithEmailAndPassword(auth, emailValue, password)
      .then((userCredential) => {
        setIsSubmitting(false)
        const user = userCredential.user
        if (getAdditionalUserInfo(userCredential)?.isNewUser) {
          addDocument('users', {
            displayName: user.displayName as string,
            email: user.email as string,
            photoUrl: user.photoURL as string,
            uid: user.uid as string,
            providerId: user.providerId as string,
            keywords: generateKeywords(user.displayName as string),
          })
        }
      })
      .catch((error) => {
        setIsSubmitting(false)
        const errorMessage = error.message
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 3000,
        })
      })
  }

  return (
    <AuthWrapper>
      <div className={style.rightContent}>
        <h3 className={style.boxTitle}>Log In</h3>
        <form autoComplete="new-password">
          <div className={classNames([style.inputControl, style.name])}>
            <div className={style.inputField}>
              <input
                type="text"
                maxLength={64}
                autoComplete="new-password"
                className={style.input}
                autoFocus
                value={emailValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setEmailValue(e.target.value)
                }}
              />
              <label className={style.label}>Email</label>
            </div>
          </div>
          <div className={classNames([style.inputControl, style.password])}>
            <div className={style.inputField}>
              <input
                type="password"
                maxLength={64}
                autoComplete="new-password"
                className={style.input}
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  setPassword(e.target.value)
                }}
              />
              <label className={style.label}>Password</label>
            </div>
          </div>

          <div className={style.forget}>
            <Link href="/en-us/reset-password/">Forgot password?</Link>
          </div>
          <button
            onClick={handleLogin}
            disabled={isSubmitting}
            className={style.loginBtnSubmit}
          >
            <span>Log In</span>
          </button>
          <p className={style.formLink}>
            <span>
              No account? <Link href={'/register'}>Register</Link>
            </span>
          </p>
          <div className={classNames([style.thirdList, style.third])}>
            <div className={style.label}>
              <span>OR Login in with</span>
            </div>
            <div className={style.list}>
              <a onClick={() => handleLoginThirdParty(ggProvider)}>
                <i>
                  <Image
                    className={style.image}
                    src="/google.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </i>
                Google
              </a>
              <a onClick={() => handleLoginThirdParty(fbProvider)}>
                <i>
                  <Image
                    className={style.image}
                    src="/facebook.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </i>
                Facebook
              </a>
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Login
