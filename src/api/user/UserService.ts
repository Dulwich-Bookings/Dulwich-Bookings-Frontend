import { UserPutData } from '@/modules/user/types';
import ApiService, { ApiData } from '@/api/ApiService';

class UserService {
  private static getUserUrl() {
    return 'users';
  }

  public static async getAllUsers(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getUserUrl(),
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
          url: `${this.getUserUrl()}/getSelf`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateSelf(newUserData: UserPutData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getUserUrl()}/updateSelf`,
          method: 'PUT',
          data: newUserData,
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getUserById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getUserUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateUserById(id: number, userData: UserPutData): Promise<ApiData> {
    delete userData['id'];
    try {
      const response = await ApiService.request(
        {
          url: `${this.getUserUrl()}/${id}`,
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

  public static async deleteUserById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getUserUrl()}/${id}`,
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
          url: `${this.getUserUrl()}`,
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

export default UserService;
