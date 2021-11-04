import { DefaultRequestBody, MockedRequest, RequestHandler, RestHandler } from "msw";
import { mockGetWeather } from "./weather";

export const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [mockGetWeather]