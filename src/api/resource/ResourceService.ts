import { ResourcePutData, CreateResourceData, ResourceData } from '@/modules/resource/types';
import { resourceTypes } from '@/consts/constants';
import ApiService, { ApiData } from '@/api/ApiService';

export default class ResourceService {
  private static getResourceUrl() {
    return 'resource';
  }

  // Process 'Resource' by Adding it's resource type
  private static processResourceType(input: ResourceData): ResourceData {
    return { ...input, type: resourceTypes.RESOURCE };
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
      response.data = response.data.map((r: ResourceData) => ResourceService.processResourceType(r));
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
      response.data = ResourceService.processResourceType(response.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getResourceSelf(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getResourceUrl()}/self`,
          method: 'GET',
        },
        true,
      );
      response.data = response.data.map((r: ResourceData) => ResourceService.processResourceType(r));
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
    resourceData && resourceData.resource && delete resourceData.resource['id'];
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
