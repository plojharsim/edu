import { Category } from "../studyData";
import { anglictina } from "./anglictina";
import { nemcina } from "./nemcina";
import { zemepis } from "./zemepis";
import { matematika } from "./matematika";
import { chemie } from "./chemie";
import { dejepis } from "./dejepis";
import { fyzika } from "./fyzika";
import { prirodopis } from "./prirodopis";

// Registrace všech dostupných předmětů
export const PREDEFINED_DATA: Record<string, Category> = {
  matematika,
  dejepis,
  prirodopis,
  zemepis,
  fyzika,
  chemie,
  anglictina,
  nemcina
};