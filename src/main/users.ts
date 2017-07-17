'use strict';

import * as XRegExp from 'xregexp'
import * as Uuid from 'uuid'

const emailRegexp: RegExp = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/
const nameRegexp: RegExp = XRegExp('^[\\pL\\pN\\s]+$')
const validityHours: number = 2

function validityHoursFromNow(): Date {
    let time = new Date
    time.setHours(time.getHours() + validityHours)
    return time
}

export class Email {
    readonly address: string
    
    private constructor (address: string) {
        this.address = address;
    }

    static valueOf(address: string): Email|undefined {
        return emailRegexp.test(address) ? new Email(address) : undefined
    }

}

export abstract class User {
    readonly email: Email
    readonly name: string

    protected constructor(email: Email, name: string) {
        this.email = email
        this.name = name
    }
}

class UserImpl extends User {
    constructor(email: Email, name: string) {
        super(email, name)
    }
}

class RegistrationToken {
    constructor(
            readonly email: Email,
            readonly name: string,
            readonly channel: string,
            readonly validUntil: Date,
            readonly token: string
        ) {}
}

export class UserManager {
    private readonly userMap: Map<Email,User> = new Map()
    private readonly tokenMap: Map<string,RegistrationToken> = new Map()

    createUser(email: Email, name: string): User|undefined {
        let user = nameRegexp.test(name) ? new UserImpl(email, name) : undefined
        if (user) this.userMap.set(email, user)
        return user
    }

    user(email: Email): User|undefined {
        return this.userMap.get(email)
    }

    createToken(email: Email, name: string, channel: string) {
        let validUntil = validityHoursFromNow()
        let uuid = Uuid.v1()
        let registrationToken = new RegistrationToken(email, name, channel, validUntil, uuid)
        this.tokenMap.set(uuid, registrationToken)
        // TODO: return or email token?
    }
}


