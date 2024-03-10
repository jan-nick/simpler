import { IsString, IsUUID } from 'class-validator';

export class CreateLibraryFilePlayDto {
  @IsString()
  @IsUUID()
  libraryFileId: string;

  @IsString()
  @IsUUID()
  userId: string;
}
