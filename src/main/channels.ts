'use strict';

const channelRegexp: RegExp = /^\w{2,16}$/

import { User } from "./users"

export abstract class Channel {
    readonly name: string
    readonly owner: User
    private readonly users: User[] = [];
    protected constructor (name: string, owner: User) {
        this.name = name
        this.owner = owner
        this.users.push(owner)
    }
}

class ChannelImpl extends Channel {
    constructor (name: string, owner: User) {
        super(name, owner)
    }
}

export class ChannelManager {
    private readonly channelMap: Map<string,Channel> = new Map();

    createChannel(name: string, owner: User): Channel|undefined {
        let channel = channelRegexp.test(name) ? new ChannelImpl(name, owner) : undefined
        if (channel) this.channelMap.set(name, channel)
        return channel
    }

    channels(): Channel[] {
        return Array.from(this.channelMap.values())
    }

    channel(name: string): Channel|undefined {
        return this.channelMap.get(name)
    }

}
