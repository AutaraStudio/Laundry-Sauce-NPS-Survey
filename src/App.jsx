import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { questions } from './data/questions'
import './App.css'

gsap.registerPlugin(CustomEase)

CustomEase.create('smooth', '0.22, 1, 0.36, 1')
CustomEase.create('buttery', '0.16, 1, 0.3, 1')
CustomEase.create('imageSlide', '0.45, 0, 0.55, 1')

const Logo = ({ className }) => (
  <svg className={className} viewBox="0 0 236 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.02047 20.514L38.3369 12.1305H10.0945L7.02047 20.514ZM6.59954 21.662L5.2839 25.25H5.28572L2.09656 34.1495L38.5941 13.0969L6.59954 21.662ZM1.57495 35.605L0 40H13.0334L39.094 13.9633L1.57495 35.605ZM14.4489 40H25.1661L39.8062 14.666L14.4489 40ZM26.3219 40H34.0116L40.6711 15.1693L26.3219 40ZM35.0478 40H41.6376V15.4292L35.0478 40ZM42.6385 40H49.2288L42.6385 15.4273V40ZM50.1713 39.6503L52.3203 33.6534C52.6446 32.7483 52.7601 31.7948 52.673 30.8601L43.6055 15.1691L50.1713 39.6503ZM50.386 24.9025C51.4645 24.6247 52.4867 24.1867 53.421 23.6103L44.4732 14.6707L50.386 24.9025ZM54.262 23.0363C55.1738 22.3502 55.9801 21.5219 56.6455 20.5763L45.1804 13.9629L54.262 23.0363ZM57.1836 19.732C57.492 19.1957 57.7578 18.6284 57.9758 18.0338L58.5256 16.5346L45.6778 13.0952L57.1836 19.732ZM58.8713 15.5918L60.1404 12.1305H45.9415L58.8713 15.5918ZM60.5071 11.1305L61.6315 8.06389C61.78 7.65908 61.8821 7.25179 61.9412 6.84684L45.9397 11.1305H60.5071ZM62 5.79582C61.9487 4.25961 61.2986 2.82175 60.2459 1.76246L45.6788 10.1651L62 5.79582ZM59.4324 1.07701C58.4714 0.403271 57.2938 0 55.9925 0H54.4856L45.1777 9.29939L59.4324 1.07701ZM53.0701 0H49.4371L44.4744 8.58786L53.0701 0ZM48.2814 0H45.7756L43.6056 8.09119L48.2814 0ZM44.7394 0H42.6385V7.83342L44.7394 0ZM41.6376 0H39.5372L41.6376 7.83154V0ZM38.501 0H35.9953L40.6709 8.09095L38.501 0ZM34.8396 0H31.2046L39.8051 8.59257L34.8396 0ZM29.7891 0H22.9754L39.0967 9.29905L29.7891 0ZM10.4612 11.1305H38.3387L12.953 4.33465L10.4612 11.1305ZM13.3033 3.39316L38.5932 10.1633L20.9736 0H18.3885C16.1557 0 14.1524 1.3462 13.3033 3.39316Z" fill="currentColor"/>
    <path d="M193.827 12.4573H202.65L210.862 26.6222L219.1 12.4573H227.924V31.0604H223.778V12.6433L213.068 31.0604H208.683L197.946 12.6433V31.0604H193.827V12.4573Z" fill="currentColor"/>
    <path d="M167.25 23.8317C164.114 23.8317 161.589 21.307 161.589 18.1445C161.589 15.0086 164.114 12.4573 167.25 12.4573H191.301V16.6031H167.25C166.4 16.6031 165.709 17.2941 165.709 18.1445C165.709 19.0215 166.4 19.7125 167.25 19.7125H185.614C188.75 19.7125 191.301 22.2372 191.301 25.3997C191.301 28.5357 188.75 31.0604 185.614 31.0604H161.589V26.9411H185.614C186.464 26.9411 187.155 26.2501 187.155 25.3997C187.155 24.5227 186.464 23.8317 185.614 23.8317H167.25Z" fill="currentColor"/>
    <path d="M152.186 12.4573C156.172 12.4573 159.414 15.6995 159.414 19.7125C159.414 23.6989 156.172 26.9411 152.186 26.9411H133.583V31.0604H129.463V12.4573H152.186ZM152.159 22.7953C153.887 22.7953 155.269 21.4133 155.269 19.7125C155.269 17.9851 153.887 16.6031 152.159 16.6031H133.583V22.7953H152.159Z" fill="currentColor"/>
    <path d="M107.304 16.6031C104.434 16.6031 102.121 18.9152 102.121 21.7588C102.121 24.629 104.434 26.9411 107.304 26.9411H122.665V23.6989H106.905V19.5796H126.81V31.0604H107.304C102.148 31.0604 98.0022 26.9145 98.0022 21.7588C98.0022 16.6297 102.148 12.4573 107.304 12.4573H126.81V16.6031H107.304Z" fill="currentColor"/>
    <path d="M71.3288 31.0604V12.4573H75.4481V26.9411H96.2569V31.0604H71.3288Z" fill="currentColor"/>
    <path d="M235.639 11.4177C235.639 12.7529 234.557 13.8354 233.222 13.8354C231.886 13.8354 230.804 12.7529 230.804 11.4177C230.804 10.0824 231.886 9 233.222 9C234.557 9 235.639 10.0824 235.639 11.4177Z" fill="currentColor"/>
  </svg>
)

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const contentRef = useRef(null)
  const submitWrapRef = useRef(null)
  const imagePanelRef = useRef(null)
  const currentImageRef = useRef(null)
  const nextImageRef = useRef(null)
  const thankYouRef = useRef(null)

  // Get NPS score for conditional logic
  const npsScore = answers[1]

  // Filter questions based on conditions
  const visibleQuestions = questions.filter((q) => {
    if (!q.showIf) return true
    const { field, op, value } = q.showIf
    const answer = field === 'nps_score' ? npsScore : answers[field]
    if (answer === undefined || answer === null) return false
    if (op === '>=') return answer >= value
    if (op === '<=') return answer <= value
    return true
  })

  const current = visibleQuestions[currentStep]
  const surveyQuestions = visibleQuestions.filter(q => q.type !== 'thankyou')
  const progress = ((currentStep + 1) / visibleQuestions.length) * 100
  const isLast = currentStep === visibleQuestions.length - 1

  const currentAnswer = answers[current?.id]
  const hasAnswer = (() => {
    if (!current) return false
    if (current.type === 'slider') return currentAnswer !== undefined
    return currentAnswer !== undefined && currentAnswer !== ''
  })()

  const needsSubmitButton = current?.type === 'text' || current?.type === 'slider'

  // Preload all images
  useEffect(() => {
    questions.forEach((q) => {
      if (q.image) {
        const img = new Image()
        img.src = q.image
      }
    })
  }, [])

  // Animate content in
  useLayoutEffect(() => {
    if (showThankYou || !current || current.type === 'thankyou') return

    gsap.set(contentRef.current, { opacity: 0, filter: 'blur(12px)', y: 8 })
    gsap.set(submitWrapRef.current, { opacity: 0, filter: 'blur(12px)', y: 8 })

    const tl = gsap.timeline({ delay: 0.05 })

    tl.to(contentRef.current, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 0)

    if (submitWrapRef.current) {
      tl.to(submitWrapRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.05)
    }

    return () => tl.kill()
  }, [currentStep, showThankYou])

  // Show thank you screen
  const showThankYouScreen = useCallback(() => {
    setShowThankYou(true)

    requestAnimationFrame(() => {
      if (thankYouRef.current) {
        gsap.fromTo(thankYouRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' }
        )
      }
    })
  }, [])

  // Transition out then switch step
  const transitionToStep = useCallback((nextStep) => {
    if (isAnimating) return
    setIsAnimating(true)
    setError('')

    // Compute visible questions fresh to avoid stale closure
    const currentAnswers = { ...answers }
    const currentNps = currentAnswers[1]
    const freshVisible = questions.filter((q) => {
      if (!q.showIf) return true
      const { field, op, value } = q.showIf
      const answer = field === 'nps_score' ? currentNps : currentAnswers[field]
      if (answer === undefined || answer === null) return false
      if (op === '>=') return answer >= value
      if (op === '<=') return answer <= value
      return true
    })

    const nextQuestion = freshVisible[nextStep]

    // Thank you screen — fade out only, no image slide
    if (nextQuestion?.type === 'thankyou') {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentStep(nextStep)
          setIsAnimating(false)
          showThankYouScreen()
        }
      })

      if (contentRef.current) {
        tl.to(contentRef.current, {
          opacity: 0, filter: 'blur(8px)', duration: 0.25, ease: 'smooth',
        }, 0)
      }
      if (submitWrapRef.current) {
        tl.to(submitWrapRef.current, {
          opacity: 0, filter: 'blur(8px)', duration: 0.25, ease: 'smooth',
        }, 0)
      }
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentStep(nextStep)
        setIsAnimating(false)
      }
    })

    // Fade + blur out content
    if (contentRef.current) {
      tl.to(contentRef.current, {
        opacity: 0, filter: 'blur(8px)', duration: 0.25, ease: 'smooth',
      }, 0)
    }

    // Fade + blur out submit
    if (submitWrapRef.current) {
      tl.to(submitWrapRef.current, {
        opacity: 0, filter: 'blur(8px)', duration: 0.25, ease: 'smooth',
      }, 0)
    }

    // Slide images
    if (currentImageRef.current && nextImageRef.current && imagePanelRef.current && nextQuestion?.image) {
      const panelHeight = imagePanelRef.current.offsetHeight

      nextImageRef.current.src = nextQuestion.image
      gsap.set(nextImageRef.current, { y: panelHeight, opacity: 1, force3D: true })
      gsap.set(currentImageRef.current, { force3D: true })

      tl.to(currentImageRef.current, {
        y: -panelHeight, duration: 0.6, ease: 'imageSlide', force3D: true,
      }, 0)

      tl.to(nextImageRef.current, {
        y: 0, duration: 0.6, ease: 'imageSlide', force3D: true,
      }, 0)
    }

  }, [isAnimating, answers, showThankYouScreen])

  // Reset images after step change
  useEffect(() => {
    if (showThankYou || !current || current.type === 'thankyou') return
    if (currentImageRef.current) {
      currentImageRef.current.src = current.image
      gsap.set(currentImageRef.current, { y: 0, opacity: 1 })
    }
    if (nextImageRef.current) {
      gsap.set(nextImageRef.current, { y: 0, opacity: 0 })
    }
  }, [currentStep, showThankYou])

  // Scale select — auto advance
 // Scale select — auto advance with conditional logic
  const handleScaleSelect = useCallback((value) => {
    if (isAnimating) return
    setError('')
    setAnswers(prev => ({ ...prev, [current.id]: value }))

    // Compute next visible question based on this new answer
    setTimeout(() => {
      const updatedAnswers = { ...answers, [current.id]: value }
      const updatedNps = current.id === 1 ? value : npsScore

      const nextVisible = questions.filter((q) => {
        if (!q.showIf) return true
        const { field, op, value: threshold } = q.showIf
        const answer = field === 'nps_score' ? updatedNps : updatedAnswers[field]
        if (answer === undefined || answer === null) return false
        if (op === '>=') return answer >= threshold
        if (op === '<=') return answer <= threshold
        return true
      })

      const currentIndexInNext = nextVisible.findIndex(q => q.id === current.id)
      if (currentIndexInNext < nextVisible.length - 1) {
        // Find what step index the next question maps to in visibleQuestions after re-render
        const nextQuestion = nextVisible[currentIndexInNext + 1]
        // Force step to the right index
        setCurrentStep(currentIndexInNext + 1)
        setIsAnimating(false)
      }
    }, 400)
  }, [current?.id, currentStep, isAnimating, answers, npsScore])

  // Text input
  const handleTextChange = (value) => {
    setError('')
    setAnswers(prev => ({ ...prev, [current.id]: value }))
  }

  // Submit / next
  const handleSubmit = useCallback(() => {
    if (isAnimating) return
    if (!hasAnswer) {
      setError('Please complete this question before continuing')
      return
    }
    setError('')

    if (isLast) {
      console.log('Survey complete:', answers)
    } else {
      transitionToStep(currentStep + 1)
    }
  }, [hasAnswer, isLast, answers, isAnimating, currentStep, transitionToStep])

  // Enter key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && needsSubmitButton) {
        e.preventDefault()
        handleSubmit()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSubmit, needsSubmitButton])

  useEffect(() => {
    setError('')
  }, [currentStep])

  // Thank you screen
  if (showThankYou) {
    const tyData = visibleQuestions.find(q => q.type === 'thankyou')
    return (
      <div ref={thankYouRef} className="thankyou-screen">
        <img src={tyData.image} alt="" className="thankyou-bg" />
        <div className="thankyou-overlay" />
        <div className="thankyou-content">
          <Logo className="thankyou-logo" />
          <h1 className="thankyou-heading">{tyData.heading}</h1>
          <p className="thankyou-body">
            {tyData.body}{' '}
            Get started with our <a href={tyData.linkUrl}>{tyData.linkText}</a>!
          </p>
        </div>
      </div>
    )
  }

  if (!current || current.type === 'thankyou') return null

  return (
    <div className="survey-container">
      <div className="survey-image-panel" ref={imagePanelRef}>
        <img ref={currentImageRef} src={current.image} alt="" className="survey-image" />
        <img ref={nextImageRef} src="" alt="" className="survey-image" style={{ opacity: 0 }} />
      </div>

      <div className="survey-form-panel">
        <Logo className="survey-logo" />

        <div className="survey-progress-wrapper">
          <div className="survey-progress-label">{currentStep + 1} of {surveyQuestions.length}</div>
          <div className="survey-progress-track">
            <div className="survey-progress-fill" style={{ width: `${((currentStep + 1) / surveyQuestions.length) * 100}%` }} />
          </div>
        </div>

        <div ref={contentRef} className="survey-content">
          <h2 className="survey-question">{current.question}</h2>

          {current.subtitle && <p className="survey-subtitle">{current.subtitle}</p>}
          {current.description && <p className="survey-description">{current.description}</p>}

          <div className="survey-options-wrapper">
            <div className="survey-options">

              {current.type === 'scale' && (
                <div className="scale-container">
                  <div className="scale-buttons">
                    {Array.from({ length: current.max - current.min + 1 }, (_, i) => {
                      const val = current.min + i
                      const isSelected = currentAnswer === val
                      const inRange = currentAnswer && val <= currentAnswer && val > current.min
                      return (
                        <button
                          key={val}
                          className={`scale-btn ${isSelected ? 'selected' : inRange ? 'in-range' : ''}`}
                          onClick={() => handleScaleSelect(val)}
                        >
                          {val}
                        </button>
                      )
                    })}
                  </div>
                  <div className="scale-labels">
                    <span className="scale-label">{current.minLabel}</span>
                    <span className="scale-label">{current.maxLabel}</span>
                  </div>
                </div>
              )}

              {current.type === 'text' && (
                <textarea
                  className="option-textarea"
                  placeholder={current.placeholder || 'Type your answer here...'}
                  rows={5}
                  value={currentAnswer || ''}
                  onChange={(e) => handleTextChange(e.target.value)}
                />
              )}
            </div>

            <div className={`error-tooltip ${error ? 'visible' : ''}`}>{error}</div>
          </div>
        </div>

        {needsSubmitButton && (
          <div ref={submitWrapRef} className="survey-submit">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App