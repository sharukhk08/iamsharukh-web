import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  // Service value from a service page link, e.g. "react-native-app-development"
  initialService?: string
}

// The form itself lives in EnquiryForm, shared with the /contact page. It is
// mounted fresh each time the modal opens, so it always starts clean.
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
          className="relative max-h-[calc(100vh-10px)] w-full max-w-lg overflow-auto rounded-lg bg-paper p-6 text-ink"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-ink hover:opacity-70"
          >
            <X size={24} />
          </button>
          <h2 id="contact-title" className="mb-2 text-2xl font-bold">
            Let&apos;s Work Together
          </h2>
          <EnquiryForm initialService={initialService} onClose={onClose} />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default ContactFormModal
