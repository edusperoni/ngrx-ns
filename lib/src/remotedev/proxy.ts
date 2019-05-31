import { RemoteDev } from './remotedev';
import { RemoteDevToolsProxyOptions } from './model';
import { Injectable, InjectionToken, Optional, Inject, NgZone } from '@angular/core';
import { ReduxDevtoolsExtensionConnection, ReduxDevtoolsExtension, ReduxDevtoolsExtensionConfig } from '@ngrx/store-devtools/src/extension';

export const REMOTE_DEVTOOLS_PROXY_OPTIONS = new InjectionToken<RemoteDevToolsProxyOptions>('RemoteDevToolsProxyOptions');

export class RemoteDevToolsConnectionProxy implements ReduxDevtoolsExtensionConnection {

    constructor(
        private remotedev: RemoteDev,
        private instanceId: string,
        private ngZone: NgZone
    ) { }

    public subscribe(listener: (change: any) => void): void {
        const listener2 = (change: any) => { this.ngZone.run(() => listener(change)) };
        this.remotedev.subscribe(listener2);
    }

    public unsubscribe(): () => void {
        return () => this.remotedev.unsubscribe();
    }

    public send(action: any, state: any): void {
        this.remotedev.send(action, state);
    }

    public init(state?: any): void {
        this.remotedev.init(state);
    }

    public error(any: any): void {
        this.remotedev.error(any);
    }

}

@Injectable()
export class RemoteDevToolsProxy implements ReduxDevtoolsExtension {

    private remotedev = null;
    private options: RemoteDevToolsProxyOptions = {};

    constructor(
        @Optional() @Inject(REMOTE_DEVTOOLS_PROXY_OPTIONS) customOptions: RemoteDevToolsProxyOptions = {},
        private ngZone: NgZone
    ) {
        this.options = {
            realtime: true,
            hostname: 'localhost',
            port: 8000,
            autoReconnect: true,
            connectTimeout: 300000,
            ackTimeout: 120000,
            secure: false,
            ...customOptions
        };
    }

    public connect(options: ReduxDevtoolsExtensionConfig): any {
        const connectOptions = { ...this.options, options };

        this.remotedev = RemoteDev.getInstance(connectOptions);
        return new RemoteDevToolsConnectionProxy(this.remotedev, connectOptions.options.name, this.ngZone);
    }

    public send(action: any, state: any): void {
        this.remotedev.send(action, state);
    }

}