import { notFound } from 'next/navigation';
import { db } from '@/db';

type SnippetShowPageProps = {
  params: {
    snippetId: string;
  };
};

export default async function SnippetShowPage({
  params,
}: SnippetShowPageProps) {
  console.log(params);

  await new Promise((r) => setTimeout(r, 1000));

  const snippet = await db.snippet.findFirst({
    where: {
      id: +params.snippetId,
    },
  });

  if (!snippet) {
    return notFound();
  }

  return <div>{snippet.title}</div>;
}
