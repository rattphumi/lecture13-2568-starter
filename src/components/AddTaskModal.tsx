import { Modal, Stack, TextInput, Textarea, Button } from "@mantine/core";
import { useState } from "react";

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, dueDate: string | null) => void;
}

export default function AddTaskModal({
  opened,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleAdd = () => {
    if (!title.trim() || !desc.trim() || !dueDate) return;
    onAdd(title, desc, dueDate);
    setTitle("");
    setDesc("");
    setDueDate(null);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Task">
      <Stack>
        {/* TextInput, Textarea, Date */}
        <Button onClick={handleAdd}>Save</Button>
      </Stack>
    </Modal>
  );
}
