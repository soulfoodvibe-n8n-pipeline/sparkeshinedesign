import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Store Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Base Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'printfulSku',
      title: 'Printful SKU / Variant ID',
      type: 'string',
      description: 'The internal ID linked to Printful for automated fulfillment (Optional if fulfilled manually)',
    }),
    defineField({
      name: 'mainImage',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Product Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'merchCategory' }],
    }),
    defineField({
      name: 'requiresPersonalization',
      title: 'Requires Personalization Input?',
      type: 'boolean',
      description: 'Switch on to show a custom text input field on the checkout page (e.g. for custom names/dates)',
      initialValue: false,
    }),
    defineField({
      name: 'hasSizes',
      title: 'Has Apparel Sizes?',
      type: 'boolean',
      description: 'Switch on to show a size selector (S, M, L, XL, XXL)',
      initialValue: false,
    })
  ]
})
