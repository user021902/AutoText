/* javascript program that reads a .vcf file and
 * then texts those people the message */

let vcard = require('vcard-json');
let shell = require('shelljs');

let CONTACT_FILE_PATH = './contacts.vcf'

let SCRIPT_PATH = "./autotext.sh"
shell.exec("chmod 555 " + SCRIPT_PATH);

// UNIQUE_CONTACT is replaced by first name
let MESSAGE = "Hey UNIQUE_CONTACT! What's up?";

function vcardParser() {
    vcard.parseVcardFile(CONTACT_FILE_PATH, function(err, data) {
      let contacts = {}; // key is contact, value is first name
      for (let i = 0; i < data.length; i += 1) {
          let contact = data[i];
          let name = contact.fullname;
          let personalname = "";

          // only bother putting in contacts if it's not empty
          if (name !== 'empty' && name !== 'First Name Last Name') {
              if (name.indexOf(" ") != -1) {
                personalname = name.split(" ")[0]; // get first name from contact name
                contacts[name] = personalname;
              }
              else {
                personalname = name;
                contacts[name] = name;
              }
            // message is sent to all names in contact list
            sendMessage(name, personalname);
          }
        }
  });
}

function sendMessage(name, personalname) {
  // more replacement can be done here
  let personalmessage = MESSAGE.replace("UNIQUE_CONTACT", personalname);

  let command = SCRIPT_PATH + " " + "\"" + personalmessage + "\"" + " " +  "\"" + name + "\""
  console.log("RUNNING: " + command);
  shell.exec(command);

}

vcardParser();
