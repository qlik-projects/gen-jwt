const loginTypes = {
    INTERACTIVE_LOGIN: "interactive-login",
    JWT_LOGIN: "jwt-login"
  }
  
  module.exports = {
    loginTypes,
    currentLoginType: loginTypes.JWT_LOGIN,
    
    // We Integration ID (from Console Management)
    qlikWebIntegrationId: "ro5ZgIZ3Y5SIEwEsGWPPFEboew6tYqxt",
    
    //tenant and app access
    tenantDomain: "lidiane.us.qlikcloud.com", 
    appId: "1de5d0d5-15cf-47f3-8fdc-f62b75eaf2d3",
    sheetId: "3608477d-aee8-43a7-b855-ed65f653dfed",

    // token config - from  public cert config in Console Management
    issuer: "18mv0zej529uq0x.us.qlikcloud.com",
    keyid: "2717b0b6-2ef3-4ece-9c6d-5b124889ca8a"
  };
  