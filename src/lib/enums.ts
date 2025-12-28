// Enum mappings for frontend-backend compatibility
export const EnumMaps = {
  // Contact enums
  contactDepartment: {
    'general': 'GENERAL',
    'sales': 'SALES',
    'support': 'SUPPORT',
    'custom': 'CUSTOM',
    'showroom': 'SHOWROOM'
  } as const,
  
  contactMethod: {
    'whatsapp': 'WHATSAPP',
    'phone': 'PHONE',
    'email': 'EMAIL'
  } as const,
  
  contactStatus: {
    'new': 'NEW',
    'in_progress': 'IN_PROGRESS',
    'resolved': 'RESOLVED',
    'closed': 'CLOSED'
  } as const,
  
  // Custom order enums
  customOrderCategory: {
    'sofa': 'SOFA',
    'bed': 'BED',
    'chair': 'CHAIR',
    'table': 'TABLE',
    'wardrobe': 'WARDROBE',
    'other': 'OTHER'
  } as const,
  
  customOrderTimeline: {
    'urgent': 'URGENT',
    '6-8': 'SIX_TO_EIGHT_WEEKS',
    '10-12': 'TEN_TO_TWELVE_WEEKS',
    'flexible': 'FLEXIBLE'
  } as const,
  
  customOrderStatus: {
    'inquiry': 'INQUIRY',
    'consultation': 'CONSULTATION',
    'design': 'DESIGN',
    'quote': 'QUOTE',
    'approved': 'APPROVED',
    'production': 'PRODUCTION',
    'completed': 'COMPLETED',
    'cancelled': 'CANCELLED'
  } as const,
  
  communicationType: {
    'email': 'EMAIL',
    'whatsapp': 'WHATSAPP',
    'call': 'CALL',
    'meeting': 'MEETING',
    'internal': 'INTERNAL'
  } as const,
  
  // Showroom enums
  visitType: {
    'private_tour': 'PRIVATE_TOUR',
    'family_visit': 'FAMILY_VISIT',
    'business_visit': 'BUSINESS_VISIT',
    'general': 'GENERAL'
  } as const,
  
  bookingStatus: {
    'pending': 'PENDING',
    'confirmed': 'CONFIRMED',
    'completed': 'COMPLETED',
    'cancelled': 'CANCELLED',
    'no_show': 'NO_SHOW'
  } as const,
  
  // Blog enums
  blogCategory: {
    'design': 'DESIGN',
    'tips': 'TIPS',
    'materials': 'MATERIALS',
    'sustainability': 'SUSTAINABILITY',
    'news': 'NEWS'
  } as const,
  
  postStatus: {
    'draft': 'DRAFT',
    'published': 'PUBLISHED',
    'archived': 'ARCHIVED'
  } as const,
  
  // Product enums
  orderStatus: {
    'pending': 'PENDING',
    'confirmed': 'CONFIRMED',
    'processing': 'PROCESSING',
    'shipped': 'SHIPPED',
    'delivered': 'DELIVERED',
    'cancelled': 'CANCELLED',
    'refunded': 'REFUNDED'
  } as const,
  
  paymentStatus: {
    'pending': 'PENDING',
    'processing': 'PROCESSING',
    'completed': 'COMPLETED',
    'failed': 'FAILED',
    'refunded': 'REFUNDED'
  } as const,
  
  role: {
    'customer': 'CUSTOMER',
    'admin': 'ADMIN',
    'staff': 'STAFF'
  } as const
} as const;

// TypeScript types for better type safety
export type FrontendContactDepartment = keyof typeof EnumMaps.contactDepartment;
export type BackendContactDepartment = typeof EnumMaps.contactDepartment[keyof typeof EnumMaps.contactDepartment];

export type FrontendContactMethod = keyof typeof EnumMaps.contactMethod;
export type BackendContactMethod = typeof EnumMaps.contactMethod[keyof typeof EnumMaps.contactMethod];

// Helper functions
export function mapToBackend<T extends keyof typeof EnumMaps>(
  mapName: T,
  frontendValue: keyof (typeof EnumMaps)[T]
): (typeof EnumMaps)[T][keyof (typeof EnumMaps)[T]] {
  return EnumMaps[mapName][frontendValue as keyof (typeof EnumMaps)[T]];
}

export function mapToFrontend<T extends keyof typeof EnumMaps>(
  mapName: T,
  backendValue: string
): keyof (typeof EnumMaps)[T] | undefined {
  const map = EnumMaps[mapName];
  for (const [key, value] of Object.entries(map)) {
    if (value === backendValue) {
      return key as keyof (typeof EnumMaps)[T];
    }
  }
  return undefined;
}