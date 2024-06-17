import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "./components/Menu";

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Menu />
    </ThemeProvider>
  );
}
