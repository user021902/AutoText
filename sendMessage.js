/* script that reads a .vcf file and
 * then texts those contacts the message
 *
 * Author: Alex Danilowicz, June-July 2019
 * github: https://github.com/alexdanilowicz
 */

let vcard = require('vcard-json');
let shell = require('shelljs');
let Confirm = require('prompt-confirm');

let CONTACT_FILE_PATH = './contacts.vcf'

// make sure script is readable
let SCRIPT_PATH = "./autotext.sh"
shell.exec("chmod 555 " + SCRIPT_PATH);

// UNIQUE_CONTACT is replaced by first name
let MESSAGE = "yooooooooo UNIQUE_CONTACT. How's your summer?";

function vcardParser() {
  vcard.parseVcardFile(CONTACT_FILE_PATH, function(err, data) {
    let contacts = {}; // key is contact, value is first name
    console.log("You're going to send the text: \n")
    console.log(MESSAGE + "\n")
    console.log("<<<<-- where UNIQUE_CONTACT is replaced by their name --->>>>" + "\n")
    console.log("To:")

    for (let i = 0; i < data.length; i += 1) {
        let contact = data[i];
        let name = contact.fullname;
        let personalname = "";

        // only bother putting in contacts if it's not empty
        if (name !== 'empty' && name !== 'First Name Last Name') {
          if (name.indexOf(" ") != -1) { // if there's a space
            personalname = name.split(" ")[0]; // get first name from contact name
            contacts[name] = personalname;
            console.log(personalname) // show it in the commandline
          }
          else { // otherwise just get the whole first "word"
            personalname = name;
            contacts[name] = personalname;
            console.log(personalname)
          }
        }
      }
      const prompt = new Confirm('\n Are you sure you wish to proceed?')
      .run()
      .then(function(answer) {
        if (answer) { // if true
          for (let name in contacts) {
            // message is sent to all names in contact list
            sendMessage(name, contacts[name]);
          }
        }
        else {
          console.log("Nice save. Not sending... run again if you want to try again. \n \n")
        }
      });
  });
}

function sendMessage(name, personalname) {
  // more replacement can be done here
  let personalmessage = MESSAGE.replace("UNIQUE_CONTACT", personalname);

  let command = SCRIPT_PATH + " " + "\"" + personalmessage + "\"" + " " +  "\"" + name + "\""
  console.log("RUNNING: \n \n " + command);
  shell.exec(command);
}

vcardParser();
