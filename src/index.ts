import {
  createServer,
  Server,
  IncomingMessage,
  ServerResponse,
} from "node:http";

export interface HttpAdapter {
  listen(
    endpoint: string,
    handler: (req: any, res: any) => Promise<any>,
    ...args: any[]
  ): Promise<any> | any;

  getRequestBody(req: any): Promise<Uint8Array>;
}

export interface HttpAdapterRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[]>;
}

export interface HttpAdapterSererResponse {
  headersSent: boolean;
  writeHead(status: number, headers?: Record<string, string>): void;
  end(chunk?: string): void;
}
/**
 * NodeAdapter implements the HttpAdapter interface for Node.js HTTP server.
 * This class provides methods to listen for incoming HTTP requests and read request bodies.
 */

class NodeAdapter implements HttpAdapter {
  /**
   * Starts the HTTP server and begins listening for incoming requests
   * @internal
   */
  listen(
    _: string,
    handler: (req: IncomingMessage, res: ServerResponse) => Promise<any>,
    ...args: Parameters<Server["listen"]>
  ) {
    const server = createServer(handler);
    return server.listen(...args);
  }
  /**
   * @internal
   * Reads the body of an incoming HTTP request and returns it as a Uint8Array.
   */
  async getRequestBody(req: IncomingMessage): Promise<Uint8Array> {
    const chunks: Buffer[] = [];
    let totalLength = 0;
    try {
      for await (const chunk of req) {
        chunks.push(chunk);
        totalLength += chunk.length;
      }
      return new Uint8Array(Buffer.concat(chunks, totalLength));
    } catch (e) {
      console.error(e);
      throw new Error("Failed to read request body");
    }
  }
}

export default NodeAdapter;
