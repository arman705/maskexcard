import request from "@/plugins/request";
export default {
  userLogin(data) {
    return request({
      url: "/anon/auth/validate",
      method: "post",
      data,
    });
  },
  addSysUsers(data) {
    return request({
      url: "/sysUsers/add",
      method: "put",
      data,
    });
  },
  sysUsersUpdate(data) {
    return request({
      url: "/sysUsers/update",
      method: "post",
      data,
    });
  },
  sysUsersList(params) {
    return request({
      url: "/sysUsers/list",
      params,
    });
  },
  sysUsersDetail(recordId) {
    return request({
      url: `/sysUsers/detail/${recordId}`,
    });
  },
  sysUsersDel(recordId) {
    return request({
      url: `/sysUsers/${recordId}`,
      method: "DELETE",
    });
  },
  sysUsersRole(params) {
    return request({
      url: "/sysUsers/role/optionList",
      params,
    });
  },
  saveUserRole(data) {
    return request({
      url: "/sysUsers/saveUserRole",
      method: "post",
      data,
    });
  },
  queryUserRole(params) {
    return request({
      url: "/sysUsers/queryUserRole",
      params,
    });
  },
  sysRolesList(params) {
    return request({
      url: "/sysRoles/list",
      params,
    });
  },
  sysRolesAdd(data) {
    return request({
      url: "/sysRoles/add",
      method: "post",
      data,
    });
  },
  sysRolesUpdate(data) {
    return request({
      url: "/sysRoles/update",
      method: "post",
      data,
    });
  },
  sysRolesDelete(recordId) {
    return request({
      url: `/sysRoles/${recordId}`,
      method: "DELETE",
    });
  },
  menuTree(params) {
    return request({
      url: `sysRoles/showTree`,
      params,
    });
  },
  queryRoleEnt(params) {
    return request({
      url: `/sysRoles/queryRoleEnt`,
      params,
    });
  },
  updateUserTree(params) {
    return request({
      url: `sysRoles/showTree`,
      params,
    });
  },
  sysRolesDist(data) {
    return request({
      url: "/sysRoles/dist",
      method: "post",
      data,
    });
  },
  sysEntsList(params) {
    return request({
      url: `/sysEnts/list`,
      params,
    });
  },
  sysMsgList(params) {
    return request({
      url: `/sysMsg/list`,
      params,
    });
  },
  sysMsgAdd(data) {
    return request({
      url: `/sysMsg/add`,
      method: "PUT",
      data,
    });
  },
  sysMsgUpdate(data) {
    return request({
      url: `/sysMsg/update`,
      method: "POST",
      data,
    });
  },
  ssysMsgDelete(recordId) {
    return request({
      url: `/sysMsg/${recordId}`,
      method: "DELETE",
    });
  },
  sysEntsAdd(data) {
    return request({
      url: "/sysEnts/add",
      method: "put",
      data,
    });
  },
  sysEntsUpdate(data) {
    return request({
      url: "/sysEnts/update",
      method: "POST",
      data,
    });
  },
  sysAuthInfo() {
    return request({
      url: "/sysAuth/info",
    });
  },
  getCodeAndSecret() {
    return request({
      url: "/sysAuth/getCodeAndSecret",
    });
  },
  sysAuthBind(data) {
    return request({
      url: "/sysAuth/bind",
      method: "POST",
      data,
    });
  },
  sysAuthCancelBind(data) {
    return request({
      url: "/sysAuth/cancelBind",
      method: "POST",
      data,
    });
  },
  sysLogList(params) {
    return request({
      url: "/sysLog/list",
      params,
    });
  },
  loginTypePpdate(data) {
    return request({
      url: "/sysAuth/loginType/update",
      method: "post",
      data,
    });
  },
  getPermissionList() {
    return request({
      url: "/current/getPermissionList",
    });
  },
  getPermissionTree() {
    return request({
      url: "/current/getPermissionTree",
    });
  },
  dictList(params) {
    return request({
      url: "/dict/list",
      params,
    });
  },
  dictAdd(data) {
    return request({
      url: "/dict/add",
      method: "post",
      data,
    });
  },
  dictUpdate(data) {
    return request({
      url: "/dict/update",
      method: "post",
      data,
    });
  },
  dictDelete(data) {
    return request({
      url: "/dict/delete",
      method: "post",
      data,
    });
  },
  userRegister(data) {
    //"/user/add"
    return request({
      url: "/anon/auth/register",
      method: "post",
      data,
    });
  },
  userInfo(data) {
    return request({
      url: "/current/user",
      data,
    });
  },
  vercode(data) {
    return request({
      url: "/current/getCodeAndSecret",
      data,
    });
  },
  bindCode(data) {
    return request({
      url: "/current/bind",
      method: "post",
      data,
    });
  },
  cancelBind(data) {
    return request({
      url: "/current/cancelBind",
      method: "post",
      data,
    });
  },
  edtUser(params) {
    return request({
      url: "/current/user",
      method: "put",
      params,
    });
  },
  sendEmail(data) {
    return request({
      url: "/anon/auth/sendEmail",
      method: "post",
      data,
    });
  },
  modifyPwdByEmail(params) {
    return request({
      url: "/anon/auth/modifyPwdByEmail",
      method: "put",
      params,
    });
  },
  modifyEmail(params) {
    return request({
      url: "/current/modifyEmail",
      method: "put",
      params,
    });
  },
  updateKey(data) {
    return request({
      url: "/current/modifyApiKey",
      method: "post",
      data,
    });
  },
  geyApiKey(params) {
    return request({
      url: "/current/geyApiKey",
      params,
    });
  },
  modifyPwd(data) {
    return request({
      url: "/current/modifyPwd",
      method: "put",
      data,
    });
  },
  sysEntsDel(id) {
    return request({
      url: `/sysEnts/${id}`,
      method: "DELETE",
    });
  },
};
