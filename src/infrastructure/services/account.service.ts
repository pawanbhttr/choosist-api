import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/core/entities/user.entity';
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/core/common/dtos/login.dto';

@Injectable()
export class AccountService {
    constructor(    
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        var user = await this.usersRepository.findOneBy({username: username})
        if (user?.password == password) {
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async login(model: LoginDto) {
        const user = await this.validateUser(model.username, model.password);
        const payload = { username: user.username, sub: user.id };
        return {
            username: user.username,
            access_token: this.jwtService.sign(payload),
        };
    }
}
