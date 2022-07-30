import ApiService, { ApiData } from '@/api/ApiService';
import { CreateResourceMapData } from '@/modules/resourceMap/types';

export default class ResourceMapService {
  private static getResourceMapUrl() {
    return 'resourceMap';
  }

  private static resourceMapValidation(createResourceMapData: CreateResourceMapData) {
    if (
      (!createResourceMapData.resourceId && !createResourceMapData.subscriptionId) ||
      (createResourceMapData.resourceId && createResourceMapData.subscriptionId)
    ) {
      return false;
    }

    return true;
  }

  private static processResourceMapData(createResourceMapData: CreateResourceMapData): CreateResourceMapData {
    return createResourceMapData.resourceId
      ? { ...createResourceMapData, subscriptionId: null }
      : { ...createResourceMapData, resourceId: null };
  }

  public static async createResourceMap(createResourceMapData: CreateResourceMapData): Promise<ApiData> {
    try {
      if (!this.resourceMapValidation(createResourceMapData)) {
        return Promise.reject('XOR validation Failed');
      }

      const postData: CreateResourceMapData = this.processResourceMapData(createResourceMapData);
      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/`,
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

  public static async bulkCreateResourceMap(bulkResourceMapData: CreateResourceMapData[]): Promise<ApiData> {
    try {
      bulkResourceMapData.forEach(data => {
        if (!this.resourceMapValidation(data)) {
          return Promise.reject('XOR validation Failed');
        }
      });

      const postMapData: CreateResourceMapData[] = bulkResourceMapData.map(data => this.processResourceMapData(data));

      const response = await ApiService.request(
        {
          url: `${this.getResourceMapUrl()}/bulkCreate`,
          method: 'POST',
          data: postMapData,
        },
        true,
      );
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
          url: `${this.getResourceMapUrl()}/bulkDelete`,
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
