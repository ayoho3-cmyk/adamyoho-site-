import { defineType, defineField } from 'sanity';

export const kitchenPrincipleType = defineType({
  name: 'kitchenPrinciple',
  title: 'Kitchen Rule & Principle',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number (e.g. 01, 02)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Principle Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Principle Philosophy',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
