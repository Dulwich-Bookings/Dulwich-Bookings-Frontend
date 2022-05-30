import { TagPutData, CreateTagData } from '@/modules/tag/types';
import ApiService, { ApiData } from '@/api/ApiService';

class TagService {
  private static getTagUrl() {
    return 'tags';
  }

  public static async getAllTags(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getTagUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getTagById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async createTag(createTagData: CreateTagData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagUrl()}/`,
          method: 'POST',
          data: {
            ...createTagData,
          },
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateTagById(id: number, userData: TagPutData): Promise<ApiData> {
    delete userData['id'];
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagUrl()}/${id}`,
          method: 'PUT',
          data: { ...userData },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteTagById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getTagUrl()}/${id}`,
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

export default TagService;
