// https://github.com/Urigo/graphql-scalars/blob/master/src/resolvers/EmailAddress.ts
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { GraphQLError } from 'graphql/error';

const EMAIL_ADDRESS_REGEX = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
);

@Scalar('Email')
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Date custom scalar type';

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError('Value is not string');
    }

    if (!EMAIL_ADDRESS_REGEX.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  }

  serialize(value: string): string {
    if (typeof value !== 'string') {
      throw new TypeError(`Value is not string: ${value}`);
    }

    if (!EMAIL_ADDRESS_REGEX.test(value)) {
      throw new TypeError(`Value is not a valid email address: ${value}`);
    }

    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as email addresses but got a: ${ast.kind}`,
      );
    }

    if (!EMAIL_ADDRESS_REGEX.test(ast.value)) {
      throw new TypeError(`Value is not a valid email address: ${ast.value}`);
    }

    return ast.value;
  }
}
