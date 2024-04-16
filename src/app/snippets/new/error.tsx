//this is the first way of error handling. There is big downside that we stop showing whatever page we were displaying before. In this case, you are not able to try to submit the form again.

'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div>{error.message}</div>;
}
