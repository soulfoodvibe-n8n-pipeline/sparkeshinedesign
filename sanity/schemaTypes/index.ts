import { type SchemaTypeDefinition } from 'sanity'
import { portfolioEvent } from './portfolioEvent'
import { serviceCategory } from './serviceCategory'
import { product } from './product'
import { merchCategory } from './merchCategory'

export const schemaTypes: SchemaTypeDefinition[] = [
  portfolioEvent,
  serviceCategory,
  product,
  merchCategory,
]
