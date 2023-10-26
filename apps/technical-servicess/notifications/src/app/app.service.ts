import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
MailerService

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(): void {
    this.mailerService.sendMail({
      to: 'felipealvarezb1@gmail.com',
      from: 'pepe2136@gmail.com',
      subject: 'Testing MailerModule',
      text: 'welcome',
      html: '<p>You are amazing</p>'
    })
  }
}
