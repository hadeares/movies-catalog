import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(
        private userService: UsersService,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET', 'defaultSecretKey'),
        });
    }

    async validate(payload: any) {
        this.logger.log(`Validando JWT para ID de usuário: ${payload.sub}`);
        const user = await this.userService.findOne(payload.userId);
        if (!user) {
            this.logger.error(`Usuário não encontrado com ID: ${payload.userId}`);
            throw new UnauthorizedException('Usuário não encontrado');
        }
        this.logger.log(`Usuário validado com sucesso: ${user.username}`);
        return user;
    }
}
