import { auth } from './auth.js'
import { configuration } from './configuration.js'
import { connectQlikApp } from './connectQlikApp.js'

(async () => {

  const { config, csrfTokenInfo } =  await auth()
  
  //add page content
  let mainTag = document.getElementsByTagName("main");
  
  //Embed chart using Nebula.js
  // connect to a Qlik Sense application
  const { app } = await connectQlikApp(config, csrfTokenInfo)
  // create renderer
  const renderer = window.stardust.embed(app, configuration);
  // render toolbar
  (await renderer.selections()).mount(document.querySelector(".toolbar"));
  
  // render chart
  renderer.render({
    type: 'combochart',
    element: document.querySelector("#bar"),
    fields: [],
    properties: {
      title: "Nebula Bar Chart example",
      subtitle: "This example shows data fetched from a Qlik app rendered as a bar chart using Nebula."
    }
  });
  //<iframe src="https://lidiane.us.qlikcloud.com/single/?appid=1de5d0d5-15cf-47f3-8fdc-f62b75eaf2d3&sheet=3608477d-aee8-43a7-b855-ed65f653dfed&theme=horizon&opt=ctxmenu,currsel" style="border:none;width:100%;height:100%;"></iframe>
  //embed chart using single API iframe
  let iframeSrc = `https://${config.tenantDomain}/single/?appid=${config.appId}&obj=DJJsNqX&theme=horizon&opt=ctxmenu,currsel
  &qlik-web-integration-id=${config.qlikWebIntegrationId}
  &qlik-csrf-token=${csrfTokenInfo.headers.get("qlik-csrf-token")}`;
  
  let iframe = document.createElement("iframe");
  iframe.src = iframeSrc;
  iframe.classList.add("iframeStyle");
  document.querySelector("#iframe").appendChild(iframe);
  
  //embed response from a REST API
  let rest = await fetch(`https://${config.tenantDomain}/api/v1/users/me`,
  {
    credentials: "include",
      headers: {
        "Qlik-Web-Integration-ID": config.qlikWebIntegrationId
      }
  }).then(response => response.json());
  
  rest = JSON.stringify(rest, null, 4);
  
  document.querySelector("#rest").innerHTML = rest;
  
  
})();

