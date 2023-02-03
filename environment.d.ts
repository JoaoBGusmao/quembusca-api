declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONN_STRING: string;
    }
  }
}

export {};
