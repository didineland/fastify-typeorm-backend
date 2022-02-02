import { UserRole } from "../enums/user-role.enum";

export class ScopeUtils {
  static async isAdmin(request: any, reply: any) {
    ScopeUtils.checkScope(request, reply, UserRole.Admin)
  }

  static async isSponsor(request: any, reply: any) {
    ScopeUtils.checkScope(request, reply, UserRole.Sponsor)
  }

  static async isInvestor(request: any, reply: any) {
    ScopeUtils.checkScope(request, reply, UserRole.Investor)
  }

  static checkScope(request: any, reply: any, role: UserRole) {
    if(role.localeCompare(request?.user?.role) != 0) {
      reply.code(403).send();
    }
  }
}