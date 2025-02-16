"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "./store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
        defaultTheme="system"
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
}
