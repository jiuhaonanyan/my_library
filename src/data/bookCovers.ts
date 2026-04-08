import type { StaticImageData } from "next/image";
import book2020 from "../../book2020.jpg";
import book2021 from "../../book2021.jpg";
import book2022 from "../../book2022.jpg";
import book2023 from "../../book2023.jpeg";
import book2024 from "../../book2024.jpg";
import book2025 from "../../book2025.jpeg";

export const bookCoverByYear: Record<string, StaticImageData> = {
  "2020": book2020,
  "2021": book2021,
  "2022": book2022,
  "2023": book2023,
  "2024": book2024,
  "2025": book2025,
};
