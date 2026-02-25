import { Category } from "../studyData";
import { anglictina } from "./anglictina";
import { nemcina } from "./nemcina";
import { matematika } from "./matematika";
import { fyzika } from "./fyzika";

// Chcete-li přidat novou sadu, vytvořte soubor ve složce predefined,
// naimportujte ho sem a přidejte do objektu PREDEFINED_DATA.
export const PREDEFINED_DATA: Record<string, Category> = {
  english: anglictina,
  german: nemcina,
  math: matematika,
  physics: fyzika
};