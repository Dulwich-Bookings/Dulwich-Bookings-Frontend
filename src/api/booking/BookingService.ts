import ApiService, { ApiData } from '@/api/ApiService';
import { BookingPutData, CreateBookingData, DeleteBookingData } from '@/modules/Bookings/Types';

export default class BookingService {
  private static getBookingUrl() {
    return 'resourceBooking';
  }

  public static async createBooking(createBookingData: CreateBookingData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/`,
          method: 'POST',
          data: {
            ...createBookingData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getOwnBookings(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/self`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getBookingById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateCurrBookingById(id: number, bookingData: BookingPutData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/thisEvent/${id}`,
          method: 'PUT',
          data: {
            ...bookingData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updatefollowingBookingById(id: number, bookingData: BookingPutData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/thisandFollowingEvents/${id}`,
          method: 'PUT',
          data: {
            ...bookingData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async updateAllBookingById(id: number, bookingData: BookingPutData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/allEvents/${id}`,
          method: 'PUT',
          data: {
            ...bookingData,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteCurrBookingById(id: number, bookingData: DeleteBookingData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/thisEvent/${id}`,
          method: 'DELETE',
          data: {
            ...bookingData.body,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteFollowingBookingById(id: number, bookingData: DeleteBookingData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/thisandFollowingEvents/${id}`,
          method: 'DELETE',
          data: {
            ...bookingData.body,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async deleteAllBookingById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getBookingUrl()}/allEvents/${id}`,
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
