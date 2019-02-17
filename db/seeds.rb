# frozen_string_literal: true

require 'date'

now = DateTime.now.strftime('%s').to_i # "1384526946" (seconds)
shift_start = now + 604800 # one week ahead
shift_end = shift_start + 1800 # half hour ahead
HH = 1800
H = HH * 2

User.destroy_all
User.create([
              {
                name: 'Dean Glueckler',
                role: 1,
                email: 'dglu@snailmail.com',
                password: 'password'
              },
              {
                name: 'Tommy Greenthumb',
                role: 1,
                email: 'tg@doubletime.com',
                password: 'password'
              },
              {
                name: 'Jeez Williams',
                role: 2,
                email: 'jeez@doubletime.com',
                password: 'password'
              },
              {
                name: 'Billy Gates',
                role: 2,
                email: 'bill@doubletime.com',
                password: 'password'
              }
            ])

Shift.destroy_all
Shift.create([
               {
                 user_id: 1,
                 employee_id: 3,
                 start: shift_start,
                 end: shift_end,
                 confirmed: false,
               },
               {
                 user_id: 1,
                 employee_id: 3,
                 start: shift_start + H,
                 end: shift_end + H + HH,
                 confirmed: false
               }
             ])
