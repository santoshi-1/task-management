import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/status';
import { Priority } from './enums/priority';
import { useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(
    undefined,
  );

  const [description, setDescription] = useState<
    string | undefined
  >(undefined);

  const [date, setDate] = useState<Date | null>(new Date());

  const [status, setStatus] = useState<string>(Status.todo);

  const [priority, setPriority] = useState<string>(
    Priority.normal,
  );

  const [showSuccess, setShowSuccess] =
    useState<boolean>(false);

  const taskUpdateContext = useContext(
    TaskStatusChangedContext,
  );

  //Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (data: ICreateTask) =>
      sendApiRequest(
        'http://localhost:3200/tasks',
        'POST',
        data,
      ),
  });

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      taskUpdateContext.toggle();
    }

    const successTimeOut = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => {
      clearTimeout(successTimeOut);
    };
  }, [createTaskMutation.isSuccess]);

  function createTaskHandler() {
    if (!title || !date || !description) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    createTaskMutation.mutate(task);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={2}
    >
      <Typography mb={2} component="h2" variant="h6">
        Create A Task
      </Typography>

      {showSuccess ? (
        <Alert
          severity="success"
          sx={{ width: '100%', marginBottom: '16px' }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been created successfully
        </Alert>
      ) : null}

      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isPending}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isPending}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isPending}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <TaskSelectField
            label="Status"
            name="status"
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as string)
            }
            disabled={createTaskMutation.isPending}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            items={[
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
            ]}
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as string)
            }
            disabled={createTaskMutation.isPending}
          />
        </Stack>
        {createTaskMutation.isPending ? (
          <LinearProgress />
        ) : null}
        <Button
          variant="contained"
          size="medium"
          fullWidth
          onClick={createTaskHandler}
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority
          }
        >
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};
