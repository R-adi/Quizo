// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';

const middleware:any = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is logged in (session exists)
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  // Attach the user to the request object
  req.user = req.session.user;

  // Proceed to the next middleware or route handler
  next();
};

export default middleware;

