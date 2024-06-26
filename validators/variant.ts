import type { Labeled } from '#types';
import { v, type Validator } from 'convex/values';

/**
	Deprecated fields are read-only fields. Since we stop writing to them, they can be optional.
*/
export function vDeprecated<$Type>(
	_message: string,
): Validator<
	| Labeled<NonNullable<$Type>, '__deprecated__'>
	| (null extends $Type ? null : never),
	true,
	string
> {
	const objectValidator = v.optional(v.any());
	// @ts-expect-error: internal property
	objectValidator.json.__deprecated = true;
	return objectValidator;
}

/**
	A newly added property, meaning that it can be optional.
*/
export function vNew<$Validator extends Validator<any, any, any>>(
	validator: $Validator,
): $Validator extends Validator<infer $TypeScriptType, any, infer $FieldPaths> ?
	Validator<
		| Labeled<$TypeScriptType, '__new__'>
		| undefined
		| (null extends $TypeScriptType ? null : never),
		true,
		$FieldPaths
	> :
	never
{
	const objectValidator = v.optional(v.any());
	// @ts-expect-error: internal property
	objectValidator.json.__new = true;
	return objectValidator as any;
}
