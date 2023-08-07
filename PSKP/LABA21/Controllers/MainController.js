var _a;
import * as fs from "fs/promises";
import { Contact } from "../DB/ContactModel.js";
function isValidPhoneNumber(phone) {
    return phone.length < 12 && !isNaN(+phone);
}
class MainController {
    static async readContacts() {
        const file = await fs.readFile('./DB/PhoneBook.json', 'utf-8');
        return JSON.parse(file);
    }
    static async writeContacts(contacts) {
        await fs.writeFile('./DB/PhoneBook.json', JSON.stringify(contacts));
    }
}
_a = MainController;
MainController.Get = async (req, res) => {
    const contacts = await _a.readContacts();
    res.render('home', { contacts });
};
MainController.GetAdd = async (req, res) => {
    const contacts = await _a.readContacts();
    res.render('add', { contacts, deny: true });
};
MainController.GetUpdate = async (req, res) => {
    const contacts = await _a.readContacts();
    console.log(req.query);
    res.render('update', { contacts, name: req.query.name, telephone: req.query.telephone, deny: true });
};
MainController.PostAdd = async (req, res) => {
    let { contact, phone } = req.body;
    if (!isValidPhoneNumber(phone)) {
        res.status(400).send('Invalid phone number');
        return;
    }
    const contacts = await _a.readContacts();
    contacts.push(new Contact(contact, phone));
    await _a.writeContacts(contacts);
    res.render('home', { contacts });
};
MainController.PostUpdate = async (req, res) => {
    let { OldName, OldPhone, newName, newTelephone } = req.body;
    if (!isValidPhoneNumber(newTelephone)) {
        res.status(400).send('Invalid phone number');
        return;
    }
    const contacts = await _a.readContacts();
    contacts.forEach(x => {
        if (x.telephone === OldPhone && x.name === OldName) {
            x.telephone = newTelephone;
            x.name = newName;
        }
        return x;
    });
    await _a.writeContacts(contacts);
    res.render('home', { contacts });
};
MainController.PostDelete = async (req, res) => {
    let { Name, Phone } = req.body;
    const OldContacts = await _a.readContacts();
    let contacts = OldContacts.filter(x => {
        return x.telephone !== Phone && x.name !== Name;
    });
    await _a.writeContacts(contacts);
    res.render('home', { contacts });
};
export default MainController;
//# sourceMappingURL=MainController.js.map