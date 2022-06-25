import { SubscriptionPutData, CreateSubscriptionData } from '@/modules/subscription/types';
import ApiService, { ApiData } from '@/api/ApiService';
import { convertToUTC, convertToLocal } from '@/utilities/timezones';

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
      convertToLocal(response.data.expiry, response.data.timezone);
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
      convertToLocal(response.expiry, response.timezone);
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
            ...createSubscriptionData,
            expiry: convertToUTC(createSubscriptionData.expiry),
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
    delete subscriptionData['id'];
    subscriptionData.expiry ? convertToUTC(subscriptionData.expiry) : subscriptionData.expiry;
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSubscriptionUrl()}/${id}`,
          method: 'PUT',
          data: {
            ...subscriptionData,
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
