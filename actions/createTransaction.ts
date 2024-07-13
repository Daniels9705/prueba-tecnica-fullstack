// createTransaction.ts
'use server';

export async function createTransaction(formData: FormData) {
  const name = formData.get('name');
  const amount = formData.get('amount');
  const date = formData.get('date');

  console.log({ name, amount, date });
}
