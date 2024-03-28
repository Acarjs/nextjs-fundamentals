'use client';

import type { Snippet } from '@prisma/client';

type SnippetEditFormProps = {
  snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  return <div>Client component has snippet with title {snippet.title} </div>;
}
