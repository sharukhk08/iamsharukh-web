import type { MetadataRoute } from 'next'
import { SITE_URL } from './lib/site'

// This site wants to be found, including by AI search and assistants, so every
// crawler is allowed. The named lists below are explicit on purpose, to document
// the choice. To opt out of AI *training* but stay in AI *search*, move the
// "training" names into their own rule with `disallow: '/'`.
const AI_SEARCH_AND_ASSISTANTS = [
  'OAI-SearchBot', // ChatGPT search
  'ChatGPT-User', // ChatGPT browsing on behalf of a user
  'PerplexityBot',
  'Claude-User',
  'Claude-SearchBot',
]
const AI_TRAINING = [
  'GPTBot', // OpenAI training
  'ClaudeBot', // Anthropic training
  'Google-Extended', // Gemini training and grounding; does not affect Google Search ranking
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_SEARCH_AND_ASSISTANTS, allow: '/' },
      { userAgent: AI_TRAINING, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
