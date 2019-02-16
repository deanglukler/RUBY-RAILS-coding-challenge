# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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
