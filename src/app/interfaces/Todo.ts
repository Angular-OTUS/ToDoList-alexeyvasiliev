export interface Todo {
  text: string;
  id: number;
  description?: string;
}

export type TodoDraft = Omit<Todo, 'id'>;
