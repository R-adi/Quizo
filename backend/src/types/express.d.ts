// src/types/express.d.ts
import 'express-session'; // Import express-session to extend SessionData

declare module 'express-session' {
  interface SessionData {
    user?: { id: number; username: string }; // Define the session user object
  }
}

declare global {
  namespace Express {
    interface Request {
      session: Session & Partial<SessionData>; // Add session to the Request object
    }
  }
}


declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string }; // Add user to the Request object
    }
  }
}