import { HelmetOptions } from 'helmet';

export const HELMET_CONFIG: HelmetOptions = {
  // Prevent browsers from MIME-sniffing a response away from the declared content-type
  xContentTypeOptions: true,

  // Prevent clickjacking
  frameguard: { action: 'deny' },

  // Cross-site scripting protection (X-XSS-Protection)
  xssFilter: true,

  // Strict-Transport-Security
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },

  // Prevent downloads from executing in old IE versions
  ieNoOpen: true,

  // Control referrer header
  referrerPolicy: { policy: 'no-referrer' },

  // Restrict cross-domain policies for Flash and Adobe products
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },

  // Content Security Policy (CSP) to prevent XSS
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https:'],
      styleSrc: ["'self'", 'https:'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },

  // Cross-Origin Embedder Policy (set false if not required)
  crossOriginEmbedderPolicy: true,
} as const;
