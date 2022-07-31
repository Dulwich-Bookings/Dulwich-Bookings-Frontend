import { CreateTagMapData } from '@/modules/tagMap/types';
import ApiService, { ApiData } from '../ApiService';

export default class TagMapService {
  private static getTagMapUrl() {
    return 'tagMap';
  }

  private static tagMapValidation(createTagMapData: CreateTagMapData): boolean {
    return (!createTagMapData.resourceId && !createTagMapData.subscriptionId) ||
      (createTagMapData.resourceId && createTagMapData.subscriptionId)
      ? false
      : true;
  }

  private static processTagMapData(createTagMapData: CreateTagMapData): CreateTagMapData {
    return createTagMapData.resourceId ? { ...createTagMapData, subscriptionId: null } : { ...createTagMapData, resourceId: null };
  }

  public static async createTagMap(createTagMapData: CreateTagMapData): Promise<ApiData> {
    try {
      if (!TagMapService.tagMapValidation(createTagMapData)) {
        return Promise.reject('XOR validation Failed');
      }

      const postData: CreateTagMapData = TagMapService.processTagMapData(createTagMapData);
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/`,
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

  public static async bulkCreateTagMap(bulkTagMapData: CreateTagMapData[]): Promise<ApiData> {
    try {
      bulkTagMapData.forEach(data => {
        if (!this.tagMapValidation(data)) {
          return Promise.reject('XOR validation Failed');
        }
      });
      const postMapData: CreateTagMapData[] = bulkTagMapData.map(data => this.processTagMapData(data));
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/bulkCreate`,
          method: 'POST',
          data: postMapData,
        },
        true,
      );
      return response;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  public static async getAllTagMap(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getTagMapUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getTagMapById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteTagMapById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/${id}`,
          method: 'DELETE',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async bulkDeleteTagMap(ids: number[]): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/bulkDelete`,
          method: 'DELETE',
          data: {
            id: ids,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
