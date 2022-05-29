import { UserData, UserSignUpData } from '@/modules/user/types';
import { removeLocalStorageValue, setLocalStorageValue } from '@/utilities/localStorage';
import ApiService, { ApiData } from '@/api/ApiService';

interface LoginData {
  accessToken: string;
  user: UserData;
}

class AuthService {
  private static getAuthUrl() {
    return 'users/authentication';
  }

  public static async login(email: string, password: string): Promise<ApiData<LoginData>> {
    try {
      //get the token
      const response = await ApiService.request({
        url: `${this.getAuthUrl()}/signIn`,
        method: 'POST',
        data: {
          email,
          password,
        },
      });

      if (!response || !response.data.accessToken) {
        //login failed
        throw new Error('login failed!');
      }

      // store the x-auth-token in localStorage
      const accessToken: string = response.data.accessToken;
      setLocalStorageValue(ApiService.authTokenKey, accessToken);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async register(userRegisterData: UserSignUpData): Promise<ApiData> {
    try {
      const response = await ApiService.request({
        url: `${this.getAuthUrl()}/signUp`,
        method: 'POST',
        data: {
          ...userRegisterData,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async setPassword(password: string, passwordConfirmation: string, accessToken: string): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAuthUrl()}/setPassword`,
          method: 'POST',
          data: {
            password,
            passwordConfirmation,
          },
          headers: {
            'x-auth-token': accessToken,
          },
        },
        false,
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async resetPassword(originalPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAuthUrl()}/resetPassword`,
          method: 'POST',
          data: {
            originalPassword,
            newPassword,
            newPasswordConfirmation,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async resetForgotPassword(password: string, passwordConfirmation: string, accessToken: string): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getAuthUrl()}/setForgetPassword`,
          method: 'POST',
          data: {
            password,
            passwordConfirmation,
          },
          headers: {
            'x-auth-token': accessToken,
          },
        },
        false,
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async createForgotPasswordUrl(email: string): Promise<ApiData> {
    try {
      const response = await ApiService.request({
        url: `${this.getAuthUrl()}/forgetPassword`,
        method: 'POST',
        data: {
          email,
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static logout(): void {
    removeLocalStorageValue(ApiService.authTokenKey);
  }
}

export default AuthService;
