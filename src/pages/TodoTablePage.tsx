import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Table,
  ActionIcon,
  Checkbox,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskModal from "../components/AddTaskModal";
import dayjs from "dayjs";

interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dueDate: string | null;
  doneAt: Date | null;
}

export default function TodoTablePage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Read a book",
      description: "Vite + React + Mantine + TS",
      isDone: false,
      dueDate: null,
      doneAt: null,
    },
    {
      id: "2",
      title: "Write code",
      description: "Finish project for class",
      isDone: false,
      dueDate: null,
      doneAt: null,
    },
    {
      id: "3",
      title: "Deploy app",
      description: "Push project to GitHub Pages",
      isDone: false,
      dueDate: null,
      doneAt: null,
    },
  ]);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("my-tasks");
    if (stored) {
      const parsed = JSON.parse(stored);
      setTasks(parsed);
    }
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    title: string,
    description: string,
    dueDate: string | null
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      dueDate,
      isDone: false,
      doneAt: null,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, isDone: !t.isDone, doneAt: !t.isDone ? new Date() : null }
          : t
      )
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem("my-tasks");
    if (stored) {
      const parsed = JSON.parse(stored);
      setTasks(parsed);
    }
    setTasks(tasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const rows = tasks.map((task) => (
    <Table.Tr key={task.id}>
      <Table.Td>
        <Text fw={600} td={task.isDone ? "line-through" : "none"} size="lg">
          {task.title}
        </Text>
      </Table.Td>
      <Table.Td>{task.description}</Table.Td>
      <Table.Td>
        <Checkbox
          checked={task.isDone}
          onChange={() => toggleDoneTask(task.id)}
          label={task.isDone ? "Done" : "Pending"}
        />
      </Table.Td>
      <Table.Td>
        {task.dueDate ? dayjs(task.dueDate).format("DD/MM/YYYY") : "-"}
      </Table.Td>
      <Table.Td>{task.doneAt?.toLocaleDateString() || "-"}</Table.Td>
      <Table.Td>
        <ActionIcon color="red" onClick={() => deleteTask(task.id)}>
          <IconTrash size={16} />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <Text>Text</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="sm" py="lg">
      <Stack align="center">
        <Title order={2}>Todo List Table</Title>
        <Text size="sm" c="dimmed">
          All: {tasks.length} | Done: {tasks.filter((t) => t.isDone).length}
        </Text>
        <Button onClick={() => setModalOpened(true)}>Add Task</Button>

        <AddTaskModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onAdd={addTask}
        />

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Completed At</Table.Th>
              <Table.Th>Actions</Table.Th>
              <Table.Th>Text</Table.Th> 
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
