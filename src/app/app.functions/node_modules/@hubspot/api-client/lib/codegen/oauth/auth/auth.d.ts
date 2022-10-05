import { RequestContext } from "../http/http";
export interface SecurityAuthentication {
    getName(): string;
    applySecurityAuthentication(context: RequestContext): void | Promise<void>;
}
export interface TokenProvider {
    getToken(): Promise<string> | string;
}
export declare type AuthMethods = {
    "default"?: SecurityAuthentication;
};
export declare type ApiKeyConfiguration = string;
export declare type HttpBasicConfiguration = {
    "username": string;
    "password": string;
};
export declare type HttpBearerConfiguration = {
    tokenProvider: TokenProvider;
};
export declare type OAuth2Configuration = {
    accessToken: string;
};
export declare type AuthMethodsConfiguration = {
    "default"?: SecurityAuthentication;
};
export declare function configureAuthMethods(config: AuthMethodsConfiguration | undefined): AuthMethods;
