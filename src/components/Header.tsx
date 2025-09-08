import {
  Burger,
  Text,
  useMantineColorScheme,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconRocket, IconSun, IconMoon } from "@tabler/icons-react";

interface HeaderComponentProps {
  opened: boolean;
  toggle: () => void;
}

export default function HeaderComponent({
  opened,
  toggle,
}: HeaderComponentProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  //lectuer12

  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(min-width: 56.25em)");

  return (
    <Group p="md" justify="space-between">
      <Group>
        {isMobile && (
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
        )}
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "red", to: "blue", deg: 90 }}
          style={{fontFamily: "Libertinus Keyboard"}}
        >
          <ActionIcon
            variant="gradient"
            size="xl"
            aria-label="Gradient action icon"
            gradient={{ from: "orange", to: "cyan", deg: 90 }}
            mx={3}
          >
            <IconRocket />
          </ActionIcon>
          My App Header
        </Text>
        
      </Group>
      <Group gap={5}>
        <ActionIcon
          variant="filled"
          color="blue"
          onClick={toggleColorScheme}
          size="lg"
          aria-label="Dark mode"
        >
        {isDark ?  <IconMoon size={20} /> : <IconSun size={20} />}
        </ActionIcon>
      </Group>
    </Group>
  );
}
