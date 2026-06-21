import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AuthPage.css'

type ActiveTab = 'signin' | 'signup'

type SignUpData = {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  ageConfirmed: boolean
  country: string
  city: string
  nativeLanguage: string
  spokenLanguage: string
}

export default function AuthPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ActiveTab>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Sign Up form state
  const [signUpData, setSignUpData] = useState<SignUpData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    ageConfirmed: false,
    country: '',
    city: '',
    nativeLanguage: '',
    spokenLanguage: '',
  })

  return (
    <div className="sign-in-container">
      {/* Left Side - Background with Logo (Fullscreen background layer) */}
      <div className="left-side">
        {/* Background Image */}
        <div className="background-image">
          <img
            src={`${import.meta.env.BASE_URL}background.png`}
            alt="Background"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="gradient-overlay"></div>

        {/* Decorative Blur Circles */}
        <div className="blur-circle blur-circle-1"></div>
        <div className="blur-circle blur-circle-2"></div>

        {/* Logo and Title */}
        <div className="logo-section">
          <div className="logo-container">
            <div className="logo-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="16" fill="url(#gradient)" />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#615FFF" />
                    <stop offset="1" stopColor="#9810FA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <h1 className="logo-title">Speech Collection</h1>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="right-side">
        <div className="form-container">
          {/* Tab List */}
          <div className="tab-list">
            <button
              type="button"
              className={`tab-button ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Card */}
          <div className="card">
            {activeTab === 'signin' ? (
              <>
                {/* Card Header */}
                <div className="card-header">
                  <h2 className="card-title">Welcome Back</h2>
                  <p className="card-description">
                    Sign in to continue contributing your voice
                  </p>
                </div>

                {/* Sign In Form */}
                <form
                  className="sign-in-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // TODO: call your login API here
                    navigate('/projects')
                  }}
                >
                  {/* Email Field */}
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <div className="input-container">
                      <div className="input-wrapper">
                        <img
                          src={`${import.meta.env.BASE_URL}email-icon.svg`}
                          alt=""
                          className="input-icon"
                        />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="form-field">
                    <label className="form-label">Password</label>
                    <div className="input-container">
                      <div className="input-wrapper">
                       <img
                          src={`${import.meta.env.BASE_URL}password-icon.svg`}
                          className="input-icon"
                        />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="form-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="password-toggle"
                        >
                          <img src={`${import.meta.env.BASE_URL}eye-icon.svg`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remember Me and Forgot Password */}
                  <div className="form-options">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="checkbox"
                      />
                      <label htmlFor="remember" className="checkbox-label">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <button type="submit" className="sign-in-button">
                    Sign In
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Card Header */}
                <div className="card-header">
                  <h2 className="card-title">Create Account</h2>
                  <p className="card-description">
                    Start your journey in speech data collection
                  </p>
                </div>

                {/* Sign Up Form */}
                <form
                  className="sign-up-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    // TODO: call your signup API here
                    navigate('/projects')
                  }}
                >
                  {/* First Name and Last Name */}
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">First Name</label>
                      <div className="input-container">
                        <div className="input-wrapper">
                          <img src="/email-icon.svg" alt="" className="input-icon" />
                          <input
                            type="text"
                            placeholder="John"
                            className="form-input"
                            value={signUpData.firstName}
                            onChange={(e) =>
                              setSignUpData({ ...signUpData, firstName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label">Last Name</label>
                      <div className="input-container">
                        <div className="input-wrapper">
                          <img src="/email-icon.svg" alt="" className="input-icon" />
                          <input
                            type="text"
                            placeholder="Doe"
                            className="form-input"
                            value={signUpData.lastName}
                            onChange={(e) =>
                              setSignUpData({ ...signUpData, lastName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <div className="input-container">
                      <div className="input-wrapper">
                        <img src="/email-icon.svg" alt="" className="input-icon" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="form-input"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="form-field">
                    <label className="form-label">Date of Birth</label>
                    <div className="input-container">
                      <div className="input-wrapper">
                        <img src="/email-icon.svg" alt="" className="input-icon" />
                        <input
                          type="date"
                          className="form-input"
                          value={signUpData.dateOfBirth}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, dateOfBirth: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Country and City */}
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Country</label>
                      <div className="input-container">
                        <div className="input-wrapper select-wrapper">
                          <img src="/email-icon.svg" alt="" className="input-icon" />
                          <select
                            className="form-input form-select"
                            value={signUpData.country}
                            onChange={(e) =>
                              setSignUpData({ ...signUpData, country: e.target.value })
                            }
                          >
                            <option value="">Select your country</option>
                            <option value="us">United States</option>
                            <option value="uk">United Kingdom</option>
                            <option value="ca">Canada</option>
                            <option value="au">Australia</option>
                          </select>
                          <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="form-label">City</label>
                      <div className="input-container">
                        <div className="input-wrapper select-wrapper">
                          <img src="/email-icon.svg" alt="" className="input-icon" />
                          <select
                            className="form-input form-select"
                            value={signUpData.city}
                            onChange={(e) => setSignUpData({ ...signUpData, city: e.target.value })}
                            disabled={!signUpData.country}
                            style={{ opacity: signUpData.country ? 1 : 0.5 }}
                          >
                            <option value="">
                              {signUpData.country ? 'Select your city' : 'Select country first'}
                            </option>
                          </select>
                          <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
                            <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Native Language */}
                  <div className="form-field">
                    <label className="form-label">Native Language</label>
                    <div className="input-container">
                      <div className="input-wrapper select-wrapper">
                        <img src="/email-icon.svg" alt="" className="input-icon" />
                        <select
                          className="form-input form-select"
                          value={signUpData.nativeLanguage}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, nativeLanguage: e.target.value })
                          }
                        >
                          <option value="">Select your native language</option>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                        <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
                          <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Spoken Language */}
                  <div className="form-field">
                    <label className="form-label">Spoken Language</label>
                    <div className="input-container">
                      <div className="input-wrapper select-wrapper">
                        <img src="/email-icon.svg" alt="" className="input-icon" />
                        <select
                          className="form-input form-select"
                          value={signUpData.spokenLanguage}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, spokenLanguage: e.target.value })
                          }
                        >
                          <option value="">Select your spoken language</option>
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                        <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
                          <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button type="submit" className="sign-in-button">
                    Continue
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
