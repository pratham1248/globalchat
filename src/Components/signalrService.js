import { HubConnectionBuilder, LogLevel,HttpTransportType } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
class SignalRService {
    connection = null;
    m = '';
    async translate(message, source = "EN", target = "ES") {
        const apiKey = "V5oOIPhnL16hpuA1xHJf4ULZkgszvMkl";
        const url = `https://api.apilayer.com/language_translation/translate?source=${source}&target=${target}`;
    
        const myHeaders = new Headers();
        myHeaders.append("apikey", apiKey);
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
          q: message,
        });
    
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };
    
        try {
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          const translatedText = result.translations[0].translation;
          const jsonString = (translatedText);
          const jsonObject = JSON.parse(jsonString);
          const value = jsonObject.q;
          console.log(value);
          this.m = value; // Assign the translated text to class property m
      console.log(this.m);

      return this.m;
          //return value;
        } catch (error) {
          console.log('error', error);
          throw error;
        }
      }
    

    async startConnection(userId, groupId, connectionRef, onReceiveMessage,translate) {
        try {
            if (connectionRef.current) return; // Prevent multiple subscriptions
            connectionRef.current = new HubConnectionBuilder()
                .withUrl(`https://localhost:7029/chatHubA?userId=${userId}`, {
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .configureLogging(LogLevel.Information)
                .build();

            connectionRef.current.on("connected", async () => {
                console.log("Connection established");
                console.log("Group Id is ", groupId);
                //

                
            });

            connectionRef.current.on("ReceiveMessage", onReceiveMessage);

            connectionRef.current.on('sendMessage', (myId,message) => {
                console.log('Message received:', message);
                this.translate(message);
                const updatedmessage = this.m;
                onReceiveMessage(myId,updatedmessage) // Pass the message to the parent component or handler
              });

            await connectionRef.current.start();
            console.log("SignalR connection started");
            if(groupId)
                {
                    await this.joinGroup(connectionRef,groupId);
                    console.log("finished");
                }
        } catch (err) {
            console.error("Error while starting SignalR connection: ", err);
        }
    }

    async joinGroup(connectionRef,groupId) {
        console.log("call 1");
        if (connectionRef.current) {
            try {
                console.log("call 2");
                await connectionRef.current.invoke("JoinGroup", groupId);
                console.log("Group joined sucessfully");
            } catch (err) {
                console.error("Error joining group: ", err);
            }
        }
    }

    async stopConnection(connectionRef) {
        if (connectionRef.current && connectionRef.current.state === signalR.HubConnectionState.Connected) {
            connectionRef.current.off("ReceiveMessage");
            await connectionRef.current.stop();
            console.log("SignalR connection stopped");
        }
    }

    async sendMessage(connectionRef, loggedInUser,selectedUser, message) {
        if (connectionRef.current) {
            try {
                await connectionRef.current.invoke("SendMessage", loggedInUser,selectedUser, message);
            } catch (err) {
                console.error("Error sending message: ", err);
            }
        }
    }

    
}

const signalRService = new SignalRService();
export default signalRService;
