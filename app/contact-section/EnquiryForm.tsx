'use client'
import React, { useEffect, useRef, useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Check, GraduationCap, Rocket } from 'lucide-react'
import { sendEnquiry } from '../services/emailService'
import { BOOKING_URL } from '../lib/contact'
import { track } from '../lib/analytics'
import PlaceInput from './PlaceInput'
import {
  Audience,
  CLIENT_OPTIONS,
  CONTACT_METHODS,
  DETAIL_FIELDS,
  Field,
  SOURCES,
  STUDENT_OPTIONS,
  TIMELINES,
  audienceFor,
  getOption,
} from './formConfig'

export interface EnquiryFormProps {
  // From a link such as /contact?service=react-native-app-development
  // ("learning" starts the student path).
  initialService?: string
  // Set in the modal so Escape can close it.
  onClose?: () => void
}

const STEPS = ['Who you are', 'What you need', 'Details', 'Your contact']
// A real person needs longer than this; bots do not.
const MIN_FILL_MS = 4000
const filledTooFast = (openedAt: number) => Date.now() - openedAt < MIN_FILL_MS

const inputClass =
  'w-full rounded-xl border border-gray-600 bg-[#1b1d23] p-3 text-[16px] text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Phone numbers: digits, plus, spaces, dashes and brackets only.
const cleanPhone = (value: string) => value.replace(/[^\d+\-\s()]/g, '')

type Errors = Record<string, string>

export default function EnquiryForm({ initialService, onClose }: EnquiryFormProps) {
  const startAudience = audienceFor(initialService)
  const [step, setStep] = useState(startAudience ? 1 : 0)
  const [audience, setAudience] = useState<Audience | undefined>(startAudience)
  const [selected, setSelected] = useState<string[]>(() =>
    initialService && startAudience === 'client' && getOption(initialService, 'client')
      ? [initialService]
      : [],
  )
  const [details, setDetails] = useState<Record<string, string>>({})
  const [info, setInfo] = useState({ name: '', email: '', phone: '', place: '' })
  const [prefs, setPrefs] = useState({ contactMethod: 'Email', source: '' })
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const openedAt = useRef(0)

  const options = audience === 'student' ? STUDENT_OPTIONS : CLIENT_OPTIONS
  const primary = getOption(selected[0] ?? '', audience)
  const baseFields: Field[] = primary ? DETAIL_FIELDS[primary.group] : []
  const detailFields: Field[] =
    audience === 'client'
      ? [
          ...baseFields,
          {
            name: 'timeline',
            label: 'When do you need this?',
            type: 'select',
            required: true,
            options: TIMELINES,
          },
        ]
      : baseFields

  useEffect(() => {
    openedAt.current = Date.now()
    track('form_start', { page: window.location.pathname })
  }, [])

  useEffect(() => {
    if (step > 0) track('form_step', { step: step + 1 })
  }, [step])

  useEffect(() => {
    if (!onClose) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const validate = (stepIndex: number): Errors => {
    const found: Errors = {}
    if (stepIndex === 0 && !audience) found.audience = 'Please choose one'
    if (stepIndex === 1 && selected.length === 0) {
      found.selected =
        audience === 'student'
          ? 'Please choose a course, or "Not sure yet"'
          : 'Please choose at least one option'
    }
    if (stepIndex === 2) {
      detailFields.forEach((field) => {
        if (field.required && !details[field.name]?.trim()) {
          found[field.name] = 'This field is required'
        }
      })
    }
    if (stepIndex === 3) {
      if (!info.name.trim()) found.name = 'Please enter your name'
      if (!emailPattern.test(info.email.trim()))
        found.email = 'Please enter a valid email address'
      const digits = info.phone.replace(/\D/g, '').length
      if (digits < 7 || digits > 15)
        found.phone = 'Please enter a valid phone number'
      if (!info.place.trim()) found.place = 'Please enter your city or country'
    }
    return found
  }

  const focusFirst = (found: Errors) => {
    const first = Object.keys(found)[0]
    if (first) window.setTimeout(() => document.getElementById(first)?.focus(), 0)
  }

  const goNext = () => {
    const found = validate(step)
    setErrors(found)
    if (Object.keys(found).length === 0) setStep(step + 1)
    else focusFirst(found)
  }

  const chooseAudience = (value: Audience) => {
    if (value !== audience) {
      setAudience(value)
      setSelected([])
      setDetails({})
    }
    setErrors({})
    setStep(1)
  }

  const toggleOption = (value: string) => {
    setErrors({})
    if (audience === 'student') {
      setSelected([value])
    } else {
      setSelected((current) =>
        current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      )
    }
    // Questions depend on the first choice, so drop answers if it changes.
    setDetails({})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Enter on an earlier step moves forward instead of sending.
    if (step < STEPS.length - 1) {
      goNext()
      return
    }
    const found = validate(3)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      focusFirst(found)
      return
    }
    if (!audience) return

    // Bots: hidden field filled, or submitted too fast. Pretend it worked.
    if (trap || filledTooFast(openedAt.current)) {
      setStatus('success')
      return
    }

    setIsSubmitting(true)
    try {
      await sendEnquiry({
        audience,
        name: info.name,
        email: info.email,
        phone: info.phone,
        country: info.place,
        services: selected.map((value) => getOption(value, audience)?.label ?? value),
        details: detailFields.map((field) => ({
          label: field.label,
          value: details[field.name] ?? '',
        })),
        timeline: details.timeline ?? '',
        source: prefs.source,
        contactMethod: prefs.contactMethod,
      })
      setStatus('success')
      track('generate_lead', { audience, service: selected[0] })
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      track('form_error', { audience })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldError = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-red-400">
        {errors[name]}
      </p>
    ) : null

  const setDetail = (name: string, value: string) =>
    setDetails((current) => ({ ...current, [name]: value }))

  const renderField = (field: Field, index: number) => {
    const common = {
      id: field.name,
      required: field.required,
      'aria-invalid': Boolean(errors[field.name]),
      'aria-describedby': errors[field.name] ? `${field.name}-error` : undefined,
      className: inputClass,
      value: details[field.name] ?? '',
      autoFocus: index === 0,
    }
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
            onChange={(e) => setDetail(field.name, e.target.value)}
          />
        ) : field.type === 'select' ? (
          <select {...common} onChange={(e) => setDetail(field.name, e.target.value)}>
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
            onChange={(e) => setDetail(field.name, e.target.value)}
          />
        )}
        {fieldError(field.name)}
      </div>
    )
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8 text-center"
      >
        <Check className="mx-auto mb-4 text-green-500" size={44} />
        <p className="text-xl font-semibold">Thank you, message sent.</p>
        <p className="mt-2 text-sm text-[#95979D]">
          I will reply with next steps. If you would rather talk now, you can
          book a call.
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
    )
  }

  const audienceCard = (
    value: Audience,
    title: string,
    text: string,
    icon: React.ReactNode,
  ) => (
    <button
      key={value}
      type="button"
      id={value === 'client' ? 'audience' : undefined}
      aria-pressed={audience === value}
      onClick={() => chooseAudience(value)}
      className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors ${
        audience === value
          ? 'border-[#e4ded7] bg-[#e4ded7]/10'
          : 'border-gray-600 hover:border-[#e4ded7]'
      }`}
    >
      <span className="mt-1 text-[#e4ded7]">{icon}</span>
      <span>
        <span className="block text-[18px] font-semibold">{title}</span>
        <span className="mt-1 block text-[14px] text-[#95979D]">{text}</span>
      </span>
    </button>
  )

  return (
    <>
      <p className="mb-1 text-sm text-[#95979D]">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <div
        className="mb-6 h-1.5 w-full rounded bg-[#1b1d23]"
        role="progressbar"
        aria-label="Enquiry progress"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
      >
        <div
          className="h-1.5 rounded bg-[#e4ded7] transition-all"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Honeypot: hidden from people, filled in by bots */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
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
          <div className="space-y-3">
            <p className="text-[18px] font-semibold">I am a...</p>
            {audienceCard(
              'client',
              'Client with a project',
              'A website, web app, mobile app, software or a fix for an AI-built app.',
              <Rocket size={26} />,
            )}
            {audienceCard(
              'student',
              'Student who wants to learn',
              'Innovaft courses and mentoring in web and app development.',
              <GraduationCap size={26} />,
            )}
            {fieldError('audience')}
          </div>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="mb-3 text-[18px] font-semibold">
              {audience === 'student'
                ? 'Which course interests you?'
                : 'What do you need? Choose one or more.'}
            </legend>
            {audience === 'client' && (
              <p className="mb-3 text-sm text-[#95979D]">
                The first one you pick sets the next questions.
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const active = selected.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleOption(option.value)}
                    className={`rounded-full border px-4 py-2 text-left text-[14px] transition-colors ${
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

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                autoFocus
                maxLength={200}
                value={info.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className={inputClass}
              />
              {fieldError('name')}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                maxLength={200}
                value={info.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                className={inputClass}
              />
              {fieldError('email')}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                maxLength={25}
                value={info.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                onChange={(e) =>
                  setInfo({ ...info, phone: cleanPhone(e.target.value) })
                }
                className={inputClass}
              />
              <p id="phone-hint" className="mt-1 text-xs text-[#95979D]">
                Numbers only. Include your country code, for example +91.
              </p>
              {fieldError('phone')}
            </div>

            <div>
              <label htmlFor="place" className="mb-2 block text-sm font-medium">
                City or country
              </label>
              <PlaceInput
                id="place"
                value={info.place}
                onChange={(place) => setInfo({ ...info, place })}
                className={inputClass}
                invalid={Boolean(errors.place)}
                describedBy={errors.place ? 'place-error' : undefined}
              />
              {fieldError('place')}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contactMethod"
                  className="mb-2 block text-sm font-medium"
                >
                  Best way to reach you
                </label>
                <select
                  id="contactMethod"
                  value={prefs.contactMethod}
                  onChange={(e) =>
                    setPrefs({ ...prefs, contactMethod: e.target.value })
                  }
                  className={inputClass}
                >
                  {CONTACT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="source" className="mb-2 block text-sm font-medium">
                  Where did you find me? (optional)
                </label>
                <select
                  id="source"
                  value={prefs.source}
                  onChange={(e) => setPrefs({ ...prefs, source: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-xl bg-[#1b1d23] p-3 text-sm text-[#95979D]">
              <p className="font-medium text-[#e4ded7]">
                {audience === 'student' ? 'Student enquiry' : 'Project enquiry'}
              </p>
              <p className="mt-1">
                {selected
                  .map((value) => getOption(value, audience)?.label)
                  .join(', ')}
              </p>
            </div>
            <p className="text-xs text-[#95979D]">
              By sending, you agree that I may contact you about this enquiry
              using the details above.
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
              className="rounded-xl border-2 border-gray-600 px-5 py-3 text-[14px] font-semibold hover:border-[#e4ded7]"
            >
              Back
            </button>
          )}
          {step > 0 &&
            (step < STEPS.length - 1 ? (
              <button
                key="next"
                type="button"
                onClick={goNext}
                className="flex-1 rounded-xl border-2 border-[#e4ded7] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-[#e4ded7] hover:text-[#0E1016]"
              >
                Next
              </button>
            ) : (
              <button
                key="send"
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-xl border-2 border-[#e4ded7] px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-[#e4ded7] hover:text-[#0E1016] disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>
            ))}
        </div>

        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="text-center text-red-500"
          >
            Failed to send message. Please try again, or email me directly.
          </motion.p>
        )}
      </form>
    </>
  )
}
