import { Controller, HttpCode, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "src/core/common/dtos/login.dto";
import { AccountService } from "src/infrastructure/services/account.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/core/services/user.service";
import { UserDto } from "src/core/common/dtos/user.dto";

@ApiTags("Account")
@Controller("api")
export class AccountController {
    constructor(private readonly accountService: AccountService,
        private readonly userService: UserService) { }

    @Post("signin")
    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    async login(@Body() model: LoginDto): Promise<any> {
        return await this.accountService.login(model);
    }

    @Post("signup")
    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    async create(@Body() model: UserDto) : Promise<string> {
        return await this.userService.create(model)
    }
}