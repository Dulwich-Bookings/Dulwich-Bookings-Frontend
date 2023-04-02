import { CreateMilestoneData } from '@/modules/Milestones/Types';
import ApiService, { ApiData } from '../ApiService';

export default class MilestoneService {
  private static getMilestoneUrl() {
    return 'milestones';
  }

  public static async getSelf(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getMilestoneUrl()}/getSelf`,
          method: 'GET',
        },
        true,
      );

      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async bulkCreateMilestone(password: string, milestones: CreateMilestoneData[]): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getMilestoneUrl()}/bulkCreate`,
          method: 'POST',
          data: {
            password,
            milestones,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async bulkDeleteMilestone(password: string): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getMilestoneUrl()}/bulkDelete`,
          method: 'DELETE',
          data: {
            password,
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
