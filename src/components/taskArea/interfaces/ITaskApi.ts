import { Priority } from '../../createTaskForm.tsx/enums/priority';
import { Status } from '../../createTaskForm.tsx/enums/status';

export interface ITaskApi {
  id: string;
  description: string;
  date: string;
  title: string;
  priority: `${Priority}`; // Union of all the priority values ${Priority}
  status: `${Status}`;
}
