// all the imports from different sources
import fs from "fs";
import path from "path";
import AWS from "aws-sdk";
import { MongoClient } from "mongodb";

import {
  EVENTS_DATA_SOURCE_TYPE,
  EventsDataSource,
  DataReader,
} from "../interfaces/reader.interface";

class LocalDataReader implements DataReader {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async readData(): Promise<any[]> {
    const fpath = path.join(`${process.cwd()}/src`, this.filePath);

    const fileData = await fs.promises.readFile(fpath, "utf-8");
    return JSON.parse(fileData);
  }
}

class S3DataReader implements DataReader {
  private bucket: string;
  private key: string;

  constructor(bucket: string, key: string) {
    this.bucket = bucket;
    this.key = key;
  }

  async readData(): Promise<any[]> {
    const s3 = new AWS.S3();
    const s3Params = {
      Bucket: this.bucket,
      Key: this.key,
    };
    const s3Data = await s3.getObject(s3Params).promise();
    return JSON.parse(s3Data.Body!.toString());
  }
}

// This is just for example how to read data from mongodb 
class DatabaseDataReader implements DataReader {
  private connectionUrl: string;
  private collectionName: string;

  constructor(connectionUrl: string, collectionName: string) {
    this.connectionUrl = connectionUrl;
    this.collectionName = collectionName;
  }

  async readData(): Promise<any[]> {
    const client = new MongoClient(this.connectionUrl);
    await client.connect();
    const db = client.db();
    const collection = db.collection(this.collectionName);
    const databaseData = await collection.find().toArray();
    return databaseData;
  }
}

export default class DataReaderFactory {
  static createDataReader(source: EventsDataSource): DataReader {
    switch (source.type) {
      case EVENTS_DATA_SOURCE_TYPE.LOCAL_FILE_PATH:
        return new LocalDataReader(source.config.path!);
      case EVENTS_DATA_SOURCE_TYPE.S3:
        return new S3DataReader(source.config.bucket!, source.config.key);
      case EVENTS_DATA_SOURCE_TYPE.DB:
        return new DatabaseDataReader(
          source.config.connectionString!,
          source.config.tableName
        );
      default:
        throw new Error("Invalid data source");
    }
  }
}
