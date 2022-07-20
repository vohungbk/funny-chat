import { ChangeEvent, FC, useState } from 'react'
import classNames from 'classnames'

import style from './Style.module.scss'

import {
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../firebase/config'
import Image from 'next/image'

const fbProvider = new FacebookAuthProvider()
const ggProvider = new GoogleAuthProvider()

const Login: FC = () => {
  const [tab, setTab] = useState<'Email' | 'Phone'>('Email')
  const [emailValue, setEmailValue] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const handleLoginThirdParty = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then((res) => console.log(res))
      .finally(() => setLoading(false))
  }

  return (
    <section className={style.login}>
      <div className={style.wrapper}>
        <div className={style.content}>
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
          <div className={style.rightContent}>
            <h3 className={style.boxTitle}>Log In</h3>
            <form autoComplete="new-password">
              <div className={style.loginTab}>
                <a
                  className={classNames([
                    style.tab,
                    { [style.active]: tab === 'Email' },
                  ])}
                  onClick={() => setTab('Email')}
                >
                  Email
                </a>
                <a
                  className={classNames([
                    style.tab,
                    { [style.active]: tab === 'Phone' },
                  ])}
                  onClick={() => setTab('Phone')}
                >
                  Phone
                </a>
              </div>
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
                  <label className={style.label}>
                    {tab === 'Email' ? 'Email' : 'Phone'}
                  </label>
                </div>
                {/* <div className={style.inputBottomMessage}>
                  <span className={style.errorMessage}>
                    Enter your email address
                  </span>
                </div> */}
              </div>
              <div className={classNames([style.inputControl, style.password])}>
                <div className={style.inputField}>
                  <input
                    type="password"
                    maxLength={64}
                    autoComplete="new-password"
                    className={style.input}
                  />
                  <label className={style.label}>Password</label>
                </div>
                <div className="e_input_bottom_message"></div>
              </div>

              <div className={style.forget}>
                <a href="/en-us/reset-password/">Forgot password?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={style.loginBtnSubmit}
              >
                <span>Log In</span>
              </button>
              <p data-v-31eed61f="" className={style.formLink}>
                <span data-v-31eed61f="">
                  No account? <a href="/en-us/register/">Register</a>
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
        </div>
      </div>
    </section>
  )
}

export default Login
