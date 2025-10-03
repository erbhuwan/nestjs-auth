import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserStatus } from './entities/user.entity';
import {
  RegisterDto,
  UpdateProfileDto,
  ChangePasswordDto,
} from '../auth/dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const { email, password, ...userData } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = this.configService.get<number>('bcrypt.rounds') || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...userData,
      email,
      password: hashedPassword,
      status: UserStatus.PENDING, // Require email verification in production
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      lastLoginAt: new Date(),
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken,
    });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      refreshToken: null,
    });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email is being changed and if it's already taken
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateProfileDto.email);
      if (existingUser) {
        throw new ConflictException('Email is already taken');
      }
    }

    await this.userRepository.update(userId, updateProfileDto);
    const updatedUser = await this.findById(userId);
    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }
    return updatedUser;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await this.validatePassword(
      user,
      changePasswordDto.currentPassword,
    );
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const saltRounds = this.configService.get<number>('bcrypt.rounds') || 12;
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      saltRounds,
    );

    await this.userRepository.update(userId, {
      password: hashedNewPassword,
    });
  }

  async activateUser(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      status: UserStatus.ACTIVE,
    });
  }

  async deactivateUser(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      status: UserStatus.INACTIVE,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'status',
        'createdAt',
        'lastLoginAt',
      ],
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);
  }
}
