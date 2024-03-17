import { Status } from '../../createTaskForm.tsx/enums/status';

export type TaskCounterStatusType =
  | Status.todo
  | Status.inProgress
  | Status.completed;

export interface ITaskCouner {
  count?: number;
  status?: TaskCounterStatusType;
}
