import { CreateRecentlyVisitedData } from '@/modules/recentlyVisited/Types';
import ApiService, { ApiData } from '../ApiService';

export default class RecentlyVisitedService {
  private static getRecentlyVisitedUrl() {
    return 'recentlyVisited';
  }

  public static async createRecentlyVisited(createRecentlyVisitedData: CreateRecentlyVisitedData): Promise<ApiData> {
    try {
      if (
        (!createRecentlyVisitedData.resourceId && !createRecentlyVisitedData.subscriptionId) ||
        (createRecentlyVisitedData.resourceId && createRecentlyVisitedData.subscriptionId)
      ) {
        return Promise.reject('XOR validation Failed');
      }

      const postData: CreateRecentlyVisitedData = createRecentlyVisitedData.resourceId
        ? { ...createRecentlyVisitedData, subscriptionId: null }
        : { ...createRecentlyVisitedData, resourceId: null };

      const response = await ApiService.request(
        {
          url: `${this.getRecentlyVisitedUrl()}/`,
          method: 'POST',
          data: {
            ...postData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getAllRecentlyVisited(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getRecentlyVisitedUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getRecentlyVisitedById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getRecentlyVisitedUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getSelf(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getRecentlyVisitedUrl()}/getSelf`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteRecentlyVisitedById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getRecentlyVisitedUrl()}/${id}`,
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
