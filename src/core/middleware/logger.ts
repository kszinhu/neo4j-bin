import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: FastifyRequest, res: FastifyReply['raw'], next: () => void) {
    const { ip, method, url: url } = req,
      userAgent = req.headers['user-agent'] || '',
      isError = res.statusCode >= 400;

    res.on('close', () => {
      const { statusCode } = res,
        contentLength = res.getHeader('content-length');
      const message: string = {
        GET: `${method} ${url} ${statusCode} - ${userAgent} ${ip}`,
        DELETE: `${method} ${url} ${statusCode} - ${userAgent} ${ip}`,
        POST: `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        PATCH: `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        PUT: `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        OPTIONS: '',
      }[method as 'GET' | 'DELETE' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS'];
      isError ? this.logger.error(message) : this.logger.log(message);
    });

    next();
  }
}
