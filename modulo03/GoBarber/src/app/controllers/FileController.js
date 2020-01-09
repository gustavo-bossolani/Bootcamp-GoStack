import File from '../models/File';

class FileController {
    async store(req, resp) {
        console.log(req.body);
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name,
            path,
        });
        return resp.json(file);
    }
}
export default new FileController();
