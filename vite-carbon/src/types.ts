interface IConfiguration {
  port?: number;
  instances: {
    min: number;
    max: number;
  }
}

export type { IConfiguration };
