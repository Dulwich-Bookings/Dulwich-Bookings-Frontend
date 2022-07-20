import ApiService, { ApiData } from '@/api/ApiService';
import { CreateResourceMapData } from '@/modules/resource/resourceMap/types';

export default class ResourceMapService {
  private static getResourceMapUrl() {
    return 'resourceMap';
  }

  public static async createResourceMap(createResourceMapData: CreateResourceMapData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/`,
          method: 'POST',
          data: {
            ...createResourceMapData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async bulkCreateResourceMap(bulkResourceMapData: FormData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/bulkCreate`,
          method: 'POST',
          data: bulkResourceMapData,
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
      link.setAttribute('download', `Resource-Map-Bulk-Create ${currentDate}.csv`);
      document.body.appendChild(link);
      link.click();
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getResourceMapSelf(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/getSelf`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getAllResourceMaps(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getResourceMapUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getResourceMapById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteResourceMapById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/${id}`,
          method: 'DELETE',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async bulkDeleteResourceMapByid(ids: number[]): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}`,
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
