/* eslint-disable @typescript-eslint/no-explicit-any */
import { analyticsPromise } from '../firebase';
import { logEvent, setUserProperties } from 'firebase/analytics';
import { User } from 'firebase/auth';

export const EventNames = {
  LOGIN_SUCCESS: 'user_login_success',
  LOGIN_ERROR: 'user_login_error',
  LOGOUT: 'user_logout',
  SIGNUP_START: 'user_signup_start',
  SIGNUP_COMPLETE: 'user_signup_complete',

  CONTACT_FORM_VIEW: 'contact_form_view',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  PROJECT_INQUIRY: 'project_inquiry',
  SERVICE_VIEW: 'service_view',
  PORTFOLIO_VIEW: 'portfolio_view',

  SOCIAL_CLICK: 'social_media_click',
  FACEBOOK_CLICK: 'facebook_click',
  INSTAGRAM_CLICK: 'instagram_click',

  PAGE_VIEW: 'page_view',
  SECTION_VIEW: 'section_view'
} as const;

const FACEBOOK_URL = "https://www.facebook.com/share/1Zv7PtL4T3/";
const INSTAGRAM_URL = "https://www.instagram.com/laamilabs?igsh=ZndvbzF2bzc5NWtr/";

export const useAnalytics = () => {

  const logAnalyticsEvent = async (
    eventName: string,
    eventParams?: { [key: string]: any }
  ) => {
    const analytics = await analyticsPromise;

    if (!analytics) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics event (dev):', eventName, eventParams);
      }
      return;
    }

    logEvent(analytics, eventName, eventParams);
  };

  const setUserAnalyticsProperties = async (user: User | null) => {
    if (!user) return;

    const analytics = await analyticsPromise;
    if (!analytics) return;

    setUserProperties(analytics, {
      user_id: user.uid,
      email_domain: user.email?.split('@')[1] || 'unknown',
      signup_method: user.providerData[0]?.providerId || 'unknown'
    });
  };

  const trackSocialClick = async (platform: 'facebook' | 'instagram') => {
    await logAnalyticsEvent(EventNames.SOCIAL_CLICK, {
      platform,
      url: platform === 'facebook' ? FACEBOOK_URL : INSTAGRAM_URL
    });
  };

  return {
    logAnalyticsEvent,
    setUserAnalyticsProperties,
    trackSocialClick
  };
};
