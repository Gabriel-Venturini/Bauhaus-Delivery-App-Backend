import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from '../../user_profiles/entities/user_profiles.entity';

export enum AdminRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
}

@Entity('administrators')
export class Administrator {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({ type: 'enum', enum: AdminRole, default: AdminRole.ADMIN })
    role: AdminRole;

    @Column({ type: 'json', nullable: true })
    permissions?: object;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToOne(() => UserProfile, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_profile_id' })
    userProfile: UserProfile;
}