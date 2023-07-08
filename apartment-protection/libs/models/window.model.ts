import { WindowType } from "../enums/window-type.enum";
import { WindowColor } from "../enums/window-color.enum";
import { WindowGlaze } from "../enums/window-glaze.enum";
import { WindowMaterial } from "../enums/window-material.enum";
import { WindowNet } from "../enums/window-net.enum";
import { WindowShutter } from "../enums/window-shutter.enum";

export interface Window {
  id?: number;
  windowNumber: number;
  windowType: WindowType;
  wingsAmount: number;
  width: number;
  height: number;
  thickness: number;
  uk: number;
  color: WindowColor;
  glaze: WindowGlaze;
  material: WindowMaterial;
  bars: boolean;
  barsType: string;
  net: WindowNet;
  shutter: WindowShutter;
}
