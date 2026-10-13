import React, { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { sendEmails } from '../services/emailService'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workType: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null,
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await sendEmails(formData)
      setSubmitStatus('success')
      setTimeout(() => {
        onClose()
        setSubmitStatus(null)
        setFormData({
          name: '',
          email: '',
          phone: '',
          workType: '',
          description: '',
        })
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 w-full z-[9999] flex items-start justify-center sm:pt-20 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-lg bg-[#0E1016] p-6 text-[#e4ded7] overflow-auto max-h-[calc(100vh-10px)]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-[#e4ded7] hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="mb-6 text-2xl font-bold">
              Let&apos;s Work Together
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-600 bg-[#1b1d23] p-2 text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-600 bg-[#1b1d23] p-2 text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-600 bg-[#1b1d23] p-2 text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Work Type
                </label>
                <select
                  required
                  value={formData.workType}
                  onChange={(e) =>
                    setFormData({ ...formData, workType: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-600 bg-[#1b1d23] p-2 text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none"
                >
                  <option value="">Select type</option>
                  <option value="design">Design</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-md border border-gray-600 bg-[#1b1d23] p-2 text-[#e4ded7] focus:border-[#e4ded7] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md border-2 border-[#e4ded7] py-2 px-4 text-[14px] font-semibold text-[#e4ded7] transition-colors hover:bg-[#e4ded7] hover:text-[#0E1016] disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-500"
                >
                  Message sent successfully!
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-500"
                >
                  Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactFormModal
