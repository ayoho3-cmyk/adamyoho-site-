import { defineType, defineField } from 'sanity';

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'Advisory & Service FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Consulting', value: 'Consulting' },
          { title: 'Events', value: 'Events' },
          { title: 'Mentorship', value: 'Mentorship' },
          { title: 'Sourcing & Dietary', value: 'Sourcing & Dietary' },
          { title: 'General', value: 'General' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer (Detail Narrative)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
