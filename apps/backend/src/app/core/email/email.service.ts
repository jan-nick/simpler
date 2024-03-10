import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_KEY'));
  }

  async send({
    dynamicTemplateData,
    templateId,
    to,
  }: Omit<SendGrid.MailDataRequired, 'from'>) {
    const transport = await SendGrid.send({
      dynamicTemplateData,
      from: {
        email: this.configService.get<string>('SENDGRID_FROM_EMAIL'),
        name: this.configService.get<string>('SENDGRID_FROM_NAME'),
      },
      templateId,
      to,
    });
    return transport;
  }
}
