import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Listing } from "./listing";
import { ListingState } from "../enums/listing-state.enum";
import { UserRole } from "../enums/user-role.enum";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({
      type: "enum",
      enum: UserRole
    })
    role!: UserRole;

    @OneToMany(() => Listing, listing => listing.user)
    listings!: Listing[];
}