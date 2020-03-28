import { Component, OnInit } from '@angular/core';
import { EventBus } from '../shared/services/event-bus.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    notification: string = 'notification';
    active: boolean = false;

    constructor(private eventBus: EventBus) {}

    ngOnInit(): void {
        this.eventBus.on('notification', (ntf) => {
            this.notification = ntf;
            this.active = true;
        });
    }

    done() {
        this.active = false;
    }

}
