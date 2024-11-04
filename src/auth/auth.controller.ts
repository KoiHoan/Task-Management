import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Logger } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController', { timestamp: true });
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.verbose(
      `User "${authCredentialsDto.username}" signing up. Data: ${JSON.stringify(
        authCredentialsDto,
      )}`,
    );
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `User "${authCredentialsDto.username}" signing in. Data: ${JSON.stringify(
        authCredentialsDto,
      )}`,
    );
    return this.authService.signIn(authCredentialsDto);
  }
}
