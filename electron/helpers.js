import fs from "fs/promises"

export function checkIfPathDestinationExists(path) {
  return fs
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}