import { client, checkError } from './client';

export async function getTodos() {
  const resp = await client.from('todo').select('*');
  return checkError(resp);
}

export async function createTodo(item) {
  const resp = await client.from('todo').insert({ item });
  return checkError(resp);
}

export async function completeTodo({ id, completed }) {
  const resp = await client.from('todo').update({ completed: !completed }).match({ id }).single();

  return checkError(resp);
}
