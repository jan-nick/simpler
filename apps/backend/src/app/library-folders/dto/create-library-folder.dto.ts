import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLibraryFolderDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  parentId?: string;

  @IsString()
  @IsUUID()
  userId: string;
}
