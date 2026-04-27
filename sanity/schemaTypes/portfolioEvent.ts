import { defineField, defineType } from 'sanity'

export const portfolioEvent = defineType({
  name: 'portfolioEvent',
  title: 'Portfolio Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The name of the event (e.g. "Bella\'s First Birthday Pink Garland")'
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
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'reference',
      to: [{ type: 'serviceCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      description: 'A glowing description of what you designed and created for this event.',
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'If turned on, this event may highlight on the front page portfolio grid.',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
