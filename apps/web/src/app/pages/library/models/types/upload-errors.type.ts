export type UploadErrors = {
  /** Names of files with size that exceeds the maximum allowed for uploads. */
  filesExceedingMaxSize?: File[];
  /** Names of files with formats not allowed to be uploaded. */
  filesWithWrongFormat?: File[];
  noStorageLeft?: boolean;
};
