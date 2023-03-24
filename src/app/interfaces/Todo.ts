export interface Todo {
  text: string;
  id: number;
  description?: string;
  status: TodoStatus;
}

export type TodoDraft = Omit<Todo, 'id'>;

export enum TodoStatus {
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export enum TodoState {
  All = 'All',
}

export type TodoStatusState = TodoStatus | TodoState;
