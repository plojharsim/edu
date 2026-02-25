import { Category } from "../studyData";
import { anglictina } from "./anglictina";
import { nemcina } from "./nemcina";
import { zemepis } from "./zemepis";
import { matematika } from "./matematika";
import { chemie } from "./chemie";

// Chcete-li přidat novou sadu, vytvořte soubor ve složce predefined,
// naimportujte ho sem a přidejte do objektu PREDEFINED_DATA.
export const PREDEFINED_DATA: Record<string, Category> = {
  anglictina,
  nemcina,
  zemepis,
  matematika,
  chemie
};