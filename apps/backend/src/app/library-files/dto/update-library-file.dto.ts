import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryFileDto } from './create-library-file.dto';

export class UpdateLibraryFileDto extends PartialType(CreateLibraryFileDto) {}
