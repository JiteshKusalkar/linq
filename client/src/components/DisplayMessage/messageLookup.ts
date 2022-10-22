import { MessageLookup, MessageOwner, MessageType } from "./types";

const messageBgLookup: MessageLookup = {
  [MessageOwner.OWN]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#92d242",
    [MessageType.NICK]: "#92d242",
    [MessageType.THINK]: "",
  },
  [MessageOwner.OTHER]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#e5e5e5",
    [MessageType.NICK]: "#e5e5e5",
    [MessageType.THINK]: "",
  },
};

const messageLookup: MessageLookup = {
  [MessageOwner.OWN]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#000000",
    [MessageType.NICK]: "#000000",
    [MessageType.THINK]: "",
  },
  [MessageOwner.OTHER]: {
    [MessageType.FADED]: "",
    [MessageType.HIGHLIGHT]: "",
    [MessageType.REGULAR]: "#000000",
    [MessageType.NICK]: "#000000",
    [MessageType.THINK]: "",
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
