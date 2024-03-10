import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryFolderDto } from './create-library-folder.dto';

export class UpdateLibraryFolderDto extends PartialType(
  CreateLibraryFolderDto
) {}
