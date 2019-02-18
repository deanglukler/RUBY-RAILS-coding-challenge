# DoubleTime

### Dependancies
1. psql
2. ruby-2.6.1
3. node 8

### Set up locally

1. clone project
2. bundle install
3. rake db:init
4. rails db:migrate && rails db:seed
5. cd client && npm i
6. start developing (either "rake start", or "npm run start:dev")


### If I had more time..

I would figure out the best way to namespace the api if 

Reminder to update ruby before starting a project

Don't return password_digest when queerying users

Run project for development: rake start

Test deployment (on local machine): rake start:production

### Boring Stuff

* Ruby version: 2.6.1



