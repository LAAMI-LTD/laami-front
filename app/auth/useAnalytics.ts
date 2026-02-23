// hooks/useAnalytics.ts
'use client';

import { analytics } from '../firebase';
import { logEvent, Analytics } from 'firebase/analytics';

// Define event parameter types for better type safety
export type EventParams = {
  [key: string]: string | number | boolean | null | undefined;
};

// Define event names enum with proper typing
export const EventNames = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_ERROR: 'login_error',
  SIGNUP_START: 'signup_start',
  PAGE_VIEW: 'page_view',
  USER_ACTION: 'user_action',
  // ... add more as needed
} as const;

// Create a type from the EventNames object
export type EventNameType = typeof EventNames[keyof typeof EventNames];

// Define specific event parameter types for better autocomplete
export interface LoginEventParams extends EventParams {
  method: 'email' | 'google' | 'github' | 'phone';
  email_domain?: string;
}

export interface LoginErrorEventParams extends EventParams {
  method: 'email' | 'google' | 'github' | 'phone';
  error_code: string;
  error_message?: string;
}

export const useAnalytics = () => {
  const logAnalyticsEvent = (
    eventName: EventNameType | string, 
    eventParams?: EventParams
  ): void => {
    // Check if analytics is available
    if (!analytics) {
      // In development, log to console for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Analytics event (dev):', { eventName, eventParams });
      }
      return;
    }

    try {
      logEvent(analytics as Analytics, eventName, eventParams);
    } catch (error) {
      console.error('Failed to log analytics event:', error);
    }
  };

  // Convenience methods for common events
  const logLoginSuccess = (params: LoginEventParams) => {
    logAnalyticsEvent(EventNames.LOGIN_SUCCESS, params);
  };

  const logLoginError = (params: LoginErrorEventParams) => {
    logAnalyticsEvent(EventNames.LOGIN_ERROR, params);
  };

  return { 
    logAnalyticsEvent,
    logLoginSuccess,
    logLoginError
  };
};

// Type guard to check if analytics is available
export const isAnalyticsAvailable = (): boolean => {
  return !!analytics;
};