// constants.js

// ---------------------------
// Transportation Providers
// ---------------------------
export const TRANSPORTATION_PROVIDERS = Object.freeze({
  DHL: "DHL", // DHL Express
  USPS: "USPS", // United States Postal Service
  ROYAL_MAIL: "ROYAL_MAIL", // Royal Mail (UK)
  DPD: "DPD", // Dynamic Parcel Distribution
  GLS: "GLS", // General Logistics Systems
  CANADA_POST: "CANADA_POST", // Canada Post
  AUSTRALIA_POST: "AUSTRALIA_POST", // Australia Post
  JAPAN_POST: "JAPAN_POST", // Japan Post
  POSTNL: "POSTNL", // PostNL (Netherlands)
  CORREIOS: "CORREIOS", // Correios (Brazil)
  CHINA_POST: "CHINA_POST", // China Post
  LA_POSTE: "LA_POSTE", // La Poste (France)
  DEUTSCHE_POST: "DEUTSCHE_POST", // Deutsche Post (Germany)
  BLUE_DART: "BLUE_DART", // Blue Dart Express (India)
});

// ---------------------------
// Transportation Services
// ---------------------------
export const TRANSPORTATION_SERVICES = Object.freeze({
  STANDARD: "Standard", // Regular shipping with standard delivery times
  EXPRESS: "Express", // Faster than standard shipping
  OVERNIGHT: "Overnight", // Delivery by the next day
  TWO_DAY: "TwoDay", // Delivery within two business days
  SAME_DAY: "SameDay", // Delivery on the same day of shipment
  ECONOMY: "Economy", // Low-cost shipping option with longer delivery times
  FREIGHT: "Freight", // Bulk or heavy shipments via freight carriers
  INTERNATIONAL: "International", // Shipments crossing international borders
  NEXT_DAY: "NextDay", // Guaranteed next-day delivery
  SCHEDULED: "Scheduled", // Delivery at a pre-specified date/time
});

// ---------------------------
// Shipment Statuses
// ---------------------------
export const SHIPMENT_STATUSES = Object.freeze({
  PENDING: "Pending", // Shipment created but not yet processed
  AWAITING_PICKUP: "Awaiting Pickup", // Shipment waiting for carrier pickup
  PICKED_UP: "Picked Up", // Shipment has been collected by the carrier
  IN_TRANSIT: "In Transit", // Shipment is currently being transported to its destination
  DELAYED: "Delayed", // Shipment is delayed for some reason
  HELD_AT_CUSTOMS: "Held At Customs", // Shipment is being held at customs
  OUT_FOR_DELIVERY: "Out For Delivery", // Shipment is on delivery vehicle
  DELIVERED: "Delivered", // Shipment successfully delivered
  FAILED_DELIVERY: "Failed Delivery", // Delivery attempt failed
  RETURNED_TO_SENDER: "Returned To Sender", // Shipment returned to sender
});

// ---------------------------
// Continent Codes
// ---------------------------
export const CONTINENT_CODES = Object.freeze({
  NORTH_AMERICA: "NA", // North America
  SOUTH_AMERICA: "SA", // South America
  EUROPE: "EU", // Europe
  ASIA: "AS", // Asia
  AFRICA: "AF", // Africa
  OCEANIA: "OC", // Oceania
});

// ---------------------------
// Region Codes
// ---------------------------

export const REGION_CODES = Object.freeze({
  US: "US", // United States / North America
  EU: "EU", // Europe
  APAC: "APAC", // Asia-Pacific
  LATAM: "LATAM", // Latin America
  AFRICA: "AFRICA", // Africa
  MENA: "MENA", // Middle East & North Africa
});
