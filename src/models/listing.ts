import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { ListingState } from "../enums/listing-state.enum";
import { User } from "./user.model";

@Entity()
export class Listing extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @ManyToOne(() => User, user => user.listings)
    user!: User;
    
    @Column({
      type: "enum",
      enum: ListingState
    })
    state!: ListingState;

}