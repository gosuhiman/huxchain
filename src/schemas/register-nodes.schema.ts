import Joi, {ObjectSchema} from "@hapi/joi";

export const RegisterNodesSchema: ObjectSchema = Joi.object({
  nodes: Joi.array().items(Joi.string()).required(),
});
