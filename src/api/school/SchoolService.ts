import { SchoolPutData, CreateSchoolData } from '@/modules/school/types';
import ApiService, { ApiData } from '@/api/ApiService';

class SchoolService {
  private static getSchoolUrl() {
    return 'school';
  }
  public static async getAllSchools(): Promise<ApiData> {
    try {
      const response = await ApiService.request({
        url: this.getSchoolUrl(),
        method: 'GET',
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getSchoolById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSchoolUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async createSchool(createSchoolData: CreateSchoolData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSchoolUrl()}/`,
          method: 'POST',
          data: {
            ...createSchoolData,
          },
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateSchoolById(id: number, schoolData: SchoolPutData): Promise<ApiData> {
    delete schoolData['id'];
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSchoolUrl()}/${id}`,
          method: 'PUT',
          data: { ...schoolData },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteSchoolById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getSchoolUrl()}/${id}`,
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

export default SchoolService;
