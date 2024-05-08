import React, { useRef } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';


function LiveStream() {
    const {roomId} = useParams();

    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
          maxPos = chars.length,
          i;
        len = len || 5;
        for (i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
      }
      

    let meeting = async function (element) {
        const appID = 1566566139;
        const serverSecret = 'f1a321f60467dde8776ebfb69379ef73';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), randomID(5));
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp?.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                // config: {
                //     role,
                // },
            },
            sharedLinks: {
                name: "Copy Link",
                Url: `localhost:5173/room/${roomId}`
            },
        });

    }
    return (
        <div ref={meeting}></div>
    )
}

export default LiveStream
