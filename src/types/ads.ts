export interface BaseAd {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: string;
  category: string;
  subcategory: string;
  adImageURL?: string;
  imageLinks?: string[];
  accountID: string;
  _createTime: string;
}

export interface VehicleAd extends BaseAd {
  color?: string;
  year?: string;
  driveType?: string;
  engineCapacity?: string;
  condition?: string;
  transmission?: string;
  fuelType?: string;
  model?: string;
  make?: string;
  mileage?: string;
  interiorType?: string;
}

export interface PropertyAd extends BaseAd {
  internetReady?: boolean;
  wifiIncluded?: boolean;
  liftAvailable?: boolean;
  parkingCapacity?: string;
  electricityAvailable?: boolean;
  kitchenAvailable?: boolean;
  balcony?: boolean;
  securityFeatures?: string[];
  landSize?: string;
  beaconed?: boolean;
  cleaningFee?: string;
  minimumStay?: string;
  floorLevel?: string;
  waterAvailable?: boolean;
  nightlyRate?: string;
  sharedBathroom?: boolean;
  petFriendly?: boolean;
  landUse?: string;
  accessRoadType?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface MyAdSummary extends BaseAd {
  _createTime: string;
  package: string;
  // Vehicle fields
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  condition?: 'new' | 'used';
  transmission?: 'automatic' | 'manual';
  fuelType?: string;
  // Property fields
  bedrooms?: number;
  bathrooms?: number;
  landSize?: string;
  petFriendly?: boolean;
}
