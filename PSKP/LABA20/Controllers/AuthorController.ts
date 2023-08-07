import {Request,Response} from "express"
import {PrismaClient} from "@prisma/client";

class AuthorController {
    prisma:PrismaClient ;
    constructor(Prisma:PrismaClient) {
        this.prisma = Prisma;
    }

       Get = async (req: Request, res: Response) => {
           try {
               const authors = await this.prisma.authors.findMany();
               res.render('authors.hbs', {authors});

           } catch (error) {
               console.error(error);
               res.status(500).json(error);
           }
       }


      Post =async (req:Request,res:Response) =>{
          const { name, dateOfBirth, bio, nationality } = req.body;
          const author = await this.prisma.authors.create({
              data: {
                  Name: name,
                  Date_of_birth: new Date(dateOfBirth),
                  Bio: bio,
                  Nationality: nationality,
              },
          });
          res.redirect('/authors');



    }

    PostWithID =async (req:Request,res:Response)=> {
          const { id } = req.params;
          const { name, dateOfBirth, bio, nationality } = req.body;
          const author = await this.prisma.authors.update({
              where: { Author_ID: parseInt(id) },
              data: {
                  Name: name,
                  Date_of_birth: new Date(dateOfBirth),
                  Bio: bio,
                  Nationality: nationality,
              },
          });
          res.redirect('/authors');


    }



      GetById = async (req:Request,res:Response) =>{
          const { id } = req.params;
          const author = await this.prisma.authors.findUnique({
              where: { Author_ID: parseInt(id) },
          });
          res.render('authors.hbs', { author });


    }

    Delete = async (req:Request,res:Response) =>{
        const { id } = req.params;
        const author = await this.prisma.authors.delete({
            where: { Author_ID: parseInt(id) },
        });
        res.redirect('/authors');
    }




}
export default AuthorController;