import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventMerch',
  title: 'Event Exclusive Merch',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventPage',
      title: 'Linked Event',
      type: 'reference',
      to: [{ type: 'eventPage' }],
      description: 'Which event is this merch exclusively for?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'Required for checkout processing.',
    }),
  ],
})
