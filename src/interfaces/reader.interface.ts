export const EVENTS_DATA_SOURCE_TYPE = {
  LOCAL_FILE_PATH: "localFilePath",
  S3: "s3",
  DB: "db",
} as const;

export interface LocalFileDataSourceConfig {
  path: string;
}

// in your example this type was different so i changed it
export interface S3DataSourceConfig {
  bucket: string;
  key: string
}

export interface DbDataSourceConfig {
  connectionString: string;
  tableName: string;
}

export type LocalFileDataSource = {
  type: typeof EVENTS_DATA_SOURCE_TYPE.LOCAL_FILE_PATH;
  config: LocalFileDataSourceConfig;
};

export type S3DataSource = {
  type: typeof EVENTS_DATA_SOURCE_TYPE.S3;
  config: S3DataSourceConfig;
};

export type DbDataSource = {
  type: typeof EVENTS_DATA_SOURCE_TYPE.DB;
  config: DbDataSourceConfig;
};

export type EventsDataSource = LocalFileDataSource | S3DataSource | DbDataSource;

export interface DataReader {
  readData(): Promise<any[]>;
}


//  type EventsDataSourceType = typeof EventsDataSource[keyof typeof EVENTS_DATA_SOURCE_TYPE];
