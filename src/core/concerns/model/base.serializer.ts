import { ConfigService } from '@nestjs/config';
import { Metaizer, Paginator, Serializer, SerializerOptions } from 'ts-japi';

export class BaseSerializer<
  S extends Record<string, any>,
> extends Serializer<S> {
  protected domain: string;
  // TODO: add pagination support

  constructor(
    name: string,
    configService: ConfigService,
    modelOptions?: Partial<SerializerOptions<S>>,
  ) {
    // @ts-expect-error - incomplete type definition (missing last, first)
    const paginator = new Paginator<S>((models) => {
      if (Array.isArray(models)) {
        const amount = models.length;

        const nextPage = amount + 1,
          prevPage = amount === 1 ? 1 : amount - 1;

        return {
          next: this.pathTo(`/${name}?page=${nextPage}`),
          prev: this.pathTo(`/${name}?page=${prevPage}`),
        };
      }

      return;
    });

    super(name, {
      ...modelOptions,
      depth: 1,
      projection: undefined,
      linkers: {
        paginator,
      },
      version: null,
    });

    this.domain = configService.get('DOMAIN');
  }

  protected pathTo(path: string): string {
    return new URL(path, `https://${this.domain}`).toString();
  }
}
