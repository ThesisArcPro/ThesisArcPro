import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const samples = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/samples' }),
  schema: z.object({
    title: z.string().min(40).max(65),
    meta_title: z.string(),
    description: z.string().min(140).max(160),
    subject: z.enum([
  'Communications and media', 'Community and society', 'Cultural studies', 'Human relations',
  'Psychology', 'Social psychology', 'Social science', 'Social studies', 'Social work', 'Sociology',
  'Ethics', 'Philosophy', 'Religion and theology',
  'Criminal justice', 'Criminology', 'Human rights', 'Law', 'Public administration',
  'American history', 'Anthropology', 'History',
  'American literature', 'Ancient literature', 'English', 'Language studies', 'Literature', 'Shakespeare literature',
  'Accounting', 'Business and management', 'Employee welfare', 'Entrepreneurship', 'Hospitality management',
  'Human resource management', 'Leadership', 'Logistics', 'Project management', 'Strategic management',
  'Agriculture', 'Economics', 'Finance', 'Investing and financial markets', 'Political economics',
  'Nursing',
]),
    category: z.string(),
    essay_type: z.enum(['Analytical', 'Argumentative', 'Descriptive', 'Expository', 'Narrative']),
    assignment_type: z.enum(['Essay', 'Research Paper', 'Case Study', 'Admission Essay', 'Discussion Post']),
    word_count: z.number(),
    pages: z.number(),
    date: z.date(),
    writer_name: z.string(),
    writer_tagline: z.string(),
    writer_rating: z.number().min(0).max(5),
    writer_reviews: z.number(),
    writer_photo: z.string().optional(),
    writer_ontime: z.number().optional(),
    writer_subjects: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    order_service_link: z.string(),
    grammarly_checked: z.boolean().default(false),
  }),
});

export const collections = { samples };