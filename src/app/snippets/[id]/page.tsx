import { notFound } from 'next/navigation';
import { db } from '@/db';

type SnippetShowPageProps = {
  params: {
    id: string;
  };
};

export default async function SnippetShowPage({
  params,
}: SnippetShowPageProps) {
  console.log(params);

  const snippet = await db.snippet.findFirst({
    where: {
      id: +params.id,
    },
  });

  if (!snippet) {
    return notFound();
  }

  return <div>{snippet.title}</div>;
}
