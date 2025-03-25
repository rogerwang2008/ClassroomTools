import Papa from "papaparse";

import type { Student } from ".";

export const readStudentsCsv = async () => {
  const response = await fetch( "/config/students.csv");
  const parsedCsv = Papa.parse(await response.text(), {
    header: true,
    skipEmptyLines: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return parsedCsv.data.map((row: any) => ({
    id: parseInt(row.id),
    name: row.name,
  })) as Student[];
};
