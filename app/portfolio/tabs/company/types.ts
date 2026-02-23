// components/tab-content/types.ts
export interface Service {
  title: string;
  description: string;
  time: string;
}

export interface BusinessStructure {
  name: string;
  tagline: string;
  benefits: string[];
  description?: string;          // Optional detailed description
  requirements?: string[];       // Optional requirements
}

export interface RegistrationStep {
  step: string;
  desc: string;
  days: string;
}

export interface GovernmentAgency {
  name: string;
  desc: string;
  bg: string;
  text: string;
  logo: string;
}
