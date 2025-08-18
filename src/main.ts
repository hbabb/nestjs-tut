import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

// import { MyLoggerService } from './my-logger/my-logger.service';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     bufferLogs: true,
//   });
//   app.useLogger(app.get(MyLoggerService));
//   app.enableCors();
//   app.setGlobalPrefix('api');
//   await app.listen(process.env.PORT ?? 3000);
// }
// // eslint-disable-next-line @typescript-eslint/no-floating-promises
// bootstrap();
