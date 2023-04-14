import "@mui/material/styles";
import { PaletteColorOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Palette {
      jimgray: Palette['primary'];
    }
    interface PaletteOptions {
      jimgray: PaletteOptions['primary'];
    }
  }
  