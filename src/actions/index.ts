'use server';

import { revalidatePath } from 'next/cache'; //on-demand caching controls
import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/');
  redirect('/');
}

type formStateProps = {
  message: string;
};

export async function createSnippet(
  formState: formStateProps,
  formData: FormData
) {
  try {
    //check the user's inputs and make sure they're valid.
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Please enter a valid title',
      }; //we must retunr the same type as whatever that initial state type was that we passed in to our hook.
    }

    if (typeof code !== 'string' || code.length < 3) {
      return {
        message: 'Please enter a valid code',
      };
    }

    //create a new record in the database;
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
    console.log(snippet);

    // throw new Error('Hey!');
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  revalidatePath('/');

  //redirect the user back to the root route
  redirect('/');
} //this is a server action
