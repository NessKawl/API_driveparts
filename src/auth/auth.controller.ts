import { Controller, Post, Get, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/Usuario/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(ThrottlerGuard)
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @Post('register')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUser(createUserDto)
    }

    @UseGuards(ThrottlerGuard, AuthGuard('local'))
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Body() loginDto: LoginDto) {
        return this.authService.login(req.user);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }
}
