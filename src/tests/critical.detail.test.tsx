import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskDetail from "../pages/todo/detail";
import { restApi } from "../context/http-request";
import { expect } from 'vitest';

const mockDispatch = vi.fn();
const mockState = { loading: false, updated: false };


vi.mock("../context", () => ({
  useGlobalContext: vi.fn(() => [mockState, { dispatch: mockDispatch }]),
}));



type PostRequestType = (data: any) => Promise<any>;

vi.mock('../context/http-request', () => ({
  restApi: {
    postRequest: vi.fn() as unknown as PostRequestType,
  },
}));

describe("TaskDetail Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    (restApi.postRequest as jest.Mock).mockClear(); 
  });

  test("renders TaskDetail component", () => {
    render(
      <MemoryRouter>
        <TaskDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Task Detail/i)).toBeTruthy(); 
    expect(screen.getByPlaceholderText(/Enter task title/i)).toBeTruthy(); 
    expect(screen.getByPlaceholderText(/Enter task description/i)).toBeTruthy(); 
  });

  test("validates title input", async () => {
    render(
      <MemoryRouter>
        <TaskDetail />
      </MemoryRouter>
    );

    const titleInput = screen.getByPlaceholderText(/Enter task title/i);
    fireEvent.change(titleInput, { target: { value: "Te" } });
    expect(await screen.findByText(/Title must be at least 3 characters long/i)).toBeTruthy(); 

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    expect(screen.queryByText(/Title must be at least 3 characters long/i)).toBeNull();
  });

  test("validates description input", async () => {
    render(
      <MemoryRouter>
        <TaskDetail />
      </MemoryRouter>
    );

    const descriptionInput = screen.getByPlaceholderText(/Enter task description/i);
    fireEvent.change(descriptionInput, { target: { value: "Test" } });
    expect(await screen.findByText(/Description must be at least 5 characters long/i)).toBeTruthy(); 

    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
    expect(screen.queryByText(/Description must be at least 5 characters long/i)).toBeNull(); 
  });

  test("calls API to update task on button click", async () => {
    (restApi.postRequest as jest.Mock).mockResolvedValueOnce({ updatedItem: true });

    render(
      <MemoryRouter>
        <TaskDetail />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter task title/i), {
      target: { value: "New Task Title" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter task description/i), {
      target: { value: "New Task Description" },
    });

    fireEvent.click(screen.getByText(/Update/i));

    await waitFor(() => {
      expect(restApi.postRequest).toHaveBeenCalledWith(
        "todo/update",
        expect.any(Object)
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "loading",
        payload: true,
      });
    });
  });

  test("navigates back on cancel", () => {
    render(
      <MemoryRouter>
        <TaskDetail />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    
  });
});
