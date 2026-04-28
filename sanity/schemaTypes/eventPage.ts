import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'eventPage',
  title: 'Client Event Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client / Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Unique URL Slug',
      type: 'slug',
      options: {
        source: 'clientName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Venue / Location',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'text',
      description: 'A personal message to guests visiting the event page.',
    }),
    defineField({
      name: 'itinerary',
      title: 'Event Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'time', type: 'string', title: 'Time' },
            { name: 'activity', type: 'string', title: 'Activity' },
          ],
        },
      ],
    }),
    defineField({
      name: 'allowTipping',
      title: 'Enable Digital Tip Jar?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'supabaseEventId',
      title: 'Supabase Event ID',
      type: 'string',
      description: 'Used to link this Sanity content with the Supabase database (for RSVPs and Gallery).',
    }),
  ],
})
