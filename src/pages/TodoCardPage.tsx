import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Group,
  Checkbox,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddTaskModal from "../components/AddTaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dueDate: string | null;
  doneAt: Date | null;
}

export default function TodoCardPage() {
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

  return (
    <Container size="sm" py="lg">
      <Stack align="center">
        <Title order={2}>Todo List Card</Title>
        <Text size="sm" c="dimmed">
          All : {tasks.length} | Done : {tasks.filter((t) => t.isDone).length}
        </Text>
        <Button onClick={() => setModalOpened(true)}>Add Task</Button>
        {/* Modal */}
        <AddTaskModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onAdd={addTask}
        />
        {/* แสดง Task Cards */}
        <Stack w="100%">
          {tasks.map((task) => (
            <Card withBorder shadow="sm" radius="md" mb="sm" key={task.id}>
              <Group justify="space-between" align="flex-start">
                <Stack>
                  <Text
                    fw={600}
                    td={task.isDone ? "line-through" : "none"}
                    size="lg"
                  >
                    {task.title}
                  </Text>

                  <Text size="sm" c="dimmed">
                    {task.description}
                  </Text>
                  {task.dueDate ? (
                    <Text size="xs" c="gray">
                      Due: {task.dueDate}
                    </Text>
                  ) : (
                    <Text size="xs" c="gray">
                      Due: -
                    </Text>
                  )}
                  {task.doneAt && (
                    <Text size="xs" c="chanadda">
                      Done at: {task.doneAt.toDateString()}
                    </Text>
                  )}
                </Stack>

                <Group>
                  <Checkbox
                    checked={task.isDone}
                    onChange={() => toggleDoneTask(task.id)}
                    label="Done"
                  />
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
