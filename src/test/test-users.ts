'use strict';

import { User, Email } from "../main/users"
import 'mocha'

let assert = require('assert')

describe('Email', function() {
    describe('valueOf', function() {
        ['', 'no-at-sign', 'foo@tldonly', 'invälidChäräcters#%&@foo.bar'].forEach(input => {
            it('should return undefined on invalid input: ' + input, function() {
                let email = Email.valueOf(input)
                assert.equal(email, undefined)
            })
        });

        ['somedude@foo.bar', 'some.dude@foo.bar', 'some+dude@foo.bar.bar', 'CAPITALIZED@UPPER.CASE'].forEach(input => {
            it('should return email on valid input: ' + input, function() {
                let email = Email.valueOf(input)
                assert.notEqual(email, undefined)
            })
        });
    })
})

describe('User', function() {
    
})