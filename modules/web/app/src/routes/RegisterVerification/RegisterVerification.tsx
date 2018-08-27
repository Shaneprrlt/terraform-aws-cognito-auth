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

import * as React from "react"
import {
  branch,
  compose,
  lifecycle,
  pure,
  renderComponent
} from "recompose"

import { RegisterVerificationRequest } from "common"
import { Loading } from "components"
import {
  withFormSubmit,
  WithFormSubmit
} from "enhancers"

import { RegisterVerificationSuccess } from "./RegisterVerificationSuccess"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Render properties
 */
export type RenderProps =
  & WithFormSubmit<RegisterVerificationRequest>

/* ----------------------------------------------------------------------------
 * Presentational component
 * ------------------------------------------------------------------------- */

/**
 * Render component
 */
export const Render: React.SFC<RenderProps> =
  () => <Loading />

/* ----------------------------------------------------------------------------
 * Enhanced component
 * ------------------------------------------------------------------------- */

/**
 * Registration verification component
 */
export const RegisterVerification =
  compose<RenderProps, {}>(
    withFormSubmit<RegisterVerificationRequest>({
      message: "You have successfully verified your email address. " +
               "Use your email address and password to sign in to your account"
    }),
    lifecycle<RenderProps, {}>({
      componentDidMount() {
        const { submit } = this.props
        return submit()
      }
    }),
    branch<WithFormSubmit<RegisterVerificationRequest>>(
      ({ form }) => form.success || Boolean(form.err),
      renderComponent(RegisterVerificationSuccess)
    ),
    pure
  )(Render)
