import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity() //tabela din db
export class Password {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  platform: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ name: "user" })
  userId: string;

  @ManyToOne(() => User, (user) => user.passwords)
  @JoinColumn({ name: "user" })
  user: User;
}
