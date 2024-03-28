import { db } from '@/db';
import { notFound } from 'next/navigation';
import SnippetEditForm from '@/components/snippet-edit-form';

type SnippetEditPageProps = {
  params: {
    snippetId: string;
  };
};

export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  const id = +params.snippetId;

  const snippet = await db.snippet.findFirst({
    where: { id: id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
