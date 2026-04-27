import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Use fallbacks for local dev without an active Sanity environment file yet
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yoursanityprojectid'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool(),
  ],
  name: 'default',
  title: 'Angel\'s Sparkle & Shine Studio',
})
