import { type ApiTokenOut } from "../models/apiTokenOut";
import { type AppPortalAccessIn } from "../models/appPortalAccessIn";
import { type AppPortalAccessOut } from "../models/appPortalAccessOut";
import { type ApplicationTokenExpireIn } from "../models/applicationTokenExpireIn";
import { type RotatePollerTokenIn } from "../models/rotatePollerTokenIn";
import { type StreamPortalAccessIn } from "../models/streamPortalAccessIn";
import { type StreamTokenExpireIn } from "../models/streamTokenExpireIn";
import { type DashboardAccessOut } from "../models/dashboardAccessOut";
import { type SvixRequestContext } from "../request";
export interface AuthenticationAppPortalAccessOptions {
    idempotencyKey?: string;
}
export interface AuthenticationExpireAllOptions {
    idempotencyKey?: string;
}
export interface AuthenticationLogoutOptions {
    idempotencyKey?: string;
}
export interface AuthenticationStreamLogoutOptions {
    idempotencyKey?: string;
}
export interface AuthenticationStreamPortalAccessOptions {
    idempotencyKey?: string;
}
export interface AuthenticationStreamExpireAllOptions {
    idempotencyKey?: string;
}
export interface AuthenticationRotateStreamPollerTokenOptions {
    idempotencyKey?: string;
}
export interface AuthenticationDashboardAccessOptions {
    idempotencyKey?: string;
}
export declare class Authentication {
    private readonly requestCtx;
    constructor(requestCtx: SvixRequestContext);
    appPortalAccess(appId: string, appPortalAccessIn: AppPortalAccessIn, options?: AuthenticationAppPortalAccessOptions): Promise<AppPortalAccessOut>;
    expireAll(appId: string, applicationTokenExpireIn: ApplicationTokenExpireIn, options?: AuthenticationExpireAllOptions): Promise<void>;
    dashboardAccess(appId: string, options?: AuthenticationDashboardAccessOptions): Promise<DashboardAccessOut>;
    logout(options?: AuthenticationLogoutOptions): Promise<void>;
    streamLogout(options?: AuthenticationStreamLogoutOptions): Promise<void>;
    streamPortalAccess(streamId: string, streamPortalAccessIn: StreamPortalAccessIn, options?: AuthenticationStreamPortalAccessOptions): Promise<AppPortalAccessOut>;
    streamExpireAll(streamId: string, streamTokenExpireIn: StreamTokenExpireIn, options?: AuthenticationStreamExpireAllOptions): Promise<void>;
    getStreamPollerToken(streamId: string, sinkId: string): Promise<ApiTokenOut>;
    rotateStreamPollerToken(streamId: string, sinkId: string, rotatePollerTokenIn: RotatePollerTokenIn, options?: AuthenticationRotateStreamPollerTokenOptions): Promise<ApiTokenOut>;
}
