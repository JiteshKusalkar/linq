import { v4 as uuidV4 } from "uuid";

function generateID() {
  return uuidV4();
}

export default generateID;
