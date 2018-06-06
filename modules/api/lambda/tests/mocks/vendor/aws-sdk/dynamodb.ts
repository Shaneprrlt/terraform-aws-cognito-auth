/*
 * Copyright (c) 2018 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { Callback } from "aws-lambda"
import { mock, restore } from "aws-sdk-mock"

import { VerificationCode } from "~/verification"

import { mockVerificationCode } from "_/mocks/verification"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mock DynamoDB.DocumentClient.put
 *
 * @param promise - Promise returned by Cognito
 *
 * @return Jasmine spy
 */
function mockDynamoDBDocumentClientPut(spy: jasmine.Spy) {
  mock("DynamoDB.DocumentClient", "put", (data: any, cb: Callback) => {
    cb(undefined, spy(data))
  })
  return spy
}

/**
 * Mock DynamoDB.DocumentClient.put returning with success
 *
 * @return Jasmine spy
 */
export function mockDynamoDBDocumentClientPutWithSuccess() {
  return mockDynamoDBDocumentClientPut(
    jasmine.createSpy("put"))
}

/**
 * Mock DynamoDB.DocumentClient.put throwing an error
 *
 * @param err - Error to be thrown
 *
 * @return Jasmine spy
 */
export function mockDynamoDBDocumentClientPutWithError(
  err: Error = new Error("mockDynamoDBDocumentClientPutWithError")
): jasmine.Spy {
  return mockDynamoDBDocumentClientPut(
    jasmine.createSpy("put")
      .and.callFake(() => { throw err }))
}

/**
 * Restore DynamoDB.DocumentClient.put
 */
export function restoreDynamoDBDocumentClientPut() {
  restore("DynamoDB.DocumentClient", "put")
}

/* ------------------------------------------------------------------------- */

/**
 * Mock DynamoDB.DocumentClient.delete
 *
 * @param promise - Promise returned by Cognito
 *
 * @return Jasmine spy
 */
function mockDynamoDBDocumentClientDelete(spy: jasmine.Spy) {
  mock("DynamoDB.DocumentClient", "delete", (data: any, cb: Callback) => {
    cb(undefined, spy(data))
  })
  return spy
}

/**
 * Mock DynamoDB.DocumentClient.delete returning with result
 *
 * @param code - Verification code
 *
 * @return Jasmine spy
 */
export function mockDynamoDBDocumentClientDeleteWithResult(
  code: VerificationCode = mockVerificationCode()
) {
  return mockDynamoDBDocumentClientDelete(
    jasmine.createSpy("delete")
      .and.returnValue({
        Attributes: code
      }))
}

/**
 * Mock DynamoDB.DocumentClient.delete returning with no result
 *
 * @return Jasmine spy
 */
export function mockDynamoDBDocumentClientDeleteWithoutResult() {
  return mockDynamoDBDocumentClientDelete(
    jasmine.createSpy("delete")
      .and.returnValue({}))
}

/**
 * Mock DynamoDB.DocumentClient.delete throwing an error
 *
 * @param err - Error to be thrown
 *
 * @return Jasmine spy
 */
export function mockDynamoDBDocumentClientDeleteWithError(
  err: Error = new Error("mockDynamoDBDocumentClientDeleteWithError")
): jasmine.Spy {
  return mockDynamoDBDocumentClientDelete(
    jasmine.createSpy("delete")
      .and.callFake(() => { throw err }))
}

/**
 * Restore DynamoDB.DocumentClient.delete
 */
export function restoreDynamoDBDocumentClientDelete() {
  restore("DynamoDB.DocumentClient", "delete")
}
