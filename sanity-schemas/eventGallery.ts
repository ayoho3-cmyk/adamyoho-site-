import { defineType, defineField } from 'sanity';

export const eventGalleryType = defineType({
  name: 'eventGalleryItem',
  title: 'Event Gallery & Format Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Experience Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Region',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Service Format',
      type: 'string',
      placeholder: 'e.g. 8-Course Live Wood Ember Tasting',
    }),
    defineField({
      name: 'guestCount',
      title: 'Guest Count / Capacity',
      type: 'string',
      placeholder: 'e.g. 16 Guests',
    }),
    defineField({
      name: 'image',
      title: 'Photography Asset',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Photo Caption',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Filter Tag / Category',
      type: 'string',
      options: {
        list: [
          { title: 'Vineyard Banquets', value: 'Vineyard Banquets' },
          { title: 'Private Dining', value: 'Private Dining' },
          { title: 'Tasting Salons', value: 'Tasting Salons' },
          { title: 'Atelier', value: 'Atelier' },
        ],
      },
    }),
  ],
});
