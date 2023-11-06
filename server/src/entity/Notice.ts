import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity() //tabela din db
export class Notice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ name: "user" })
  userId: string;

  @ManyToOne(() => User, (user) => user.passwords)
  @JoinColumn({ name: "user" })
  user: User;
}
