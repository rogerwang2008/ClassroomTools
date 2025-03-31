import { base } from "$app/paths";

export const checkFileExists = async (filePath: string) => {
  const response = await fetch(`${base}${filePath}`, {
    method: "HEAD",
  });
  return response.ok ? filePath : null;
};
