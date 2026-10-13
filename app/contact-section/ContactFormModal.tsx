import React, { useEffect, useRef, useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { sendEnquiry } from '../services/emailService'
import { BOOKING_URL } from '../lib/contact'
import {
  CONTACT_METHODS,
  DETAIL_FIELDS,
  ENQUIRY_OPTIONS,
  Field,
  SOURCES,
  TIMELINES,
  getOption,
} from './formConfig'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  // Service value from a service page link, e.g. "react-native-app-development"
  initialService?: string
}

const STEPS = ['You', 'Need', 'Details', 'Timing']
// A real person needs longer than this to fill four steps; bots do not.
const MIN_FILL_MS = 5000

const filledTooFast = (openedAt: number) => Date.now() - openedAt < MIN_FILL_MS

const inputClass =
  'w-full rounded-md border border-gray-600 bg-[#1b1d23] p-2 text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none'

type Errors = Record<string, string>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactFormProps = Pick<ContactFormModalProps, 'onClose' | 'initialService'>

// Mounted fresh every time the modal opens, so initial state comes from props
// and nothing needs resetting.
const ContactForm: React.FC<ContactFormProps> = ({ onClose, initialService }) => {
  const [step, setStep] = useState(0)
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  })
  const [selected, setSelected] = useState<string[]>(() =>
    initialService && getOption(initialService) ? [initialService] : [],
  )
  const [details, setDetails] = useState<Record<string, string>>({})
  const [timing, setTiming] = useState({
    timeline: '',
    source: '',
    contactMethod: 'Email',
  })
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const openedAt = useRef(0)

  const primary = getOption(selected[0] ?? '')
  const detailFields: Field[] = primary ? DETAIL_FIELDS[primary.group] : []

  useEffect(() => {
    openedAt.current = Date.now()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const validate = (stepIndex: number): Errors => {
    const found: Errors = {}
    if (stepIndex === 0) {
      if (!info.name.trim()) found.name = 'Please enter your name'
      if (!emailPattern.test(info.email.trim()))
        found.email = 'Please enter a valid email address'
      if (info.phone.replace(/\D/g, '').length < 7)
        found.phone = 'Please enter a phone or WhatsApp number'
      if (!info.country.trim()) found.country = 'Please enter your country or city'
    }
    if (stepIndex === 1 && selected.length === 0) {
      found.selected = 'Please choose at least one option'
    }
    if (stepIndex === 2) {
      detailFields.forEach((field) => {
        if (field.required && !details[field.name]?.trim()) {
          found[field.name] = 'This field is required'
        }
      })
    }
    if (stepIndex === 3) {
      if (!timing.timeline) found.timeline = 'Please choose a timeline'
      if (!timing.source) found.source = 'Please tell me where you found me'
    }
    return found
  }

  const goNext = () => {
    const found = validate(step)
    setErrors(found)
    if (Object.keys(found).length === 0) setStep(step + 1)
  }

  const toggleService = (value: string) => {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
    // Questions depend on the first choice, so drop answers if it changes.
    setDetails({})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(3)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Bots: hidden field filled, or submitted too fast. Pretend it worked.
    if (trap || filledTooFast(openedAt.current)) {
      setStatus('success')
      return
    }

    setIsSubmitting(true)
    try {
      await sendEnquiry({
        ...info,
        services: selected.map((value) => getOption(value)?.label ?? value),
        details: detailFields.map((field) => ({
          label: field.label,
          value: details[field.name] ?? '',
        })),
        ...timing,
      })
      setStatus('success')
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const close = onClose

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-red-400">
        {errors[name]}
      </p>
    ) : null

  const renderField = (field: Field) => {
    const common = {
      id: field.name,
      required: field.required,
      'aria-invalid': Boolean(errors[field.name]),
      'aria-describedby': errors[field.name] ? `${field.name}-error` : undefined,
      className: inputClass,
      value: details[field.name] ?? '',
    }
    const set = (value: string) =>
      setDetails((current) => ({ ...current, [field.name]: value }))
    return (
      <div key={field.name}>
        <label htmlFor={field.name} className="mb-2 block text-sm font-medium">
          {field.label}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            {...common}
            rows={4}
            maxLength={3000}
            onChange={(e) => set(e.target.value)}
          />
        ) : field.type === 'select' ? (
          <select {...common} onChange={(e) => set(e.target.value)}>
            <option value="">Select</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...common}
            type="text"
            maxLength={300}
            placeholder={field.placeholder}
            onChange={(e) => set(e.target.value)}
          />
        )}
        {fieldError(field.name)}
      </div>
    )
  }

  const infoField = (
    name: keyof typeof info,
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={200}
        value={info[name]}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        onChange={(e) => setInfo({ ...info, [name]: e.target.value })}
        className={inputClass}
      />
      {fieldError(name)}
    </div>
  )

  const selectField = (
    name: 'timeline' | 'source' | 'contactMethod',
    label: string,
    options: string[],
  ) => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        value={timing[name]}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        onChange={(e) => setTiming({ ...timing, [name]: e.target.value })}
        className={inputClass}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {fieldError(name)}
    </div>
  )

  return (
    <>
    <button
      type="button"
      onClick={close}
      aria-label="Close"
      className="absolute right-4 top-4 text-[#e4ded7] hover:text-white"
    >
      <X size={24} />
    </button>

    <h2 id="contact-title" className="mb-2 text-2xl font-bold">
      Let&apos;s Work Together
    </h2>

    {status === 'success' ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 text-center"
      >
        <Check className="mx-auto mb-4 text-green-500" size={40} />
        <p className="text-lg font-semibold">Thank you, message sent.</p>
        <p className="mt-2 text-sm text-[#95979D]">
          I will reply with next steps. If you would rather talk now,
          you can book a call.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md border-2 border-[#e4ded7] px-4 py-2 text-[14px] font-semibold hover:bg-[#e4ded7] hover:text-[#0E1016]"
        >
          Book a 30-minute call
        </a>
      </motion.div>
    ) : (
      <>
        <p className="mb-1 text-sm text-[#95979D]">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>
        <div
          className="mb-6 h-1 w-full rounded bg-[#1b1d23]"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
        >
          <div
            className="h-1 rounded bg-[#e4ded7] transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Honeypot: hidden from people, filled in by bots */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px' }}
          >
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
            />
          </div>

          {step === 0 && (
            <>
              {infoField('name', 'Name', 'text', 'name')}
              {infoField('email', 'Email', 'email', 'email')}
              {infoField('phone', 'Phone or WhatsApp', 'tel', 'tel')}
              {infoField(
                'country',
                'Country or city',
                'text',
                'country-name',
              )}
            </>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="mb-3 text-sm font-medium">
                What do you need? Choose one or more. The first one you
                pick sets the next questions.
              </legend>
              <div className="flex flex-wrap gap-2">
                {ENQUIRY_OPTIONS.map((option) => {
                  const active = selected.includes(option.value)
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleService(option.value)}
                      className={`rounded-full border px-3 py-1.5 text-left text-[13px] transition-colors ${
                        active
                          ? 'border-[#e4ded7] bg-[#e4ded7] text-[#0E1016]'
                          : 'border-gray-600 hover:border-[#e4ded7]'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              {fieldError('selected')}
            </fieldset>
          )}

          {step === 2 && detailFields.map(renderField)}

          {step === 3 && (
            <>
              {selectField('timeline', 'When do you need this?', TIMELINES)}
              {selectField('source', 'Where did you find me?', SOURCES)}
              {selectField(
                'contactMethod',
                'Best way to reach you',
                CONTACT_METHODS,
              )}
              <div className="rounded-md bg-[#1b1d23] p-3 text-sm text-[#95979D]">
                <p className="font-medium text-[#e4ded7]">Your enquiry</p>
                <p className="mt-1">
                  {info.name} · {info.email} · {info.country}
                </p>
                <p className="mt-1">
                  {selected
                    .map((value) => getOption(value)?.label)
                    .join(', ')}
                </p>
              </div>
              <p className="text-xs text-[#95979D]">
                By sending, you agree that I may contact you about this
                enquiry using the details above.
              </p>
            </>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => {
                  setErrors({})
                  setStep(step - 1)
                }}
                className="rounded-md border-2 border-gray-600 px-4 py-2 text-[14px] font-semibold hover:border-[#e4ded7]"
              >
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="flex-1 rounded-md border-2 border-[#e4ded7] px-4 py-2 text-[14px] font-semibold transition-colors hover:bg-[#e4ded7] hover:text-[#0E1016]"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-md border-2 border-[#e4ded7] px-4 py-2 text-[14px] font-semibold transition-colors hover:bg-[#e4ded7] hover:text-[#0E1016] disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            )}
          </div>

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-center text-red-500"
            >
              Failed to send message. Please try again, or email me
              directly.
            </motion.p>
          )}
        </form>
      </>
    )}
    </>
  )
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex w-full items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm sm:pt-20"
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-h-[calc(100vh-10px)] w-full max-w-lg overflow-auto rounded-lg bg-[#0E1016] p-6 text-[#e4ded7]"
        >
          <ContactForm onClose={onClose} initialService={initialService} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default ContactFormModal
