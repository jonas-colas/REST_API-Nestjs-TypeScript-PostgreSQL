// import { LoggingInterceptor } from './shared/logging.interceptor';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core'; //, APP_INTERCEPTOR
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // }
  ], //, UserResolver
})
export class AppModule {}
