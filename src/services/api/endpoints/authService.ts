import type {
  AuthCredentials,
  AuthResponse,
  ChangePasswordPayload,
  UpdateUserPayload,
  User,
  UserProfile,
} from "../../../types";
import apiClient from "../apiClient";

class AuthService {
  private readonly BASE_PATH = "/auth";

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.BASE_PATH}/login`,
      credentials
    );
    return response.data;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      `${this.BASE_PATH}/register`,
      userData
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/logout`);
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const response = await apiClient.post<{ accessToken: string }>(
      `${this.BASE_PATH}/refresh-token`,
      { refreshToken }
    );
    return response.data.accessToken;
  }

  async getCurrentUser(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>(`${this.BASE_PATH}/me`);
    return response.data;
  }

  async updateProfile(userId: string, data: UpdateUserPayload): Promise<User> {
    const response = await apiClient.put<User>(
      `${this.BASE_PATH}/users/${userId}`,
      data
    );
    return response.data;
  }

  async changePassword(data: ChangePasswordPayload): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/change-password`, data);
  }

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/forgot-password`, { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/reset-password`, {
      token,
      newPassword,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/verify-email`, { token });
  }

  async resendVerificationEmail(email: string): Promise<void> {
    await apiClient.post<void>(`${this.BASE_PATH}/resend-verification`, {
      email,
    });
  }
}

export default new AuthService();
