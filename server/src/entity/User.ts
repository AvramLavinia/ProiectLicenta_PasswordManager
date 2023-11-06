import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Password } from "./Password";

@Entity() //tabela din db
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  auth2token: string;

  @OneToMany(() => Password, (photo) => photo.user)
  passwords: Password[];
}
