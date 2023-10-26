import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export * from './bike';
export * from './general/object_id';
export * from './booking';

export const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {body, query, params} = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = body;
      req.params = params;
      req.query = query;
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};
