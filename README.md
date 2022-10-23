# LinQ: A chat app

## Prerequisite
**Node**: >= 16.14.0

**Yarn**: >= 1.23.0

## Environment variable setup:
### Server

Add `.env` file in the root directory of `/server`.

```
PORT=3001
CLIENT_ORIGIN=http://localhost:3000
```

### Client

Add `.env.local` file in the root directory of `/client`.

```
REACT_APP_SOCKET_SERVER=http://localhost:3001
```

## Starting the app
To start the app:
- run `yarn install` followed by `yarn start:dev` on `/server` directory
- run `yarn install` followed by `yarn start` on `/client` directory

## Using the app
Run the chat app on two different tabs. Enter name and room to begin the chat. **Please make sure the room name should be same to chat with the other person.**


## Features

When the user is typing, indication that they are typing is shown on the header next to the Headline.

When a new message arrives, it slides in, and the messages slide up.

## Commands:
- `/nick <name>` - sets your name for the chat
- `/think <message>` - makes the text appear in dark grey, instead of black
- `/oops` - removes the last message sent
- `/countdown <number> <url>` - would start a visible countdown on the other persons browser, and at the
end of the countdown redirect them to the URL

## Features not implemented:
- Restricting users in a room to 2.
- Smileys, `/fadelast` and `/highlight <message>` as these are similar to previous commands.



