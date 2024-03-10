import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StorageFolder, StorageUpload } from '@simpler/types';
import { MAX_LIBRARY_SIZE } from '@simpler-constants';
import { Express } from 'express';
import 'multer';
import { LibraryFile } from '@prisma/client';

@Injectable()
export class StorageService {
  private readonly s3Client = new S3Client({
    endpoint: this.configService.get<string>('STORAGE_ENDPOINT'),
    region: 'eu-central-1',
    credentials: {
      accessKeyId: this.configService.get<string>('STORAGE_BUCKET_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>(
        'STORAGE_BUCKET_SECRET_KEY'
      ),
    },
  });

  private readonly bucket = this.configService.get<string>(
    'STORAGE_BUCKET_NAME'
  );
  private get storageUrl() {
    const storageEndpoint = this.configService.get<string>('STORAGE_ENDPOINT');
    return storageEndpoint.replace('https://', `https://${this.bucket}.`) + '/';
  }

  constructor(private readonly configService: ConfigService) {}

  private async uploadFile(
    file: Express.Multer.File,
    key: string
  ): Promise<StorageUpload> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command);
    const storageUrl = this.storageUrl + command.input.Key;

    await this.s3Client.send(command);

    return { signedUrl, storageUrl };
  }

  async uploadLibraryFile(
    file: Express.Multer.File,
    libraryFile: Pick<LibraryFile, 'id' | 'userId'>
  ) {
    const userStorage = await this.findUserStorageSize(libraryFile.userId);

    if (file.size + userStorage > MAX_LIBRARY_SIZE) {
      throw new ForbiddenException();
    }

    const key = `${StorageFolder.UserMedia}/${libraryFile.userId}/${StorageFolder.LibraryMedia}/${libraryFile.id}`;
    return this.uploadFile(file, key);
  }

  async uploadLibraryFileCover(
    file: Express.Multer.File,
    libraryFile: Pick<LibraryFile, 'id' | 'userId'>
  ) {
    const userStorage = await this.findUserStorageSize(libraryFile.userId);

    if (file.size + userStorage > MAX_LIBRARY_SIZE) {
      throw new ForbiddenException();
    }

    const key = `${StorageFolder.UserMedia}/${libraryFile.userId}/${StorageFolder.LibraryMedia}/${libraryFile.id}_cover`;
    return this.uploadFile(file, key);
  }

  uploadUserAvatarFile(file: Express.Multer.File, userId: string) {
    const key = `${StorageFolder.UserMedia}/${userId}/avatar`;
    return this.uploadFile(file, key);
  }

  async getSignedUrl(storageUrl: string) {
    const key = storageUrl.replace(this.storageUrl, '');
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command);

    return signedUrl;
  }

  async findUserStorageSize(userId: string) {
    const command = new ListObjectsCommand({
      Bucket: this.bucket,
    });
    const output = await this.s3Client.send(command);

    const userObjects = (output.Contents || []).filter(({ Key }) =>
      Key.startsWith(
        `${StorageFolder.UserMedia}/${userId}/${StorageFolder.LibraryMedia}/`
      )
    );

    const storageSize = userObjects.reduce(
      (previous, { Size }) => previous + Size,
      0
    );

    return storageSize;
  }

  async deleteFile(storageUrl: string) {
    const key = storageUrl.replace(this.storageUrl, '');
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
  }
}
