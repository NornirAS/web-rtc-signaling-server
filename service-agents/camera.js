import { ServiceAgent } from '@norniras/service-agent';
import { TOKEN, CAMERA_SERVICE_URL } from '../config.js';

export const cameraServiceAgentInit = () => {
  const cameraServiceAgent = new ServiceAgent({
    serviceUrl: CAMERA_SERVICE_URL,
    token: TOKEN,
    ghostId: 0
  });
  
  cameraServiceAgent.listen(({ command }) => {
    if (typeof command !== 'undefined') {
      switch (command.ACTION) {
        case 'STREAMREQUEST':
          cameraServiceAgent.sendData({
            ghostId: command.CAMERA_MAP_ID,
            dataString: cameraServiceAgent.getQueryStringFromObject({
              event: command.ACTION,
              socket_id: command.SOCKET_ID
            })
          });
          break;
      }
    }
  });
};