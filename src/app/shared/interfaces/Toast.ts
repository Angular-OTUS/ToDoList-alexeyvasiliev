export class Toast {
  constructor(public text: string, public type: ToastType) {}
}

export enum ToastType {
  ADD = 'add',
  EDIT = 'edit',
  REMOVE = 'remove',
}
