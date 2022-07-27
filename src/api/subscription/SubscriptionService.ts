import { SubscriptionPutData, CreateSubscriptionData, SubscriptionData } from '@/modules/subscription/types';
import ApiService, { ApiData } from '@/api/ApiService';
import DateTime from '@/modules/DateTime/DateTime';

export default class SubscriptionService {
  private static getSubscriptionUrl() {
    return 'subscription';
  }

  public static async getAllSubscriptions(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getSubscriptionUrl(),
          method: 'GET',
        },
        true,
      );
      const subscriptionData = response.data.map((subscription: SubscriptionData) => {
        return {
          ...subscription,
          expiry: subscription.expiry ? DateTime.newDateTimeFromUTCString(subscription.expiry as unknown as string) : null,
        };
      });
      response.data = subscriptionData;
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getSubscriptionById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSubscriptionUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      response.data.expiry = response.data.expiry ? DateTime.newDateTimeFromUTCString(response.data.expiry) : null;
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async createSubscription(createSubscriptionData: CreateSubscriptionData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSubscriptionUrl()}/`,
          method: 'POST',
          data: {
            subscription: {
              ...createSubscriptionData.subscription,
              expiry: createSubscriptionData.subscription.expiry ? createSubscriptionData.subscription.expiry.toString() : null,
            },
            tags: createSubscriptionData.tags,
            users: createSubscriptionData.users,
          },
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateSubscriptionById(id: number, subscriptionData: SubscriptionPutData): Promise<ApiData> {
    subscriptionData && subscriptionData.subscription && delete subscriptionData.subscription['id'];
    try {
      const newSubscriptionData = {
        subscription: {
          ...subscriptionData.subscription,
          expiry: subscriptionData.subscription?.expiry ? subscriptionData.subscription.expiry.toString() : null,
        },
        tags: subscriptionData.tags,
        users: subscriptionData.users,
      };
      const response = await ApiService.request(
        {
          url: `${this.getSubscriptionUrl()}/${id}`,
          method: 'PUT',
          data: {
            ...newSubscriptionData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteSubscriptionById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSubscriptionUrl()}/${id}`,
          method: 'DELETE',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
