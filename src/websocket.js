//const WS_URL = 'wss://redesign-backend-websocket.herokuapp.com/frontEnd'; //HEROKU
//const WS_URL = "ws://localhost:8080/frontEnd"; //LOCALHOST
const WS_URL ="ws://ec2-13-229-61-168.ap-southeast-1.compute.amazonaws.com:6565/frontEnd" //AWS
export const ws = new WebSocket(WS_URL);
