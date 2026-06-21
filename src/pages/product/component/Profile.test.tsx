import { render, screen, fireEvent } from "@testing-library/react";
import { Profile } from "./Profile";
import { AuthContext, type AuthContextType } from "../../../hooks/useAuth";
import { ShowContext, type ShowContextType } from "../../../hooks/useShow";
import { describe, it, expect, vi } from "vitest";

const mockAuthContext: AuthContextType = {
  user: { id: "123", app_metadata: {}, created_at: "2024-01-01T00:00:00Z", aud: "public", email: "test@example.com", confirmed_at: null, email_confirmed_at: null, phone: null, phone_confirmed_at: null, last_sign_in_at: null, role: "authenticated", user_metadata: {}, user_created_at: "2024-01-01T00:00:00Z" },
  loading: false,
};

const mockShowContext: ShowContextType = {
  showModal: false,
  showCart: false,
  showProfile: true,
  toggleShow: vi.fn(),
};

describe("Profile component", () => {
  it("renders user email and profile image", () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ShowContext.Provider value={mockShowContext}>
          <Profile userProfile="/test-image.png" setUserProfile={vi.fn()} />
        </ShowContext.Provider>
      </AuthContext.Provider>,
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("user-img")).toHaveAttribute("src", "/test-image.png");
  });

  it("calls toggleShow when Save button is clicked", () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ShowContext.Provider value={mockShowContext}>
          <Profile userProfile="/test-image.png" setUserProfile={vi.fn()} />
        </ShowContext.Provider>
      </AuthContext.Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(mockShowContext.toggleShow).toHaveBeenCalledWith("profile");
  });
});
