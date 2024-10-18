import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import handler from './index';

describe('handler', () => {
  describe('GET request should remain untouched', () => {
    it('returns status 200', async () => {
      const response = (await handler(
        {
          queryStringParameters: {
            cardNumber: 'this should be ignored',
          },
        } as unknown as APIGatewayProxyEvent,
        undefined,
        undefined,
      )) as APIGatewayProxyResult & {
        data: unknown;
      };

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toEqual({
        empty: 'response',
      });
    });
  });

  describe('POST request should work', () => {
    it('returns the expected results when cardNumber is invalid', async () => {
      const response = (await handler(
        {
          httpMethod: 'POST',
          queryStringParameters: {
            cardNumber: '1111111111111111',
          },
        } as unknown as APIGatewayProxyEvent,
        undefined,
        undefined,
      )) as APIGatewayProxyResult;

      const body = JSON.parse(response.body);
      const expected = {
        cardNumber: '1111111111111111',
        isValid: false,
      };

      expect(response.statusCode).toBe(400);
      expect(body).toEqual(expected);
    });

    it('returns the expected results when cardNumber is valid', async () => {
      const response = (await handler(
        {
          httpMethod: 'POST',
          queryStringParameters: {
            cardNumber: '4242424242426742',
          },
        } as unknown as APIGatewayProxyEvent,
        undefined,
        undefined,
      )) as APIGatewayProxyResult;

      const body = JSON.parse(response.body);
      const expected = {
        cardNumber: '4242424242426742',
        isValid: true,
      };

      expect(response.statusCode).toBe(200);
      expect(body).toEqual(expected);
    });
  });
});
