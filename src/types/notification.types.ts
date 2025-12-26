import type { Timestamp, UUID } from "./common.types";

export type NotificationTypes = "info" | "success" | "warning" | "error";
export type NotificationCategory =
  | "system"
  | "project"
  | "user"
  | "report"
  | "alert";

export interface Notification {
  id: UUID;
  userId: UUID;
  type: NotificationTypes;
  category: NotificationCategory;
  title: string;
  message: string;
  isRead: boolean;
  actionURL?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
  createdAt: Timestamp;
  readAt?: Timestamp;
}

type NotificationChannel = "email" | "push" | "inApp";

export type NotificationPreferences = Record<
  NotificationChannel,
  {
    enabled: boolean;
    categories: NotificationCategory[];
  }
>;

// export interface NotificationPreferences {
//   email: {
//     enabled: boolean;
//     categories: NotificationCategory[];
//   };
//   push: {
//     enabled: boolean;
//     categories: NotificationCategory[];
//   };
//   inApp: {
//     enabled: boolean;
//     categories: NotificationCategory[];
//   };
// }

export interface CreateNotificationPayload {
  usedId: UUID;
  type: NotificationTypes;
  category: NotificationCategory;
  title: string;
  message: string;
  actionURL?: string;
  actionLabel?: string;
  metadata?: Record<string, unknown>;
}
