import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as authService from '../services/authService.js';

export const registerUser = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  return res.status(201).json(
    new ApiResponse(201, user, "User registered successfully")
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body.email, req.body.password);

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "User logged In Successfully"
      )
    );
});
