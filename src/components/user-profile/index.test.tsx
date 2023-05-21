/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserProfile from '.';
import usersReducer from '../../store/reducers/users-reducer';

const mockUser = {
  id: 1,
  display_name: "Test User",
  profile_image: "https://example.com/test.jpg",
  reputation: 100,
  isFollowed: false,
  isBlocked: false
};

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

describe("UserProfile component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(
      <Provider store={store}>
        <UserProfile user={mockUser} />
      </Provider>
    );

    // Check if user display name is rendered
    expect(getByText("Test User")).toBeInTheDocument();
  });
});
