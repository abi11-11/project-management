import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = io('http://localhost:3000');

  constructor() {}

  listen(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  send(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
