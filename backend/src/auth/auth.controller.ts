import { Controller, Get, Post, Param, Body, Req, Res, Query, UseGuards, Redirect } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) { }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/callback/google
  @Get('callback/google')
  @UseGuards(GoogleAuthGuard)
  @Redirect(`/data`, 301)
  async handleCallback(@Req() request: Request, @Res() res: Response) {
    const details = request.user;
    console.log("details : ", details);
    return { url: `${process.env.DB_FRONTEND}/data?details=${JSON.stringify(details)}` };
  }

  @Post('users/:email')
  async updateUserRole(@Body() body: { role: string, email: string }) {
    try {
      const updatedUser = await this.authService.updateUserRole(body.email, body.role);
      console.log('updatedUser : ', updatedUser);
      return { message: 'Role updated successfully', user: updatedUser };
    } catch (error) {
      return { message: 'Failed to update role', error: error.message };
    }
  }


  @Get('user')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: request.user };
    } else {
      return { msg: null };
    }
  }
}
