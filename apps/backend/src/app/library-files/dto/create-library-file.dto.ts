import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLibraryFileDto {
  @IsString()
  name: string;
  @IsString()
  url: string;
  @IsOptional()
  @IsString()
  coverUrl: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  libraryFolderId?: string;

  @IsString()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsBoolean()
  isDownloadPublic: boolean;
  @IsOptional()
  @IsBoolean()
  isPublic: boolean;
}
