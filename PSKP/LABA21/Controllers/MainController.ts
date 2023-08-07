
import {Request, Response} from "express";
import * as fs from "fs/promises"
import {Contact} from "../DB/ContactModel.js";

function isValidPhoneNumber(phone: string) {
    return phone.length <12  && !isNaN(+phone);
}

class MainController {


    static Get = async (req: Request, res: Response) => {

        const contacts = await this.readContacts();
        res.render('home', {contacts});

    }

    static GetAdd = async (req: Request, res: Response) => {
        const contacts = await this.readContacts();
        res.render('add', {contacts, deny: true});

    }

    static GetUpdate = async (req: Request, res: Response) => {
        const contacts = await this.readContacts();
        console.log(req.query);
        res.render('update', {contacts, name: req.query.name, telephone: req.query.telephone, deny: true});
    }

    static PostAdd = async (req: Request, res: Response) => {
        let {contact, phone} = req.body;


        if (!isValidPhoneNumber(phone)) {
            res.status(400).send('Invalid phone number');
            return;
        }
        const contacts: Contact[] = await this.readContacts();
        contacts.push(new Contact(contact, phone));
        await this.writeContacts(contacts);

        res.render('home', {contacts});
    }

    static PostUpdate = async (req: Request, res: Response) => {
        let {OldName, OldPhone, newName, newTelephone} = req.body;


        if (!isValidPhoneNumber(newTelephone)) {
            res.status(400).send('Invalid phone number');
            return;
        }
        const contacts: Contact[] = await this.readContacts();
        contacts.forEach(x => {
            if (x.telephone === OldPhone && x.name === OldName) {
                x.telephone = newTelephone;
                x.name = newName;
            }
            return x;
        });

        await this.writeContacts(contacts);

        res.render('home', {contacts});

    }

    static PostDelete = async (req: Request, res: Response) => {
        let {Name, Phone} = req.body;


        const OldContacts: Contact[] = await this.readContacts();
        let contacts =OldContacts.filter(x => {
             return x.telephone !== Phone && x.name !== Name
        });

        await this.writeContacts(contacts);

        res.render('home', {contacts});


    }

    static async readContacts(): Promise<Contact[]> {
       const file = await fs.readFile('./DB/PhoneBook.json', 'utf-8');
       return JSON.parse(file);
    }

     static async writeContacts(contacts: Contact[]) {
       await fs.writeFile('./DB/PhoneBook.json', JSON.stringify(contacts));
    }


 }



export default MainController;