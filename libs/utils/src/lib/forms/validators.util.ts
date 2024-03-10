import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validateMaxFileSize = (size: number): ValidatorFn => {
  return (control: AbstractControl) => {
    const file: File | null | undefined = control.value;
    if (!file) return {};

    const valid = file.size <= size;
    return valid
      ? null
      : {
          fileSize: { actualSize: file.size, requiredSize: size },
        };
  };
};

export const validateFileType = (...types: string[]): ValidatorFn => {
  return (control: AbstractControl) => {
    const file: File | null | undefined = control.value;
    if (!file) return {};

    const valid = types.some((t) => t === file.type);
    return valid
      ? null
      : {
          fileType: {
            actualType: file.type,
            requiredTypes: types,
            requiredTypesString: types,
          },
        };
  };
};
