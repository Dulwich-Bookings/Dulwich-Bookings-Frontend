import { ResourcePutData, CreateResourceData } from '@/modules/resource/types';
import ApiService, { ApiData } from '@/api/ApiService';

export default class ResourceService {
  private static getResourceUrl() {
    return 'resource';
  }

  public static async getAllResources(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getResourceUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getResourceById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async createResource(createResourceData: CreateResourceData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceUrl()}/`,
          method: 'POST',
          data: {
            ...createResourceData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateResourceById(id: number, resourceData: ResourcePutData): Promise<ApiData> {
    delete resourceData['id'];
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceUrl()}/${id}`,
          method: 'PUT',
          data: {
            ...resourceData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteResourceById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceUrl()}/${id}`,
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
