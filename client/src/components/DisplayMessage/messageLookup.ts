import { MessageLookup, MessageOwner, MessageType } from "./types";

const messageBgLookup: MessageLookup = {
  [MessageOwner.OWN]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#92d242",
    [MessageType.NICK]: "#92d242",
    [MessageType.THINK]: "#92d242",
    [MessageType.OOPS]: "#92d242",
    [MessageType.COUNTDOWN]: "#92d242",
  },
  [MessageOwner.OTHER]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#e5e5e5",
    [MessageType.NICK]: "#e5e5e5",
    [MessageType.THINK]: "#e5e5e5",
    [MessageType.OOPS]: "#e5e5e5",
    [MessageType.COUNTDOWN]: "#e5e5e5",
  },
};

const messageLookup: MessageLookup = {
  [MessageOwner.OWN]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#000000",
    [MessageType.NICK]: "#000000",
    [MessageType.THINK]: "#666666",
    [MessageType.OOPS]: "#000000",
    [MessageType.COUNTDOWN]: "#000000",
  },
  [MessageOwner.OTHER]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#000000",
    [MessageType.NICK]: "#000000",
    [MessageType.THINK]: "#666666",
    [MessageType.OOPS]: "#000000",
    [MessageType.COUNTDOWN]: "#000000",
  },
};

export function buildColorLookupByOwner(owner: MessageOwner) {
  const lookup = messageLookup[owner];

  function getColorByMessageType(type: MessageType) {
    return lookup[type];
  }

  return getColorByMessageType;
}

export function buildBgColorLookupByOwner(owner: MessageOwner) {
  const lookup = messageBgLookup[owner];

  function getBgColorByMessageType(type: MessageType) {
    return lookup[type];
  }

  return getBgColorByMessageType;
}
