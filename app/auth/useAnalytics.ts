// hooks/useAnalytics.ts
'use client';

import { analyticsPromise } from '../firebase';
import { logEvent, Analytics } from 'firebase/analytics';
import { useState, useEffect } from 'react';

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

// Cache the analytics instance once resolved
let analyticsInstance: Analytics | null = null;
let analyticsPromiseResolved = false;

// Initialize analytics
if (typeof window !== 'undefined') {
  analyticsPromise.then((instance) => {
    analyticsInstance = instance;
    analyticsPromiseResolved = true;
  });
}

export const useAnalytics = () => {
  const [isReady, setIsReady] = useState(() => {
    // Initialize with the current state
    return analyticsPromiseResolved;
  });

  useEffect(() => {
    // If already resolved, no need to set up the promise
    if (analyticsPromiseResolved) {
      return;
    }

    let mounted = true;

    // Otherwise wait for it to resolve
    analyticsPromise.then((instance) => {
      analyticsInstance = instance;
      analyticsPromiseResolved = true;
      if (mounted) {
        setIsReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const logAnalyticsEvent = (
    eventName: EventNameType | string, 
    eventParams?: EventParams
  ): void => {
    // In development, log to console for debugging regardless
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics event (dev):', { eventName, eventParams });
    }

    // Check if analytics is available in production
    if (process.env.NODE_ENV === 'production') {
      if (!analyticsInstance) {
        console.warn('Analytics not initialized yet, event not logged:', eventName);
        return;
      }

      try {
        logEvent(analyticsInstance, eventName, eventParams);
      } catch (error) {
        console.error('Failed to log analytics event:', error);
      }
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
    logLoginError,
    isReady
  };
};

// Type guard to check if analytics is available
export const isAnalyticsAvailable = async (): Promise<boolean> => {
  if (analyticsInstance !== null) return true;
  const instance = await analyticsPromise;
  return instance !== null;
};