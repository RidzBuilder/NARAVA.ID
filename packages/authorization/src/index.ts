export type Role = "ADMIN" | "SUPPLIER" | "RESELLER";
export interface AuthorizationContext {
  userId:string;
  organizationId:string;
  role:Role;
  permissions:readonly string[];
  resourceOwnerId?:string;
  currentState?:string;
  capability:string;
}
export function authorize(context:AuthorizationContext):boolean {
  return context.userId.length>0 &&
    context.organizationId.length>0 &&
    context.permissions.includes(context.capability) &&
    (!context.resourceOwnerId || context.resourceOwnerId === context.organizationId);
}
