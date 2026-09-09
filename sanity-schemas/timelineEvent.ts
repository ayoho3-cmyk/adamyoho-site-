import { defineType, defineField } from 'sanity';

export const timelineEventType = defineType({
  name: 'timelineEvent',
  title: 'Biography & Career Timeline Event',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year Span',
      type: 'string',
      placeholder: 'e.g. 2002–2006',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Market',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Historical & Culinary Narrative',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Chronological Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
