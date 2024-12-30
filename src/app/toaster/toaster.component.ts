import { CommonModule } from '@angular/common';
import { Injectable, Component } from '@angular/core';

@Injectable({
  providedIn: 'root', // Make the toaster service available globally
})
export class ToasterService {
  private messages: { type: string; text: string }[] = [];

  addMessage(type: 'success' | 'warning' | 'error' | 'info', text: string) {
    this.messages.push({ type, text });
    setTimeout(() => this.removeMessage(this.messages[0]), 3000); // Auto-dismiss
  }

  getMessages() {
    return this.messages;
  }

  removeMessage(message: { type: string; text: string }) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }
}

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent {
  constructor(public toasterService: ToasterService) {}
}
