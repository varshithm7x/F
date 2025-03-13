import { withAuth } from "@clerk/clerk-sdk-node";

export const requireAuth = withAuth((req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  // Set secure headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  
  next();
}); 