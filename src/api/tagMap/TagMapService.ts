import { CreateTagMapData } from '@/modules/tag/tagMap/types';
import ApiService, { ApiData } from '../ApiService';

export default class TagMapService {
  private static getTagMapUrl() {
    return 'tagMap';
  }

  public static async createTagMap(createTagMapData: CreateTagMapData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/`,
          method: 'POST',
          data: {
            ...createTagMapData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async bulkCreateTagMap(bulkTagMapData: FormData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}/bulkCreate`,
          method: 'POST',
          data: bulkTagMapData,
          responseType: 'blob',
        },
        true,
        false,
        'multipart/form-data',
      );
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      const currentDate = new Date().toLocaleString();
      link.setAttribute('download', `User-Bulk-Sign-Up ${currentDate}.csv`);
      document.body.appendChild(link);
      link.click();
      return response;
    } catch (error) {
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

  public static async bulkDeleteUserByid(ids: number[]): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagMapUrl()}`,
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
