import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'Hello World' });
};
