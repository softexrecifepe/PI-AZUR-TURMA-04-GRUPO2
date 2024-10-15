export class DuplicateEntryError extends Error {
    public readonly statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = 'DuplicateEntryError';
      this.statusCode = 409; // 409 Conflict - HTTP status apropriado para conflitos como duplicações
    }
  }
  