type SnippetEditPageProps = {
  params: {
    snippetId: string;
  };
};

export default function SnippetEditPage({ params }: SnippetEditPageProps) {
  const id = +params.snippetId;

  return <div>Editing snippet with id {id}</div>;
}
