import { defineType, defineField } from 'sanity';

export const articleType = defineType({
  name: 'article',
  title: 'Journal Article & Dispatch',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Essays', value: 'Essays' },
          { title: 'Recipes', value: 'Recipes' },
          { title: 'Technique', value: 'Technique' },
          { title: 'Press & Media', value: 'Press' },
          { title: 'Philosophy', value: 'Philosophy' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Display Date',
      type: 'string',
      placeholder: 'e.g. 14. OCTOBER 2026',
    }),
    defineField({
      name: 'readTime',
      title: 'Reading Time',
      type: 'string',
      placeholder: 'e.g. 6 MIN READ',
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Paragraphs (or Rich Text)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Culinary Photograph',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Photo Caption',
        },
      ],
    }),
    defineField({
      name: 'chefNotes',
      title: 'Chef Notes / Retrospective Insight',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'harvestProvenance',
      title: 'Harvest Provenance & Sourcing Details',
      type: 'string',
    }),
    defineField({
      name: 'ingredients',
      title: 'Recipe Ingredients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'item', title: 'Item Name', type: 'string' },
            { name: 'spec', title: 'Specification / Quantity', type: 'string' },
            { name: 'provenance', title: 'Purveyor / Farm Origin', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'methodSteps',
      title: 'Recipe Method Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number', type: 'number' },
            { name: 'instruction', title: 'Kitchen Instruction', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured On Homepage / Highlights',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
