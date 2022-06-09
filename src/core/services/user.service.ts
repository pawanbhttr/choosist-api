import { Injectable } from "@nestjs/common";
import { UserDto } from "../common/dtos/user.dto";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async create(model: UserDto): Promise<string> {
      const user = new User();
      user.name = model.name;
      user.username = model.username;
      user.password = model.password;
      user.contactNo = model.contactNo;
      user.email = model.email;

      const createdUser = await this.userRepository.save(user);
      const {id} = createdUser;
      return id;
    }
}