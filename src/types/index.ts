export type Language = 'en' | 'ta';

export interface Amenity {
  icon: string;
  name: string;
  nameTa: string;
  desc: string;
  descTa: string;
}

export interface Landmark {
  name: string;
  nameTa: string;
  distance: string;
  time: string;
}

export interface Plot {
  id: number;
  plotNo: string;
  sizeSqft: number;
  cents: number;
  facing: 'East' | 'North' | 'West' | 'South';
  status: 'Available' | 'Reserved' | 'Sold';
  price: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  nameTa: string;
  tagline: string;
  taglineTa: string;
  location: string;
  locationTa: string;
  district: string;
  districtTa: string;
  category: 'Gated Villa Plots' | 'Hill Sanctuary' | 'Lakefront Retreat' | 'Farm Estates';
  priceStarting: number; // in Lakhs
  pricePerSqft: number;
  plotSizes: string;
  plotSizesTa: string;
  totalPlots: number;
  availablePlots: number;
  status: 'Ready for Registration' | 'Under Development' | 'Phase II Launch';
  statusTa: string;
  approvals: string[];
  heroImage: string;
  gallery: string[];
  description: string;
  descriptionTa: string;
  amenities: Amenity[];
  landmarks: Landmark[];
  plots: Plot[];
  featured?: boolean;
}

export interface Enquiry {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  projectId: string;
  projectName: string;
  visitDate: string;
  timeSlot: string;
  pickUpNeeded: boolean;
  message: string;
  status: 'New' | 'Scheduled' | 'Contacted' | 'Closed';
}

export interface GalleryItem {
  id: string;
  title: string;
  titleTa: string;
  category: 'Aerials' | 'Grand Entrances' | 'Landscapes' | 'Avenues & Roads';
  image: string;
  caption: string;
  captionTa: string;
}
