import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): { message: string; status: string } {
    return {
      message: 'API is running!',
      status: 'OK',
    };
  }
}
