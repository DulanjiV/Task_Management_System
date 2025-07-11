export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate: string;
  employeeId: number;
}