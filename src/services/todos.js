import { client, checkError } from './client';

export async function getTodos() {
  const resp = await client.from('todo').select('*');
  return checkError(resp);
}
