import { UserPutData } from '@/modules/user/types';
import ApiService, { ApiData } from '../ApiService';

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
}

export default UserService;
