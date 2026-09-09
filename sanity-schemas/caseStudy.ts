import { defineType, defineField } from 'sanity';

export const consultingCaseStudyType = defineType({
  name: 'consultingCaseStudy',
  title: 'Consulting Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Establishment Name',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Market',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Timeframe',
      type: 'string',
      placeholder: 'e.g. 16 Weeks',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'solution',
      title: 'Culinary & Operational Solution',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome & Impact',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'metrics',
      title: 'Key Quantified Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Metric Label', type: 'string' },
            { name: 'value', title: 'Metric Value (e.g. -85%, +38%)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Case Study Photograph',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
