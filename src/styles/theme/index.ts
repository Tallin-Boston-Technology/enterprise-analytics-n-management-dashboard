import type { Theme } from "@mui/material/styles";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

export const getTheme = (mode: "light" | "dark"): Theme => {
  return mode === "light" ? lightTheme : darkTheme;
};

export { lightTheme, darkTheme };

export * from "./constants";
