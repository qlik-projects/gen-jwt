export const connectQlikApp = async (config, csrfTokenInfo) => {
    // setup socket connection to Qlik Application
    const url = `wss://${config.tenantDomain}/app/${config.appId}?qlik-web-integration-id=${config.qlikWebIntegrationId}&qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;
    console.log("4 ok");
    // fetch schema for communicating with Qlik's engine API
    const schema = await fetch("https://cdn.jsdelivr.net/npm/enigma.js/schemas/12.936.0.json").then(response => response.json());
    
    // create qlik engine session
    const session = window.enigma.create({ schema, url });
    console.log("5 ok");

    // open the app
    const app = await (await session.open()).openDoc(config.appId);
    console.log("6 ok");
    
    return { app };
  }