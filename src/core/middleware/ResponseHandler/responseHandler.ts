import type { Response, NextFunction, Request } from 'express';

export function responseInterceptor(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Save the original send method
  const originalSend = res.send.bind(res);

  res.send = ((body: never) => {
    // intercept the response body and header before sent to client.
    originalSend(body);
  }) as Response['send'];

  // Move to the next middleware in the chain
  next();
}
