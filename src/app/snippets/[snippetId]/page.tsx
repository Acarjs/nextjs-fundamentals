import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import * as actions from '@/actions';

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

  //DELETE ACTION
  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(), //next expect that these are strings.
    };
  });
} //by doing this we are using caches for /snippets/id paths.
