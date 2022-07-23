import { CreateBookmarkData } from '@/modules/Bookmarks/Types';
import ApiService, { ApiData } from '../ApiService';

export default class BookmarkService {
  private static getBookmarksUrl() {
    return 'bookmark';
  }

  public static async createBookmark(createBookmarkData: CreateBookmarkData): Promise<ApiData> {
    try {
      if (
        (!createBookmarkData.resourceId && !createBookmarkData.subscriptionId) ||
        (createBookmarkData.resourceId && createBookmarkData.subscriptionId)
      ) {
        return Promise.reject('XOR validation Failed');
      }

      const postData: CreateBookmarkData = createBookmarkData.resourceId
        ? { ...createBookmarkData, subscriptionId: null }
        : { ...createBookmarkData, resourceId: null };

      const response = await ApiService.request(
        {
          url: `${this.getBookmarksUrl()}/`,
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

  public static async getAllBookmarks(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getBookmarksUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getBookmarkById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookmarksUrl()}/${id}`,
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
          url: `${this.getBookmarksUrl()}/getSelf`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteBookmarkById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookmarksUrl()}/${id}`,
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
