import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
MailerService

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(): void {}
}
