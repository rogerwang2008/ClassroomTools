import Papa from "papaparse";
import {base} from "$app/paths";

import type { Student, StudentsRecord } from ".";

export const readStudentsCsv = async () => {
  const response = await fetch(`${base}/config/students.csv`);
  const parsedCsv = Papa.parse(await response.text(), {
    header: true,
    skipEmptyLines: true,
  });
  const studentsRecord: StudentsRecord = parsedCsv.data.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: Record<string, Student>, row: any) => {
      if (row.rhymePoems) row.rhymePoems = row.rhymePoems.split("|");
      acc[row.id] = row;
      return acc;
    },
    {},
  );
  return studentsRecord;
};
