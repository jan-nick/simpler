export const fileMockFactory = (file?: Partial<File>): File => ({
  ...new File([], ''),
  ...file,
});
