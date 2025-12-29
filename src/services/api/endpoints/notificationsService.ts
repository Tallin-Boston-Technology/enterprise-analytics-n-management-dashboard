import type {
  CreateNotificationPayload,
  Notification,
  NotificationPreferences,
} from "../../../types";
import apiClient from "../apiClient";

class NotificationsService {
  private readonly BASE_PATH = "/notifications";

  async getAllNotifications(params?: {
    category?: string;
    isRead?: boolean;
    limit?: number;
  }): Promise<Notification[]> {
    const response = await apiClient.get<Notification[]>(this.BASE_PATH, {
      params,
    });
    return response.data;
  }

  async getNotificationById(notificationId: string): Promise<Notification> {
    const response = await apiClient.get<Notification>(
      `${this.BASE_PATH}/${notificationId}`
    );
    return response.data;
  }

  async createNotification(
    data: CreateNotificationPayload
  ): Promise<Notification> {
    const response = await apiClient.post<Notification>(this.BASE_PATH, data);
    return response.data;
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    const response = await apiClient.patch<Notification>(
      `${this.BASE_PATH}/${notificationId}/read`,
      {}
    );
    return response.data;
  }

  async markAllAsRead(): Promise<void> {
    await apiClient.patch<void>(`${this.BASE_PATH}/read-all`, {});
  }

  async deleteNotification(notificationId: string): Promise<void> {
    await apiClient.delete<void>(`${this.BASE_PATH}/${notificationId}`);
  }

  async deleteAllRead(): Promise<void> {
    await apiClient.delete<void>(`${this.BASE_PATH}/read`);
  }

  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ count: number }>(
      `${this.BASE_PATH}/unread-count`
    );
    return response.data.count;
  }

  async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<NotificationPreferences>(
      `${this.BASE_PATH}/preferences`
    );
    return response.data;
  }

  async updatePreferences(
    preferences: NotificationPreferences
  ): Promise<NotificationPreferences> {
    const response = await apiClient.put<NotificationPreferences>(
      `${this.BASE_PATH}/preferences`,
      preferences
    );
    return response.data;
  }

  async subscribeToPush(subscription: PushSubscription): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/push/subscribe`, {
      subscription: subscription.toJSON(),
    });
  }

  async unSubscribeFromPush(endpoint: string): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/push/unsubscribe`, {
      endpoint,
    });
  }

  async sendTestNotification(): Promise<Notification> {
    const response = await apiClient.post<Notification>(
      `${this.BASE_PATH}/test`,
      {}
    );
    return response.data;
  }
}

export default new NotificationsService();
