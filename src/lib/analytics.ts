// Analytics utilities for CORVICAC digital strategy
// Enhanced tracking for crossmedia engagement and impact measurement

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export interface AnalyticsEvent {
    event: string;
    page_title?: string;
    page_path?: string;
    user_type?: 'anonymous' | 'registered' | 'donor' | 'volunteer';
    engagement_level?: 'low' | 'medium' | 'high';
    action_type?: string;
    points_earned?: number;
    total_points?: number;
    campaign_source?: string;
    campaign_medium?: string;
    campaign_name?: string;
}

export interface UserProgress {
    points: number;
    level: string;
    completedActions: string[];
    lastActivity: Date;
}

class AnalyticsManager {
    private isInitialized = false;

    init() {
        if (typeof window === 'undefined') return;

        window.dataLayer = window.dataLayer || [];
        this.isInitialized = true;

        // Enhanced page view tracking
        this.trackPageView();
    }

    trackPageView() {
        if (!this.isInitialized) return;

        const event: AnalyticsEvent = {
            event: 'page_view',
            page_title: document.title,
            page_path: window.location.pathname,
            user_type: this.getUserType(),
            engagement_level: 'medium'
        };

        this.pushEvent(event);
    }

    trackUserAction(action: string, points?: number) {
        if (!this.isInitialized) return;

        const event: AnalyticsEvent = {
            event: 'user_action',
            action_type: action,
            points_earned: points || 0,
            total_points: this.getUserPoints(),
            engagement_level: 'high'
        };

        this.pushEvent(event);

        // Track specific action types for crossmedia strategy
        switch (action) {
            case 'learn_mission':
                this.trackEvent('content_engagement', { content_type: 'mission_page' });
                break;
            case 'contact_email':
                this.trackEvent('conversion', { conversion_type: 'email_contact' });
                break;
            case 'contact_whatsapp':
                this.trackEvent('conversion', { conversion_type: 'whatsapp_contact' });
                break;
            case 'watch_video':
                this.trackEvent('media_engagement', { media_type: 'video', media_duration: 'full' });
                break;
            case 'donate_action':
                this.trackEvent('conversion', { conversion_type: 'donation_intent' });
                break;
            case 'volunteer_action':
                this.trackEvent('conversion', { conversion_type: 'volunteer_intent' });
                break;
            case 'share_social':
                this.trackEvent('social_sharing', { share_platform: 'unknown' });
                break;
        }
    }

    trackEvent(eventName: string, parameters?: Record<string, any>) {
        if (!this.isInitialized) return;

        const event = {
            event: eventName,
            ...parameters,
            timestamp: new Date().toISOString(),
            user_id: this.getUserId()
        };

        this.pushEvent(event);
    }

    trackConversion(conversionType: string, value?: number, currency?: string) {
        if (!this.isInitialized) return;

        const event = {
            event: 'conversion',
            conversion_type: conversionType,
            conversion_value: value || 0,
            currency: currency || 'COP',
            user_type: this.getUserType()
        };

        this.pushEvent(event);
    }

    trackSocialShare(platform: string, contentId: string) {
        if (!this.isInitialized) return;

        const event = {
            event: 'social_share',
            share_platform: platform,
            content_id: contentId,
            share_type: 'content'
        };

        this.pushEvent(event);
    }

    trackCommunityImpact(metric: string, value: number, unit: string) {
        if (!this.isInitialized) return;

        const event = {
            event: 'community_impact',
            impact_metric: metric,
            impact_value: value,
            impact_unit: unit,
            timestamp: new Date().toISOString()
        };

        this.pushEvent(event);
    }

    private pushEvent(event: AnalyticsEvent) {
        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push(event);
        }
    }

    private getUserType(): AnalyticsEvent['user_type'] {
        // Logic to determine user type based on localStorage or session
        const userData = localStorage.getItem('corvicac-user-data');
        if (!userData) return 'anonymous';

        const user = JSON.parse(userData);
        if (user.donations && user.donations.length > 0) return 'donor';
        if (user.volunteer_hours && user.volunteer_hours > 0) return 'volunteer';
        return 'registered';
    }

    private getUserPoints(): number {
        const progress = localStorage.getItem('corvicac-user-progress');
        if (!progress) return 0;

        const userProgress = JSON.parse(progress);
        return userProgress.points || 0;
    }

    private getUserId(): string {
        let userId = localStorage.getItem('corvicac-user-id');
        if (!userId) {
            userId = this.generateUserId();
            localStorage.setItem('corvicac-user-id', userId);
        }
        return userId;
    }

    private generateUserId(): string {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    }

    // Crossmedia tracking methods
    trackCrossmediaJourney(journeyId: string, touchpoint: string, channel: string) {
        this.trackEvent('crossmedia_journey', {
            journey_id: journeyId,
            touchpoint: touchpoint,
            channel: channel,
            timestamp: new Date().toISOString()
        });
    }

    trackContentPerformance(contentId: string, contentType: string, engagementTime: number) {
        this.trackEvent('content_performance', {
            content_id: contentId,
            content_type: contentType,
            engagement_time: engagementTime,
            bounce_rate: engagementTime < 5 ? true : false
        });
    }

    // Gamification tracking
    trackLevelUp(level: string, points: number) {
        this.trackEvent('level_up', {
            new_level: level,
            total_points: points,
            achievement_type: 'gamification'
        });
    }

    trackBadgeEarned(badgeName: string, badgeType: string) {
        this.trackEvent('badge_earned', {
            badge_name: badgeName,
            badge_type: badgeType,
            achievement_type: 'gamification'
        });
    }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// Initialize on module load
if (typeof window !== 'undefined') {
    analytics.init();
}

// Export types for use in components
export { AnalyticsManager };