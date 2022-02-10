import { ServiceAgent } from '@norniras/service-agent';
import { TOKEN, CAMERA_SERVICE_URL, VIDEO_SERVICE_URL } from '../config.js';

export const videoServiceAgentInit = () => {
  const videoServiceAgent = new ServiceAgent({
    serviceUrl: VIDEO_SERVICE_URL,
    token: TOKEN,
    ghostId: 0
  });
  
  videoServiceAgent.listen(({ data }) => {
    if (typeof data !== 'undefined') {
      switch (data.EVENT) {
        case 'STREAMREQUEST':
          videoServiceAgent.sendCommand({
            targetUrl: CAMERA_SERVICE_URL,
            commandString: videoServiceAgent.getQueryStringFromObject({
              action: data.EVENT,
              camera_map_id: data.CAMERA_MAP_ID,
              socket_id: data.SOCKET_ID
            })
          });
          break;
      }
    }
  });
};
