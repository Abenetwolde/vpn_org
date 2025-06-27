import { toast } from "sonner";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse | null> {
    try {
      const response = await fetch("https://gashasystem.insa.gov.et:4000/vpn/auth-admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Login Failed", {
          description: errorData.message || "Invalid credentials",
        });
        return null;
      }

      const data: AuthResponse = await response.json();
      localStorage.setItem("authToken", data.token);
      return data;

    } catch (error) {
      toast.error("Error", {
        description: "An error occurred during login. Please try again.",
      });
      console.error("Login error:", error);
      return null;
    }
  },

  logout(): void {
  localStorage.removeItem("authToken");
  window.location.href = "/login"; 
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }
};