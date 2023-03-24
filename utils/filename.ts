export const sanitizeFilename = (filename) => {
  return filename.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '_');
}

export const genTitle = (content: string, length = 25) => {
  const limit = Math.min(content.length, length);
  const part = content.substring(0, limit);
  console.log(part);
  return sanitizeFilename(part);
}
