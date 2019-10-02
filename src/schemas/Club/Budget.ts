import { Document, Schema, Model, model } from "mongoose";
import { ObjectID } from "bson";
import Club, { IClubSchema } from "../Club";

/**
 * @description User 요구 데이터
 */
export interface IBudget {
	club: ObjectID;
	item: string; // 물건 이름
	size: string; // 규격
	price: number; // 가격
	url: string; // URL
	quantity: number; // 개수
	shipping: number; // 배송비
}
/**
 * @description User 스키마에 대한 메서드 ( 레코드 )
 */
export interface IBudgetSchema extends IBudget, Document {
	removeThis(): Promise<IClubSchema>;
}
/**
 * @description User 모델에 대한 정적 메서드 ( 테이블 )
 */
export interface IBudgetModel extends Model<IBudgetSchema> {}

const IBudgetSchema: Schema = new Schema({
	club: { type: ObjectID, required: true },
	item: { type: String, default: "" },
	size: { type: String, default: "" },
	price: { type: Number, default: "" },
	url: { type: String, default: "" },
	quantity: { type: Number, default: "" },
	shipping: { type: Number, default: "" }
});

IBudgetSchema.methods.removeThis = function(this: IBudgetSchema): Promise<IClubSchema> {
	return new Promise<IClubSchema>((resolve, reject) => {
		Club.findByID(this.club)
			.then(club => {
				club.removeBudget(this)
					.then(club => {
						resolve(club);
					})
					.catch(err => reject(err));
			})
			.catch(err => reject(err));
	});
};

export default model<IBudgetSchema>("Budget", IBudgetSchema) as IBudgetModel;
