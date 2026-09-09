import { defineType, defineField } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Client & Industry Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title / Role',
      type: 'string',
      placeholder: 'e.g. Managing Partner, Executive Chef',
    }),
    defineField({
      name: 'establishmentOrContext',
      title: 'Establishment / Organization / Context',
      type: 'string',
      placeholder: 'e.g. Mercer & Crane Hospitality Group (2 Michelin Stars)',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Consulting', value: 'consulting' },
          { title: 'Private Dining & Events', value: 'events' },
          { title: 'Line Mentorship', value: 'mentorship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      placeholder: 'e.g. 2026',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
