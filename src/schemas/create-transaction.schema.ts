import Joi, {ObjectSchema} from "@hapi/joi";

export const TransactionSchema: ObjectSchema = Joi.object({
  sender: Joi.string().required(),
  recipient: Joi.string().required(),
  amount: Joi.number().greater(0).required(),
});

export const CreateTransactionSchema: ObjectSchema = TransactionSchema;
