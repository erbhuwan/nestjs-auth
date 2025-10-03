import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  lastLoginAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  refreshToken: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties for API responses
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Helper method to check if user is active
  isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  // Helper method to check if user is admin
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}
